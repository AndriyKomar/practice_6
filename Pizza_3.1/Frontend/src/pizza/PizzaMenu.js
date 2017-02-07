/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var PizzaCart = require('./PizzaCart');
var Pizza_List = require('../Pizza_List');

//HTML едемент куди будуть додаватися піци
var $pizza_list = $("#pizza_list");

var PizzaFilter = {
    meat: 0,
    pineapple: 1,
    mushroom: 2,
    ocean: 3,
    withotmeat: 4
};

function showPizzaList(list) {
    //Очищаємо старі піци в кошику
    $pizza_list.html("");

    //Онволення однієї піци
    function showOnePizza(pizza) {
        var html_code = Templates.PizzaMenu_OneItem({pizza: pizza});

        var $node = $(html_code);

        $node.find(".buy-big").click(function(){
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Big);
        });
        $node.find(".buy-small").click(function(){
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Small);
        });

        $pizza_list.append($node);
    }

    list.forEach(showOnePizza);
}

function filterPizza(filter) {
    //Масив куди потраплять піци які треба показати
    var pizza_shown = [];
    //Якщо піца відповідає фільтру
    if(filter==0){
        Pizza_List.forEach(function(pizza){
                if(pizza.content.meat){
                pizza_shown.push(pizza);
                }
        });
    }
    if(filter==1){
        Pizza_List.forEach(function(pizza){
                if(pizza.content.pineapple){
                pizza_shown.push(pizza);
                }
        });
        
    }
    if(filter==2){
        Pizza_List.forEach(function(pizza){
                if(pizza.content.mushroom){
                pizza_shown.push(pizza);
                }
        });
    }
    if(filter==3){
        Pizza_List.forEach(function(pizza){
                if(pizza.content.ocean){
                pizza_shown.push(pizza);
                }
        });
    }
    if(filter==4){
        Pizza_List.forEach(function(pizza){
            if(pizza.content.meat || pizza.content.ocean){
            }
            else{
                pizza_shown.push(pizza);
            }
        });
    }
    //Показати відфільтровані піци
     $(".amount-pizza").html(pizza_shown.length);
    showPizzaList(pizza_shown);
}

function filter(pizza_list) {
     $("#all-pizza").click(function(){
        $(".pizza-filter").removeClass("active");
        $("#all-pizza").addClass("active");
        showPizzaList(Pizza_List);
        console.log("len", Pizza_List.length);
        $(".amount-pizza").html(Pizza_List.length);
    });
    
    $("#meat").click(function(){
        $(".pizza-filter").removeClass("active");
        $("#meat").addClass("active");
        filterPizza(PizzaFilter.meat);
    });
    
    $("#pineapple").click(function(){
        $(".pizza-filter").removeClass("active");
        $("#pineapple").addClass("active");
        filterPizza(PizzaFilter.pineapple);
    });

    $("#mushroom").click(function(){
        $(".pizza-filter").removeClass("active");
        $("#mushroom").addClass("active");
        filterPizza(PizzaFilter.mushroom);
    });
    
    $("#ocean").click(function(){
        $(".pizza-filter").removeClass("active");
        $("#ocean").addClass("active");
        filterPizza(PizzaFilter.ocean);
    });
    
    $("#withotmeat").click(function(){
        $(".pizza-filter").removeClass("active");
        $("#withotmeat").addClass("active");
        filterPizza(PizzaFilter.withotmeat);
    });
}

function initialiseMenu() {
    //Показуємо усі піци
    $("#all-pizza").addClass("active");
    $(".amount-pizza").html(Pizza_List.length);
    showPizzaList(Pizza_List);
    filter(Pizza_List);
}

exports.filterPizza = filterPizza;
exports.initialiseMenu = initialiseMenu;