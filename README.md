# Contact Manager
A practice project for the Launch School JS239 Take Home Assessment. 

## Basic Overview
This is a basic frontend-focused project used to practice a single page application through the `XMLHttpRequest` API, using an MVC structure, running off an Express backend. 
I WAS focusing on implementing event listeners and interacting with an API, so I didn't time on CSS and styling.

On load in browser, a series of contacts will appears.

In respect of functionality, users can:
1. Search for a particular term, which will attempt a case-insensitive match the `full_name` field of all contacts, re-rendering the form as appropriate. This functionality is implemented using `setTimeout`, to reduce the number of API calls.
  ```js
  _debounce(func, delay) {
      let timeout;
      return (...args) => {
        if (timeout) { clearTimeout(timeout) }
        timeout = setTimeout(() => func(...args), delay);
      };
    };
  ```
2. Add contacts, using the bar at the top. This will hide the search bar and unhide a form (reducing the need for the DOM to delete and recreate elements), allowing users to add a contact to the database. Success will fire an alert, and on clicking 'OK', will re-render all contacts.
3. Edit contacts, using the `edit` button for each corresponding contact. This will hide the search bar and unhide a form, but populate the form fields with the contact's existing information. Success will fire an alert, and on clicking 'OK', will re-render all contacts.
4. Delete contacts, using the `delete` button. Success will fire an alert, and on clicking 'OK', will re-render all contacts.
5. Reset the view, which re-renders all contacts.

## How to run
1. Clone the repo locally
2. Navigate to the folder.
3. Run `npm install` in your CLI
4. Run `npm run` in your CLI
5. Visit http://localhost:3000 in your web browser

## Possible Enhancements
- There's no HTML form validation at the moment - it's all based on the API's accepted payload, which I can tell, isn't all that rigorous. I could build in some email and phone regex related validation.
- The search bar filtering operates on a 'filtered state' instead of the overall state - i.e. if you search for a term, subsequent searches only look at the results from the first search, and not the entire series of contacts.
- The rendering the entire array of contacts (a very common action in the context of this app) requires an API call. I could probably memoise this to avoid making more API calls, but that would involve some complex checking, as basic conditional assignment to a property on the object wouldn't take into account state changing as a result of creation, editting and deleting contacts.

## Design Choices
This app was structured in an MVC fashion. I think overall it's a useful way to structure my code, as at the very least, it stops everything from being in the one file. It also aligns (I think) quite nicely to the React model of components on a single page application.
I'm still not entirely sure I've done it right, as my controller feels very heavy in respect of manipulating logic for the views. 
_Conceptually_ it feels correct, since it's modifying the outputs of the model and views so that the data can be consumed by the view.
