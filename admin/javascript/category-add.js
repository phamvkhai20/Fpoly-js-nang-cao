function addcategory(){

const name = document.querySelector('[name="name_category"]').value;
const image = document.querySelector('[name="images"]').value;

if(!image||!name){
    alert("Vui lòng điền đầy đủ thông tin");
    if(!name){
        document.querySelector('[name="name_category"]').focus();
        return false;
    }
    if(!image){
        document.querySelector('[name="images"]').focus();
        return false;
    }
    
}

const dataPost = {
    name_category: name,
    image: image,
    status: "on"
};
const url_post = 'http://localhost:3000/categorys';
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
            location.replace("categorys.html")

        })
        .catch((error) => {
            console.error('Error:', error); // ghi log nếu xảy ra lỗi
        });
        return false


    }