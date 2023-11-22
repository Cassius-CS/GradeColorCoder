var numberRange = [];
var location = 0;

var submitColors = document.getElementById("submitColors");

submitColors.addEventListener("click",submitColors(e));

function checkHGreen(hGreenInput){
    if(hGreenInput <= 99.99){
        console.log("The High Green value has to be 100 or above");
        return true;
    }
    numberRange[location] = hGreenInput;
    location = location + 1;
    return false;
}

function checkEveryColor(hColor,lColor,lstringcolor,hstringcolor,ltype,htype){
    if(lColor < 0){
        console.log("The value of " + ltype + lstringcolor + " can not be negative");
        return true;
    }
    if(lColor >= hColor){
        console.log("The value of " + ltype + lstringcolor + " can not be greater than " + htype + hstringcolor);
        return true;
    }
    numberRange[location] = lColor;
    location = location + 1;
    return false;
}

function checkLRed(lRedInput){
    if(lRedInput >= .01){
        console.log("The low red value has to be 0");
        return true
    }
    if(lRedInput < 0){
        console.log("The low red value can not be negative");
        return true;
    }
    numberRange[location] = lRedInput;
    location = location + 1;
    return false;
}
function submitColors(event){
    var hGreenInput = parseFloat(document.getElementById("highGreenInput".value));
    var lGreenInput = parseFloat(document.getElementById("lowGreenInput").value);

    var hYellowInput = parseFloat(document.getElementById("highYellowInput").value);
    var lYellowInput = parseFloat(document.getElementById("lowYellowInput").value);

    var hRedInput = parseFloat(document.getElementById("highRedInput").value);
    var lRedInput = parseFloat(document.getElementById("lowRedInput").value);

    var isValidHGreen = checkHGreen(hGreenInput);
    var isValidLGreen = checkEveryColor(hGreenInput,lGreenInput,"Green","Green","low","high");
    var isValidHYellow = checkEveryColor(lGreenInput,hYellowInput,"Yellow","Green","low","high");
    var isValidLYellow = checkEveryColor(hYellowInput,lYellowInput,"Yellow","Yellow","low","high");
    var isValidHRed = checkEveryColor(lYellowInput,hRedInput,"Red","Yellow","low","high");
    var isValidLRed = checkLRed(lRedInput);

   if(!((isValidHGreen || isValidLGreen) || (isValidHYellow || isValidLYellow) || (isValidHRed || isValidLRed))){
        event.preventDefault();
    }
    return true;
}