console.log('content-script.js')


/*
    START OF:
    Making the ingredient list from the webpage content (for delish.com)

 */

// We know that on delish.com, the ingredients are stored in elements of class "ingredient-item", so:
let htmlIngredientList = Array.from(document.getElementsByClassName("ingredient-item"));

// For each ingredient, store it's name and measurement
let ingredientList = {};
htmlIngredientList.forEach(function (html) {
    // parse ingredient html into list where:
    //  ["measurement","","name"]
    let ingredientInfo = html.innerText.trim().split("\n");
    // access right info
    let name = ingredientInfo[2];
    let amt = ingredientInfo[0];
    // store that info
    ingredientList[name] = amt;
})

console.log(ingredientList)

// console.log(htmlIngredientList);

/*
    END OF:
    Making the ingredient list from the webpage content (for delish.com)
 */





/*
    START OF:
    Modifying the ingredient list

    This content-script will wait until the popup sends it a message about what aspects of the ingredients to modify.
    It will then handle the message and execute a script accordingly.
*/

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    // Handle message.

    console.log(message);

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
    // recognize how we multiplying the ingredient
    // parse each ingredient amount

    // what to do next:
        // parse fraction
        // convert or whatever
        // get the right fraction
        // finish making new ingredient list
        // replace list on page with new list

function reProportion(multiplier){
    let newIngredientList = {};
    Object.entries(ingredientList).forEach(ing => {
        const [name, amt] = ing;
        console.log(name, amt);

        // "2 1/4 c." , we wanna double it

        // "2 1/4"  "c."



        var nonLettersRegex = /[^a-zA-Z]/g;
        var lettersRegex = /[a-zA-Z]/g;
        var wordAmt = amt.match(lettersRegex).join("");
        var numberAmt = amt.match(nonLettersRegex).join("");
        console.log(numberAmt, wordAmt);


        if(numberAmt.includes("/")){

            function fractionToDecimal(fraction) {
                return fraction
                    .split('/')
                    .reduce((numerator, denominator, i) =>
                        numerator / (i ? denominator : 1)
                    );
            }
        }

    });

    // do stuff and update webpage
}

// Convert metrics of all ingredients
function convertMetrics(isImperial){
    let newIngredientList = [];
    // do stuff and update webpage
}

// Make substitutions to specific ingredients
function makeSubstitutions(ingredients){
    let newIngredientList = [];
    // do stuff and update webpage
}


/*
    END OF:
    Modifying the ingredient list
 */



// step 1: find ingredients for allrecipes.com
// var ingredientJSON = "";
// find script with ingredient details
// document.getElementsByTagName("script").forEach( function(script){
//     if (script.type == "application/ld+json"){
//         ingredientScript = script;
//     }
// })
// var ingredientList = ingredientJSON[1]["recipeIngredient"];
// var fractionOfIngredient = ingredientList[1][0].normalize('NFKD').split("\u2044")
