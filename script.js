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

    function handleOrder() {
        if (cart.length === 0) {
            alert("Der Warenkorb ist leer!");
            return;
        }

        let sum = 0;
        for (let i = 0; i < cart.length; i++) {
            sum += cart[i].price * cart[i].quantity;
        }
        totalGlobal = sum;

        if (sum < 10) {
            minPopupText.innerText = "Der Mindestbestellwert beträgt 10 €. Ihr aktueller Bestellwert liegt bei " + sum.toFixed(2) + " €. Möchten Sie trotzdem bestellen?";
            minPopup.style.display = "flex";
            return;
        }

        completeOrder();
    }

    function completeOrder() {
        cart = [];
        updateCart();
        orderPopup.style.display = "flex";
        cartOverlay.classList.remove("active");
    }

    document.getElementById("popup-close").onclick = function () {
        orderPopup.style.display = "none";
    };
    
    mobileCartBtn.onclick = function () {
        cartOverlay.classList.add("active");
        renderMobileCart();
    };
    closeCart.onclick = function () {
        cartOverlay.classList.remove("active");
    };

    function renderMobileCart() {
        cartContentMobile.innerHTML = cartContainer.innerHTML;
    }

        function addToCart(index) {
        const dish = dishes[index];
        let found = false;
        for (let i = 0; i < cart.length; i++) {
            if (cart[i].name === dish.name) {
                cart[i].quantity++;
                found = true;
                break;
            }
        }
        if (!found) {
            cart.push({ name: dish.name, price: dish.preis, quantity: 1 });
        }
    }

        function updateCart() {
        cartContainer.innerHTML = "";
        if (cart.length === 0) {
            cartContainer.innerHTML = "<p>Noch leer</p>";
            renderMobileCart();
            return;
        }

        let sum = 0;
        for (let i = 0; i < cart.length; i++) {
            const item = cart[i];
            sum += item.price * item.quantity;
            const div = document.createElement("div");
            div.classList.add("cart-item");
            div.innerHTML =
                "<strong>" + item.name + "</strong><br>" +
                item.quantity + " x " + item.price.toFixed(2) + " € = " + (item.quantity * item.price).toFixed(2) + " €" +
                '<div class="cart-buttons">' +
                    '<button class="plus" data-index="' + i + '"><img src="./icon/button_add.jpg" alt="mehr"></button>' +
                    '<button class="minus" data-index="' + i + '"><img src="./icon/button_remove.jpg" alt="weniger"></button>' +
                    '<button class="remove" data-index="' + i + '"><img src="./icon/trash.jpg" alt="löschen"></button>' +
                '</div>';
            cartContainer.appendChild(div);
        }

        const sumDiv = document.createElement("div");
        sumDiv.classList.add("cart-summary");
        sumDiv.innerHTML =
            "<strong>Summe: " + sum.toFixed(2) + " €</strong><br>" +
            '<span class="highlight-red">Mindestbestellwert: 10 €</span>';
        cartContainer.appendChild(sumDiv);

        renderMobileCart();
    }

    updateCart();
};
