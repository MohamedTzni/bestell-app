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
