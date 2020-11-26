var url = "http://localhost:3000/blogs?_sort=id&_order=desc";
var method = { method: "GET" };
var blogs=``;
fetch(url,method)
            .then(data=> data.json())
            .then(data => {
                data.forEach(element=>{
                    blogs+=`
                    <tr id="row-${element.id}">
                        <td>${element.id}</td>
                        <td> ${element.tieude}</td>
                        <td><img src="${element.image}"  style="width:100px"></td>
                        <td> ${element.content.substr(0,200)}</td>
                        <td> ${element.date}</td>
                        <td> ${element.status}</td>
                        <td>
                        <button class="btn btn-sm btn-danger"  onclick="removeElement(${element.id})">Xóa</button>  
                        <a href="blog-edit.html?id=${element.id}" class="btn btn-sm btn-primary">Sửa</a>  
                        </td>
                    </tr>`;
                document.querySelector("#tbody").innerHTML=blogs;
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
            var urlCategorys = "http://localhost:3000/blogs/";
            var urlDelete=urlCategorys+removeId;
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