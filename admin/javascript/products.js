// get product
var urlCategorys = "http://localhost:3000/categorys/";
var urlProduct = "http://localhost:3000/products?_sort=id&_order=desc";
var method = { method: "GET" };
Products = ``;
fetch(urlProduct, method)
    .then(dataproduct => dataproduct.json())
    .then(dataproduct => {
        dataproduct.forEach(element => {
            urlCategory = urlCategorys+element.id_category;
            fetch(urlCategory,method)
            .then(dataCategory=> dataCategory.json())
            .then(dataCategory => {
                document.querySelector("#nameCategory-"+element.id).innerHTML=dataCategory.name_category
            })
            Products += `
                                <tr id="row-${element.id}">
                                    <td style="font-weight: bold;">${element.id}</td>
                                    <td>${element.name_Product}</td>
                                    <td><img style="width:100px" src="${element.image}" ></td>
                                    <td id="nameCategory-${element.id}">${element.id_category}</td>
                                    <td>${element.price}</td>
                                    <td>${element.old_price}</td>
                                    <td>${element.soluong}</td>
                                    <td>${element.ngaythem}</td>
                                    <td>
                                        <button class="btn btn-sm btn-danger"  onclick="removeElement(${element.id})">Xóa</button>  
                                        <a href="product-edit.html?id=${element.id}" class="btn btn-sm btn-primary">Sửa</a>  
                                    </td>

                                </tr>
            `
        });
        document.querySelector("#tbody").innerHTML = Products;
        console.log("khaideptrai")
    });
function removeElement(removeId) {
    // confirm
    Swal.fire({
        title: 'Chắc chắn xóa hotels?',
        text: "Sau khi xóa sẽ không lấy lại dữ liệu được!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Đồng ý!',
        cancelButtonText: 'Thôi!'
    }).then((result) => {
        if (result.value) {
            // gửi request lên server
            var urlDelete="http://localhost:3000/products/"+removeId;
            fetch(urlDelete,{method:"delete"})
            .then(()=>{
                var removeElement = document.querySelector('#row-' + removeId);
                removeElement.remove();
                Swal.fire({
                    position: 'bottom-end',
                    icon: 'success',
                    title: 'Đã xóa',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
            )
            
        }
    })
}