function getdata(){
    const urlParams = new URLSearchParams(window.location.search);
    id = urlParams.get('id');
    const url_post = 'http://localhost:3000/blogs/' + id;

    fetch(url_post,{method:"GET"})
    .then(res=>res.json())
    .then(res=>{
        document.querySelector("#content").innerHTML=res.content
        document.querySelector("#cover").src=res.image
        document.querySelector("#date").innerHTML=res.date
        tieudebaiviet
        document.querySelector("#tieudebaiviet").innerHTML=res.tieude
        document.querySelector("#duongdan").innerHTML=res.tieude
    })

   
}
function binhluan(){
    var name=document.querySelector("#name").value;
    var noidung=document.querySelector("#noidung").value;


    if(!name||!noidung){
        alert("Vui Long dien day du thong tin");
        if(!name){
            document.querySelector("#name").focus()
            return false;
        }
    }

         var d = new Date();
        dates = d.getDate() + "/" + d.getDay() + "/" + d.getFullYear();
        const dataPost = {
            name: name,
            noidung: noidung,
            date: dates,
            status: "on"
        };
        const url_post = 'http://localhost:3000/blogs/'+id+"/cmt/";
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
               alert("Em bỏ cuộc rồi :< ")

            })



    return false;
}