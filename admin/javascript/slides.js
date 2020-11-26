var url = "http://localhost:3000/slides?_sort=status&_order=desc";
var method = { method: "GET" };
var slides = ``;
slide = 0;
fetch(url, method)
    .then(data => data.json())
    .then(data => {
        data.forEach(element => {
            slides += `
                    <tr id="row-${element.id}">
                        <td>${element.id}</td>
                        <td> ${element.tenslide}</td>
                        <td><img src="${element.image}"  style="width:100px"></td>
                        <td> 
                        <input parsley-type="url" value="${element.url}" type="url" class="form-control" 
                        </td>
                        <td> ${element.date}</td>
                        <td> ${element.status}</td>
                        <td>
                        <button class="btn btn-sm btn-danger"  onclick="removeElement(${element.id})">Xóa</button>  
                        <a href="slide-edit.html?id=${element.id}" class="btn btn-sm btn-primary">Sửa</a>  
                        </td>
                    </tr>
                `;
            if (element.status == "on") {
                if (slide < 3) {

                    slide += 1;
                    document.querySelector("#slide" + slide).src = element.image;
                    console.log(slide)

                } else {

                }
            }



            document.querySelector("#tbody").innerHTML = slides;
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
            var urlCategorys = "http://localhost:3000/slides/";
            var urlDelete = urlCategorys + removeId;
            fetch(urlDelete, { method: "delete" })
                .then(() => {
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