//------------------------------------------------------------------
//index.js
//------------------------------------------------------------------

//fonction pour recuperer les données de l'api
const getProducts = () => {
	fetch("http://localhost:3000/api/products")
		.then((res) => res.json())
		.then((res) => (productData = res))
		.catch((err) => {
			console.log(`Node server est-il activé ? ${err}`);
		});

	// console.log(productData);
};

//Display elements
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
		})
		.catch((err) => {
			console.log(err);
			alert(
				"Nous n'avons pas pu charger les ressources, assurez-vous que Node server soit activé."
			);
			setInterval(() => {
				location.reload();
			}, 300);
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
//function to display total quantity of articles of the shopping cart
function displayTotalProductCart() {
	totalProduct.textContent = `: ${JSON.parse(
		localStorage.getItem("totalProduct")
	)} article(s)`;
	if (productStorage === null) {
		sumQuantity = 0;
		localStorage.setItem("totalProduct", JSON.stringify(sumQuantity));
	}
}
//function to push object in array and push to the localstorage
const addToLocalStorage = (object) => {
	productStorage.push(object);
	localStorage.setItem("product", JSON.stringify(productStorage));
};

//----------------------------------------------------------------------------------
//cart.js
//----------------------------------------------------------------------------------

//---------------------------------------------
// function redirection to index html if Cart shopping is empty
//---------------------------------------------

const redirect = () => {
	if (sumQuantity === 0) {
		alert(
			"Votre panier est vide, vous allez être redirigé vers la page d'accueil"
		);
		location.href = "index.html";
	}
};
//---------------------------------------------
//display elements of localstorage
//create elements html for each product in localstorage
//---------------------------------------------

const displayProductStorage = () => {
	for (product in productStorage) {
		//keep quantity of each product in localstorage for make the sum of total quantity
		quantityParsed.push(parseInt(productStorage[product].quantityNumber));
		console.log(quantityParsed);
		//find index of productData array who have the same id in productStorage
		indexFound = productData.findIndex(
			(i) => productStorage[product].idProduct === i._id
		);

		//create article
		const article = document.createElement("article");
		cart__items.appendChild(article);
		article.classList.add("cart__item");
		article.dataset.id = productStorage[product].idProduct;
		article.dataset.color = productStorage[product].color;
		//create div
		const cart__item__img = document.createElement("div");
		cart__item__img.classList.add("cart__item__img");
		article.appendChild(cart__item__img);
		//create img
		const img = document.createElement("img");
		cart__item__img.appendChild(img);
		img.src = productData[indexFound].imageUrl;
		img.alt = productData[indexFound].altTxt;
		//create div
		const cart__item__content = document.createElement("div");
		cart__item__content.classList.add("cart__item__content");
		article.appendChild(cart__item__content);
		//create div
		const cart__item__content__description = document.createElement("div");
		cart__item__content__description.classList.add(
			"cart__item__content__description"
		);
		cart__item__content.appendChild(cart__item__content__description);
		//create h2
		const titleproduct = document.createElement("h2");
		cart__item__content__description.appendChild(titleproduct);
		titleproduct.textContent = productData[indexFound].name;
		//create p for color and p for price
		const pColor = document.createElement("p");
		pColor.textContent = productStorage[product].color;
		const pPrice = document.createElement("p");
		pPrice.textContent = `${productData[indexFound].price} \u20ac`;
		cart__item__content__description.appendChild(pColor);
		cart__item__content__description.appendChild(pPrice);
		//array content unit price per product
		dataPrice.push(parseInt(productData[indexFound].price));
		// console.log(dataPrice);
		//create div
		const cart__item__content__settings = document.createElement("div");
		cart__item__content__settings.classList.add(
			"cart__item__content__settings"
		);
		cart__item__content.appendChild(cart__item__content__settings);
		//create div
		const cart__item__content__settings__quantity =
			document.createElement("div");
		cart__item__content__settings__quantity.classList.add(
			"cart__item__content__settings__quantity"
		);
		cart__item__content__settings.appendChild(
			cart__item__content__settings__quantity
		);
		//create p quantity
		pQuantity = document.createElement("p");
		cart__item__content__settings__quantity.appendChild(pQuantity);
		pQuantity.textContent = `Qté : ${productStorage[product].quantityNumber}`;
		//create input number
		const inputQuantity = document.createElement("input");
		inputQuantity.classList.add("itemQuantity");
		inputQuantity.type = "number";
		inputQuantity.name = "itemQuantity";
		inputQuantity.min = "1";
		inputQuantity.max = "100";
		inputQuantity.value = productStorage[product].quantityNumber;
		cart__item__content__settings__quantity.appendChild(inputQuantity);
		//create div
		const cart__item__content__settings__delete = document.createElement("div");
		cart__item__content__settings__delete.classList.add(
			"cart__item__content__settings__delete"
		);
		cart__item__content__settings.appendChild(
			cart__item__content__settings__delete
		);
		//create p delete
		const pDeleteItem = document.createElement("p");
		pDeleteItem.textContent = "Supprimer";
		cart__item__content__settings__delete.appendChild(pDeleteItem);
	}
};
//---------------------------------------------
//function to make total price calculation
//---------------------------------------------

const totalPriceCalculation = () => {
	if (productStorage != null) {
		sumPerProduct = [];
		for (let i = 0; i < dataPrice.length; i++) {
			//price*quantity
			sumPricePerProduct = dataPrice[i] * productStorage[i].quantityNumber;
			//push in array
			sumPerProduct.push(sumPricePerProduct);

			// console.log(sumPerProduct);
		}
		// console.log(sumPerProduct);
		//make sum of price
		totalPrice = sumPerProduct.reduce((x, y) => x + y);
		// console.log(totalPrice);
		//display total price
		totalPriceEl.textContent = totalPrice;
	} else {
		totalPriceEl.textContent = "0";
	}
};
//---------------------------------------------
//function to make the sum of quantity product
//---------------------------------------------

const makeSumQuantity = (quantityParsed) => {
	sumQuantity = quantityParsed.reduce((x, y) => x + y);
	// console.log(sumQuantity);
	localStorage.setItem("totalProduct", JSON.stringify(sumQuantity));
};

//---------------------------------------------
//function for modify quantity in localstorage
//---------------------------------------------

const modifyQuantity = () => {
	const inputQuantity = document.querySelectorAll(".itemQuantity");
	const articles = document.querySelectorAll("article");
	const pQuantity = document.querySelectorAll(
		"div.cart__item__content__settings__quantity > p"
	);
	// console.log(Array.from(articles));
	// console.log(articles);
	// console.log(inputQuantity);
	// console.log(pQuantity);

	for (let i = 0; i < inputQuantity.length; i++) {
		inputQuantity[i].addEventListener("change", (e) => {
			// console.log(e.target.value);

			let articlesDatasetId = articles[i].dataset.id;
			let articlesDatasetColor = articles[i].dataset.color;
			let pQuantityTextContent = pQuantity[i].textContent;
			// console.log(articlesDatasetColor);
			// console.log(articlesDatasetId);
			// console.log(pQuantityTextContent);
			//---------------------------------------------------------------------------
			//find index where id and color are the same for article and in producStorage
			//---------------------------------------------------------------------------

			indexStorage = productStorage.findIndex(
				(i) =>
					i.idProduct == articlesDatasetId && i.color == articlesDatasetColor
			);
			//--------------------------------------------------------------------------
			//give value of the input at index found in productStorage
			//--------------------------------------------------------------------------

			productStorage[indexStorage].quantityNumber = e.target.value;
			//--------------------------------------------------------------------------
			//modify at index find the quantity in quantityParsed
			//--------------------------------------------------------------------------

			quantityParsed.splice(
				indexStorage,
				1,
				parseInt(productStorage[indexStorage].quantityNumber)
			);
			// console.log(quantityParsed);
			//--------------------------------------------------------------------------
			//refresh total quantity of products
			//--------------------------------------------------------------------------
			makeSumQuantity(quantityParsed);
			//--------------------------------------------------------------------------
			//refresh display of pQuantity textContent
			//--------------------------------------------------------------------------
			pQuantity[
				indexStorage
			].textContent = `Qté : ${productStorage[indexStorage].quantityNumber}`;
			//--------------------------------------------------------------------------
			//refresh display total quantity in span
			//--------------------------------------------------------------------------

			const totalQuantity = (document.getElementById(
				"totalQuantity"
			).textContent = JSON.parse(localStorage.getItem("totalProduct")));
			//--------------------------------------------------------------------------
			//refresh display total quantity in link li panier
			//--------------------------------------------------------------------------
			displayTotalProductCart();
			//--------------------------------------------------------------------------
			//refresh total price
			//--------------------------------------------------------------------------

			totalPriceCalculation();
			//--------------------------------------------------------------------------
			// if quantity in productStorage at index found is > 100
			//--------------------------------------------------------------------------

			if (productStorage[indexStorage].quantityNumber > 100) {
				productStorage[indexStorage].quantityNumber = 100;
				localStorage.setItem("product", JSON.stringify(productStorage));
				alert("Vous ne pouvez pas commander plus de 100 articles");
				inputQuantity[indexStorage].value = 100;
				//--------------------------------------------------------------------------
				//refresh display of pQuantity textContent
				//--------------------------------------------------------------------------
				pQuantity[
					indexStorage
				].textContent = `Qté : ${productStorage[indexStorage].quantityNumber}`;
				quantityParsed.splice(indexStorage, 1, 100);
				//--------------------------------------------------------------------------
				//refresh total quantity
				//--------------------------------------------------------------------------
				makeSumQuantity(quantityParsed);
			} else {
				//--------------------------------------------------------------------------
				// push productStorage refreshed in localStorage
				//--------------------------------------------------------------------------

				localStorage.setItem("product", JSON.stringify(productStorage));
			}
		});
	}
};
//---------------------------------------------
//function for delete a product in localstorage
//---------------------------------------------
const deleteProduct = () => {
	const pDeleteItem = document.querySelectorAll(
		"div.cart__item__content__settings__delete > p"
	);
	const articles = document.querySelectorAll("article");
	// console.log(pDeleteItem);
	// console.log(articles);
	for (let i = 0; i < pDeleteItem.length; i++) {
		pDeleteItem[i].addEventListener("click", () => {
			console.log("c'est cliqué !!");
			let articlesDatasetId = articles[i].dataset.id;
			let articlesDatasetColor = articles[i].dataset.color;
			indexToDeleteStorage = productStorage.findIndex(
				(i) =>
					i.idProduct == articlesDatasetId && i.color == articlesDatasetColor
			);

			// console.log(indexToDeleteStorage);
			location.reload();
			if (productStorage.length === 1) {
				// console.log("productStorage vide !");
				sumQuantity = 0;
				localStorage.setItem("totalProduct", JSON.stringify(sumQuantity));
				displayTotalProductCart();
				localStorage.removeItem("product");
			} else {
				productStorage.splice(indexToDeleteStorage, 1);
				localStorage.setItem("product", JSON.stringify(productStorage));
				//--------------------------------------------------------------------------
				//refresh display total quantity in link li panier
				//--------------------------------------------------------------------------
				displayTotalProductCart();
				//--------------------------------------------------------------------------
				//delete at index found the quantity in quantityParsed
				//--------------------------------------------------------------------------
				quantityParsed.splice(indexToDeleteStorage, 1);
				//--------------------------------------------------------------------------
				//refresh sum of quantity products
				//--------------------------------------------------------------------------
				makeSumQuantity(quantityParsed);
			}
		});
	}
};
//-----------------------------------------------------
//Form
//-----------------------------------------------------

//Function for display an error message
const errorDisplay = (tag, message, valid) => {
	const p = document.getElementById(`${tag}ErrorMsg`);
	if (!valid) {
		p.textContent = message;
	} else {
		p.textContent = message;
	}
};
//function check value for first name
const firstNameChecker = (value) => {
	// match(/^[a-z]{3,20}$/i
	if (value.length < 2 || value.length > 20) {
		errorDisplay(
			"firstName",
			"Votre prénom doit être compris entre 2 et 20 caractères."
		);
		firstName = null;
	} else if (value.match(/^[a-zéûùîîëêè-]*$/i)) {
		errorDisplay("firstName", "", true);
		firstName = value;
	} else {
		errorDisplay(
			"firstName",
			"Votre prénom ne doit contenir ni chiffres ni caractères spéciaux."
		);
		firstName = null;
	}
};
//check value for last name
//play display error
//keep value in variable
//if error => prevent submit of form => variable = null
const lastNameChecker = (value) => {
	if (value.length < 3 || value.length > 20) {
		errorDisplay(
			"lastName",
			"Votre prénom doit être compris entre 3 et 20 caractères."
		);
		lastName = null;
	} else if (value.match(/^[a-zéûùîîëêèç-]*$/i)) {
		errorDisplay("lastName", "", true);
		lastName = value;
	} else {
		errorDisplay(
			"lastName",
			"Votre prénom ne doit contenir ni chiffres ni caractères spéciaux."
		);
		lastName = null;
	}
};
//check value address
//play display error
//keep value in variable
//if error => prevent submit of form => variable = null
const addressChecker = (value) => {
	if (value.match(/^[0-9]{1,4}[ ,-][ A-Za-zÀ-ÿ0-9\-]+$/)) {
		errorDisplay("address", "", true);
		address = value;
	} else {
		errorDisplay(
			"address",
			"Veuillez saisir le numéro suivi du nom de la voie !"
		);
		address = null;
	}
};
//check value city
//play display error
//keep value in variable
//if error => prevent submit of form => variable = null
const cityChecker = (value) => {
	if (!value.match(/^[0-9]{5}[ ,-][ A-Za-zÀ-ÿ0-9\-]+$/)) {
		errorDisplay(
			"city",
			"Veuillez saisir le code postal suivi du nom de la ville"
		);
		city = null;
	} else {
		errorDisplay("city", "", true);
		city = value;
	}
};
//check value for email
// play display error
//keep value in variable
//if error => prevent submit of form => variable = null
const emailChecker = (value) => {
	if (!value.match(/^[\w\._-]+@[\w-]+\.[a-z]{2,4}$/i)) {
		errorDisplay("email", "Votre adresse mail n'est pas valide");
		email = null;
	} else {
		errorDisplay("email", "", true);
		email = value;
	}
};
// Submit order
const submitOrder = () => {
	// all values are true ? if yes,push on order when we submit form
	form.addEventListener("submit", (e) => {
		e.preventDefault();
		if (firstName && lastName && email && address && city) {
			productOrder = [];
			for (product in productStorage) {
				productOrder.push(productStorage[product].idProduct);
			}
			const order = {
				contact: {
					firstName: firstName,
					lastName: lastName,
					email: email,
					address: address,
					city: city,
				},
				products: productOrder,
			};
			// console.log(contact);

			console.log(order);
			const option = {
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(order),
			};
			// alert("Commande envoyée");
			fetch(" http://localhost:3000/api/products/order", option)
				.then((res) => res.json())
				.then((res) => {
					window.location = `../html/confirmation.html?id=${res.orderId}`;
					localStorage.removeItem("product");
					sumQuantity = 0;
					localStorage.setItem("totalProduct", JSON.stringify(sumQuantity));
				})
				.catch((err) =>
					alert("Votre commande n'a pu aboutir, veuillez réessayer plus tard")
				);
		}
	});
};
