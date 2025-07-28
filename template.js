function createDishTemplate(dish, index) {
  return '' +
    '<div class="dish">' +
      '<img src="' + dish.bild + '" alt="' + dish.name + '">' +
      '<div class="dish-info">' +
          '<h3>' + dish.name + '</h3>' +
          '<p class="price">' + dish.preis.toFixed(2) + ' €</p>' +
          '<p class="ingredients">' + dish.zutaten + '</p>' +
      '</div>' +
      '<button class="add-btn" data-index="' + index + '" title="Zum Warenkorb hinzufügen">' +
          '<img src="./icon/button_add.jpg" alt="Hinzufügen">' +
      '</button>' +
    '</div>';
}
