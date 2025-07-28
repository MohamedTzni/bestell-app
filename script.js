let cart = [];
let totalGlobal = 0;

window.onload = function () {
    const dishesContainer = document.getElementById("dishes-container");
    const cartContainer = document.getElementsByClassName("cart-content")[0];
    const orderBtn = document.getElementsByClassName("order-btn")[0];
    const orderBtnMobile = document.getElementsByClassName("order-btn-mobile")[0];
    const mobileCartBtn = document.getElementById("mobile-cart-btn");
    const cartOverlay = document.getElementById("cart-overlay");
    const closeCart = document.getElementById("close-cart");
    const cartContentMobile = document.getElementsByClassName("cart-content-mobile")[0];

    const orderPopup = document.getElementById("order-popup");
    const minPopup = document.getElementById("min-popup");
    const minPopupText = document.getElementById("min-popup-text");
    const minContinue = document.getElementById("min-continue");
    const minCancel = document.getElementById("min-cancel");

    const hamburger = document.getElementsByClassName("hamburger")[0];
    const navMenu = document.getElementsByClassName("header-right")[0];

      
    hamburger.onclick = function () {
        navMenu.classList.toggle("show");
    };

    
    let html = "";
    for (let i = 0; i < dishes.length; i++) {
        html += createDishTemplate(dishes[i], i);
    }
    dishesContainer.innerHTML = html;

        
    dishesContainer.onclick = function (event) {
        const element = event.target;
        if (element.className === "add-btn" || element.parentElement.className === "add-btn") {
            const button = element.className === "add-btn" ? element : element.parentElement;
            const index = parseInt(button.getAttribute("data-index"));
            addToCart(index);
            updateCart();
        }
    };

      
    cartContainer.onclick = handleCartClick;
    cartContentMobile.onclick = handleCartClick;

    function handleCartClick(event) {
        const el = event.target;
        const parentBtn = el.tagName === "BUTTON" ? el : el.parentElement;
        if (!parentBtn || !parentBtn.getAttribute("data-index")) return;
        const index = parseInt(parentBtn.getAttribute("data-index"));

        if (parentBtn.className === "plus") {
            cart[index].quantity++;
        } else if (parentBtn.className === "minus") {
            cart[index].quantity--;
            if (cart[index].quantity <= 0) {
                cart.splice(index, 1);
            }
        } else if (parentBtn.className === "remove") {
            cart.splice(index, 1);
        }
        updateCart();
    }

        // Bestellung starten
    orderBtn.onclick = handleOrder;
    orderBtnMobile.onclick = handleOrder;

    minContinue.onclick = function () {
        minPopup.style.display = "none";
        completeOrder();
    };
    minCancel.onclick = function () {
        minPopup.style.display = "none";
    };

