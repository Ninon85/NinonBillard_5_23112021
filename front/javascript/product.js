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
let selectColors = document.getElementById("colors");
//input quantity
let quantity = document.getElementById("quantity");

//creation de la balise img
let image = document.createElement("img");
//ajout enfant à itemImg
itemImg.appendChild(image);
//balise title du head
let headTitle = document.querySelector("title");
//li panier
let liCart = document.querySelector(" nav > ul > a:nth-child(2) > li");
//array who contain each quantity of each product choiced
let quantityParsed = [];
//create a span in li  of panier to display total number of products
const totalProduct = document.createElement("span");
totalProduct.style.color = "#3498DB";
//add child to li of panier
liCart.appendChild(totalProduct);
//number total of products
let sumQuantity;
totalProduct.textContent = `${JSON.parse(
	localStorage.getItem("totalProduct")
)} article(s)`;
getId();
integrateDataHtml();
//function to push object un array and push to the localstorage
const addToLocalStorage = (object) => {
	productStorage.push(object);
	localStorage.setItem("product", JSON.stringify(productStorage));
};
//get product in local storage
let productStorage = JSON.parse(localStorage.getItem("product"));
//listen events of the button to add to the cart
addToCart.addEventListener("click", () => {
	let recapChoice = {
		idProduct: id,
		color: selectColors.value,
		quantityNumber: quantity.value,
	};
	// console.log(recapChoice.quantityNumber);
	// console.log(typeof recapChoice.quantityNumber);
	// console.log(recapChoice.color);
	// console.log(quantity.value);

	if (selectColors.value === "") {
		alert("Veuillez selectionner une couleur");
	} else if (recapChoice.quantityNumber === "0") {
		alert("Veuillez choisir une quantité");
		//if productstorage is not empty
	} else if (recapChoice.quantityNumber > 100) {
		alert("Vous ne pouvez pas commander plus de 100 articles");
	} else if (productStorage) {
		//find index where id and color are the same than in recapChoice
		let findIndex = productStorage.findIndex(
			(i) =>
				recapChoice.color === i.color && recapChoice.idProduct === i.idProduct
		);
		//if color and id match
		if (findIndex !== -1) {
			//parse into number quantity at found index of productStorage
			productStorage[findIndex].quantityNumber = parseInt(
				productStorage[findIndex].quantityNumber
			);
			// parse into number quantity in recapChoice
			recapChoice.quantityNumber = parseInt(recapChoice.quantityNumber);
			//make the sum of quantity and keep the value at found index of productStorage
			productStorage[findIndex].quantityNumber =
				productStorage[findIndex].quantityNumber + recapChoice.quantityNumber;
			// convert product storage into string with key "product"
			localStorage.setItem("product", JSON.stringify(productStorage));
			// console.log("id et couleur identiques");

			//if no math for id and color
		} else {
			addToLocalStorage(recapChoice);
		}
		//if productStorage is empty, convert into an array
	} else if (productStorage === null) {
		productStorage = [];
		addToLocalStorage(recapChoice);
	}
	//convert in number each quantity of product and push in array
	productStorage.forEach((product) => {
		// console.log(product.quantityNumber);

		quantityParsed.push(parseInt(product.quantityNumber));
		// console.log(quantityParsed);
	});
	//make the sum of number of products
	sumQuantity = quantityParsed.reduce((x, y) => x + y);
	// console.log(sumQuantity);
	// console.log(typeof sumQuantity);
	// console.log(quantityParsed);
	//push sumQuantity on localStorage
	localStorage.setItem("totalProduct", JSON.stringify(sumQuantity));
	//refresh display of total products in panier
	totalProduct.textContent = `${JSON.parse(
		localStorage.getItem("totalProduct")
	)} article(s)`;
});
// localStorage.clear();
