// Retrieve cart data from localStorage or initialize an empty cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Sample product data
const products = [
    { id: 1, name: 'Customized Cup', price: 10, image: 'cup.jpeg' },
    { id: 2, name: 'Customized Tshirt', price: 15, image: 'Tshirt.jpeg' },
    { id: 3, name: 'Customized Frame', price: 20, image: 'Frame.jpeg' },
    { id: 4, name: 'Customized Keychain', price: 8, image: 'Keychain.jpeg' },
    { id: 5, name: 'Customized Art', price: 25, image: 'Art.jpeg' },
    { id: 6, name: 'Customized Calendar', price: 12, image: 'Calendar.jpeg' },
    { id: 7, name: 'Customized Pillow', price: 18, image: 'Pillow.jpeg' },
    { id: 8, name: 'Customized Lamp', price: 22, image: 'Lamp.jpeg' }
];

// Function to save cart to localStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Function to create a cart item HTML element
function createCartItem(product) {
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');

    // Product Image
    const productImage = document.createElement('img');
    productImage.src = product.image;
    productImage.alt = product.name;
    productImage.width = 50;
    productImage.height = 50;
    cartItem.appendChild(productImage);

    // Product Details
    const detailsDiv = document.createElement('div');
    detailsDiv.classList.add('details');

    const productName = document.createElement('h4');
    productName.textContent = product.name;
    detailsDiv.appendChild(productName);

    const productQuantity = document.createElement('p');
    productQuantity.textContent = `Quantity: ${product.quantity}`;
    detailsDiv.appendChild(productQuantity);

    const productPrice = document.createElement('p');
    productPrice.textContent = `Total: $${(product.price * product.quantity).toFixed(2)}`;
    detailsDiv.appendChild(productPrice);

    cartItem.appendChild(detailsDiv);

    // Remove Button
    const removeButton = document.createElement('button');
    removeButton.classList.add('remove-btn');
    removeButton.textContent = 'Remove';
    removeButton.onclick = function () {
        removeCartItem(product.id);
    };
    cartItem.appendChild(removeButton);

    return cartItem;
}

// Function to add a product to the cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) {
        console.error("Product not found");
        return;
    }

    // Check if the product is already in the cart
    let existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart();
    displayCart();
}

// Function to remove a product from the cart
function removeCartItem(productId) {
    let productIndex = cart.findIndex(item => item.id === productId);

    if (productIndex !== -1) {
        if (cart[productIndex].quantity > 1) {
            cart[productIndex].quantity -= 1; // Decrease quantity
        } else {
            cart.splice(productIndex, 1); // Remove product if quantity is 1
        }
    }

    saveCart();
    displayCart();
}

// Function to empty the cart
document.getElementById("empty-cart-btn").addEventListener("click", function () {
    cart = [];
    saveCart();
    displayCart();
});

// Function to display the updated cart
function displayCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = ''; // Clear previous cart items

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    cart.forEach(product => {
        const cartItem = createCartItem(product);
        cartItemsContainer.appendChild(cartItem);
    });
}

// Display cart items when the page loads
window.onload = function () {
    displayCart();
};
