var numberRange = [];
var location = 0;
var hGreenInput = document.getElementById("highGreenInput");
var lGreenInput = document.getElementById("lowGreenInput");

var hYellowInput = document.getElementById("highYellowInput");
var lYellowInput = document.getElementById("lowYellowInput");

var hRedInput = document.getElementById("highRedInput");
var lRedInput = document.getElementById("lowRedInput");

var submitColors = document.getElementById("submitColors");

submitColors.addEventListener("click",submitColors());

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
    var difference = hColor - lColor;
    if(difference > 1 || difference > .01){
        console.log("The difference between can not not be greater than 1 or .01");
        return true;
    }
    numberRange[location] = lColor;
    location = location + 1;
    return false;
}

function check(lRedInput){
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
function submitColors(){
   var isValidHGreen = checkHGreen(hGreenInput);
   var isValidLGreen = checkEveryColor(hGreenInput,lGreenInput,"Green","Green","low","high");
   var isValidHYellow = checkEveryColor(lGreenInput,hYellowInput,"Yellow","Green","low","high");
   var isValidLYellow = checkEveryColor(hYellowInput,lYellowInput,"Yellow","Yellow","low","high");
   var isValidHRed = checkEveryColor(lYellowInput,hRedInput,"Red","Yellow","low","high");
   var isValidLRed = checkLRed(lRedInput);

   if((isValidHGreen || isValidLGreen) || (isValidHYellow || isValidLYellow) || (isValidHRed || isValidLRed)){
    return false;
   }
   return true;
}