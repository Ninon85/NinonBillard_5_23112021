//get all inputs of form
const inputs = document.querySelectorAll(
	'input[type="text"],input[type="email"]'
);
//get form for submit
const form = document.querySelector(".cart__order__form");
//variable for keep value of inputs
let firstName, lastName, address, city, email;
//get element cart__items
const cart__items = document.getElementById("cart__items");
console.log(cart__items);
//keep products Api in array
let productsApi;
//index of productsApi where id is the same than in productStorage
let indexFound;
//display quantity of product in li link "panier"
displayTotalProductCart();
//display total quantity in span
const totalQuantity = (document.getElementById("totalQuantity").textContent =
	JSON.parse(localStorage.getItem("totalProduct")));

fetch("http://localhost:3000/api/products")
	.then((res) => res.json())
	// .then((data) => console.log(data))
	.then((data) => (productsApi = data))
	.then((data) => console.log(productsApi))
	.then((data) => {
		//create elements html for each product in localstorage
		for (product in productStorage) {
			//find index of productsApi array who have the same id in productStorage
			indexFound = productsApi.findIndex(
				(i) => productStorage[product].idProduct === i._id
			);
			//create article
			const article = document.createElement("article");
			article.classList.add("cart__item");
			article.dataset.id = productStorage[product].idProduct;
			article.dataset.color = productStorage[product].color;
			cart__items.appendChild(article);
			//create div
			const cart__item__img = document.createElement("div");
			cart__item__img.classList.add("cart__item__img");
			article.appendChild(cart__item__img);
			//create img
			const img = document.createElement("img");
			cart__item__img.appendChild(img);
			img.src = productsApi[indexFound].imageUrl;
			img.alt = productsApi[indexFound].altTxt;
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
			titleproduct.textContent = productsApi[indexFound].name;
			//create p for color and p for price
			const pColor = document.createElement("p");
			pColor.textContent = productStorage[product].color;
			const pPrice = document.createElement("p");
			pPrice.textContent = `${productsApi[indexFound].price} \u20ac`;
			cart__item__content__description.appendChild(pColor);
			cart__item__content__description.appendChild(pPrice);
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
			const pQuantity = document.createElement("p");
			cart__item__content__settings__quantity.appendChild(pQuantity);
			pQuantity.textContent = `Qté : ${productStorage[product].quantityNumber}`;
			//create input number
			const inputQuantity = document.createElement("input");
			inputQuantity.classList.add("itemQuantity");
			inputQuantity.type = "number";
			inputQuantity.name = "itemQuantity";
			inputQuantity.min = "1";
			inputQuantity.max = "100";
			inputQuantity.value = "42";

			cart__item__content__settings__quantity.appendChild(inputQuantity);
			//create div
			const cart__item__content__settings__delete =
				document.createElement("div");
			cart__item__content__settings__delete.classList.add(
				"cart__item__content__settings__delete"
			);
			cart__item__content__settings.appendChild(
				cart__item__content__settings__delete
			);
			//create p delete
			const pDeleteItem = document.createElement("p");
			cart__item__content__settings__delete.appendChild(pDeleteItem);
		}
	});
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
//play display error
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

//add an event listener for each input and keep value
inputs.forEach((input) => {
	input.addEventListener("input", (e) => {
		switch (e.target.id) {
			case "firstName":
				firstNameChecker(e.target.value); // on récupere ce qu'il y' a de noté dans l'input
				break;
			case "lastName":
				lastNameChecker(e.target.value); // on récupere ce qu'il y' a de noté dans l'input
				break;
			case "address":
				addressChecker(e.target.value);
				break;
			case "city":
				cityChecker(e.target.value);
				break;
			case "email":
				emailChecker(e.target.value);
				break;
			default:
				null;
		}
	});
});
// all values are true ? if yes,push on data when we submit form
form.addEventListener("submit", (e) => {
	e.preventDefault();
	if (firstName && lastName && email && address && city) {
		const data = {
			firstName: firstName,
			lastName: lastName,
			email: email,
			address: address,
			city: city,
		};
		console.log(data);
		//on vide nos input aprés soumission du formulaire
		inputs.forEach((input) => {
			input.value = "";
		});
		pseudo = null;
		email = null;
		mdp = null;
		confirmMdp = null;
		alert("Commande envoyée");
	} else {
		alert("Veuillez remplir les champs");
	}
});
