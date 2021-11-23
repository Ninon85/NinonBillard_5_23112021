//Implémentation des produits sur la page index

const item = document.getElementById("items");

// // console.log(item);
let productData = [];
//fonction pour recuperer les données de l'api
const getProducts = async () => {
	await fetch("http://localhost:3000/api/products")
		.then((res) => res.json())
		.then((res) => (productData = res))
		.then((res) => integrateElements())
		.catch((err) => (item.innerHTML = `<p>Node server est-il activé ?</p>`));

	// console.log(productData);
};
getProducts();
//fonction pour intégration des balises
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
