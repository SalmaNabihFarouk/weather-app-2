
var inputt=document.querySelector(".in");

// var inu=document.querySelector(".i");
// inu.addEventListener("click",function (){
//   inu.style.border="red";
// }
  
// );
var arrsearch=[];
var arrcurrent=[];
var arrpredict=[];
var arrdate=[];
var arrlocation=[];
var item;
inputt.addEventListener("input",function(){
 
  search(inputt.value);
   current(inputt.value);
   predict(inputt.value);

});


// current(x);

function datacovert1(date){
 var x=date ;
 const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

  var d = new Date(x);
  let day=days[d.getDay()];
 document.getElementById("date1").innerHTML=day;
 document.getElementById("date1num").innerHTML=date;

}



function datacovert2(date){
  var x=date ;
  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
 
   var d = new Date(x);
   let day=days[d.getDay()];
  // document.getElementById("date2").innerHTML=day;
  document.getElementById("date2").innerHTML=day;
  document.getElementById("date2num").innerHTML=date;
 }
 
function datacovert3(date){
  var x=date ;
  const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
 
   var d = new Date(x);//*
   let day=days[d.getDay()];
  document.getElementById("date3").innerHTML=day;
  document.getElementById("date3num").innerHTML=date;
 
 }


function search(a){
  console.log(a);

  var myhttp= new XMLHttpRequest();
  myhttp.open('GET',`https://api.weatherapi.com/v1/search.json?key=bfa0ba70d726472cb9d31911232712&q=${a}`);
  myhttp.send();
  myhttp.addEventListener("readystatechange",function(){
    if(myhttp.readyState==4){
      arrsearch=JSON.parse(myhttp.response) ;
      // console.log(arrsearch[0].name);
 //error here

 //callor not 
 if(inputt.value.length>=3){
  console.log(inputt.value.length);
  displaysearch();
 }
 
    }
  });


}


function displaysearch(){
  
  var cartona=``;
// var x=arrsearch.length-1;


    cartona+=`<p class="bg-name">${arrsearch[0].name}</p>`;

  //  cartona+=`<p>${arrsearch}</p>`

  document.getElementById("body").innerHTML=cartona;

}



function current(a){
  


  
  var myhttp= new XMLHttpRequest();
  myhttp.open('GET',`https://api.weatherapi.com/v1/current.json?key=bfa0ba70d726472cb9d31911232712&q=${a}`);
  myhttp.send();
  myhttp.addEventListener("readystatechange",function(){
    if(myhttp.readyState==4){
      // arrcurrent= JSON.parse(myhttp.response).forecast.forecastday;
      var x=JSON.parse(myhttp.response);
       arrcurrent.push(x) ;
  // console.log(x.current.condition.text);
  if(inputt.value.length>=3){
    displaycurrent();
   }

    }
  }) 
}

function predict(cityname){
  var myhttp= new XMLHttpRequest();
  myhttp.open('GET',`https://api.weatherapi.com/v1/forecast.json?key=bfa0ba70d726472cb9d31911232712&q=${cityname}&days=3`);

  myhttp.send();
  myhttp.addEventListener("readystatechange",function(){
    if(myhttp.readyState==4){

      arrpredict= JSON.parse(myhttp.response).forecast.forecastday;
      // arrdate= JSON.parse(myhttp.response).forecast.forecastday[0].hour;
       arrdate= JSON.parse(myhttp.response).forecast.forecastday;
      // console.log(arrdate[0].time );
      datacovert1(arrdate[0].date);
      datacovert2(arrdate[1].date);
      datacovert3(arrdate[2].date);
  // console.log(arrpredict[1].day.maxtemp_c);
  //   console.log(arrpredict[1].day.condition.code );
  // console.log(arrpredict[1].day.maxtemp_c);
  // //  <p>${ arrpredict[1].day.mintemp_c}</p>
  //  <p>${arrpredict[1].condition.text}</p>`;
  if(inputt.value.length>=3){
    displaypredict1();
    displaypredict2();
   }

    }
  }) 


}




// var myhttp= new XMLHttpRequest();
// myhttp.open('GET',`https://api.weatherapi.com/v1/search.json?key=bfa0ba70d726472cb9d31911232712&q=london`);
// myhttp.send();
// myhttp.addEventListener("readystatechange",function(){
//   if(myhttp.readyState==4){
//  console.log(myhttp.response);
//       }
// })
var x=50;
function s(){
x=3;
}
x=60;
x=0;



function displaycurrent(){
  var cartona=``; 
   
   var x=arrcurrent.length-1;



    cartona+=`   
    <span class="display-1 fw-bolder bg-degree">${arrcurrent[x].current.temp_c}<sup>o</sup>C
    </span>
    
    <img src="https://${arrcurrent[x].current.condition.icon}" alt="" class="w-50">
    <p class=" bg-title">${arrcurrent[x].current.condition.text}</p>`;
    


  document.getElementById("icon").innerHTML=cartona;
}
 
 function displaypredict1(){

  var cartona=``;
 

   cartona+= `<div class="d-flex justify-content-center align-items-center ">
   <div class="">
   <img src="https://${arrpredict[1].day.condition.icon}" alt="" class="w-50">
   <p class="bg-degree">${ arrpredict[1].day.maxtemp_c} <sup>o</sup>C</p>
   <p  class="bg-degree">${ arrpredict[1].day.mintemp_c} <sup>o</sup></p>
   <p  class="bg-title">${arrpredict[1].day.condition.text}</p>
   </div>
 
   </div> `;



  document.getElementById("predicttitle1").innerHTML=cartona;




}



  navigator.geolocation.getCurrentPosition(function(position){ 


    var myhttp= new XMLHttpRequest();
    myhttp.open('GET',`https://api.weatherapi.com/v1/forecast.json?key=bfa0ba70d726472cb9d31911232712&q=${position.coords.latitude},${position.coords.longitude}&days=3`);
  
    myhttp.send();
    myhttp.addEventListener("readystatechange",function(){
      if(myhttp.readyState==4){
      item=  JSON.parse(myhttp.response);
      arrlocation=JSON.parse(myhttp.response).forecast.forecastday;
      datacovert1(arrlocation[0].date);
      datacovert2(arrlocation[1].date);
      datacovert3(arrlocation[2].date);
      displaylocation();
     
      console.log(item);
    
      }
    });
    


    
  }
  
  );

  function displaylocation(){
   var cartona=``;
   cartona+=`
   <span class="display-1 fw-bolder">${item.current.temp_c} <sup>o</sup>C
   </span> <img src="https://${item.current.condition.icon}" alt="" class="w-50">
   <p>${item.current.condition.text}</p>`
   
var cartona2=``;
cartona2+=` <p>${item.location.name}</p>`;
var cartona3=``;
cartona3+= ` <img src="https://${arrlocation[1].day.condition.icon}" alt="">
<p>${ arrlocation[1].day.maxtemp_c}<sup>o</sup>C</p>
<p>${ arrlocation[1].day.mintemp_c}<sup>o</sup></p>
<p>${arrlocation[1].day.condition.text}</p>`;



var cartona4=``;
cartona4+= ` <img src="https://${arrlocation[2].day.condition.icon}" alt="">
<p>${ arrlocation[2].day.maxtemp_c}<sup>o</sup>C</p>
<p>${ arrlocation[2].day.mintemp_c}<sup>o</sup></p>
<p>${arrlocation[2].day.condition.text}</p>`




document.getElementById("predicttitle2").innerHTML=cartona4;
document.getElementById("predicttitle1").innerHTML=cartona3;
   document.getElementById("body").innerHTML=cartona2; 
   document.getElementById("icon").innerHTML=cartona; 
  
  }


function displaypredict2(){

  var cartona=``;
 

   cartona+= ` <img src="https://${arrpredict[1].day.condition.icon}" alt="">
   <p class="bg-degree">${ arrpredict[2].day.maxtemp_c}<sup>o</sup>C</p>
   <p class="bg-degree">${ arrpredict[2].day.mintemp_c}<sup>o</sup></p>
   <p class="bg-title">${arrpredict[2].day.condition.text}</p>`;



  document.getElementById("predicttitle2").innerHTML=cartona;




}
