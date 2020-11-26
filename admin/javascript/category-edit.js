const urlParams = new URLSearchParams(window.location.search);
id = urlParams.get('id');
console.log(id)
    url_edit = 'http://localhost:3000/categorys/'+id
    fetch(url_edit,{method: "get"})
    .then(res=>res.json())
    .then(res=>{
        console.log(res)
        document.querySelector('[id="name_category"]').value=res.name_category;
        document.querySelector('[id="images"]').value=res.image;
        if(res.status=="on"){
            document.querySelector('#status').innerHTML=`
            <option value="on">Hiển Thị</option>
            <option value="off">Ẩn</option>
            `;
        }else {
            document.querySelector('#status').innerHTML=`
            <option value="off">Ẩn</option>
            <option value="on">Hiển Thị</option>
            `;

        }
    })


function editcategory(){

    const name = document.querySelector('[id="name_category"]').value;
    const image = document.querySelector('[id="images"]').value;
    const status=document.querySelector('[id="status"]').value;
    if(!image||!name){
        alert("Vui lòng điền đầy đủ thông tin");
        if(!name){
            document.querySelector('[id="name_category"]').focus();
            return false;
        }
        if(!image){
            document.querySelector('[id="images"]').focus();
            return false;
        }
        
    }
    const dataPost = {
        name_category: name,
        image: image,
        status: status
    };
    const urlParams = new URLSearchParams(window.location.search);
    id = urlParams.get('id');   
    const url_post = 'http://localhost:3000/categorys/'+id;
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
                location.replace("../pageadmin/categorys.html")
            })
            .catch((error) => {
                console.error('Error:', error); // ghi log nếu xảy ra lỗi
            });
            return false
    
        }