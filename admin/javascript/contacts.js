var url = "http://localhost:3000/contact?_sort=id&_order=desc";
var method = { method: "GET" };
var contacts = ``;
fetch(url, method)
    .then(data => data.json())
    .then(data => {
        data.forEach(element => {
            contacts += `
                    
                        <tr id="row-${element.id}">
                             <td>${element.id}</td>
                            <td>${element.hovaten}</td>
                            <td style="width:75%"> ${element.content}</td>
                            <td>
                            <button class="btn btn-sm btn-danger"  onclick="removeElement(${element.id})">Xóa</button>  
                            <a href="chitietlienhe.html?id=${element.id}" class="btn btn-sm btn-primary">Đọc</a>  
         
                            </td>
                          
                        </tr>
                  
                `;
            document.querySelector("#tbody").innerHTML = contacts;
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
                var urlCategorys = "http://localhost:3000/contact/";
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

