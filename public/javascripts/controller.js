import contactModel from './model.js'
import headerBar from './views/headerBar.js'

class Controller {
  _debounce(func, delay) {
    let timeout;
    return (...args) => {
      if (timeout) { clearTimeout(timeout) }
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  _bindResetButtonListener() {
    let resetButton = document.getElementById('reset-view-button');
    resetButton.addEventListener('click', event => {
      event.preventDefault();
      // Empty the search bar
      // make the call to getAllContacts
    });
  }

  _bindSearchBarListener() {
    let searchBar = document.getElementById('search-bar');
    searchBar.addEventListener('input', event => {
      event.preventDefault();
      // 
    });
  }

  _bindAddContactbuttonListener() {
    let addContactButton = document.getElementById('add-contact-button');
    addContactButton.addEventListener('click', event => {
      event.preventDefault();
      // 
    });
  }

  _formatPayloadTags(payload) {
    return payload.map(entry => {
      let entryCopy = Object.assign({}, entry);
      if (entryCopy.tags) entryCopy.tags = entryCopy.tags.split(', ');
      return entryCopy
    });
  }

  // This feels slightly out of place, like it should be in a view component
  // However, an objective of this task is to practice Handlebars, so it will stay here
  showContacts(payload) {
    const cleanedPayload = this._formatPayloadTags(payload);
    const cardList = Handlebars.compile(document.getElementById('contactList').innerHTML);
    Handlebars.registerPartial('cardTemplate', document.getElementById('contactCard').innerHTML);
    document.querySelector('body').insertAdjacentHTML("beforeend", cardList({contact: cleanedPayload}));
  }

  attachHeaderEventListeners() {
    this._bindSearchBarListener();
    this._bindResetButtonListener();
    this._bindAddContactbuttonListener();
  }
}

const contactManagerController = new Controller();

document.addEventListener('DOMContentLoaded', () => {
  // This is the default 'homepage' render
  // Header should not be visible during the add/edit contact interaction

  const payload = [
    {
      "id": 1,
      "full_name": "Arthur Dent",
      "email": "dent@example.com",
      "phone_number": "12345678901",
      "tags": "work, business"
    },
    {
      "id": 2,
      "full_name": "George Smiley",
      "email": "smiley@example.com",
      "phone_number": "12345678901",
      "tags": null
    }
  ]


  headerBar.renderHeaderBar();
  contactModel.getAllContacts().then(payload => {
    // Erroring out. Object is not an interable. Maybe need to play around with async function
    console.log(Array.isArray(payload));
    console.log(payload);
    payload.forEach(item => console.log(item))
    // contactManagerController.showContacts(payload);
  });
  contactManagerController.attachHeaderEventListeners();
});
