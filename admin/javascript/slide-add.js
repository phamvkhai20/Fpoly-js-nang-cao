function addslide(){

    const tenslide = document.querySelector('[name="tenslide"]').value;
    const image = document.querySelector('[name="images"]').value;
    const url = document.querySelector('[name="url"]').value;
    var d = new Date();
    dates =d.getDate()+"/"+d.getDay()+ "/"+d.getFullYear();
    const dataPost = {
        tenslide: tenslide,
        image: image,
        url:url,
        date:dates,
        status: "on"
    };
    const url_post = 'http://localhost:3000/slides';
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
                location.replace("slides.html")
    
            })
            .catch((error) => {
                console.error('Error:', error); // ghi log nếu xảy ra lỗi
            });
            return false
    
    
        }