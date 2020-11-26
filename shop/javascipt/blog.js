var ss = document.cookie;
if(ss.length>2){
donhang=[];
donhang=ss.split(";");
var len=donhang.length;
document.querySelector("#count").innerHTML=(len/2)
}else{
    document.querySelector("#count").innerHTML=0
}

urlblogs = "http://localhost:3000/blogs"
blogs=``;
axios.get(urlblogs)
    .then(function (response) {
        if (response.statusText === "OK") {
            data = response.data;
                data.forEach(element => {
                    if (element.status == "on") {
                        blogs+=`  <div class="col-sm-6 col-lg-4 mb-4" data-aos="fade-up">
                                    <div class="card" style="width: 22rem;height:450px">
                                        <img src="${element.image}" class="card-img-top" alt="...">
                                        <div class="card-body">
                                            <a href="chitietbaiviet.html?id=${element.id}">
                                            <h5 class="card-title" style="font-weight:bold;color:#000" >${element.tieude}</h5>
                                            </a>
                                            <p class="card-text">${element.content.substr(0,130)}...<br> <a style="color:#f15e2c" href="chitietbaiviet.html?id=${element.id}">Đọc thêm</a></p>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                                `;
                        document.querySelector("#blogs").innerHTML = blogs;

                    }
                });


        }
    })