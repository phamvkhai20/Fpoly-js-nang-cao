
var ss = document.cookie;
if (ss.length > 2) {
  donhang = [];
  donhang = ss.split(";");
  var len = donhang.length;
  document.querySelector("#count").innerHTML = (len / 2)
} else {
  document.querySelector("#count").innerHTML = 0
}
tongtien = 0;
const urlParams = new URLSearchParams(window.location.search);
key = urlParams.get('key');
if (key) {
  keys = key.substr(4, key.length);
  var urlkhachhang = "http://localhost:3000/khachhang?code=" + keys;
  axios.get(urlkhachhang)
    .then(rest => {
      if (rest.statusText === "OK") {
        tachdon = [];
        infokhachhang = rest.data;
        if(!infokhachhang.length){
          alert("Không Tìm Thấy ĐƠn Hàng Nào");
          window.location.href = 'index.html'
        }
        cart = ``;
        infokhachhang.forEach(el => {
          el.tongdon.split(" ").forEach(element => {
            var urldonhang = "http://localhost:3000/donhang/" + element;
            fetch(urldonhang, { method: "GET" })
              .then(response => response.json())
              .then(response => {
                var urldonhang = "http://localhost:3000/products/" + response.idsp;
                fetch(urldonhang, { method: "GET" })
                  .then(res => res.json())
                  .then(res => {
                    cart += `<tr id="row-${response.idsp}">
                    <td class="product-thumbnail">
                      <img src="${res.image}" alt="Image" class="img-fluid">
                    </td>
                    <td class="product-name">
                    <a href="shop-single.html?id=${res.id}">
                      <h2 class="h5 text-black">${res.name_Product}</h2>
                      </a>
                    </td>
                    <td>${res.price} VNĐ</td>
                    <td>
                      <div class="input-group mb-3" style="max-width: 120px;">
                        <input id="${element.id}"  min="1" disabled max="100" type="number" class="form-control text-center" value="${response.soluong}" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1">
                      </div>
                    </td>
                    <td>${response.soluong * res.price} VNĐ</td>
                    <td><a href="#" onclick=deleteCart(${response.idsp}) ></a></td>
                </tr>
                  `;
                  //
                    document.getElementById("cart").innerHTML = cart;
                    tongtien += response.soluong * res.price;
                    document.getElementById("tongtien").innerHTML = tongtien + " VNĐ";
                    document.getElementById("tatcapnhat").innerHTML = ""
                    if (el.status == "0") {
                      document.getElementById("hanhdong").innerHTML = `<button class="btn bg-danger text-white btn-lg py-3 btn-block" onclick="huydon(${el.id})">Hủy Đơn</button>`;
                    } if (el.status == "1") {
                      document.getElementById("hanhdong").innerHTML = `<button class="btn bg-success text-white btn-lg py-3 btn-block" >Đơn Đã Giao Thành Công</button>`;
                    }
                    if (el.status == "2") {
                      document.getElementById("hanhdong").innerHTML = `<button class="btn bg-danger text-white btn-lg py-3 btn-block">Đã Hủy Đơn</button>`;
                    }
                    info = ` <div class="col-md-12">
                        <label class="text-black h4" for="coupon">Thông tin khách hàng</label>
                         <p class="text-black h6"  >Họ và Tên : ${el.hovaten} </p>
                         <p class="text-black h6">Email : ${el.email} </p>
                         <p class="text-black h6">Điện Thoại : ${el.phone} </p>
                         <p class="text-black h6">Địa Chỉ : ${el.address} </p>
                         <p class="text-black h6">Đặt ngày : ${el.datluc} </p>
                        </div>`
                    document.getElementById("info").innerHTML = info
                  })
              })
          });
        });

      }
    })
}
function huydon(id) {
  Swal.fire({
    title: 'Chắc chắn Hủy Đơn?',
    text: "Nhấn Đồng ý để hủy đơn!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Đồng ý!',
    cancelButtonText: 'Thôi!'
  }).then((result) => {
    if (result.value) {
          const dataPost = {
            status: "2"
          };
          const url_post = 'http://localhost:3000/khachhang/' + id;
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
              document.getElementById("hanhdong").innerHTML = `<button class="btn bg-danger text-white btn-lg py-3 btn-block">Đã Hủy Đơn</button>`;
            })
          Swal.fire({
            position: 'bottom-end',
            icon: 'success',
            title: 'Hủy Đơn Thành Công',
            showConfirmButton: false,
            timer: 1500
          })
    }
  })
}
for (i = 0; i < len; i += 1) {
  if (i % 2 !== 0) {
    //laasy so luong va id san pham
    donhang[i - 1] = donhang[i - 1].trim();
    timsp = donhang[i - 1].indexOf("=");
    idsanpham = donhang[i - 1].substr(timsp + 1, donhang[i - 1].length);
    iddathang = donhang[i - 1].substr(2, timsp - 2);
    donhang[i] = donhang[i].trim();
    timsoluong = donhang[i].indexOf("=");
    soluong = donhang[i].substr(timsoluong + 1, donhang[i].length);
    //lay du lieu fetch
    var urldathang = "http://localhost:3000/donhang?code=" + iddathang;
    axios.get(urldathang)
      .then(res => {
        if (res.statusText === "OK") {
          datadonhang = res.data;
          datadonhang.forEach(element => {
            var urlproducts = "http://localhost:3000/products/" + element.idsp;
            cart = ``;
            fetch(urlproducts, { method: "GET" })
              .then(rest => rest.json())
              .then(rest => {
                cart += `<tr id="row-${element.id}">
                          <td class="product-thumbnail">
                            <img src="${rest.image}" alt="Image" class="img-fluid">
                          </td>
                          <td class="product-name">
                          <a href="shop-single.html?id=${rest.id}">
                            <h2 class="h5 text-black">${rest.name_Product}</h2>
                            </a>
                          </td>
                          <td>${rest.price} VNĐ</td>
                          <td>
                            <div class="input-group mb-3" style="max-width: 120px;">
                              <input id="${element.id}"  min="1" max="100" type="number" class="form-control text-center" value="${element.soluong}" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1">
                            </div>
                          </td>
                          <td>${element.soluong * rest.price} VNĐ</td>
                          <td><a href="#" onclick=deleteCart(${element.id}) class="btn btn-primary btn-sm">X</a></td>
                      </tr>`;
                document.getElementById("cart").innerHTML = cart;
                tongtien += element.soluong * rest.price;
                document.getElementById("tongtien").innerHTML = tongtien + " VNĐ";
              })
          });
        }
      })
  }
}
function deleteCart(removeId) {
  var url = "http://localhost:3000/donhang/" + removeId;
  fetch(url, { method: "GET" })
    .then(res => res.json())
    .then(res => {
      console.log(res.code)
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
          var urlDelete = "http://localhost:3000/donhang/" + removeId;
          fetch(urlDelete, { method: "delete" })
            .then(() => {
              //xoa san pham khoi ro hang
              var removeElement = document.querySelector('#row-' + removeId);
              removeElement.remove();
              document.cookie = "soluong" + res.code + "=" + "; expires=Thu, 01 Jan 1970 00:00:00 UTC";
              document.cookie = "id" + res.code + "=" + "; expires=Thu, 01 Jan 1970 00:00:00 UTC";

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
    })
}

function updatecart() {
  for (i = 0; i < len; i += 1) {
    if (i % 2 !== 0) {
      //laasy so luong va id san pham
      donhang[i - 1] = donhang[i - 1].trim();//bor khoang trong trim()
      timsp = donhang[i - 1].indexOf("=");//tim vi tri dau =
      idsanpham = donhang[i - 1].substr(timsp + 1, donhang[i - 1].length);//lay id cua san pham bat dau tu vi tri dau = den ket thuc
      iddathang = donhang[i - 1].substr(2, timsp - 2);//id dat hang sau dau bang
      donhang[i] = donhang[i].trim();
      timsoluong = donhang[i].indexOf("=");
      soluong = donhang[i].substr(timsoluong + 1, donhang[i].length);
      //lay du lieu fetch
      var urldathang = "http://localhost:3000/donhang?code=" + iddathang;
      fetch(urldathang, { method: "GET" })
        .then(res => res.json())
        .then(res => {
          res.forEach(element => {
            console.log(element.id)
            const update = document.getElementById(element.id).value;
            console.log(update);
            dataPost = {
              soluong: update
            }
            var url = "http://localhost:3000/donhang/" + element.id
            fetch(url, {
              method: 'PATCH',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(dataPost),
            })
              .then(response => response.json())
              .then(() => {
                location.replace("cart.html")
              })
              .catch((error) => {
                console.error('Error:', error); // ghi log nếu xảy ra lỗi
              })
          });
        })
    }

  }

}