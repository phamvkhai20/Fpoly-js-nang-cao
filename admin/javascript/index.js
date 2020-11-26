function getdata() {
    var urlOrder = "http://localhost:3000/khachhang";
    var donhang = "http://localhost:3000/donhang";
    fetch(urlOrder, { method: "GET" })
        .then(res => res.json())
        .then(res => {
            document.querySelector("#order").innerHTML = res.length

            document.querySelector("#thunhap").innerHTML = res.tongtien

            demdonhang = 0;
            tongtien = 0;
            thunhaphomnay=0;
            var d = new Date();
            dates = d.getDate()+"/"+(d.getMonth()+1)+ "/"+d.getFullYear();;
            res.forEach(element => {
                if(element.status=="1"){
                    tongtien += element.tongtien
                    tongtien = tongtien
                    if (element.ngaygiaohang == dates) {
                        thunhaphomnay+=element.tongtien
                    }
                }
                
                if (element.datluc == dates) {
                    demdonhang += 1
                }
                document.querySelector("#thunhap").innerHTML = (tongtien).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")
                console.log()
                document.querySelector("#donhanghomnay").innerHTML = "+" + demdonhang;
                document.querySelector("#thunhaphomnay").innerHTML = thunhaphomnay.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
            });
        }
    )
    fetch(donhang, { method: "GET" })
        .then(rest => rest.json())
        .then(rest => {
            demsanpham = 0;
            var d = new Date();
            dates = d.getDate()+"/"+(d.getMonth()+1)+ "/"+d.getFullYear();
            rest.forEach(element => {

                if (element.trangthai == "daban") {
                    soluong = new Number(element.soluong)
                    demsanpham += soluong
                }
                if (element.datluc == dates) {
                    demdonhang += 1
                }
                document.querySelector("#sanphamdaban").innerHTML = demsanpham
            });
        })
    var url = "http://localhost:3000/contact?_sort=trangthai&_order=desc";
    var method = { method: "GET" };
    var contacts = ``;
    var tinhlienhe=0;
    fetch(url, method)
        .then(data => data.json())
        .then(data => {
            data.forEach(element => {
                
                if(element.trangthai=="moi"){
                    tinhlienhe+=1;
                    contacts += `<a href="chitietlienhe.html?id=${element.id}" onclick="kiemtraclick(${element.id})">
                    <div class="inbox-item" >
                    <div class="inbox-item-img"><img src="data:image/png;base64,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" class="rounded-circle bx-shadow-lg" alt=""></div>
                    <p class="inbox-item-author" style="font-weight: bold;color: black;" id="email${element.id}">${element.hovaten}</p>
                    <p class="inbox-item-text" style="font-weight: bold;color: black;" id="conten${element.id}">${element.content.substr(0,70)}...</p>
                    <p class="inbox-item-date">${element.date}</p>
                   </div>
                    </a>
                    `;
                }else{
                    contacts += `<a href="chitietlienhe.html?id=${element.id}">
                    <div class="inbox-item" >
                    <div class="inbox-item-img"><img src="data:image/png;base64,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" class="rounded-circle bx-shadow-lg" alt=""></div>
                    <p class="inbox-item-author" >${element.hovaten}</p>
                    <p class="inbox-item-text" >${element.content.substr(0,70)}...</p>
                    <p class="inbox-item-date" >${element.date}</p>
                   </div>
                    </a>
                    `;
                }

                document.querySelector("#tinhlienhe").innerHTML = tinhlienhe;

                document.querySelector("#lienhe").innerHTML = contacts;
            })

        })
        function kiemtraclick(id){
            document.querySelector("#email"+id).style.fontWeight="normal";
            document.querySelector("#conten"+id).style.fontWeight="normal";
        }
    }


