/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var Storage = require('./LocalStorage');

//Перелік розмірів піци
var PizzaSize = {
    Big: "big_size",
    Small: "small_size"
};

//Змінна в якій зберігаються перелік піц в кошику
var Cart = [];
var amountPizza = 0;

var saveCart = Storage.get('cart', Cart);
var saveAmount = Storage.get('amount', amountPizza);

if(saveCart){
    Cart = saveCart;
    amountPizza = saveAmount;
}

//HTML едемент куди будуть додаватися піци
var $cart = $("#cart");
var $totalPrice = $cart.find('.sum');

function addToCart(pizza, size) {
    var index = findInCart(pizza, size);

    if (index == -1) {
      amountPizza+=1;
      Cart.push({
          pizza: pizza,
          size: size,
          quantity: 1
      });
    } else {
      ++Cart[index].quantity;
    }

    Storage.set("cart", Cart);

    //Оновити вміст кошика на сторінці
    updateCart();
}

function findInCart(pizza, size) {
  var index = -1;

  for (var i = 0; i < Cart.length; ++i) {

    if (Cart[i].pizza == pizza && Cart[i].size == size) {
      index = i;
      break;
    }

  }

  return index;
}

function removeFromCart(cart_item) {
    //Видалити піцу з кошика
    var index = Cart.indexOf(cart_item);

    if (index != -1) {
      Cart.splice(index, 1);
      Storage("cart", Cart);
    }

    //Після видалення оновити відображення
    updateCart();
}

function clearCart() {
  Cart = [];

  Storage.remove("cart");
  updateCart();
}

function initialiseCart() {
    //Фукнція віпрацьвуватиме при завантаженні сторінки
    //Тут можна наприклад, зчитати вміст корзини який збережено в Local Storage то показати його
    $(".clean-order").click(clearCart);

    updateCart();
}

function getPizzaInCart() {
    //Повертає піци які зберігаються в кошику
    return Cart;
}

function updateTotalPrice() {
  var totalSum = 0;

  for (var i = 0; i < Cart.length; ++i) {
    var cart_item = Cart[i];

    totalSum += cart_item.quantity * cart_item.pizza[cart_item.size].price;
  }

  $totalPrice.html(sum + " грн");
}

function updateCart() {
    //Функція викликається при зміні вмісту кошика
    //Тут можна наприклад показати оновлений кошик на екрані та зберегти вміт кошика в Local Storage
    saveCart = Storage.get('cart', Cart);
    //Очищаємо старі піци в кошику
    $cart.html("");
    if(amountPizza > 0){
        $(".board-label").attr("style", "display:none");
    }
    if(amountPizza === 0){
        $(".board-label").removeAttr("style");
    }
    //Онволення однієї піци
    function showOnePizzaInCart(cart_item) {
        var html_code = Templates.PizzaCart_OneItem(cart_item);

        var $node = $(html_code);

        $node.find(".plus_button").click(function(){
            //Збільшуємо кількість замовлених піц
            cart_item.quantity += 1;

            //Оновлюємо відображення
            updateCart();
        });

        $node.find(".minus_button").click(function(){
            //Зменшуємо кількість замовлених піц
            if(cart_item.quantity===1){
                removeFromCart(cart_item);
                amountPizza -=1;
            }
            else{
                cart_item.quantity -= 1; 
            }

            //Оновлюємо відображення
            updateCart();
        });
        
        
        $node.find(".delete").click(function(){
            //Видаляємо замовлену піцу
            amountPizza -=1;
            removeFromCart(cart_item);
            
            //Оновлюємо відображення
            updateCart();
        });
        
        $(".clean-order").click(function(){
            //Очищаємо замовлення
            countPizza = 0;
            clearCart();
            
            //Оновлюємо відображення
            updateCart();
        });
        
        $cart.append($node);
    }

    Cart.forEach(showOnePizzaInCart);

    Storage.set('cart', Cart);
    Storage.set('amount', amountPizza);
    
    if(Cart.length>0){
        $(".sum-text").removeAttr("style");
        $(".sum").removeAttr("style");
        $(".sum").html(totalSum + " грн.");
        $(".amount").html(countPizza);
    }
    else{
        $(".sum-text").attr("style", "display:none");
        $(".sum").attr("style", "display:none");
        $(".amount").html(countPizza);
    }
    
    updateTotalPrice();
}

exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;

exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;

exports.PizzaSize = PizzaSize;