//------------------------------------------------------------------
//index.js
//------------------------------------------------------------------

//fonction pour recuperer les données de l'api
const getProducts = () => {
	fetch("http://localhost:3000/api/products")
		.then((res) => res.json())
		.then((res) => (productData = res))
		// .then((res) => integrateElements())
		.catch((err) => console.log("Node server est-il activé ?"));

	// console.log(productData);
};

//fonction pour intégration des balises de la page d'accueil
const integrateElements = () => {
	for (const product of productData) {
		const link = document.createElement("a");
		const article = document.createElement("article");
		const image = document.createElement("img");
		const title3 = document.createElement("h3");
		const paragraphe = document.createElement("p");
		//enfants
		item.appendChild(link);
		link.appendChild(article);
		article.appendChild(image);
		article.appendChild(title3);
		article.appendChild(paragraphe);
		//class
		title3.classList.add("productName");
		paragraphe.classList.add("productDescription");
		//elements dynamiques
		link.href = `../html/product.html?id=${product._id}`;
		image.src = `${product.imageUrl}`;
		image.alt = `${product.altTxt}`;
		title3.textContent = `${product.name}`;
		paragraphe.textContent = `${product.description}`;
	}
};
//------------------------------------------------------------------
//PRODUCT.JS
//------------------------------------------------------------------

//FUNCTION TO GET ID
const getId = () => {
	var str = window.location;
	var url = new URL(str);
	id = url.searchParams.get("id");
	// console.log(id);
};
//Function to integrate data in html
function integrateDataHtml() {
	fetch(`http://localhost:3000/api/products/${id}`)
		.then((res) => res.json())
		.then((data) => {
			headTitle.textContent = `${data.name}`;
			image.src = `${data.imageUrl}`;
			image.alt = `${data.altTxt}`;
			titleh1.textContent = `${data.name}`;
			price.textContent = `${data.price}`;
			description.textContent = `${data.description}`;
			colorsProduct = data.colors;
			displayColorsProduct();
		});
}
// inject colors of product in HTML
function displayColorsProduct() {
	for (color in colorsProduct) {
		const optionColor = document.createElement("option");
		selectColors.appendChild(optionColor);
		optionColor.value = `${colorsProduct[color]}`;
		optionColor.textContent = colorsProduct[color];
	}
}
//function to display quantity of articles put in the shopping cart
function displayTotalProductCart() {
	totalProduct.textContent = `: ${JSON.parse(
		localStorage.getItem("totalProduct")
	)} article(s)`;
}
//function to push object in array and push to the localstorage
const addToLocalStorage = (object) => {
	productStorage.push(object);
	localStorage.setItem("product", JSON.stringify(productStorage));
};

//-------------------------------------
//cart.js
//-------------------------------------

//display elements of localstorage
//create elements html for each product in localstorage
// const displayCart = () => {
// 	for (product in productStorage) {
// 		//find index of productsApi array who have the same id in productStorage
// 		indexFound = productsApi.findIndex(
// 			(i) => productStorage[product].idProduct === i._id
// 		);
// 		//create article
// 		const article = document.createElement("article");
// 		article.classList.add("cart__item");
// 		article.dataset.id = productStorage[product].idProduct;
// 		article.dataset.color = productStorage[product].color;
// 		cart__items.appendChild(article);
// 		//create div
// 		const cart__item__img = document.createElement("div");
// 		cart__item__img.classList.add("cart__item__img");
// 		article.appendChild(cart__item__img);
// 		//create img
// 		const img = document.createElement("img");
// 		cart__item__img.appendChild(img);
// 		img.src = productsApi[indexFound].imageUrl;
// 		img.alt = productsApi[indexFound].altTxt;
// 		//create div
// 		const cart__item__content = document.createElement("div");
// 		cart__item__content.classList.add("cart__item__content");
// 		article.appendChild(cart__item__content);
// 		//create div
// 		const cart__item__content__description = document.createElement("div");
// 		cart__item__content__description.classList.add(
// 			"cart__item__content__description"
// 		);
// 		cart__item__content.appendChild(cart__item__content__description);
// 		//create h2
// 		const titleproduct = document.createElement("h2");
// 		cart__item__content__description.appendChild(titleproduct);
// 		titleproduct.textContent = productsApi[indexFound].name;
// 		//create p for color and p for price
// 		const pColor = document.createElement("p");
// 		pColor.textContent = productStorage[product].color;
// 		const pPrice = document.createElement("p");
// 		pPrice.textContent = `${productsApi[indexFound].price} \u20ac`;
// 		cart__item__content__description.appendChild(pColor);
// 		cart__item__content__description.appendChild(pPrice);
// 		//create div
// 		const cart__item__content__settings = document.createElement("div");
// 		cart__item__content__settings.classList.add(
// 			"cart__item__content__settings"
// 		);
// 		cart__item__content.appendChild(cart__item__content__settings);
// 		//create div
// 		const cart__item__content__settings__quantity =
// 			document.createElement("div");
// 		cart__item__content__settings__quantity.classList.add(
// 			"cart__item__content__settings__quantity"
// 		);
// 		cart__item__content__settings.appendChild(
// 			cart__item__content__settings__quantity
// 		);
// 		//create p quantity
// 		const pQuantity = document.createElement("p");
// 		cart__item__content__settings__quantity.appendChild(pQuantity);
// 		pQuantity.textContent = `Qté : ${productStorage[product].quantityNumber}`;
// 		//create input number
// 		const inputQuantity = document.createElement("input");
// 		inputQuantity.classList.add("itemQuantity");
// 		inputQuantity.type = "number";
// 		inputQuantity.name = "itemQuantity";
// 		inputQuantity.min = "1";
// 		inputQuantity.max = "100";
// 		inputQuantity.value = productStorage[product].quantityNumber;
// 		inputQuantity.addEventListener("change", (e) => {
// 			console.log(e.target.value);
// 			let indexStorage = productStorage.findIndex(
// 				(i) =>
// 					i.idProduct === article.dataset.id &&
// 					i.color === article.dataset.color
// 			);
// 			console.log(indexStorage);
// 			productStorage[indexStorage].quantityNumber = e.target.value;
// 			if (productStorage[indexStorage].quantityNumber > 100) {
// 				productStorage[indexStorage].quantityNumber = 100;
// 				inputQuantity.value = 100;
// 				alert("Vous ne pouvez pas commander plus de 100 articles");
// 			} else {
// 				localStorage.setItem("product", JSON.stringify(productStorage));
// 				pQuantity.textContent = `Qté : ${productStorage[indexStorage].quantityNumber}`;
// 				// quantityParsed.push(parseInt(product.quantityNumber));
// 			}
// 		});

// 		cart__item__content__settings__quantity.appendChild(inputQuantity);
// 		//create div
// 		const cart__item__content__settings__delete = document.createElement("div");
// 		cart__item__content__settings__delete.classList.add(
// 			"cart__item__content__settings__delete"
// 		);
// 		cart__item__content__settings.appendChild(
// 			cart__item__content__settings__delete
// 		);
// 		//create p delete
// 		const pDeleteItem = document.createElement("p");
// 		pDeleteItem.textContent = "Supprimer";
// 		cart__item__content__settings__delete.appendChild(pDeleteItem);
// 		// console.log(inputQuantity);
// 		pDeleteItem.addEventListener("click", () => {
// 			console.log("c'est cliqué!");
// 			let indexStorageDelete = productStorage.findIndex(
// 				(i) =>
// 					i.idProduct === article.dataset.id &&
// 					i.color === article.dataset.color
// 			);
// 			console.log(indexStorageDelete);
// 			if (indexStorageDelete != -1) {
// 				productStorage.splice(indexStorageDelete, 1);
// 				localStorage.setItem("product", JSON.stringify(productStorage));
// 				displayTotalProductCart();
// 			} else if (productStorage === []) {
// 				sumQuantity = 0;
// 				// localStorage.setItem("totalProduct", JSON.stringify(sumQuantity));
// 				displayTotalProductCart();
// 			}

// 			productStorage[indexStorage].quantityNumber = e.target.value;
// 			if (productStorage[indexStorage].quantityNumber > 100) {
// 				productStorage[indexStorage].quantityNumber = 100;
// 				inputQuantity.value = 100;
// 				alert("Vous ne pouvez pas commander plus de 100 articles");
// 			} else {
// 				localStorage.setItem("product", JSON.stringify(productStorage));
// 				pQuantity.textContent = `Qté : ${productStorage[indexStorage].quantityNumber}`;
// 			}
// 		});
// 	}
// };
