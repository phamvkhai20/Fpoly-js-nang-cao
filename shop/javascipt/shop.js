function getdata() {
  // xác định phương pháp tiện ích để làm việc với chuỗi truy vấn của một URL.
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get('id');
  const key = urlParams.get('key');
  const page = urlParams.get('page');
  var ss = document.cookie;
  if (ss.length > 2) {
    donhang = [];
    donhang = ss.split(";");
    var len = donhang.length;
    document.querySelector("#count").innerHTML = (len / 2)
  } else {
    document.querySelector("#count").innerHTML = 0
  }
  //phan trang
  if (!id || !key || !page) {
    var url = "http://localhost:3000/products";
    axios.get(url)
      .then(res => {
        if (res.statusText === "OK") {
          var data = res.data;
          inphantrang = ``;
          tongsanpham = data.length;
          var phantrang = 0;
          if (tongsanpham % 9 == 0) {
            phantrang = tongsanpham / 9
          } else {
            phantrang = Math.floor(tongsanpham / 9) + 1;
          }
          for (i = 1; i <= phantrang; i++) {
            var active = "";
            if (i == page) {
              active = "active"
            } if (i == 1 && !page) {
              active = "active";
            }
            inphantrang += `<a href="shop.html?page=${i}"> <li id="${i}" class="${active}"><span>${i}</span></li></a>`
          }
          document.querySelector("#phantrangs").innerHTML = inphantrang;
          pages = new Number(page)
          if (pages > 1) {
            document.querySelector("#lui").innerHTML = `<li><a href="shop.html?page=${pages - 1}" >&lt;</a></li>`
          }
          if (pages < phantrang & !id & !key) {
            document.querySelector("#tien").innerHTML = `<li><a href="shop.html?page=${pages + 1}" >&gt;</a></li>`
          }
        }
      })

    var urlProduct = "http://localhost:3000/products?_limit=9&_page=1&_sort=id&_order=desc";
    axios.get(urlProduct)
      .then(res => {
        if (res.statusText === "OK") {
          products = ``;
          var data = res.data;
          data.forEach(element => {
            if (element.old_price > element.price) {
              tinhsale = Math.floor(((element.old_price - element.price) / (element.old_price)) * 100);
              sale = tinhsale + "%"
              hienthi = ""
            } else {
              sale = ""
              hienthi = "hidden"
            }
            if (element.status == "on") {
              element.price = element.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");

              if (element.soluong > 0) {
                products += `

                        <div class="col-sm-6 col-lg-4 mb-4" data-aos="fade-up">
                        <div class="block-4 text-center border">
                          <figure class="block-4-image" style="position: relative;">
                            <a href="shop-single.html?id=${element.id}"><img src="${element.image}" alt="Image placeholder" class="img-fluid"></a>
                            <div id="id${element.id}" ${hienthi}  style=" position: absolute;top:20px;height:35px;line-height:35px;right:5px;width:80px;font-weight: bold;color: red;" ><span class="badge badge-success" style="height:40px;line-height:35px;width:80px;font-size:14px">- ${sale}</span></div>
                            </figure>
                          <div class="block-4-text p">
                            <h3 style="height:50px;"><a href="shop-single.html?id=${element.id}">${element.name_Product}</a></h3>
                            <p class="mb-0" id="sale" style="height:55px;line-height:20px;padding:0 10px 0 10px">${(element.mota).substr(0, 75)} ... </p>
                            <p class=" font-weight-bold" style="color:#000;font-size:20px">${ element.price} VNĐ</p>
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
                                <div id="id${element.id}" ${hienthi}  style=" position: absolute;top:20px;height:35px;line-height:35px;right:5px;width:80px;font-weight: bold;color: red;" ><span class="badge badge-success" style="height:40px;line-height:35px;width:80px;font-size:14px">- ${sale}</span></div>
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
          document.querySelector("#products").innerHTML = products;
        }
      })
  }
  if (page) {
    var urlProduct = "http://localhost:3000/products?_limit=9&_page=" + page + "&_sort=id&_order=desc";
    axios.get(urlProduct)
      .then(res => {
        if (res.statusText === "OK") {
          products = ``;
          var data = res.data;
          data.forEach(element => {
            if (element.status == "on") {
              if (element.old_price > element.price) {
                tinhsale = Math.floor(((element.old_price - element.price) / (element.old_price)) * 100);
                sale = tinhsale + "%"
                hienthi = "";
              } else {
                sale = "";
                hienthi = "hidden";
              }
              element.price = element.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
              if (element.soluong > 0) {
                products += `
                          <div class="col-sm-6 col-lg-4 mb-4" data-aos="fade-up">
                          <div class="block-4 text-center border">
                            <figure class="block-4-image" style="position: relative;">
                              <a href="shop-single.html?id=${element.id}"><img src="${element.image}" alt="Image placeholder" class="img-fluid"></a>
                              <div id="id${element.id}" ${hienthi}  style=" position: absolute;top:20px;height:35px;line-height:35px;right:5px;width:80px;font-weight: bold;color: red;" ><span class="badge badge-success" style="height:40px;line-height:35px;width:80px;font-size:14px">- ${sale}</span></div>
                            </figure>
                            <div class="block-4-text p">
                              <h3 style="height:50px;"><a href="shop-single.html?id=${element.id}">${element.name_Product}</a></h3>
                              <p class="mb-0" id="sale" style="height:55px;line-height:20px;padding:0 10px 0 10px">${(element.mota).substr(0, 75)} ... </p>
                              <p class=" font-weight-bold" style="color:#000;font-size:20px">${ element.price} VNĐ</p>
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
                                  <div id="id${element.id}" ${hienthi}  style=" position: absolute;top:20px;height:35px;line-height:35px;right:5px;width:80px;font-weight: bold;color: red;" ><span class="badge badge-success" style="height:40px;line-height:35px;width:80px;font-size:14px">- ${sale}</span></div>

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
          document.querySelector("#products").innerHTML = products;
        }
      })
  }
  if (id) {
    var urlProduct = "http://localhost:3000/products?id_category=" + id + "&_sort=id&_order=desc";
    axios.get(urlProduct)
      .then(res => {
        if (res.statusText === "OK") {
          products = ``;
          var data = res.data;
          data.forEach(element => {
            if (element.old_price > element.price) {
              tinhsale = Math.floor(((element.old_price - element.price) / (element.old_price)) * 100);
              sale = tinhsale + "%"
              hienthi = ""
            } else {
              sale = ""
              hienthi = "hidden"
            }
            element.price = element.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
            if (element.status == "on") {
              if (element.soluong > 0) {
                products += `
                    <div class="col-sm-6 col-lg-4 mb-4" data-aos="fade-up">
                    <div class="block-4 text-center border">
                      <figure class="block-4-image" style="position: relative;">
                        <a href="shop-single.html?id=${element.id}"><img src="${element.image}" alt="Image placeholder" class="img-fluid"></a>
                        <div id="id${element.id}" ${hienthi}  style=" position: absolute;top:20px;height:35px;line-height:35px;right:5px;width:80px;font-weight: bold;color: red;" ><span class="badge badge-success" style="height:40px;line-height:35px;width:80px;font-size:14px">- ${sale}</span></div>
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
                            <div id="id${element.id}" ${hienthi}  style=" position: absolute;top:20px;height:35px;line-height:35px;right:5px;width:80px;font-weight: bold;color: red;" ><span class="badge badge-success" style="height:40px;line-height:35px;width:80px;font-size:14px">- ${sale}</span></div>

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
          document.querySelector("#products").innerHTML = products;
          document.querySelector("#phantrangs").innerHTML = "";
        }
      })
  }
  if (key) {
    var urlProduct = "http://localhost:3000/products?q=" + key;
    document.querySelector("[name=key]").value = key;
    count = 0;
    axios.get(urlProduct)
      .then(res => {
        if (res.statusText === "OK") {
          products = ``;
          var data = res.data;
          data.forEach(element => {
            count += 1
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
          if (count == 0) {
            alert("không tìm thấy sản phầm nào");
            window.location.href
          } else {
            document.querySelector("#phantrangs").innerHTML = "";
            document.querySelector("#products").innerHTML = products;
          }
        }
      })
  }
}
function sapxep(caisapxep, tanggiam) {
  var urlProduct = "http://localhost:3000/products?_sort=" + caisapxep + "&_order=" + tanggiam;
  axios.get(urlProduct)
    .then(res => {
      if (res.statusText === "OK") {
        products = ``;
        var data = res.data;
        data.forEach(element => {
          if (element.old_price > element.price) {
            tinhsale = Math.floor(((element.old_price - element.price) / (element.old_price)) * 100);
            sale = tinhsale + "%"
            hienthi = ""
          } else {
            sale = ""
            hienthi = "hidden"
          }
          element.price = element.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");

          if (element.status == "on") {

            if (element.soluong > 0) {
              products += `

                  <div class="col-sm-6 col-lg-4 mb-4" data-aos="fade-up">
                  <div class="block-4 text-center border">
                    <figure class="block-4-image" style="position: relative;">
                      <a href="shop-single.html?id=${element.id}"><img src="${element.image}" alt="Image placeholder" class="img-fluid"></a>
                      <div id="id${element.id}" ${hienthi}  style=" position: absolute;top:20px;height:35px;line-height:35px;right:5px;width:80px;font-weight: bold;color: red;" ><span class="badge badge-success" style="height:40px;line-height:35px;width:80px;font-size:14px">- ${sale}</span></div>
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
                          <div id="id${element.id}" ${hienthi}  style=" position: absolute;top:20px;height:35px;line-height:35px;right:5px;width:80px;font-weight: bold;color: red;" ><span class="badge badge-success" style="height:40px;line-height:35px;width:80px;font-size:14px">- ${sale}</span></div>
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
        document.querySelector("#products").innerHTML = products;
      }
    })
}