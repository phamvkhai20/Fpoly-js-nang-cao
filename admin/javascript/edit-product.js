const urlParams = new URLSearchParams(window.location.search);
id = urlParams.get('id');
console.log(id)

const urlCategory = "http://localhost:3000/categorys"
fetch(urlCategory, { method: "GET" })
    .then(dataCategory => dataCategory.json())
    .then(dataCategory => {
        console.log(dataCategory)
        danhmuc = ``;
        dataCategory.forEach(element => {
            danhmuc += `
            <option value="${element.id}">${element.name_category}</option>

            `;
        })
        document.querySelector("#danhmuc").innerHTML = danhmuc;
    })




const urlproduct = "http://localhost:3000/products/" + id;
fetch(urlproduct, { method: "get" })
    .then(res => res.json())
    .then(res => {

        document.querySelector('[name="name_product"]').value = res.name_Product;
        document.querySelector('[name="price"]').value = res.price;
        document.querySelector('[name="old_price"]').value = res.old_price;
        document.querySelector('[name="images"]').value = res.image;
        document.querySelector('[name="soluong"]').value = res.soluong;
        document.querySelector('[name="mota"]').value = res.mota;
        if (res.status == "on") {
            document.querySelector('#tt').innerHTML = "Hiển Thị";
        } else {
            document.querySelector('#tt').innerHTML = "Ẩn";

        }
        document.querySelector('#tt').value = res.status;
        console.log(res.mota);
        document.querySelector('#danhmuc').value = res.id_category;
    })






function editProduct() {

    const name_product = document.querySelector('[name="name_product"]').value;
    const price = document.querySelector('[name="price"]').value;
    const old_price = document.querySelector('[name="old_price"]').value;
    const image = document.querySelector('[name="images"]').value;
    const soluong = document.querySelector('[name="soluong"]').value;
    const mota = document.querySelector('[name="mota"]').value;
    const status = document.querySelector('[name="status"]').value;
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
    }
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
        soluong: ssoluong,
        status: status
    };

    const urlproduct = "http://localhost:3000/products/" + id;
    console.log("aa" + urlproduct);
    fetch(urlproduct, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataPost),
    })
        .then(response => response.json())
        .then(() => {
            location.replace("products.html")
        })
        .catch((error) => {
            console.error('Error:', error); // ghi log nếu xảy ra lỗi
        })

    return false;



}