function validName() {
    $("#help_block_name").addClass("not_show");
    var re = /^[A-Z]{1}[a-z]+[" "][A-Z]{1}[a-z]+$|^[А-Я]{1}[а-я]+[" "][А-Я]{1}[а-я]+$/;
    var myName = document.getElementById('name').value;
    var valid = re.test(myName);    
    if (valid){
       document.getElementById('help_block_name').style.display='none';
        document.getElementById('block_name').style.color='green';
        document.getElementById('name').style.borderColor='green';
    } 
    else{
        document.getElementById('help_block_name').style.display='';
        document.getElementById('block_name').style.color='red';
        document.getElementById('name').style.borderColor='red';
    }
}

function validPhone() {
    var re = /^\+380\d{9}$|^\d{10}$/;
    var myPhone = document.getElementById('phone').value;
    var valid = re.test(myPhone);
    if (valid){
       document.getElementById('help_block_phone').style.display='none';
        document.getElementById('block_phone').style.color='green';
        document.getElementById('phone').style.borderColor='green';
    } 
    else{
        document.getElementById('help_block_phone').style.display='';
        document.getElementById('block_phone').style.color='red';
        document.getElementById('phone').style.borderColor='red';
    }
}

function check(){
    $("#continue").click(validName);
    $("#continue").click(validPhone);
}
exports.check = check;