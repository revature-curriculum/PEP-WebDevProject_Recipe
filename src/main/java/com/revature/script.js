
// add variable references and event listeners here!

const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const searchType = document.getElementById("search-type");
const ebookFilter = document.getElementById("ebook-filter");
const sortRatingBtn = document.getElementById("sort-rating");
const bookList = document.getElementById("book-list");
const selectedBook = document.getElementById("selected-book");

searchForm.addEventListener("submit", handleSearch);
ebookFilter.addEventListener("change", handleFilter);
sortRatingBtn.addEventListener("click", handleSort);
/**
 * Handles the search form submission and updates the UI with search results.
 * 
 * @async
 * @param {Event} event - The form submission event.
 * 
 * @description
 * This function is triggered when the user submits the search form with id 'search-form'.
 *
 * It performs the following actions:
 * 1. Prevents the default form submission behavior.
 * 2. Retrieves the search query from the textbox input.
 * 3. Gets the selected search type (title, ISBN, or author) from the 'search-type' select element.
 * 4. Calls the searchBooks() function with the query and search type.
 * 5. Waits for the searchBooks() function to return results from the Open Library API.
 * 6. Passes the returned book data to the displayBookList() function to update the UI.
 * 7. Handles any errors that may occur during the search process.
 */
async function handleSearch(event) {
  event.preventDefault();
  const query = searchInput.value.trim();
  const type = searchType.value;

  if (!query) {  // Check if the query is empty
    bookList.innerHTML = "";  // Clear any previous results
    return;  // Exit the function early
  }

  try {
    const books = await searchBooks(query, type);
    displayBookList(books);
  } catch (error) {
    console.error("Error:", error);
    bookList.innerHTML = "<li>An error occurred while searching for books.</li>";
  }
}


/**
 * Searches for books using the Open Library API based on the given query and type.
 *
 * @async
 * @param {string} query - The search term (title, ISBN, or author name).
 * @param {string} type - The type of search to perform (e.g., 'title', 'isbn', 'author').
 * @returns {Promise<Array>} A promise that resolves to an array of book objects.
 *
 * @description
 * This function allows users to search for books using the Open Library API.
 * It performs the following actions:
 * 1. Uses the query and type parameters to construct the API request.
 * 2. Fetches data from the Open Library API.
 * 3. Processes the API response to extract relevant book information.
 * 4. Limits the results to a maximum of 10 books.
 * 5. Returns an array of book objects with the following properties:
 *    - title: The book's title
 *    - author_name: The name of the author(s)
 *    - isbn: The book's ISBN
 *    - cover_i: Cover image identifier
 *    - ebook_access: Information about ebook availability
 *    - first_publish_year: Year of first publication
 *    - ratings_sortable: Book ratings information
 * 
 * 
 */

async function searchBooks(query, type) {
  let url = "https://openlibrary.org/search.json?";
  const fields =
    "title,author_name,isbn,cover_i,ebook_access,first_publish_year,ratings_sortable";

  if (type === "isbn") {
    url += `isbn=${query}&fields=${fields}`;
  } else {
    url += `${type}=${encodeURIComponent(query)}&fields=${fields}&limit=10`;
  }

  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch books");
  const data = await response.json();
  return data.docs;
}

/**
* Takes in a list of books and updates the UI accordingly.
*
* @param {Array} books - An array of book objects to be displayed.
*
* @description
* This function takes an array of book objects and creates a visual representation
* of each book as a list item (<li>) within an unordered list (<ul>). 
* It performs the following actions:
* 
* 1. Targets the unordered list with the id 'book-list'.
* 2. Clears the inner HTML of the list.
* 3. For each book in the 'books' array, creates an <li> element containing:
*    - The book's title within an element that has a class of `title-element`
*    - The book's cover image within an element that has a class of `cover-element`
*    - The book’s rating within an element that has a class of `rating-element`
*    - The book’s e-book access value within an element that has a class of `ebook-element`
*    Note: The order and specific layout of this information is flexible 
*    and determined by the developer.
* 4. Appends each created <li> element to the 'book-list' <ul>.
* 5. Ensures that the 'selected-book' element is not visible.
*/
function displayBookList(books) {
  bookList.innerHTML = "";
  selectedBook.style.display = "none";

  books.forEach((book) => {
    const li = document.createElement("li");
    li.className = "book-item";
    li.innerHTML = `
              <h1 class="title-element">${book.title}</h1>
              <p class="ebook-element">eBook Access: ${book.ebook_access || 'Unknown'}</p>
              <p class="rating-element">Rating: ${book.ratings_sortable || "Unknown"}</p>
              <img class="cover-element" src="https://covers.openlibrary.org/b/id/${book.cover_i
      }-L.jpg" alt="Book cover">
          `;
    li.addEventListener("click", () => displaySingleBook(book));
    bookList.appendChild(li);
  });
}

/**
 * Displays detailed information about a single book when it's clicked.
 * 
 * @param {Object} book - The book object containing detailed information.
 * 
 * @description
 * This function is triggered when a user clicks on a book in the list.
 * It updates the UI to show detailed information about the selected book.
 * 
 * The function performs the following actions:
 * 1. Hides the unordered list element with id 'book-list'.
 * 2. Makes the element with id 'selected-book' visible.
 * 3. Populates the 'selected-book' element with the following book details:
 *    - Title
 *    - Author
 *    - First publish year
 *    - Cover image
 *    - ISBN
 *    - Ebook access value
 *    - Rating
 * 
 * Note: The order and specific layout of the book information within the
 * 'selected-book' element is flexible and determined by the developer.
 * 
 */
function displaySingleBook(book) {
  bookList.style.display = "none";
  selectedBook.style.display = "block";
  selectedBook.innerHTML = `
          <h1 class="title-element">${book.title}</h1>
          <img class="cover-element" src="https://covers.openlibrary.org/b/id/${book.cover_i
    }-M.jpg" alt="Book cover">
          <p class="author-element">Author: ${book.author_name ? book.author_name.join(", ") : "Unknown"
    }</p>
          <p class="published-element">First Published: ${book.first_publish_year || "Unknown"}</p>
          <p class="ebook-element">eBook Access: ${book.ebook_access || "Unknown"}</p>
          <p class="rating-element">Rating: ${book.ratings_sortable || "Unknown"}</p>
          <p class="isbn-element">ISBN: ${book.isbn ? book.isbn[0] : "Unknown"}</p>
          <button id="back-to-list">Back to List</button>
      `;
  document.getElementById("back-to-list").addEventListener("click", () => {
    selectedBook.style.display = "none";
    bookList.style.display = "block";
  });
}

/**
 * Filters the displayed book list to show only e-books when the checkbox is checked.
 * 
 * @description
 * This function ensures that when the checkbox with id 'ebook-filter' is checked, the related search results only display books that are available as e-books.
 * 
 * The function performs the following actions:
 * 1. Checks the state of the 'ebook-filter' checkbox.
 * 2. If checked:
 *    - Filters the current list of books to include only those that are borrowable as e-books.
 *    - Updates the displayed book list with the filtered results.
 * 3. If unchecked:
 *    - Displays the full list of search results without filtering.
 * 
 */
function handleFilter() {
  const books = Array.from(bookList.children);
  books.forEach((book) => {
    const ebookAccess = book.querySelector(":nth-child(2)").textContent;
    console.log(book)
    book.style.display = ebookFilter.checked && ebookAccess !== "eBook Access: borrowable" ? "none" : "block";
  });
}

/**
 * Sorts the displayed book list by rating in descending order when the button is clicked.
 * 
 * 
 * @description
 * This function is triggered when the user clicks on the button with the id 'sort-rating'.
 * It sorts the currently displayed list of books based on their ratings.
 * 
 * The function performs the following actions:
 * 1. Sorts the current list of books by their ratings in descending order (highest to lowest).
 * 2. If any rating is non-numeric, such as "undefined" or "unknown", the book's rating must be changed to "0" instead.
 * 3. Updates the displayed book list with the sorted results.
 * 
 */
function handleSort() {
  const books = Array.from(bookList.children);
  books.sort((a, b) => {
    let ratingA = "0";
    if (Number(a.innerText.substring(a.innerText.indexOf("Rating: ") + 8))) {
      ratingA = Number(a.innerText.substring(a.innerText.indexOf("Rating: ") + 8));
    } else {
      a.children.item(2).textContent = "0";
    }
    
    let ratingB = "0";
    if (Number(b.innerText.substring(b.innerText.indexOf("Rating: ") + 8))) {
      ratingB = Number(b.innerText.substring(b.innerText.indexOf("Rating: ") + 8));
    } else {
      b.children.item(2).textContent = "0";
    }
    
    return ratingB - ratingA;
  });
  books.forEach((book) => bookList.appendChild(book));
}
