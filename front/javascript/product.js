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

//tempory storage of client choice
let quantityProduct;
let colorChoice = "";
getId();
integrateDataHtml();

let recapChoice = {
	idProduct: id,
	color: colorChoice,
	quantityNumber: quantityProduct,
};
let localStorageArray = JSON.parse(localStorage.getItem("product"));
//get value for quantity
quantity.addEventListener("input", (e) => {
	quantityProduct = parseInt(e.target.value);
	recapChoice.quantityNumber = quantityProduct;
});
//get value of color
selectColors.addEventListener("change", (e) => {
	colorChoice = e.target.value;
	recapChoice.color = colorChoice;
	// keyLocalStorage.push(colorChoice);
});

//FUNCTION TO ADD CHOICE TO THE LOCAL STORAGE
const addToLocaleStorage = () => {
	localStorageArray.push(recapChoice);
	localStorage.setItem("product", JSON.stringify(localStorageArray));
};

addToCart.addEventListener("click", () => {
	//if no color selected
	if (colorChoice === "") {
		alert("Veuillez choisir une couleur");
		//if no quantity
	} else if (quantityProduct == 0) {
		alert("Veuillez choisir une quantité comprise entres 0 et 100");
		//if more 100
	} else if (quantityProduct > 100) {
		alert("Il n'est pas possible de commander plus de 100 articles");
	}
	//if localStorage is empty I create an array to put inside the client choices
	else if (localStorageArray == null) {
		localStorageArray = [];
		addToLocaleStorage();
		//If the array is not empty, I check wich index has ever the same id and the same color product
	} else if (localStorageArray) {
		let findIndex = localStorageArray.findIndex(
			(i) =>
				recapChoice.color === i.color && recapChoice.idProduct === i.idProduct
		);
		// console.log(findIndex);
		//If a product has the same id and the same color, I make the sum of the quantity
		if (findIndex !== -1) {
			localStorageArray[findIndex].quantityNumber =
				localStorageArray[findIndex].quantityNumber + quantityProduct;
			//then I push the item in localStorage
			localStorageArray.push(recapChoice);
			localStorageArray.pop();
			localStorage.setItem("product", JSON.stringify(localStorageArray));
		} else {
			addToLocaleStorage();
		}
	}

	console.log(localStorageArray);
});

// localStorage.clear();
