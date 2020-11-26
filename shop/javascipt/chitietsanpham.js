var ss = document.cookie;
if(ss.length>2){
donhang=[];
donhang=ss.split(";");
var len=donhang.length;
document.querySelector("#count").innerHTML=(len/2)
}else{
    document.querySelector("#count").innerHTML=0

}

function getdata(){

    const urlParams = new URLSearchParams(window.location.search);
    id = urlParams.get('id');

    var urlproducts = "http://localhost:3000/products/"+id;
    axios.get(urlproducts)
        .then(res =>  
            {  
                if (res.statusText === "OK") {

                var data=res.data
                data.price = data.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
                if(data.soluong>0){
                  
                    document.querySelector('#nameproductlink').innerHTML=data.name_Product;
                    document.querySelector('#nameproduct').innerHTML=data.name_Product;
                    document.querySelector('#mota').innerHTML=data.mota;
                    document.querySelector('#price').innerHTML=data.price+" VNĐ";
                    document.querySelector('#image').src=data.image
                    document.querySelector('#id').value=data.id
                    document.querySelector('#soluongsp').innerHTML=data.soluong
                }else {
                    document.querySelector('#nameproductlink').innerHTML=data.name_Product;
                    document.querySelector('#nameproduct').innerHTML=data.name_Product;
                    document.querySelector('#mota').innerHTML=data.mota;
                    document.querySelector('#price').innerHTML=data.price+"VNĐ";
                    document.querySelector('#image').src=data.image
                    document.querySelector('#soluong').disabled="disabled";
                    document.querySelector('#id').value=data.id
                    document.querySelector('#chon').innerHTML="Xem các sản phẩm khác";
                    document.querySelector('#chon').onclick="#";
                    document.querySelector('#chon').href="shop.html";
                    document.querySelector('#chon').style.border="0";

                    document.querySelector('#chonsoluong').innerHTML=`<div style=" text-align: center;height:45px;line-height:45px;left:10px;width:100px;border:3px rgb(187, 187, 185) solid;font-weight: bold;color: rgb(187, 187, 185);" >HẾT HÀNG</div>`



                }


  var urlProduct = "http://localhost:3000/products?id_category=" + data.id_category + "&_sortid&_order=desc&_limit=3";
  console.log(urlProduct)
  axios.get(urlProduct)
    .then(res => {
      if (res.statusText === "OK") {
        products = ``;
        var data = res.data;
        data.forEach(element => {
          element.price = element.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");

          if (element.status == "on") {

            if (element.soluong > 0) {
              products += `

                    <div class="col-sm-6 col-lg-4 mb-4" data-aos="fade-up">
                    <div class="block-4 text-center border">
                      <figure class="block-4-image" style="position: relative;">
                        <a href="shop-single.html?id=${element.id}"><img src="${element.image}" alt="Image placeholder" class="img-fluid"></a>

                      </figure>
                      <div class="block-4-text p">
                        <h3 style="height:50px;"><a href="shop-single.html?id=${element.id}">${element.name_Product}</a></h3>
                        <p class="mb-0" id="sale" style="height:55px;line-height:20px;padding:0 10px 0 10px">${(element.mota).substr(0, 75)} ... </p>
                        <p class=" font-weight-bold" style="color:#000;font-size:20px">${element.price} VNĐ</p>

                        <p><a href="shop-single.html?id=${element.id}" class="buy-now btn btn-primary">Mua Ngay</a></p>
                      </div>
                    </div>
                  </div>`
            } else {
              products += `

                        <div class="col-sm-6 col-lg-4 mb-4" data-aos="fade-up">
                        <div class="block-4 text-center border">
                          <figure class="block-4-image" style="position: relative;">
                            <a href="shop-single.html?id=${element.id}"><img src="${element.image}" alt="Image placeholder" class="img-fluid"></a>
                            <div id="id${element.id}" style=" position: absolute;top:20px;height:45px;line-height:45px;left:10px;width:100px;border:3px rgb(187, 187, 185) solid;font-weight: bold;color: rgb(187, 187, 185);" >HẾT HÀNG</div>

                          </figure>
                          <div class="block-4-text p">
                            <h3 style="height:50px;"><a href="shop-single.html?id=${element.id}">${element.name_Product}</a></h3>
                            <p class="mb-0" id="sale" style="height:55px;line-height:20px;padding:0 10px 0 10px">${(element.mota).substr(0, 75)} ... </p>
                            <p class=" font-weight-bold" style="color:#000;font-size:20px">${element.price} VNĐ</p>
                            <p><a href="shop-single.html?id=${element.id}" class="buy-now btn btn-primary">Xem</a></p>
                          </div>
                        </div>
                      </div>`
            }
          }

        });
        document.querySelector("#splienquan").innerHTML = products;

      }
    })

            }}
        )
}
function add(){
    var idsp= document.querySelector("#id").value;
    var soluong=document.querySelector("#soluong").value;

    console.log(idsp,soluong);
    var d = new Date();
    var ckNew=d.getTime();
    document.cookie = 'id'+ckNew+'='+idsp;
    document.cookie = 'soluong'+ckNew+'='+soluong;

    const dataPost = {
    code: ckNew,
    idsp: idsp,
    trangthai:"ao",
    soluong: soluong
    };
    const url_post = 'http://localhost:3000/donhang';
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

        })
        .catch((error) => {
            console.error('Error:', error); // ghi log nếu xảy ra lỗi
        });
}



