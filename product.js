document.addEventListener("DOMContentLoaded", function () {
    fetch("products.json")
        .then(response => response.json())
        .then(products => {
            const productContainer = document.getElementById("product-list");
            products.forEach(product => {
                const productElement = document.createElement("div");
                productElement.classList.add("product-card");

                productElement.innerHTML = `
                    <img src="${product.image}" alt="${product.name}" class="product-image">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p><strong>Price:</strong> $${product.price.toFixed(2)}</p>
                    <button onclick="addToCart(${product.id}, '${product.name}', '${product.image}', ${product.price})">
                        Add to Cart
                    </button>
                `;

                productContainer.appendChild(productElement);
            });
        })
        .catch(error => console.error("Error loading products:", error));
});

// Function to Add Product to Cart
function addToCart(id, name, image, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push({ id, name, image, price });
    localStorage.setItem("cart", JSON.stringify(cart));

    alert(`${name} added to cart!`);
}