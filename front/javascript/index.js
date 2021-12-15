// //récupération du noeud item pour implémentation des produits sur la page d'accueil
// const item = document.getElementById("items");
// // console.log(item);

// //stockage des données produsts de l'api
// let productData = [];

//Implémentation des produits sur la page index
// call functions

getProducts();
setTimeout(() => {
	integrateElements();
}, 500);
//display number of products in nav
displayTotalProductCart();
