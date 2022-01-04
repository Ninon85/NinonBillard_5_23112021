//------------------------------------------------------------------
//------------------------------------------------------------------
//index
//------------------------------------------------------------------
//------------------------------------------------------------------
//récupération du noeud item pour implémentation des produits sur la page d'accueil
const item = document.getElementById("items");
// console.log(item);
//create a span in li  of panier to display total number of products
const totalProduct = document.createElement("span");
totalProduct.style.color = "#3498DB";
totalProduct.style.marginLeft = "2px";
//get product in local storage
let productStorage = JSON.parse(localStorage.getItem("product"));
//stockage des données products de l'api
let productData = [];
//------------------------------------------------------------------
//------------------------------------------------------------------
//product.js
//------------------------------------------------------------------
//------------------------------------------------------------------
//number total of products
let sumQuantity = JSON.parse(localStorage.getItem("totalProduct"));
//array who contain each quantity of each product choiced
let quantityParsed = [];
//------------------------------------------------------------------
//------------------------------------------------------------------
//cart.js
//------------------------------------------------------------------
//------------------------------------------------------------------
//array for price per product
let dataPrice = [];
//total Price
let totalPrice;
//keep element of Dom where total price is display
const totalPriceEl = document.getElementById("totalPrice");
//keep span for display total qtt between total price
const totalQuantity = document.getElementById("totalQuantity");
//get all inputs of form
const inputs = document.querySelectorAll(
	'input[type="text"],input[type="email"]'
);
// console.log(inputs);
//get form for submit
const form = document.querySelector(".cart__order__form");
//variable for keep value of inputs
let firstName, lastName, address, city, email;
//get element cart__items
const cart__items = document.getElementById("cart__items");
// console.log(cart__items);
//------------------------------------------------------------------
//------------------------------------------------------------------
//product.js
//------------------------------------------------------------------
//------------------------------------------------------------------
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
//ajout enfant à itemImg---------------------------------------------------
// itemImg.appendChild(image);
//balise title du head
const headTitle = document.querySelector("title");
//li panier
const liCart = document.querySelector(" nav > ul > a:nth-child(2) > li");
//add child to li of panier
liCart.appendChild(totalProduct);
//------------------------------------------------------------------
//------------------------------------------------------------------
//confirmation.js
//------------------------------------------------------------------
//------------------------------------------------------------------
//keep element for display id of order
const orderId = document.getElementById("orderId");
