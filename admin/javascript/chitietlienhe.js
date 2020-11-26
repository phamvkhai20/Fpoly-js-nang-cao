const urlParams = new URLSearchParams(window.location.search);
id = urlParams.get('id');
var url = "http://localhost:3000/contact/"+id;
fetch(url,{method:"GET"})
.then(res=>res.json())
.then(res=>{
    document.querySelector("#hovaten").innerHTML=res.hovaten
    document.querySelector("#email").innerHTML=res.email
    document.querySelector("#email1").innerHTML=res.email
    document.querySelector("#phone").innerHTML=res.phone
    document.querySelector("#noidung").innerHTML=res.content




    var url = "http://localhost:3000/contact/"+id;
                data={
                    hovaten:res.hovaten,
                    email:res.email,
                    phone:res.phone,
                    date:res.date,
                    content:res.content,
                    trangthai:"daxem"
                }
                axios.put(url, data)
                .then(data => {
                    if(data.statusText === "OK"){
                        }
                })
})