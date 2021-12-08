//----------------------------------------
//index
//----------------------------------------
//récupération du noeud item pour implémentation des produits sur la page d'accueil
const item = document.getElementById("items");
// console.log(item);

//stockage des données products de l'api
let productData = [];
//--------------------------------------------
//product.js
//--------------------------------------------
// id of URL
var id;
//noeud pour insertion balise img
const itemImg = document.querySelector("div.item__img");
//noeud nom du produit
const titleh1 = document.getElementById("title");
//noeud prix
const price = document.getElementById("price");
//noeud description
const description = document.getElementById("description");
// noeud select color
const selectColors = document.getElementById("colors");
//input quantity
const quantity = document.getElementById("quantity");
//creation de la balise img
const image = document.createElement("img");
//ajout enfant à itemImg
// itemImg.appendChild(image);
//balise title du head
const headTitle = document.querySelector("title");
//li panier
const liCart = document.querySelector(" nav > ul > a:nth-child(2) > li");
//array who contain each quantity of each product choiced
let quantityParsed = [];
//create a span in li  of panier to display total number of products
const totalProduct = document.createElement("span");
totalProduct.style.color = "#3498DB";
totalProduct.style.marginLeft = "2px";
//add child to li of panier
liCart.appendChild(totalProduct);
//number total of products
let sumQuantity;
//get product in local storage
let productStorage = JSON.parse(localStorage.getItem("product"));
//------------------------------------------------------------------
//cart.js
//------------------------------------------------------------------
