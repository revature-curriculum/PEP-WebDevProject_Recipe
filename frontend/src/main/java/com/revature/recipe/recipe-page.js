/**
 * This script defines the CRUD operations for Recipe objects in the Recipe Management Application.
 */

// Get references to various DOM elements, such as buttons and input elements, using the document object's `getElementById()` method.


// Ensure the buttons have their 'onclick' events associated with a corresponding function.


// Create an array to keep track of recipes.
let recipes;

// Ensure that, on start up, the recipe list is refreshed.

/**
 * Function to refresh and display the list of recipes on the webpage.
 * 
 * This does the following:
 * - retreives the current list of recipes from the backend by performing a GET request to the URL `http://localhost:8081/recipes`
 * - converts the returned list to JSON and assigns it to the `recipes` array 
 * - clears the current recipe list within the relevant HTML element
 * - creates a <li> element for each recipe retrieved
 *     - each <li> element should have a <p> element that contains the recipe information in the following format: `name, instructions`
 * - the created elements should be correctly added to the DOM
 * - 
 */
function refreshRecipeList(){
    
}

/**
 * Function to add a new recipe to the list.
 * 
 * This function does the following:
 * - retrieves the current session's auth-token from storage
 * - collects input from the user for a new recipe's name and instructions
 * - creates a recipe object
 * - sends a POST request to `http://localhost:8081/recipes` with the appropriate request options.
 * - refreshes the recipe list that should then include the new recipe
 */
async function addRecipe(){
    let token;
    let options = {
        method: "POST",                 // HTTP method: POST for adding new data
        mode: "cors",                   // Enable Cross-Origin Resource Sharing (CORS)
        cache: "no-cache",              // Disable caching for fresh data on each request
        credentials: "same-origin",     // Use credentials only if on the same domain
        headers: {
            "Content-Type": "application/json",        // Specify JSON data format
            "Access-Control-Allow-Origin": "*",        // Allow requests from any origin
            "Access-Control-Allow-Headers": "*",       // Allow all headers
            "Authorization": token                     // Add token to authenticate the user
        },
        redirect: "follow",             // Follow redirects if they occur
        referrerPolicy: "no-referrer",  // Do not send a referrer header
        body: JSON.stringify(newRecipe) // Convert the recipe object to a JSON string for transmission
    };
}

/**
 * Function to update an existing recipe's instructions.
 * 
 * This function does the following:
 * - retrieves the current session's auth-token from storage
 * - collects input from the user for a recipe's name and new instructions
 * - finds the recipe in the array named `recipes` and updates its instructions
 * - sends a PUT request to the URL `http://localhost:8081/recipes/` that has the recipe's id concatenated to the end with the appropriate request options.
 *     - example URL: http://localhost:8081/recipes/1 where the recipe's id is 1
 * - refreshes the recipe list
 */
function updateRecipe(){
    let token;
    let options = {
        method: "PUT",                  // HTTP method: PUT for updating existing data
        mode: "cors",                   // Enable CORS
        cache: "no-cache",              // Disable caching for fresh data on each request
        credentials: "same-origin",     // Use credentials only if on the same domain
        headers: {
            "Content-Type": "application/json",        // Specify JSON data format
            "Access-Control-Allow-Origin": "*",        // Allow requests from any origin
            "Access-Control-Allow-Headers": "*",       // Allow all headers
            "Authorization": token                     // Add token to authenticate the user
        },
        redirect: "follow",             // Follow redirects if they occur
        referrerPolicy: "no-referrer",  // Do not send a referrer header
        body: JSON.stringify(recipe)    // Convert the updated recipe object to a JSON string
    };
}

/**
 * Function to delete a recipe from the list.
 * 
 * This function does the following:
 * - retrieves the current session's auth-token from storage
 * - collects input from the user for a recipe's name
 * - finds the recipe in the array named `recipes`
 * - sends a DELETE request to the URL `http://localhost:8081/recipes/` that has the recipe's id concatenated to the end with the appropriate request options.
 *     - example URL: http://localhost:8081/recipes/1 where the recipe's id is 1
 * - refreshes the recipe list
 */
function deleteRecipe(){
    let token;
    let options = {
        method: "DELETE",               // HTTP method: DELETE for removing data
        mode: "cors",                   // Enable CORS
        cache: "no-cache",              // Disable caching for fresh data on each request
        credentials: "same-origin",     // Use credentials only if on the same domain
        headers: {
            "Content-Type": "application/json",        // Specify JSON data format
            "Access-Control-Allow-Origin": "*",        // Allow requests from any origin
            "Access-Control-Allow-Headers": "*",       // Allow all headers
            "Authorization": token                     // Add token to authenticate the user
        },
        redirect: "follow",             // Follow redirects if they occur
        referrerPolicy: "no-referrer"   // Do not send a referrer header
    };
}

// helper function to get a recipe object by its name:
function getRecipeByName(name){
    let recipe = recipes.filter(recipe=>{return recipe.name==name})[0]
    return recipe;
}

