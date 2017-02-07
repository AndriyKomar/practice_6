var API = require('../API');
var PizzaCart = require('./PizzaCart');

function newOrder() {
    var number_field = /^[0-9]*$/;

    var name_field = /^[А-Я]{0,2}[а-я]{1,30}( [А-Я]{0,2}[а-я]{1,30}){0,2}$|^[A-Z]{0,2}[a-z]{1,30}( [A-Z]{0,2}[a-z]{1,30}){0,2}$/;
    function checkName(name){
        if(name!="" && name_field.test(name)){
            $("#help_block_name").attr("style", "display:none");
            $("#name").addClass("has-success");
            return true;
        }
        else{
            $("#help_block_name").addClass("has-success");
            $("#help_block_name").removeAttr("style");
            return false;
        }  
    }
    var name;
    $("#name").keypress(function(e) {
        if(e.which == 13) {
            name = $("#name").val();
            checkName(name);
        }
    });   
    
    
    function checkPhone(phone){
        if(phone!="" && number_field.test(phone)){
            $("#help_block_phone").attr("style", "display:none");
            $("#phone").addClass("has-success");
            return true;
        }
        else{
            $("#help_block_phone").addClass("has-success");
            $("#help_block_phone").removeAttr("style");
            return false;
        }  
    }
    
    var phone;
    $("#phone").keypress(function(e) {
        if(e.which == 13) {
            phone = $("#phone").val();
            checkPhone(phone);
        }
    });
    
}

exports.newOrder = newOrder;