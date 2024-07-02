// alert("hiii");
//global
const galleryImages=[
    { "src":"./assets/gallery/image1.jpg", "alt":"Thumbnail Image 1"},
    {"src":"./assets/gallery/image2.jpg", "alt":"Thumbnail Image 2"},
    {"src":"./assets/gallery/image3.jpg", "alt":"Thumbnail Image 3"}
];

const weatherAPIKey="dd0644abd8cfe2c57028198d86ba752d";
const weatherAPIUrl=`https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}`

const products=[
    {
      title: "AstroFiction",
      author: "John Doe",
      price: 49.9,
      image: "./assets/products/img6.png"
    },
    {
      title: "Space Odissey",
      author: "Marie Anne",
      price: 35,
      image: "./assets/products/img1.png"
    },
    {
      title: "Doomed City",
      author: "Jason Cobert",
      price: 0,
      image: "./assets/products/img2.png"
    },
    {
      title: "Black Dog",
      author: "John Doe",
      price: 85.35,
      image: "./assets/products/img3.png"
    },
    {
      title: "My Little Robot",
      author: "Pedro Paulo",
      price: 0,
      image: "./assets/products/img5.png"
    },
    {
      title: "Garden Girl",
      author: "Ankit Patel",
      price: 45,
      image: "./assets/products/img4.png"
    }
  ];

//menu section
function menuHandler(){
    document.querySelector("#open-nav-menu").addEventListener("click",function(){
        document.querySelector("header nav .wrapper").classList.add("nav-open");
    });
    
    document.querySelector("#close-nav-menu").addEventListener("click",function(){
        document.querySelector("header nav .wrapper").classList.remove("nav-open");
    });
}

//generic function
function celsiusToFahr(temperature){
    let farh=(temperature*9/5)+32;
    //console.log(farh);
    return farh;
 }
    
//greeting section
function greetingHandler(){

//const greetingText="Good Morning All";
const weatherCondition="cloudy";
const userLocation="New York";


let greetingText;
let currentHour=new Date().getHours();

if(currentHour<12){
    greetingText="Good morning";
}else if(currentHour<19){
    greetingText="Good Afternoon";
}else if(currentHour<24){
    greetingText="Good Night";
}else{
    greetingText="Welcome";
}

let temperature=22.65261;
let celsiusText=`the weather is ${weatherCondition} in ${userLocation} and it's ${temperature} C`;
let fahrText=`the weather is ${weatherCondition} in ${userLocation} and it's ${celsiusToFahr(temperature).toFixed(1)}F  `;
document.querySelector("#greeting").innerHTML=greetingText;
document.querySelector("p#weather").innerHTML=celsiusText;




//console.log(currentHour);

//celsiusToFahr(temperature);

document.querySelector(".weather-group").addEventListener("click",function(e){
if(e.target.id=='celsius'){
    document.querySelector("p#weather").innerHTML=celsiusText;

}else{
    document.querySelector("p#weather").innerHTML=fahrText;
}
});

}

function clockHandler(){
    //local time section
    setInterval(function(){
    
        let localTime=new Date();
        document.querySelector("span[data-time=hours]").textContent=localTime.getHours().toString().padStart(2,0);
        document.querySelector("span[data-time=minutes]").textContent=localTime.getMinutes().toString().padStart(2,0);
        document.querySelector("span[data-time=seconds]").textContent=localTime.getSeconds().toString().padStart(2,0);
    },1000);
}

function galleryHandler(){

//gallery section,


let mainImage= document.querySelector("#gallery > img");
let thumbnails=document.querySelector("#gallery .thumbnails");
mainImage.src=galleryImages[0].src;
mainImage.alt=galleryImages[0].alt;


galleryImages.forEach(function(image,index){
let thumb=document.createElement("img");
thumb.src=image.src;
thumb.alt=image.alt;
thumb.dataset.arrayIndex=index;
thumb.dataset.selected=index===0?true:false;

// if(index===0){
//     thumb.dataset.selected=true;
// }else{
//     thumb.dataset.selected=false;
// }

thumb.addEventListener("click",function(e){
  //  console.log(e.target);
  let selectedIndex=e.target.dataset.arrayIndex;
  let selectedImage=galleryImages[selectedIndex];
  mainImage.src=selectedImage.src;
  mainImage.alt=selectedImage.alt;

  thumbnails.querySelectorAll("img").forEach(function(img){
    img.dataset.selected=false;
  });
  e.target.dataset.selected=true;

});

thumbnails.appendChild(thumb);
});

}

//product section
function productsHandler(){

 
    populateProducts(products);


    let freeProducts=products.filter(item=> !item.price || item.price<=0 )
        
        let paidProducts=products.filter(function(item){
            return item.price>0;
            })

document.querySelector(".products-filter label[for=all] span.product-amount").textContent=products.lebgth;
document.querySelector(".products-filter label[for=paid] span.product-amount").textContent=paidProducts.lebgth;
document.querySelector(".products-filter label[for=free] span.product-amount").textContent=freeProducts.lebgth;



    let productsFilter=document.querySelector(".products-filter");
    productsFilter.addEventListener("click",function(e){
        if(e.target.id==="all"){
            populateProducts(products);
        }else if (e.target.id==="free"){
            populateProducts(freeProducts);
        }else if(e.target.id==="paid"){
            populateProducts(paidProducts);
        }
    })

}

function populateProducts(productList){
    let productSection=document.querySelector(".products-area");

    productSection.textContent="";
    productList.forEach(function(product,index){
        //console.log(product);
        let productEle=document.createElement("div");
        productEle.classList.add("product-item");
        let productImage=document.createElement("img");
        productImage.src=product.image;
        productImage.alt="image for: "+product.title;
       
       

        let productDetails=document.createElement("div");
        productDetails.classList.add("product-deatils");

        let productTitle=document.createElement("h3");
        productTitle.classList.add("product-title");
        productTitle.textContent=product.title;
        productDetails.append(productTitle);



        let productAuthor=document.createElement("p");
        productAuthor.classList.add("product-author");
        productAuthor.textContent=product.author;;
        productDetails.append(productAuthor);


        let price=document.createElement("p");
        price.classList.add("price");
        price.textContent= product.price>0?  "$"+product.price:"free";
        productDetails.append(price);


        productEle.append(productImage);
        productEle.append(productTitle);
        productEle.append(productAuthor);
        productEle.append(price);
       
        productSection.append(productEle);

        let freeProducts=products.filter(function(item){
            return !item.price || item.price<=0?true:false;
            })
            
            let paidProducts=products.filter(function(item){
                return item.price>0?true:false;
                })
            
        //array filter
//let totalProducts=products.length;
document.querySelector(".products-filter label[for=all] span.product-amount").textContent=products.length;
document.querySelector(".products-filter label[for=paid] span.product-amount").textContent=paidProducts.length;
document.querySelector(".products-filter label[for=free] span.product-amount").textContent=freeProducts.length;


    }
    )

}


function footerHandler(){
let currentYear=new Date().getFullYear();
document.querySelector("footer").textContent=`${currentYear}-All rights reserved`;
}

navigator.geolocation.getCurrentPosition(position=>{

// let latitude=position.coords.latitude;
// let longitude=position.coords.longitude;
// let url=weatherAPIUrl.replace("{lat}",latitude)
//                      .replace("{lon}",longitude)
 
//                     .replace("{API key}",weatherAPIKey)
//                     try {
//                         fetch(url).then(response=>response.json())
//                         .then(data=>console.log(data));
                        
//                     } catch (error) {
//                         console.log(error);
//                     }


                });

//page load
menuHandler();
greetingHandler();
clockHandler();
galleryHandler();
productsHandler();
 footerHandler();
