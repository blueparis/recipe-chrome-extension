console.log('content-script.js')


/*
    START OF:
    Making the ingredient list from the webpage content (for delish.com)

    Eventually, we want to know how to access the ingredient list from at least one other site.
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
    let measurement = ingredientInfo[0];
    // store that info
    ingredientList[name] = measurement;
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
    // In this example, message === 'whatever value; String, object, whatever'
    console.log(message);

    // First, figure out what the message is saying:
    // try to parse message as int or float
        // if it works, then we'll be modifying the ingredient portions
    // else, we're either:
        // going to be doing metric conversion
        // or doing substitution

    // After determining what we're doing, call the related function

});


// Re-proportion all ingredients by some multiplier
function reProportion(multiplier){
    let newIngredientList = [];
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
