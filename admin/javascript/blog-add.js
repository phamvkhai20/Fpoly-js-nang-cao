function addblog() {

    const tieude = document.querySelector('[name="tieude"]').value;
    const image = document.querySelector('[name="images"]').value;
    const content = document.querySelector('#elm1').value;
    if(!tieude||!image||!content){
        alert("Vui Lòng điền đầy đủ thông tin");
        if(!tieude){
            document.querySelector('[name="tieude"]').focus();
            return false;
        }
        if(!image){
            document.querySelector('[name="images"]').focus();
            return false;
        }
        if(!content){
            document.querySelector('#elm1').focus();
            return false;
        }
    }
    console.log(content)
    if (content.length > 0) {
        var d = new Date();
        dates = d.getDate()+"/"+(d.getMonth()+1)+ "/"+d.getFullYear();
        const dataPost = {
            tieude: tieude,
            image: image,
            content: content,
            date: dates,
            status: "on"
        };
        const url_post = 'http://localhost:3000/blogs';
        fetch(url_post, {
            method: 'POST', // thêm mới thì dùng post
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataPost), // chuyển dữ liệu object trên thành chuỗi json
        })
            .then(response => response.json()
            ) // chuyển kết quả trả về thành json object
            .then(() => {
                location.replace("blogs.html")

            })
            .catch((error) => {
                console.error('Error:', error); // ghi log nếu xảy ra lỗi
            });
        return false

    }
    return false

}