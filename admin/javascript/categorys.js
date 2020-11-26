var urlCategorys = "http://localhost:3000/categorys/";
var method = { method: "GET" };
var category=``;
fetch(urlCategorys,method)
            .then(dataCategory=> dataCategory.json())
            .then(dataCategory => {
                dataCategory.forEach(element=>{
                    category+=`
                    <tr id="row-${element.id}">
                    <td>${element.id}</td>
                    <td> ${element.name_category}</td>
                    <td><img src="${element.image}"  style="width:100px"></td>
                    <td> ${element.status}</td>
                    <td>
                    <button class="btn btn-sm btn-danger"  onclick="removeElement(${element.id})">Xóa</button>  
                    <a href="category-edit.html?id=${element.id}" class="btn btn-sm btn-primary">Sửa</a>  
                    </td>
                    </tr>
                `;
                document.querySelector("#tbody").innerHTML=category;
                })
})
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
            var urlCategorys = "http://localhost:3000/categorys/";
            var urlproducts = "http://localhost:3000/products?id_category="+removeId;
console.log(urlproducts)
            var urlDelete=urlCategorys+removeId;
            fetch(urlDelete,{method:"delete"})
            .then(()=>{
                fetch(urlproducts,{method:"delete"})
                .then((rest)=>console.log(rest))
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