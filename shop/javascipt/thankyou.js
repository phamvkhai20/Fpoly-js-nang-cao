const urlParams = new URLSearchParams(window.location.search);
code = urlParams.get('code');
var ss = document.cookie;
    if (ss.length > 2) {
        donhang = [];
        donhang = ss.split(";");
        var len = donhang.length;
        document.querySelector("#count").innerHTML = (len / 2)
    } else {
        document.querySelector("#count").innerHTML = 0

    }
if(code){
    alert("MÃ THEO DÕI ĐƠN HÀNG CỦA BẠN LÀ : "+code);
    document.querySelector("#thankyou").innerHTML="Cám ơn bạn đã mua hàng!! <br><h4> Mã đặt hàng: <span style='background: rgba(255, 229, 31, 0.632);'> "+code+"</span></h4>"

}

