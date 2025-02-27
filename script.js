let fileInput = document.getElementById("filepicker");
let innerImage=document.querySelector(".inner-upload-image");
let image=null;
let url=null;
let inputimage=document.getElementById("input-image");
let icon = document.querySelector(" #icon");
let span = document. querySelector("span");
//let genimage = document.querySelector("#genratedImage");
let originalimg = document.querySelector(".resultImg1  img");
let  generateimg = document.querySelector(".resultImg2  img");
let uploadbtn = document.querySelector("#Upload-btn");
let style2 = document.querySelector(".style2");
let resultpage= document.querySelector(".result");
let loading = document.querySelector("#loading");
let downloadbtn = document.querySelector("#download");
let resetbtn = document.querySelector("#reset");


function handleupload(){
    const apikey="5KPe3yiRwztAoP8AFSHpEVek";
    const formdata = new FormData();
    formdata.append("image_file",image);
    formdata.append("size","auto");

     fetch("https://api.remove.bg/v1.0/removebg",{
        method: "POST",
        headers: { "X-Api-Key": apikey },
        body: formdata,
     })
     .then(function(response){
        return response.blob();//bonary form data
     })
     .then(function(blob){
        loading.style.display="none";
         style2.style.display="none";
        resultpage.style.display="flex";
        url = URL.createObjectURL(blob);
        generateimg.src=url;
     })
     .catch(alert())


}


innerImage.addEventListener("click", ()=>{
fileInput.click();
})
fileInput.addEventListener("change",()=>{
   image=fileInput.files[0];
   if(!fileInput)return;
   let reader = new FileReader();
  reader.onload=(e)=>{
    console.log(e);
     inputimage.src=`data:${fileInput.type};base64,${e.target.result.split(",")[1]}`
     inputimage.style.display="block";
     icon.style.display="none";
     span.style.display="none";
     originalimg.src=  inputimage.src=`data:${fileInput.type};base64,${e.target.result.split(",")[1]}`

  }
  reader.readAsDataURL(image);
 

} )


uploadbtn.addEventListener("click",()=>{
    handleupload();
    loading.style.display="block";
})

function download(){
fetch(url)
.then(res=>res.blob())
.then(file =>{
    let a= document.createElement("a");
    a.href=URL.createObjectURL(file);
    a.download=new Date().getTime();
    a.click();
})
.catch(alert())
}
downloadbtn.addEventListener("click",()=>{
    download();
})
resetbtn.addEventListener("click",()=>{
    window.location.reload();
})