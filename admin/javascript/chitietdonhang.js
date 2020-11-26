    const urlParams = new URLSearchParams(window.location.search);
    id = urlParams.get('id');
    donhang=[];
    var url = "http://localhost:3000/khachhang/" + id;
    var method = { method: "GET" };
    var tatca = ``;
    var trangthai=``;
    fetch(url, method)
        .then(data => data.json())
        .then(data => {
            console.log(data.tongdon)
            donhang=data.tongdon.split(" ")
            console.log(donhang);
            stt=0;
            document.querySelector("#tongtienss").innerHTML=data.tongtien.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")+ " VNĐ"
            console.log(data.tongtien)
            document.querySelector("#phone").innerHTML=data.phone
            document.querySelector("#email").innerHTML=data.email
            document.querySelector("#address").innerHTML=data.address
            if(data.note==""){
                document.querySelector("#note").innerHTML="Không Có"
            }else{
                document.querySelector("#note").innerHTML=data.note
            }
            if(data.status=="0"){
                trangthai=`
                <button type="button" class="btn btn-success" onclick="hoanthanh(${data.id})" style="float: right;margin: 5px;">Hoàn Thành</button>
                <button type="button" class="btn btn-danger" onclick="huydon(${data.id})" style="float: right;margin: 5px;">Hủy</button>`
                document.querySelector("#trangthai").innerHTML=trangthai
            }else if(data.status=="2"){
                trangthai=`
                <button type="button" class="btn btn-danger" style="float: right;margin: 5px;">Đã Hủy</button>`
                document.querySelector("#trangthai").innerHTML=trangthai
            }else if(data.status=="1"){
                trangthai=`
                <button type="button" class="btn btn-success" style="float: right;margin: 5px;">Giao Thành Công</button>`
                document.querySelector("#trangthai").innerHTML=trangthai
            }
            console.log(trangthai+"sss")
            donhang.forEach(element => {
                var urldathang = "http://localhost:3000/donhang/" + element;
                fetch(urldathang,{method:"GET"})
                .then(rest=>rest.json())
                .then(rest=>{
                    
                    urlProduct="http://localhost:3000/products/"+rest.idsp
                    fetch(urlProduct,{method:"GET"})
                    .then(response=>response.json())
                    .then(response=>{
                        stt+=1;
                        tatca+=`
                        <tr id="row-${response.id}">
                        <td>${stt}</td>
                       <td>${response.name_Product}</td>
                       <td><img src="${response.image}"  style="width:100px"></td>
                       <td> ${rest.soluong}</td>
                       <td> ${(rest.soluong*response.price).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")} VNĐ</td>
                   </tr>
                        `;
                        document.querySelector("#tbody").innerHTML = tatca;
                    })
                })
            });
        })
        function huydon(removeId) {
            trangthai=``;
            // confirm
            Swal.fire({
                title: 'Chắc chắn hủy đơn hàng',
                text: "Chọn đồng ý sẽ hủy đơn hàng!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Đồng ý!',
                cancelButtonText: 'Thôi!'
            }).then((result) => {
                if (result.value) {
                    // gửi request lên server
                    var urlkhachhang = "http://localhost:3000/khachhang/"+removeId;
                    console.log(urlkhachhang)
                    fetch(urlkhachhang,{method:"GET"})
                    .then(res=>res.json())
                    .then((res)=>{
                        console.log(res)
                        data={
                            address: res.address,
                            code: res.code,
                            datluc:res.datluc,
                            email: res.email,
                            hovaten: res.hovaten,
                            note: res.note,
                            phone: res.phone,
                            status: 2,
                            tongdon: res.tongdon,
                            tongtien: res.tongtien
                        }
                        fetch(urlkhachhang, {
                            method: 'PATCH', // thêm mới thì dùng post
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(data), // chuyển dữ liệu object trên thành chuỗi json
                        })
                        .then(response => response.json())
                        .then(response=>{
                            trangthai=`
                            <button type="button" class="btn btn-danger" style="float: right;margin: 5px;">Đã Hủy</button>`
                            document.querySelector("#trangthai").innerHTML=trangthai
                        }
                        )
                    }
                    )
                }
            })
        }
    function hoanthanh(removeId) {
            // confirm
            Swal.fire({
                title: 'Xác nhận đơn hàng đã hoàn thành !',
                text: "Chọn đồng ý sẽ cập nhật trạng thái thành công",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Đồng ý!',
                cancelButtonText: 'Thôi!'
            }).then((result) => {
                if (result.value) {
                    // gửi request lên server
                    var d = new Date();
                    dates = d.getDate()+"/"+(d.getMonth()+1)+ "/"+d.getFullYear();;

                    var urlkhachhang = "http://localhost:3000/khachhang/"+removeId;
                    console.log(urlkhachhang)
                    fetch(urlkhachhang,{method:"GET"})
                    .then(res=>res.json())
                    .then((res)=>{
                        console.log(res)
                        data={
                            address: res.address,
                            code: res.code,
                            datluc:res.datluc,
                            email: res.email,
                            hovaten: res.hovaten,
                            note: res.note,
                            phone: res.phone,
                            ngaygiaohang:dates,
                            status: 1,
                            tongdon: res.tongdon,
                            tongtien: res.tongtien
                        }
                        fetch(urlkhachhang, {
                            method: 'PATCH', // thêm mới thì dùng post
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(data), // chuyển dữ liệu object trên thành chuỗi json
                        })
                        .then(response => response.json())
                        .then(response=>{
                            trangthai=`
                            <button type="button" class="btn btn-success" style="float: right;margin: 5px;">Giao Thành Công</button>
                            `
                            document.querySelector("#trangthai").innerHTML=trangthai
                        }
                        )
                    }
                    )
                }
            })
}