/**
 * This class handles the login functionality for the Recipe Management Application. It manages user authentication by sending login requests to the server and handling responses.
 */

// Get references to various DOM elements required, such as buttons and input elements, using the document object's `getElementById()` method.

// Ensure the button has its 'onclick' events associated with a corresponding function.


/**
 * Handles the login process for the user by doing the following:
 *      - Retrieves user credentials to be sent in the request body
 *      - Sends a login request to the server using the `fetch` API to send a POST request to the login endpoint (`http://localhost:8081/login`) and passes the `options` object containing request configuration.
 *      - Processes the response based on the status code:
 *             - If the status is `200`, the token should be extracted from the response and saved in`sessionStorage` and associated with the "auth-token" key. The user should the be redirected to the recipe page).
 *              - If the status is `401`, alert the user with the following message: "Incorrect login!"
 *              - If the status is anything else, alert the user with the following message: "Unknown issue!"
 */
async function processLogin(){

    let requestBody;

    // Configuration options for the `fetch` request in the login process. This object contains various settings that control how the request is sent to the server.
    let requestOptions = {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin":"*",
          "Access-Control-Allow-Headers": "*"
        },
        redirect: "follow",
        referrerPolicy: "no-referrer",
        body: JSON.stringify(body),
    }

}

