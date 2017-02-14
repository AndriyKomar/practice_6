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
var totalSum;
    
var saveCart = Storage.get('cart', Cart);
var saveAmount = Storage.get('amount', amountPizza);
var saveSum = Storage.get('sum', totalSum);

if(saveCart){
    Cart = saveCart;
    amountPizza = saveAmount;
    totalSum = saveSum;
}

//HTML едемент куди будуть додаватися піци
var $cart = $("#cart");
var price = 0;
    
function addToCart(pizza, size) {
    var index = findInCart(pizza, size);
    
    if(size===PizzaSize.Big){
        price = pizza.big_size.price;
    }
    else{
        price = pizza.small_size.price;        
    }
    
    if (index == -1) {
      amountPizza+=1;
      Cart.push({
          pizza: pizza,
          size: size,
          price: price,
          quantity: 1
      });
    } else {
      ++Cart[index].quantity;
        amountPizza+=1;
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
      Storage.set("cart", Cart);
    }

    //Після видалення оновити відображення
    updateCart();
}

function clearCart() {
  Cart.splice(0, Cart.length);
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
    
function updateCart() {
    //Функція викликається при зміні вмісту кошика
    //Тут можна наприклад показати оновлений кошик на екрані та зберегти вміт кошика в Local Storage
    saveCart = Storage.get('cart', Cart);
    //Очищаємо старі піци в кошику
    $cart.html("");
    totalSum = 0;
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
        
        totalSum = totalSum + cart_item.quantity*cart_item.price;

        $node.find(".plus_button").click(function(){
            //Збільшуємо кількість замовлених піц
            cart_item.quantity += 1;
            amountPizza +=1;
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
            amountPizza = amountPizza - cart_item.quantity;
            removeFromCart(cart_item);
            
            //Оновлюємо відображення
            updateCart();
        });
        
        $(".clean-order").click(function(){
            //Очищаємо замовлення
            amountPizza = 0;
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
        $(".order").removeAttr("disabled");
        $(".sum_text").removeAttr("style");
        $(".sum").removeAttr("style");
        $(".sum").html(totalSum + " грн.");
        $(".amount").html(amountPizza);
    }
    else{
        $(".order").attr("disabled", "disabled");
        $(".sum_text").attr("style", "display:none");
        $(".sum").attr("style", "display:none");
        $(".amount").html(amountPizza);
    }
}

exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;

exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;

exports.PizzaSize = PizzaSize;