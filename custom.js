// Function to get query parameters from the URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Get the product ID from the URL
const productId = getQueryParam("id");

// Product details (this can later come from a database or API)
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

// Check if product exists and update the UI
const productNameEl = document.getElementById("product-name");
const productImageEl = document.getElementById("product-image");
const customizationContainer = document.getElementById("customization-container");

if (productId && products[productId]) {
    if (productNameEl) productNameEl.textContent = products[productId].name;
    if (productImageEl) productImageEl.src = products[productId].image;
} else {
    if (customizationContainer) customizationContainer.innerHTML = "<p>Product not found!</p>";
}

// Function to handle customization submission
function submitCustomization() {
    const customText = document.getElementById("custom-text").value;
    const uploadedImage = document.getElementById("upload-image").files[0];

    if (!customText && !uploadedImage) {
        alert("Please add custom text or upload an image.");
        return;
    }

    alert("Customization saved! Proceed to checkout.");
}

document.addEventListener("DOMContentLoaded", function () {
    const textInput = document.getElementById("custom-text");
    const textPreview = document.getElementById("text-preview");
    const imageInput = document.getElementById("upload-image");
    const imagePreview = document.getElementById("image-preview");

    if (!textInput || !textPreview || !imageInput || !imagePreview) return;

    // Live text update
    textInput.addEventListener("input", function () {
        textPreview.textContent = textInput.value || "Your Text";
    });

    // Image upload preview
    imageInput.addEventListener("change", function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                imagePreview.src = e.target.result;
                imagePreview.style.display = "block";
            };
            reader.readAsDataURL(file);
        }
    });

    // Make elements draggable
    function makeDraggable(element) {
        let offsetX, offsetY, isDragging = false;

        element.addEventListener("mousedown", function (e) {
            isDragging = true;
            offsetX = e.clientX - element.offsetLeft;
            offsetY = e.clientY - element.offsetTop;
            element.style.cursor = "grabbing";
        });

        document.addEventListener("mousemove", function (e) {
            if (isDragging) {
                element.style.left = (e.clientX - offsetX) + "px";
                element.style.top = (e.clientY - offsetY) + "px";
            }
        });

        document.addEventListener("mouseup", function () {
            isDragging = false;
            element.style.cursor = "grab";
        });
    }

    makeDraggable(textPreview);
    makeDraggable(imagePreview);

    // Make text & images resizable
    function makeResizable(element) {
        element.classList.add("resizable");
        element.addEventListener("wheel", function (e) {
            e.preventDefault();
            let transform = element.style.transform || "scale(1)";
            let scaleMatch = transform.match(/scale\(([^)]+)\)/);
            let rotateMatch = transform.match(/rotate\(([^)]+)\)/);

            let scale = scaleMatch ? parseFloat(scaleMatch[1]) : 1;
            let rotation = rotateMatch ? rotateMatch[0] : "";

            scale += e.deltaY * -0.005;
            scale = Math.min(Math.max(0.5, scale), 2);
            element.style.transform = `scale(${scale}) ${rotation}`;
        });
    }

    makeResizable(textPreview);
    makeResizable(imagePreview);

    // Rotate images on double click
    let rotation = 0;
    imagePreview.addEventListener("dblclick", function () {
        rotation += 15;
        let scaleMatch = imagePreview.style.transform.match(/scale\(([^)]+)\)/);
        let scale = scaleMatch ? scaleMatch[0] : "scale(1)";
        imagePreview.style.transform = `${scale} rotate(${rotation}deg)`;
    });

    // Save customization
    document.getElementById("save-customization")?.addEventListener("click", function () {
        const customData = {
            text: textInput.value,
            image: imagePreview.src
        };
        localStorage.setItem("customizedProduct", JSON.stringify(customData));
        alert("Customization saved! Proceed to checkout.");
    });
});

// Function to add product to cart
function addToCart() {
    const productName = document.getElementById("product-name")?.textContent || "Unknown Product";
    const productImage = document.getElementById("product-image")?.src || "";
    const customText = document.getElementById("custom-text")?.value || "No custom text";
    const imagePreview = document.getElementById("image-preview")?.src;

    // Check if custom image exists
    const customImage = imagePreview && !imagePreview.includes("default") ? imagePreview : "";

    // Create cart item object
    const cartItem = {
        name: productName,
        image: productImage,
        text: customText,
        customImage: customImage
    };

    // Get existing cart data or initialize new cart array
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Add new item to cart array
    cart.push(cartItem);

    // Save updated cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    console.log("Updated Cart:", cart); // Debugging output

    alert("Product added to cart!");

    // Redirect to cart page
    window.location.href = "cart.html";
}

// Attach event listener to "Add to Cart" button
document.getElementById("add-to-cart")?.addEventListener("click", addToCart);