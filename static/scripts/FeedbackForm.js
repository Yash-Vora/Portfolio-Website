// JQuery For Validation

//Regular Expression Declaration - Globally.
var $FNameLNameRegEx = /^([a-zA-Z]{2,20})$/;
var $EmailIdRegEx = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,8}\b$/i;

var $FirstNameValidationFlag = false, $LastNameValidationFlag = false, $CityValidationFlag = false, $EmailValidationFlag = false, $FeedbackValidationFlag = false;

function storeDataInGoogleSheet() {
    var u_data = {
        FirstName : $('#FirstName').val(),
        LastName : $('#LastName').val(),
        City : $('#City').val(),
        Email : $('#Email').val(),
        Feedback : $('#Feedback').val()
    };

    $.ajax({
        type : 'POST',
        url : 'https://sheetdb.io/api/v1/c67or4zs962rx',
        data : u_data,
        beforeSend : function() {
            $('.loader').show();
            $('#submit').hide();
        },
        success : function() {
            $('.loader').hide();
            $('#submit').show();
            $('#submit').attr('disabled', true);
            $('#BtnSuccess').html('Thanks For Your Feedback');
            $('#BtnError').hide();
        },
        error : function() {
            $('.loader').hide();
            $('#submit').show();
            $('#BtnError').html('Some Error Has Occured. Please Give Your Feedback Again.');
        }
    }); 
}

// Initialize JQuery
$(document).ready(function(){
    $('.loader').hide();
    // First Name Validation
    $('#FirstName').blur(function(){
        $('#FirstNameValidation').empty();
        if($(this).val() == '') {
            $('#FirstNameValidation').html('Field is mandatory...!');
        } 
        else if(!$(this).val().match($FNameLNameRegEx)) {
            $('#FirstNameValidation').html('Invalid First Name...!');
        }    
    });

    // Last Name Validation
    $('#LastName').blur(function(){
        $('#LastNameValidation').empty();
        if($(this).val() == '') {
            $('#LastNameValidation').html('Field is mandatory...!');
        } 
        else if(!$(this).val().match($FNameLNameRegEx)) {
            $('#LastNameValidation').html('Invalid Last Name...!');
        }    
    });

    // City Validation
    $('#City').blur(function(){
        $('#CityValidation').empty();
        if($(this).val() == '') {
            $('#CityValidation').html('Field is mandatory...!');
        } 
        else if(!$(this).val().match($FNameLNameRegEx)) {
            $('#CityValidation').html('Invalid City Name...!');
        }    
    });

    // Email Validation
    $('#Email').blur(function(){
        $('#EmailValidation').empty();
        if($(this).val() == '') {
            $('#EmailValidation').html('Field is mandatory...!');
        } 
        else if(!$(this).val().match($EmailIdRegEx)) {
            $('#EmailValidation').html('Invalid Email...!');
        }    
    });

    // Feedback Validation
    $('#Feedback').blur(function(){
        $('#FeedbackValidation').empty();
        if($(this).val() == '') {
            $('#FeedbackValidation').html('Field is mandatory...!');
        }  
    });

    // First Name Validation for Keypress
    $('#FirstName').keypress(function(e){
        $('#FirstNameValidation').empty();
        var flag = false;
        var ascciValue = parseInt(e.which);
        if((ascciValue >= 65 && ascciValue <= 90) || (ascciValue >= 97 && ascciValue <= 122)) {
            flag = true;
        }
        else {
            $('#FirstNameValidation').html('Invalid Input...!');
        }
        return flag;
    });

    // Last Name Validation for Keypress
    $('#LastName').keypress(function(e){
        $('#LastNameValidation').empty();
        var flag = false;
        var ascciValue = parseInt(e.which);
        if((ascciValue >= 65 && ascciValue <= 90) || (ascciValue >= 97 && ascciValue <= 122)) {
            flag = true;
        }
        else {
            $('#LastNameValidation').html('Invalid Input...!');
        }
        return flag;
    });

    // City Validation for Keypress
    $('#City').keypress(function(e){
        $('#CityValidation').empty();
        var flag = false;
        var ascciValue = parseInt(e.which);
        if((ascciValue >= 65 && ascciValue <= 90) || (ascciValue >= 97 && ascciValue <= 122)) {
            flag = true;
        }
        else {
            $('#CityValidation').html('Invalid Input...!');
        }
        return flag;
    });

    // All fields validation when submit button is clicked
    $('#submit').click(function(){
        // First Name Validation
        $FirstNameValidationFlag = false;
        $('#FirstNameValidation').empty();
        if($('#FirstName').val() == '') {
            $('#FirstNameValidation').html('Field is mandatory...!');
        } 
        else if(!$('#FirstName').val().match($FNameLNameRegEx)) {
            $('#FirstNameValidation').html('Invalid First Name...!');
        }
        else {
            $FirstNameValidationFlag = true;
        }

        // Last Name Validation
        $LastNameValidationFlag = false;
        $('#LastNameValidation').empty();
        if($('#LastName').val() == '') {
            $('#LastNameValidation').html('Field is mandatory...!');
        } 
        else if(!$('#LastName').val().match($FNameLNameRegEx)) {
            $('#LastNameValidation').html('Invalid Last Name...!');
        }
        else {
            $LastNameValidationFlag = true;
        }

        // City Validation
        $CityValidationFlag = false;
        $('#CityValidation').empty();
        if($('#City').val() == '') {
            $('#CityValidation').html('Field is mandatory...!');
        } 
        else if(!$('#City').val().match($FNameLNameRegEx)) {
            $('#CityValidation').html('Invalid City Name...!');
        }
        else {
            $CityValidationFlag = true;
        }

        // Email Validation
        $EmailValidationFlag = false;
        $('#EmailValidation').empty();
        if($('#Email').val() == '') {
            $('#EmailValidation').html('Field is mandatory...!');
        } 
        else if(!$('#Email').val().match($EmailIdRegEx)) {
            $('#EmailValidation').html('Invalid Email...!');
        }
        else {
            $EmailValidationFlag = true;
        }

        // Feedback Validation
        $FeedbackValidationFlag = false;
        $('#FeedbackValidation').empty();
        if($('#Feedback').val() == '') {
            $('#FeedbackValidation').html('Field is mandatory...!');
        }
        else {
            $FeedbackValidationFlag = true;
        }

        $('#BtnSuccess').empty();
        $('#BtnError').empty();
        // If all the fields are validated then following condition will work
        if($FirstNameValidationFlag == true && $LastNameValidationFlag == true && $CityValidationFlag == true && $EmailValidationFlag == true && $FeedbackValidationFlag == true) {
            storeDataInGoogleSheet();
        }
    });
});