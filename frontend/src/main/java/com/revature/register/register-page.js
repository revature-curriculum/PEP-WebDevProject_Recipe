/**
 * This script defines the registration functionality for the Registration page in the Recipe Management Application.
 */

// Get references to various DOM elements, such as inputs and the register button, using the document object's `getElementById()` method.


// Ensure the register button has its 'onclick' event associated with the function `processRegistration`.


/**
 * Function to process user registration.
 *
 * This function does the following:
 * - Retrieves input values for username, email, password, and repeat password.
 * - Verifies that the password matches the repeat password field.
 * - Creates a user object and sends a POST request to the registration endpoint `http://localhost:8081/register`.
 * - Provides feedback to the user:
 *   - On successful registration, redirects to the login page.
 *   - On failure, alerts the user to a registration error.
 *   - If passwords do not match, alerts the user of the mismatch.
 */
async function processRegistration() {
    
        let response =  {
            method: "POST",                             // HTTP method: POST for adding new data
            mode: "cors",                               // Enable Cross-Origin Resource Sharing (CORS)
            cache: "no-cache",                          // Disable caching for fresh data on each request
            credentials: "same-origin",                 // Use credentials only if on the same domain
            headers: {
                "Content-Type": "application/json",     // Specify JSON data format
                "Access-Control-Allow-Origin": "*",     // Allow requests from any origin
                "Access-Control-Allow-Headers": "*"     // Allow all headers
            },
            redirect: "follow",                         // Follow redirects if they occur
            referrerPolicy: "no-referrer",              // Do not send a referrer header
            body: JSON.stringify(registerBody)          // Convert the register object to a JSON string for transmission
        };
}
