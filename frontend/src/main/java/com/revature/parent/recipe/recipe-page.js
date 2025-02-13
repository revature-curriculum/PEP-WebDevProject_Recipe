/**
 * This script defines the CRUD operations for Recipe objects in the Recipe Management Application.
 */

const BASE_URL = "http://localhost:8081"; // MockServer + backend URL

/* 
 * TODO: Get references to various DOM elements
*/


/* 
 * TODO: Attach 'onclick' events to buttons
*/

/* 
 * TODO: Create an array to keep track of recipes.
*/
let recipes;

/* 
 * TODO: Ensure that, on start up, we call getRecipes() and displayAdminLink() functions
*/


/**
 * TODO: Add Recipe Function
 * 
 * Requirements:
 * - Capture recipe name and instructions from input fields
 * - Validate input fields are not empty
 * - Send POST request to create new recipe
 * - Handle successful recipe addition
 * - Clear input fields after submission
 * - Refresh recipe list
 * 
 * Hints:
 * - Use fetch with 'POST' method
 * - ensure, within the headers, the Authorization header contains "Bearer " + the auth-token that should be within session storage
 * - Trim input values to remove whitespace
 * - Add error handling for failed requests
 * - Verify input before sending request
 */
async function addRecipe() {
    // Implement add recipe logic here
}


/**
 * TODO: Delete Recipe Function
 * 
 * Requirements:
 * - Capture recipe name from input field
 * - Find corresponding recipe ID
 * - Send DELETE request to remove recipe
 * - Handle successful recipe deletion
 * - Clear input field after submission
 * - Refresh recipe list
 * 
 * Hints:
 * - Use fetch with 'DELETE' method
 * - ensure, within the headers, the Authorization header contains "Bearer " + the auth-token that should be within session storage
 * - Locate recipe ID based on recipe name
 * - Add error handling for failed deletion
 * - Validate input before sending request
 */
async function deleteRecipe() {
    // Implement delete recipe logic here
}


/**
 * TODO: Refresh Recipe List Function
 * 
 * Requirements:
 * - Fetch all recipes from backend
 * - Store fetched recipes in the local recipes array
 * - calls refreshRecipeList() to ensure webpage has accurate list of recipes displayed
 * - Handle potential fetch errors
 * 
 * Hints:
 * - Use fetch with 'GET' method
 * - Parse JSON response
 * - Add error logging
 */
async function getRecipes() {
    // Implement getRecipes logic here
}

/**
 * TODO: Refresh Recipe List Function
 * 
 * Requirements:
 * - Clear existing recipe list HTML container
 * - Populate list with contents in recipes array
 */
async function refreshRecipeList() {
    // Implement recipe list refresh logic here
}


/**
 * TODO: Update Recipe Function
 * 
 * Requirements:
 * - Capture recipe name and new instructions from input fields
 * - Find corresponding recipe ID
 * - Send PUT request to update recipe instructions
 * - Refresh recipe list after successful update
 * - Handle potential errors
 * 
 * Hints:
 * - Use fetch with 'PUT' method
 * - Construct URL with recipe ID
 * - Validate input before sending request
 * - Clear input fields after update
 */
async function updateRecipe() {
    // Implement update recipe logic here
}


/**
 * TODO: Search Recipe Function
 * 
 * Requirements:
 * - Capture search term from input field
 * - Fetch all recipes from backend
 * - Filter recipes based on search term (case-insensitive)
 * - Clear existing recipe list
 * - Display matching recipes or "No results" message
 * - Handle potential fetch errors
 * 
 * Hints:
 * - Use fetch with 'GET' method to retrieve all recipes
 * - Use .filter() to find matching recipes
 * - Compare recipe names using toLowerCase()
 * - Create list items dynamically for search results
 * - Add error handling for failed searches
 * - Validate input before searching
 */
async function searchRecipes() {
    // Implement search recipe logic here
}

/**
 * TODO: Process Logout Function
 * 
 * Requirements:
 * - Send POST request to logout endpoint
 *      - ensure, within the headers, the Authorization header contains "Bearer " + the auth-token that should be within session storage
 * - Handle different response status codes:
 *      - On successful logout, removes the auth-token from session storage
 *      - On failed logout, alert the user
 */
async function processLogout() {
    // Implement Logic Here
}

/**
 * TODO: Check if user is admin
 * 
 * This function should check session storage to see if the user is admin. If so, change the display of the admin-link HTML element to "inline".
 * 
 */
function displayAdminLink() {
    // Implement Logic Here
}