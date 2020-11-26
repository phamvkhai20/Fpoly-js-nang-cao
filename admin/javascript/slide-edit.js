const urlParams = new URLSearchParams(window.location.search);
id = urlParams.get('id');
console.log(id)
    url_edit = 'http://localhost:3000/slides/'+id
    fetch(url_edit,{method: "get"})
    .then(res=>res.json())
    .then(res=>{
        console.log(res)
        document.querySelector('[name="tenslide"]').value=res.tenslide;
        document.querySelector('[name="images"]').value=res.image;
        document.querySelector('[name="url"]').value=res.url;

        if(res.status=="on"){
            document.querySelector('[name="status"]').innerHTML=`
            <option value="on">Hiển Thị</option>
            <option value="off">Ẩn</option>
            `;
        }else {
            document.querySelector('[name="status"]').innerHTML=`
            <option value="off">Ẩn</option>
            <option value="on">Hiển Thị</option>
            `;

        }
    })


function editslide(){

    const tenslide = document.querySelector('[name="tenslide"]').value;
    const image = document.querySelector('[name="images"]').value;
    const url = document.querySelector('[name="url"]').value;
    const status=document.querySelector('[name="status"]').value;

    const dataPost = {
        tenslide: tenslide,
        image: image,
        url:url,
        status: status
    };

    const urlParams = new URLSearchParams(window.location.search);
    id = urlParams.get('id');   
    const url_post = 'http://localhost:3000/slides/'+id;
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
                location.replace("../pageadmin/slides.html")
            })
            .catch((error) => {
                console.error('Error:', error); // ghi log nếu xảy ra lỗi
            });
            return false
    
        }