const urlCategory = "http://localhost:3000/categorys"
fetch(urlCategory, { method: "GET" })
    .then(dataCategory => dataCategory.json())
    .then(dataCategory => {
        danhmuc = ``;
        dataCategory.forEach(element => {
            danhmuc += `
            <option value="${element.id}">${element.name_category}</option>

            `;
        })
        document.querySelector("#danhmuc").innerHTML = danhmuc;

})
function addProduct() {
    
    var d = new Date();
    var n =d.getDate()+"/"+(d.getMonth()+1)+ "/"+d.getFullYear();
    const name_product = document.querySelector('[name="name_product"]').value;
    const price = document.querySelector('[name="price"]').value;
    const old_price = document.querySelector('[name="old_price"]').value;
    const image = document.querySelector('[name="images"]').value;
    const soluong = document.querySelector('[name="soluong"]').value;
    const mota = document.querySelector('[name="mota"]').value;
    const id_category = document.querySelector('#danhmuc').value;
    if(!name_product||!price||!image||!soluong||!mota){
        alert("Vui Lòng điền đầy đủ thông tin");
        if(!name_product){
            document.querySelector('[name="name_product"]').focus();
            return false;
        }
        if(!price){
            document.querySelector('[name="price"]').focus();
            return false;
        }
        if(!image){
            document.querySelector('[name="images"]').focus();
            return false;
        }
        if(!soluong){
            document.querySelector('[name="soluong"]').focus();
            return false;
        }
        if(!mota){
            document.querySelector('[name="mota"]').focus();
            return false;
        }
        return false;
    }else{
    console.log(typeof soluong)
    const sprice = new Number(price);
    const sold_price = new Number(old_price);
    const ssoluong = new Number(soluong);

    var dataPost = {
        id_category: id_category,
        name_Product: name_product,
        price: sprice,
        old_price: sold_price,
        image: image,
        mota: mota,
        ngaythem:n,
        soluong: ssoluong,
        status: "on"
    };
    console.log(dataPost)
    var url_post = 'http://localhost:3000/products';

    fetch(url_post, {
        method: 'POST', // thêm mới thì dùng post
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataPost), // chuyển dữ liệu object trên thành chuỗi json
    })
        .then(response => response.json()) // chuyển kết quả trả về thành json object
        .then(() => {
            location.replace("products.html")

        })
        .catch((error) => {
            console.error('Error:', error); // ghi log nếu xảy ra lỗi
        });

}
return false;
}