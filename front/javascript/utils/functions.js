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
		selectColors.insertAdjacentHTML(
			"beforeend",
			`<option value="${colorsProduct[color]}">${colorsProduct[color]}</option>`
		);
	}
}
