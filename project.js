// JavaScript for Custom Gift Store

document.addEventListener("DOMContentLoaded", function () {
    // Search Functionality (Live Filter)
    const searchInput = document.querySelector(".top-bar input");
    const products = document.querySelectorAll(".product");
    
    searchInput.addEventListener("input", function () {
        let filter = searchInput.value.toLowerCase();
        products.forEach(product => {
            let productName = product.textContent.toLowerCase();
            product.style.display = productName.includes(filter) ? "block" : "none";
        });
    });
    
    // Newsletter Subscription Validation
    document.querySelector(".newsletter button").addEventListener("click", function () {
        const emailInput = document.querySelector(".newsletter input");
        const email = emailInput.value.trim();
        if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            alert("Thank you for subscribing!");
            emailInput.value = "";
        } else {
            alert("Please enter a valid email address.");
        }
    });
    
    // Highlight Active Navigation
    const navLinks = document.querySelectorAll("nav ul li a");
    const currentPath = window.location.pathname;
    navLinks.forEach(link => {
        if (link.getAttribute("href") === currentPath) {
            link.classList.add("active");
        }
    });
    
    // Smooth Scrolling & Animations
    document.querySelectorAll("a[href^='#']").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute("href")).scrollIntoView({
                behavior: "smooth"
            });
        });
    });
    
    // Product Click & Redirect
    document.querySelectorAll(".product a").forEach(productLink => {
        productLink.addEventListener("click", function (event) {
            event.preventDefault();
            const productId = this.getAttribute("href").split("=")[1];
            localStorage.setItem("selectedProduct", productId);
            window.location.href = `product.html?id=${productId}`;
        });
    });
    
    // Order Tracking Validation
    document.querySelector(".order-tracking button")?.addEventListener("click", function () {
        let trackingInput = document.querySelector(".order-tracking input").value.trim();
        alert(trackingInput.length === 10 && !isNaN(trackingInput) ? "Tracking Order: " + trackingInput : "Invalid Tracking ID");
    });
    
    // Live Chat Button
    let chatButton = document.createElement("div");
    chatButton.innerHTML = "💬 Chat with us";
    chatButton.classList.add("chat-button");
    document.body.appendChild(chatButton);
    chatButton.addEventListener("click", function () {
        alert("Live chat support coming soon!");
    });
    
    // Back to Top Button
    let topButton = document.createElement("button");
    topButton.textContent = "⬆ Back to Top";
    topButton.classList.add("back-to-top");
    document.body.appendChild(topButton);
    
    window.addEventListener("scroll", function () {
        topButton.style.display = window.scrollY > 300 ? "block" : "none";
    });
    topButton.addEventListener("click", function () {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
    
    // Gift Customization Preview
    document.querySelector("#upload-image")?.addEventListener("change", function (event) {
        let file = event.target.files[0];
        if (file) {
            let reader = new FileReader();
            reader.onload = e => document.querySelector(".preview-image").src = e.target.result;
            reader.readAsDataURL(file);
        }
    });
    
    // Coupon Code Validation
    document.querySelector(".apply-coupon button")?.addEventListener("click", function () {
        let couponInput = document.querySelector(".apply-coupon input").value.trim();
        alert(couponInput === "DISCOUNT10" ? "Coupon applied! You get 10% off." : "Invalid coupon code.");
    });
});

document.addEventListener("DOMContentLoaded", function () {
    // Get all products
    const products = document.querySelectorAll(".product");

    // Add click event to each product
    products.forEach(product => {
        product.addEventListener("click", function () {
            // Get product ID from data attribute
            const productId = this.getAttribute("data-id");

            // Redirect to customization page with the product ID
            window.location.href = `customization.html?id=${productId}`;
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const cartIcon = document.getElementById("cart-icon");
    const cartModal = document.getElementById("cart-modal");
    const cartClose = document.getElementById("cart-close");
    const cartItemsContainer = document.getElementById("cart-items");
    const checkoutBtn = document.getElementById("checkout-btn");

    // Open Cart Modal
    cartIcon.addEventListener("click", function () {
        cartModal.style.display = "block";
        displayCartItems();
    });

    // Close Cart Modal
    cartClose.addEventListener("click", function () {
        cartModal.style.display = "none";
    });

    // Close Cart when clicking outside the modal
    window.addEventListener("click", function (event) {
        if (event.target === cartModal) {
            cartModal.style.display = "none";
        }
    });

    // Function to Display Cart Items
    function displayCartItems() {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cartItemsContainer.innerHTML = "";

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = "<p>Your cart is empty!</p>";
            return;
        }

        cart.forEach((item, index) => {
            let cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <p>${item.name}</p>
                    <p>Text: ${item.text || "None"}</p>
                    <button class="remove-item" data-index="${index}">Remove</button>
                </div>
            `;
            cartItemsContainer.appendChild(cartItem);
        });

        // Add event listeners to Remove Buttons
        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", function () {
                removeCartItem(this.getAttribute("data-index"));
            });
        });
    }

    // Remove Item from Cart
    function removeCartItem(index) {
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCartItems();
    }

    // Checkout Button Click
    checkoutBtn.addEventListener("click", function () {
        alert("Proceeding to Checkout...");
        // Redirect to checkout page (optional)
        // window.location.href = "checkout.html";
    });
});

// Function to Add Product to Cart
function addToCart(productId, customText, imagePreviewSrc) {
    const products = {
        1: { name: "Customized Coffee Cup", image: "Cup.jpeg" },
        2: { name: "Customized T-Shirt", image: "Tshirt.jpeg" },
        3: { name: "Customized Photo Frame", image: "Frame.jpeg" },
        4: { name: "Customized Keychain", image: "Keychain.jpeg" },
        5: { name: "Customized Art", image: "Art.jpeg" },
        6: { name: "Customized Calendar", image: "Calender.jpeg" },
        7: { name: "Customized Pillow", image: "Pillow.jpeg" },
        8: { name: "Customized Lamp", image: "Lamp.jpeg" }
    };

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    if (products[productId]) {
        cart.push({
            id: productId,
            name: products[productId].name,
            image: imagePreviewSrc || products[productId].image,
            text: customText
        });

        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Product added to cart!");
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const username = localStorage.getItem("loggedInUser"); // Get username from localStorage
    const userNameDisplay = document.getElementById("user-name");

    if (username) {
        userNameDisplay.textContent = `Welcome, ${username}!`; // ✅ Show username
    } else {
        userNameDisplay.textContent = "Welcome, Guest!";
    }
});