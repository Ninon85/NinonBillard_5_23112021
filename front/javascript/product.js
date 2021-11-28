// id of URL
var id;
//noeud pour insertion balise img
const itemImg = document.querySelector("div.item__img");
//noeud nom du produit
let titleh1 = document.getElementById("title");
//noeud prix
let price = document.getElementById("price");
//noeud description
let description = document.getElementById("description");
// noeud select color
const selectColors = document.getElementById("colors");
//input quantity
let quantity = document.getElementById("quantity");
//creation de la balise img
let image = document.createElement("img");
//ajout enfant à itemImg
itemImg.appendChild(image);
//balise title du head
let headTitle = document.querySelector("title");
//colors storage
let colorsProduct;

getId();
integrateDataHtml();
