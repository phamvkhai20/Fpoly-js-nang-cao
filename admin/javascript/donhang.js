var url = "http://localhost:3000/khachhang?_sort=status&_order=asc";
var method = { method: "GET" };
var khachhang=``;
fetch(url,method)
            .then(data=> data.json())
            .then(data => {
                data.forEach(element=>{
                    if (element.status=="0") {
                        khachhang+=`
                            <tr id="row-${element.id}">
                            <td>${element.code}</td>

                                <td>${element.phone}</td>
                                <td> ${element.tongtien.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")} VNĐ</td>
                                <td> ${element.datluc}</td>
                                <td>  <span class="badge badge-warning">Đang Chờ</span></td>
                                <td>
                                <a href="chitietdonhang.html?id=${element.id}" class="btn btn-sm bg-info text-light">Chi tiết đơn</a>  
                                </td>
                            </tr>
                        `;
                    }else  if (element.status=="2") {
                        khachhang+=`
                            <tr id="row-${element.id}">
                            <td>${element.code}</td>

                                <td>${element.phone}</td>
                                <td> ${element.tongtien.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")} VNĐ</td>
                                <td> ${element.datluc}</td>
                                <td>   <span class="badge badge-danger">Đã Hủy</span></td>
                                <td>
                                <a href="chitietdonhang.html?id=${element.id}" class="btn btn-sm bg-info text-light">Chi tiết đơn</a>  
                                </td>
                            </tr>
                        `;
                    }
                    else  if (element.status=="1") {
                        khachhang+=`
                            <tr id="row-${element.id}">
                            <td>${element.code}</td>

                                <td>${element.phone}</td>
                                <td> ${element.tongtien.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.")} VNĐ</td>
                                <td> ${element.datluc}</td>
                                <td> <span class="badge badge-success">Thành Công</span></td>
                                <td>
                                <a href="chitietdonhang.html?id=${element.id}" class="btn btn-sm bg-info text-light">Chi tiết đơn</a>  
                                </td>
                            </tr>
                        `;
                    }
                    
                document.querySelector("#tbody").innerHTML=khachhang;
                })
                
})
