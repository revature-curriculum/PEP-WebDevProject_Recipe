/**
 * This script defines the CRUD operations for Recipe objects in the Recipe Management Application.
 */

const BASE_URL = "http://localhost:8081"; // MockServer + backend URL

// Get references to various DOM elements
const addRecipeNameInput = document.getElementById('add-recipe-name-input');
const addRecipeInstructionsInput = document.getElementById('add-recipe-instructions-input');
const updateRecipeNameInput = document.getElementById('update-recipe-name-input');
const updateRecipeInstructionsInput = document.getElementById('update-recipe-instructions-input');
const deleteRecipeNameInput = document.getElementById('delete-recipe-name-input');
const recipeListContainer = document.getElementById('recipe-list');

// Attach 'onclick' events to buttons
document.getElementById('add-recipe-submit-input').onclick = addRecipe;
document.getElementById('update-recipe-submit-input').onclick = updateRecipe;
document.getElementById('delete-recipe-submit-input').onclick = deleteRecipe;

let recipes = [];

// Refresh recipe list on startup
refreshRecipeList();

/**
 * Function to add a new recipe to the backend and refresh the list.
 * 
 *  TODO: Add Recipe Function
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
 * - Trim input values to remove whitespace
 * - Add error handling for failed requests
 * - Verify input before sending request
 */
async function addRecipe() {
    const name = addRecipeNameInput.value.trim();
    const instructions = addRecipeInstructionsInput.value.trim();
    
    if (name && instructions) {
        fetch(`${BASE_URL}/recipes`, {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + sessionStorage.getItem("auth-token")
             },
            body: JSON.stringify({ name, instructions }),
        })
            .then((response) => {
                if (!response.ok) throw new Error("Failed to add recipe.");
            })
            .then(() => {
                refreshRecipeList();
                addRecipeNameInput.value = '';
                addRecipeInstructionsInput.value = '';
            })
            .catch((error) => alert(error.message));
    } else {
        alert("Please enter both recipe name and instructions.");
    }
}

/**
 * Function to update an existing recipe's instructions in the backend.
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
    const name = updateRecipeNameInput.value.trim();
    const instructions = updateRecipeInstructionsInput.value.trim();
    let id = 0;
    
    const listItems = recipeListContainer.getElementsByTagName('li');
    
    for (let i = 0; i < listItems.length; i++) {
        if (listItems[i].textContent.includes(name)) {
            id = i + 1;
        }
    }

    if (name && instructions) {
        fetch(`${BASE_URL}/recipes/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ instructions }),
        })
            .then((response) => {
                if (!response.ok) throw new Error("Failed to update recipe.");
                
            })
            .then(() => {
                refreshRecipeList();
                updateRecipeNameInput.value = '';
                updateRecipeInstructionsInput.value = '';
            })
            .catch((error) => alert(error.message));
    } else {
        alert("Please enter both recipe name and updated instructions.");
    }
}

/**
 * Function to delete a recipe from the backend and refresh the list.
 * 
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
 * - Locate recipe ID based on recipe name
 * - Add error handling for failed deletion
 * - Validate input before sending request
 */
async function deleteRecipe() {
    const name = deleteRecipeNameInput.value.trim();
    const listItems = recipeListContainer.getElementsByTagName('li');
    
    for (let i = 0; i < listItems.length; i++) {
        if (listItems[i].textContent.includes(name)) {
            id = i + 1;
        }
    }

    if (name) {
        fetch(`${BASE_URL}/recipes/${id}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (!response.ok) throw new Error("Failed to delete recipe.");
                
            })
            .then(() => {
                refreshRecipeList();
                deleteRecipeNameInput.value = '';
            })
            .catch((error) => alert(error.message));
    } else {
        alert("Please enter the recipe name to delete.");
    }
}

/**
 * Function to fetch and display the list of recipes from the backend.
 * 
 *  TODO: Refresh Recipe List Function
 * 
 * Requirements:
 * - Fetch all recipes from backend
 * - Clear existing recipe list container
 * - Populate list with fetched recipes
 * - Store fetched recipes in local array
 * - Handle potential fetch errors
 * 
 * Hints:
 * - Use fetch with 'GET' method
 * - Parse JSON response
 * - Create list items dynamically
 * - Add error logging
 */
async function refreshRecipeList() {
    try {
        const response = await fetch(`${BASE_URL}/recipes`);
        const data = await response.json();
        recipes = data;
        recipeListContainer.innerHTML = '';
        recipes.forEach((recipe) => {
            const recipeElement = document.createElement('li');
            recipeElement.textContent = `${recipe.name}: ${recipe.instructions}`;
            recipeListContainer.appendChild(recipeElement);
        });
    } catch (error) {
        console.error("Error fetching recipes:", error);
    }
}
