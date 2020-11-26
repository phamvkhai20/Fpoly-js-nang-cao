const urlParams = new URLSearchParams(window.location.search);
id = urlParams.get('id');
console.log(id)
url_edit = 'http://localhost:3000/blogs/' + id
fetch(url_edit, { method: "get" })
    .then(res => res.json())
    .then(res => {
        console.log(res)
        document.querySelector('[id="tieude"]').value = res.tieude;
        document.querySelector('[id="images"]').value = res.image;
        document.querySelector('[id="elm1"]').value = res.content;
        document.querySelector('[id="nhap"]').value = res.content
        if (res.status == "on") {
            document.querySelector('#status').innerHTML = `
            <option value="on">Hiển Thị</option>
            <option value="off">Ẩn</option>
            `;
        } else {
            document.querySelector('#status').innerHTML = `
            <option value="off">Ẩn</option>
            <option value="on">Hiển Thị</option>
            `;

        }
    })

    var clickchuot=0

function editblog() {
    clickchuot+=1
    const tieude = document.querySelector('[id="tieude"]').value;
    const image = document.querySelector('[id="images"]').value;
    const content = document.querySelector('[id="elm1"]').value;
    const status = document.querySelector('[id="status"]').value;
    const nhap = document.querySelector('[id="nhap"]').value;
    if(!tieude||!image||!content){
        alert("Vui Lòng điền đầy đủ thông tin");
        if(!tieude){
            document.querySelector('[id="tieude"]').focus();
            return false;
        }
        if(!image){
            document.querySelector('[id="images"]').focus();
            return false;
        }
        if(!content){
            document.querySelector('#elm1').focus();
            return false;
        }
    }
    if (clickchuot<2){return false}
    else {
        console.log(content)
        const dataPost = {
            tieude: tieude,
            image: image,
            content: content,
            status: status
        };
        const urlParams = new URLSearchParams(window.location.search);
        id = urlParams.get('id');
        const url_post = 'http://localhost:3000/blogs/' + id;
        fetch(url_post, {
            method: 'PATCH', // thêm mới thì dùng post
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataPost), // chuyển dữ liệu object trên thành chuỗi json
        })
            .then(response => response.json()
            ) // chuyển kết quả trả về thành json object
            .then(() => {
                location.replace("../pageadmin/blogs.html")
            })
            .catch((error) => {
                console.error('Error:', error); // ghi log nếu xảy ra lỗi
            });
        return false
    }
    return false

}