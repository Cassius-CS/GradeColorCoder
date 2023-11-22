var numberRange = [];
var location = 0;

var highGreenInput;
var lGreenInput;
var hYellowInput;
var lYellowInput;
var hRedInput;
var lRedInput;

var submitColor = document.getElementById("submitColors");

submitColor.addEventListener("click",submitColors);

function checkHGreen(hGreenInput,errorMessage){
    var hRedMessage = document.getElementById(errorMessage);
    if(isNaN(hGreenInput)){
        hRedMessage.innerHTML = "Can not be empty";
        return true;
    }
    if(hGreenInput <= 99.99){
        hRedMessage.innerHTML = "The High Green value has to be 100 or above";
        return true;
    }
    hRedMessage.innerHTML = "";
    numberRange[location] = hGreenInput;
    location = location + 1;
    return false;
}

function checkEveryColor(hColor,lColor,lstringcolor,hstringcolor,ltype,htype,errorMessage){
    var errorColorMessage = document.getElementById(errorMessage);
    if(isNaN(lColor)){
        errorColorMessage.innerHTML = "Can not be empty";
        return true;
    }
    if(lColor < 0){
        errorColorMessage.innerHTML = "The value of " + ltype + lstringcolor + " can not be negative";
        return true;
    }
    if(lColor >= hColor){
        errorColorMessage.innerHTML = "The value of " + ltype + lstringcolor + " can not be greater than " + htype + hstringcolor;
        return true;
    }

    errorColorMessage.innerHTML = "";
    numberRange[location] = lColor;
    location = location + 1;
    return false;
}

function checkLRed(lRedInput,errorMessage){
    var errorMessageLRed = document.getElementById(errorMessage);
    if(isNaN(lRedInput)){
        errorMessageLRed.innerHTML = "Can not be empty";
        return true;
    }
    if(lRedInput >= .01){
        errorMessageLRed.innerHTML = "The low red value has to be 0";
        return true
    }
    if(lRedInput < 0){
        errorMessageLRed.innerHTML = "The low red value can not be negative";
        return true;
    }
    errorMessageLRed.innerHTML = "";
    numberRange[location] = lRedInput;
    location = location + 1;
    return false;
}
function submitColors(event){
    highGreenInput = parseFloat(document.getElementById("highGreenInput").value);
    lGreenInput = parseFloat(document.getElementById("lowGreenInput").value);
    hYellowInput = parseFloat(document.getElementById("highYellowInput").value);
    lYellowInput = parseFloat(document.getElementById("lowYellowInput").value);

    hRedInput = parseFloat(document.getElementById("highRedInput").value);
    lRedInput = parseFloat(document.getElementById("lowRedInput").value);



    var isValidHGreen = checkHGreen(highGreenInput,"messageHGreen");
    var isValidLGreen = checkEveryColor(highGreenInput,lGreenInput,"Green","Green","low","high","messageLGreen");
    var isValidHYellow = checkEveryColor(lGreenInput,hYellowInput,"Yellow","Green","high","low","messageHYellow");
    var isValidLYellow = checkEveryColor(hYellowInput,lYellowInput,"Yellow","Yellow","low","high","messageLYellow");
    var isValidHRed = checkEveryColor(lYellowInput,hRedInput,"Red","Yellow","high","low","messageHRed");
    var isValidLRed = checkLRed(lRedInput,"messageLRed");

   if((isValidHGreen || isValidLGreen) || (isValidHYellow || isValidLYellow) || (isValidHRed || isValidLRed)){
        event.preventDefault();
    }
    return true;
}