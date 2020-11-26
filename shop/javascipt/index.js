function getdata() {
    var ss = document.cookie;
    if (ss.length > 2) {
        donhang = [];
        donhang = ss.split(";");
        var len = donhang.length;
        document.querySelector("#count").innerHTML = (len / 2)
    } else {
        document.querySelector("#count").innerHTML = 0
    }
    var urlslide = "http://localhost:3000/slides?_sort=id&_order=desc&_limit=3";
    var method = { method: "GET" };
    slide = 0;
    menu=``;
    fetch(urlslide, method)
        .then(data => data.json())
        .then(data => {
            data.forEach(element => {
                if (element.status == "on") {
                    if (slide < 4) {
                        slide += 1;
                        document.querySelector("#slide" + slide).src = element.image;
                        document.querySelector("#url" + slide).href = element.url;
                    }
                }
            })
        })
    var urrlCategory = "http://localhost:3000/categorys";
    axios.get(urrlCategory)
        .then(res => {
            if (res.statusText === "OK") {
                categorys = ``;
                var data = res.data;
                data.forEach(element => {
                    if (element.status == "on") {
                        categorys += `
                        <div class="col-sm-6 col-md-6 col-lg-4 mb-4 mb-lg-0" data-aos="fade" data-aos-delay="">
                        <a class="block-2-item" href="shop.html?id=${element.id}">
                        <figure class="image" >
                            <img src="${element.image}" alt="" class="img-fluid">
                        </figure>
                        <div class="text">
                            <span class="text-uppercase">Collections</span>
                            <h3>${element.name_category}</h3>
                        </div>
                        </a>
                    </div>`
                    }
                    document.querySelector("#category").innerHTML = categorys;
                }
                );
            }
        })
    var urlProduct = "http://localhost:3000/products?_limit=9&_sort=id&_order=desc";
    sale="";
    hienthi="";
    axios.get(urlProduct)
        .then(res => {
            if (res.statusText === "OK") {
                products = ``;
                var data = res.data;
                data.forEach(element => {
                  if(element.old_price>element.price){
                    tinhsale= Math.floor(((element.old_price-element.price)/(element.old_price))*100);
                    sale= tinhsale+"%"
                    hienthi=""
                  }else{
                    sale=""
                    hienthi="hidden"
                  }
                  console.log(hienthi+sale)
                    element.price = element.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
                    if (element.status == "on") {
                        if(element.soluong >0){
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
                        }else {
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
                        console.log(hienthi)
                    }
                });
                document.querySelector("#products").innerHTML = products;
            }
        }
        )
        var urlProduct = "http://localhost:3000/products?_sort=id&_order=desc&_limit=3";
    axios.get(urlProduct)
        .then(res => {
            if (res.statusText === "OK") {
                products = ``;
                sale="";
                hienthi="";
                var data = res.data;
                data.forEach(element => {
                  if(element.old_price>element.price){
                    tinhsale= Math.floor(((element.old_price-element.price)/(element.old_price))*100);
                    sale= tinhsale+"%"
                    hienthi=""
                  }else{
                    sale=""
                    hienthi="hidden"
                  }
                    element.price = element.price.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
                    if (element.status == "on") {
                        if(element.soluong >0){
                            products += `
                        <div class="col-sm-6 col-lg-4 mb-4" data-aos="fade-up">
                        <div class="block-4 text-center border">
                          <figure class="block-4-image" style="position: relative;">
                            <a href="shop-single.html?id=${element.id}"><img src="${element.image}" style="width:328px;height:328px" alt="Image placeholder" class="img-fluid"></a>
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
                        }else {
                            products += `
                            <div class="col-sm-6 col-lg-4 mb-4" data-aos="fade-up">
                            <div class="block-4 text-center border">
                              <figure class="block-4-image" style="position: relative;">
                                <a href="shop-single.html?id=${element.id}"><img src="${element.image}" style="width:328px;height:328px" alt="Image placeholder" class="img-fluid"></a>
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
                document.querySelector("#productsnew").innerHTML = products;
            }
        }
        )
}
