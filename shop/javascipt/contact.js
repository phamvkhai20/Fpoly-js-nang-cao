function addcontact() {

    var hovaten = document.getElementById("hovaten").value;

    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;

    var content = document.getElementById("content").value;
    if (hovaten == "" || email == "" || phone == "" || content == "") {
        alert("Vui lòng điền đầy đủ thông tin");
       
        if (hovaten == "") {
            document.getElementById("hovaten").focus()
            return false
        }
        if (email == "") {
            document.getElementById("email").focus()
            return false
        }
        if (phone == "") {
            document.getElementById("phone").focus()
            return false
        }
        if (content == "") {
            document.getElementById("content").focus()
            return false
        }
    }
    var gg=/^(03|09)[0-9]{8,9}$/;
    if(gg.test(phone)==false){
        alert("vui lòng nhập đúng định dạng số điện thoại");
        document.getElementById("phone").focus()
        msg=1;
        return false
    }
    var d = new Date();
    dates =d.getDate()+"/"+(d.getMonth()+1)+ "/"+d.getFullYear()+"  " +d.getHours()+":"+d.getMinutes();;

    requestObj={
        hovaten:hovaten,
        email:email,
        phone:phone,
        content:content,
        date:dates,
        trangthai:"moi"
    }

    urlContact="http://localhost:3000/contact";
    axios.post(urlContact, requestObj)
    .then(data => {
        if(data.statusText === "Created"){
            window.location.href = 'thankyou.html';
        }
    })

    return false




}