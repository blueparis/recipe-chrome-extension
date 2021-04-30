console.log('content-script.js')


/*
    START OF:
    Modifying the ingredient list

    This content-script will wait until the popup sends it a message about what aspects of the ingredients to modify.
    It will then handle the message and execute a script accordingly.
*/

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    // Handle message.

    console.log(message);

    reProportion(Number(message));

    // First, figure out what the message is saying:
    // try to parse message as int or float
    // if it works, then we'll be modifying the ingredient portions
    // call the reproportion function
    // else, we're either:
    // going to be doing metric conversion
    // or doing substitution

    // After determining what we're doing, call the related function

});


// Re-proportion all ingredients by some multiplier

// WHERE WE LEFT OFF 4/15
// changed structure of the method:
// NOT looking at ingredientList
// instead:
// for each ingredient amount, isolate number and multiply it
// what's left:
// configure fraction stuff

function reProportion(multiplier) {
    $.each($('.o-Ingredients__a-Ingredient--CheckboxLabel'), function () {

        let context = $(this).context.innerHTML;

        var mixedFractionRegex = new RegExp(/\d+\s+\d[/]\d/g);
        var fractionRegex = new RegExp(/(?<!\d\s)\d[/]\d/g);
        var wholeNumberRegex = new RegExp(/(\b[^/]\d[^/]\b)|(\b(?<!(\d\s|[/]))\d(?!(\s\d|[/]))\b)/g);

        // update the newContext string each time we call applyRegexAndMultiply

        var newContext = applyRegexAndMultiply(context, wholeNumberRegex, multiplier);
        // newContext = applyRegexAndMultiply(mixedFractionRegex);
        // newContext = applyRegexAndMultiply(context,fractionRegex);
        $(this).context.innerHTML = newContext;
    });
}

/*
    Applies regex function to the context (innerHTML) of some element on a FoodNetwork recipe.
    The goal is to multiply ingredients by some value.
 */

function applyRegexAndMultiply(context, myRegex, multiplier) {

    // split up context into char array, so it's easier to change values of
    let charArray = context.split("");
    let ogLength = charArray.length;
    console.log("\n\nFOR: ", context);


    // while there are matches in the context for our regex expression
    // (e.g. the string "5 tablespoons and 1 teaspoon" has 2 matches for wholeNumberRegex)
    while ((match = myRegex.exec(context)) !== null) {
        var value = match[0]; // e.g. "5"

        // to-do: fraction functionality
        // fraction converted to decimal (only works for normal fracs rn)
        if (value.includes("/")) {
            value = value
                .split('/')
                .reduce((numerator, denominator, i) =>
                    numerator / (i ? denominator : 1)
                );
        } else {
            if (value.includes(" ")){
                value = Number(value.toString().trim());
                match.index++;
            }
            else{
                value = Number(value);
            }
        }

        // ANOTHER PROBLEM:
        // preceding conversions in an ingredient string (e.g. in string "5 tb and 3 tsp", 5 tb will be converted before 3 tsp)
        // may affect following conversions because the index of the string will be changed.
        // we try to account for that here.
        let shift = charArray.length - ogLength;
        let startIX = match.index + shift;
        let endIX = myRegex.lastIndex + shift;

        // multiply value
        let newValue = (value * multiplier).toString();
        if (newValue.includes(".")){
            newValue = convertToFraction(newValue);
        }


        // I learned that sometimes we need to "offset" the charArray to make room for a bigger number
        // i.e. if our value was 5 and our newValue is 10, then we need to account for 1 new char ("0")
        // so, we set an offset value and pop as much room in as we need
        // DOESN'T ACCOUNT FOR 10 -> 5 :/
        let offset = newValue.length - value.toString().length+1;
        if (offset > 0) {
            charArray = (charArray.join("").substring(0, startIX + 1)
                + " ".repeat(offset)
                + charArray.join("").substring(endIX, charArray.length)).split("");
        }

        // for each char of the newValue (e.g. "10"),
        // update the right element in the charArray accordingly
        for (let i = 0; i < newValue.length; i++) {
            charArray[startIX + i] = newValue[i];
            console.log("new charArray",charArray);
        }
    }

    // finally, return the new context, i.e. the charArray turned into a string
    return charArray.join("");
}

// TO BE IMPLEMENTED

// multiplies fraction by some multiplier

function convertToFraction(decimal) {

    var gcd = function(a, b) {
        if (b < 0.0000001) return a;                // Since there is a limited precision we need to limit the value.

        return gcd(b, Math.floor(a % b));           // Discard any fractions due to limitations in precision.
    };


    var len = decimal.toString().length - 2;

    var denominator = Math.pow(10, len);
    var numerator = decimal * denominator;

    var divisor = gcd(numerator, denominator);    // Should be 5

    numerator /= divisor;                         // Should be 687
    denominator /= divisor;                       // Should be 2000

    return Math.floor(numerator) + '/' + Math.floor(denominator);
}

// do stuff and update webpage


// Convert metrics of all ingredients
function convertMetrics(isImperial) {
    let newIngredientList = [];
    // do stuff and update webpage
}

// Make substitutions to specific ingredients
function makeSubstitutions(ingredients) {
    let newIngredientList = [];
    // do stuff and update webpage
}
/*
    END OF:
    Modifying the ingredient list
 */


// The ultimate plan of this function:

// 1. access the ingredient again

// 2. change either:
// 1) measurement
// 2) ingredient name OR
// 3) measurement AND measurement type


function makeChanges(newIngredientList) {
    // make the changes to the actual webpage content


    // let htmlIngredientList = Array.from(document.getElementsByClassName("ingredient-item"));

    // This is a JQuery script, which does the following:
    // 1. for the entire body of the webpage html (except for scripts), filter by nodeType 3 (Text only)
    // 2. replace all instances of the current word with the word strikethrough'd and capitalized (cause y not)

    finalIngredients = {"chicken": "1"}

    $.each($('.ingredient-amount'), function () {
        console.log($(this).context.innerHTML);
        $(this).context.innerHTML = "test";


    });

}