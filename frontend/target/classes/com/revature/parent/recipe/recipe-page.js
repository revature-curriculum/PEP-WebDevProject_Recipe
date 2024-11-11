/**
 * This script defines the CRUD operations for Recipe objects in the Recipe Management Application.
 */

/**
 * 1. Get references to various DOM elements, such as buttons and input elements, using the document object's `getElementById()` method.
 */
const addRecipeNameInput = document.getElementById('add-recipe-name-input');
const addRecipeInstructionsInput = document.getElementById('add-recipe-instructions-input');
const updateRecipeNameInput = document.getElementById('update-recipe-name-input');
const updateRecipeInstructionsInput = document.getElementById('update-recipe-instructions-input');
const deleteRecipeNameInput = document.getElementById('delete-recipe-name-input');
const recipeListContainer = document.getElementById('recipe-list');

/**
 * 2. Ensure the buttons have their 'onclick' events associated with a corresponding function.
 */
document.getElementById('add-recipe-submit-input').onclick = addRecipe;
document.getElementById('update-recipe-submit-input').onclick = updateRecipe;
document.getElementById('delete-recipe-submit-input').onclick = deleteRecipe;

/**
 * 3. Create an object, like an array, to keep track of recipes.
 */
let recipes = [];

/**
 * 4. Ensure that, on start up, the recipe list is refreshed.
 */
refreshRecipeList();

/**
 * 5. Provide implementations to the below four functions.
 */

/**
 * Function to add a new recipe to the list.
 */
function addRecipe() {
    const name = addRecipeNameInput.value.trim();
    const instructions = addRecipeInstructionsInput.value.trim();

    if (name && instructions) {
        recipes.push({ name, instructions });
        refreshRecipeList();
        addRecipeNameInput.value = '';
        addRecipeInstructionsInput.value = '';
    } else {
        alert("Please enter both recipe name and instructions.");
    }
}

/**
 * Function to update an existing recipe's instructions.
 */
function updateRecipe() {
    const name = updateRecipeNameInput.value.trim();
    const instructions = updateRecipeInstructionsInput.value.trim();

    const recipe = recipes.find(recipe => recipe.name === name);
    if (recipe) {
        recipe.instructions = instructions;
        refreshRecipeList();
        updateRecipeNameInput.value = '';
        updateRecipeInstructionsInput.value = '';
    } else {
        alert("Recipe not found.");
    }
}

/**
 * Function to delete a recipe from the list.
 */
function deleteRecipe() {
    const name = deleteRecipeNameInput.value.trim();

    const index = recipes.findIndex(recipe => recipe.name === name);
    if (index !== -1) {
        recipes.splice(index, 1);
        refreshRecipeList();
        deleteRecipeNameInput.value = '';
    } else {
        alert("Recipe not found.");
    }
}

/**
 * Function to refresh and display the list of recipes on the webpage.
 */
function refreshRecipeList() {
    recipeListContainer.innerHTML = ''; // Clear the list

    recipes.forEach((recipe) => {
        const recipeElement = document.createElement('li');
        recipeElement.innerHTML = `<strong>${recipe.name}</strong>: ${recipe.instructions}`;
        recipeListContainer.appendChild(recipeElement);
    });
}
