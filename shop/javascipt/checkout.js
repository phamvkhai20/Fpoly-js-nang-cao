function loaddata() {
    const urlParams = new URLSearchParams(window.location.search);
    id = urlParams.get('id');


    
    tongdon=[];
    soluongs=[];
    idsp=[];
    code=[];
    var ss = document.cookie;
    if (ss.length > 2) {
        donhang = [];
        donhang = ss.split(";");
        var len = donhang.length;
        document.querySelector("#count").innerHTML = (len / 2)
    } else {
        alert("Bạn Chưa có đơn hàng nào!!! Hãy mua hàng");
        window.location.href = 'shop.html';
        document.querySelector("#count").innerHTML = 0
    }
    tongtien = 0;
    iddathangtemp=[];
   
    yourcart=``;
    for (i = 0; i < len; i += 1) {
        if (i % 2 !== 0) {
            //laasy so luong va id san pham
            donhang[i - 1] = donhang[i - 1].trim();
            timsp = donhang[i - 1].indexOf("=");
            idsanpham = donhang[i - 1].substr(timsp + 1, donhang[i - 1].length);
            //lay code dat hang
            iddathang= donhang[i - 1].substr(2, timsp - 2);
            iddathangtemp+=iddathang+" ";
            //bo khoang trong sau khi tach chuoi  thanh mang
            donhang[i] = donhang[i].trim();

            timsoluong = donhang[i].indexOf("=");
            soluong = donhang[i].substr(timsoluong + 1, donhang[i].length);
            //lay du lieu fetch
            var urldathang = "http://localhost:3000/donhang?code=" + iddathang;
            fetch(urldathang, { method: "GET" })
                .then(res => res.json())
                .then(res => {

                    res.forEach(element => {

                        var urlsp = "http://localhost:3000/products/"+element.idsp;

                        fetch(urlsp, { method: "GET" })
                            .then(rest => rest.json())
                            .then(rest => {
                                
                                    yourcart+= `
                                    <tr>
                                    <a href="shop-single.html?id=${rest.id}">
                                    <td>${rest.name_Product}<strong class="mx-2">x</strong> ${element.soluong}</td>
                                    </a>
                                    <td>${(rest.price*element.soluong).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") } VNĐ</td>

                                    </tr>`;
                                    tongtien+=rest.price*element.soluong;
                                    

                                    document.querySelector("#youcart").innerHTML=yourcart;
                                    document.querySelector("#tongtien").innerHTML=tongtien.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.") + " VNĐ";
                                    document.querySelector("#post").value=tongtien;


                                    
                            });
                            tongdon+=element.id+" ";
                            soluongs+=element.soluong+" ";
                            code+=element.code+" ";
                            idsp+=element.idsp+" ";

                            
                            document.querySelector("#tongdon").value=tongdon;
                            document.querySelector("#soluong").value=soluongs;
                            document.querySelector("#code").value=code;
                            document.querySelector("#idsp").value=idsp;

                            
    
                    })
                   
                })
               
        }

    }
console.log(iddathangtemp)
}
function dathang(){
    
    const hovaten=document.querySelector("#hovaten").value;
    const email=document.querySelector("#email").value;
    const phone=document.querySelector("#phone").value;
    const tongdon=document.querySelector("#tongdon").value;
    const address=document.querySelector("#address").value;
    const note=document.querySelector("#note").value;
    const tongtien=document.querySelector("#post").value;
    tongtiens=new Number(tongtien)
   
    msg=0;
    if(!hovaten||!email||!phone||!address){
        alert("Vui lòng điền đầy đủ thông tin");
        msg=1;
        return false
    }else {
        msg=0;
    }
    var gg=/^(03|09)[0-9]{8,9}$/;

    if(gg.test(phone)==false){
        alert("vui lòng nhập đúng định dạng số điện thoại");
        msg=1;
        return false
    }else {
        msg=0;
    }
    if(msg==0){
        hoanthanh();
        capnhat();
    }

function hoanthanh(){
    var d = new Date();
    dates =d.getDate()+"/"+(d.getMonth()+1)+ "/"+d.getFullYear();
    var code=d.getTime();
    don=tongdon.substr(0,tongdon.length-1)
    mangiddh=iddathangtemp.substr(0,iddathangtemp.length-1).split(" ");
    for(yy=0;yy<mangiddh.length;yy++){
        document.cookie = "soluong" + mangiddh[yy] + "=" + "; expires=Thu, 01 Jan 1970 00:00:00 UTC";
        document.cookie = "id" + mangiddh[yy] + "=" + "; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    }
    postdon={
        hovaten:hovaten,
        email:email,
        phone:phone,
        tongdon:don,
        address:address,
        note:note,
        tongtien:tongtiens,
        datluc:dates,
        code:code,
        status:0
    }
    urlkhachhang="http://localhost:3000/khachhang/"
    axios.post(urlkhachhang, postdon)
    .then(data => {
        if(data.statusText === "Created"){
            console.log(postdon);
            window.location.href = 'thankyou.html?code=KHAI'+code;
        }
    })
}
return false

}
function capnhat(){
    var donhanginfo = {};
    const tongdon=document.querySelector("#tongdon").value;
    const idsp=document.querySelector("#idsp").value;
    const code=document.querySelector("#code").value;
    const soluong=document.querySelector("#soluong").value;

    
    tongdons=tongdon.substr(0,tongdon.length-1).split(" ");
    idsps=idsp.substr(0,idsp.length-1).split(" ");
    codes=code.substr(0,code.length-1).split(" ");
    soluongs=soluong.substr(0,tongdon.length-1).split(" ");
    x=-1;
    tongdons.forEach(element => {
        x+=1;
        urldonhang="http://localhost:3000/donhang/"+element
        donhanginfo={
            idsp:idsps[x],
            code:codes[x],
            soluong:soluongs[x],
            trangthai:"daban"
        }
    console.log(donhanginfo)
     
        axios.put(urldonhang, donhanginfo)
        .then(data => {
            if(data.statusText === "OK"){
                }
        })

      }  );

}

