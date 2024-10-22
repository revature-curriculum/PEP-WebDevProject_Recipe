/**
 * This class abstracts the CRUD operations for Recipe objects in the Recipe Management Application.
 * It utilizes all of the classes that were created previously. This is mostly a pure functional class
 * as it doesn't store any state other than a ConnectionUtil reference for connecting to the database.
 * The implementation of this complete structure may seem like a lot of work to achieve a limited result,
 * but the infrastructure is more testable, maintainable, and extensible.
 */


class RecipeManager {


    /**
     * @param {ConnectionUtil} connectionUtil - The utility for managing database connections.
     */
    constructor(connectionUtil) {
        this.connectionUtil = connectionUtil;
    }

  

  /**
     * Retrieves all recipes from the database.
     * @returns {Promise<Array<Recipe>>} A promise that resolves to an array of all recipes.
     */
    async getAllRecipes() {
        // Implementation details...
    }



    /**
     * Retrieves a paginated list of all recipes.
     * @param {PageOption} pageOptions - The pagination options.
     * @returns {Promise<Page<Recipe>>} A promise that resolves to a Page object containing recipes.
     */
    async getAllRecipes(pageOptions) {
        // Implementation details...
    }



    /**
     * Searches for recipes based on a given term.
     * @param {string} term - The search term.
     * @returns {Promise<Array<Recipe>>} A promise that resolves to an array of matching recipes.
     */
    async searchRecipesByTerm(term) {
        // Implementation details...
    }



    /**
     * Searches for recipes based on a given term with pagination.
     * @param {string} term - The search term.
     * @param {PageOption} pageOptions - The pagination options.
     * @returns {Promise<Page<Recipe>>} A promise that resolves to a Page object containing matching recipes.
     */
    async searchRecipesByTerm(term, pageOptions) {
        // Implementation details...
    }



    /**
     * Retrieves a recipe by its ID.
     * @param {number} id - The ID of the recipe to retrieve.
     * @returns {Promise<Recipe>} A promise that resolves to the recipe with the given ID.
     */
    async getRecipeById(id) {
        // Implementation details...
    }



    /**
     * Creates a new recipe in the database.
     * @param {Recipe} recipe - The recipe object to create.
     * @returns {Promise<number>} A promise that resolves to the ID of the newly created recipe.
     */
    async createRecipe(recipe) {
        // Implementation details...
    }



    /**
     * Updates an existing recipe in the database.
    * @param {Recipe} recipe - The recipe object to update.
     * @returns {Promise<void>} A promise that resolves when the update is complete.
     */
    async updateRecipe(recipe) {
        // Implementation details...
    }



    /**
     * Deletes a recipe from the database.
     * @param {Recipe} recipe - The recipe object to delete.
     * @returns {Promise<void>} A promise that resolves when the deletion is complete.
     */
    async deleteRecipe(recipe) {
        // Implementation details...
    }
}