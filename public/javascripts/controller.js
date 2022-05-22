import model from './model.js';
import contactModel from './model.js'
import headerBar from './views/headerBar.js'
import contactForm from './views/contactForm.js';

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
      headerBar.clearSearchBar();
      this._clearContacts();
      this._showAllContacts();
    });
  }

  _bindSearchBarListener() {
    let searchBar = document.getElementById('search-bar');
    searchBar.addEventListener('input', event => {
      event.preventDefault();
      // 
    });
  }

  _bindAddContactButtonListener() {
    let addContactButton = document.getElementById('add-contact-button');
    addContactButton.addEventListener('click', event => {
      event.preventDefault();
      this._toggleContactForm();
      this._bindSaveContactButtonListener('add');
    });
  }

  _attachHeaderEventListeners() {
    this._bindSearchBarListener();
    this._bindResetButtonListener();
    this._bindAddContactButtonListener();
    this._bindCancelButtonListener();
  }

  _bindDeleteContactButtonListener() {
    const deleteButtons = Array.from(document.getElementsByClassName('delete-contact-button'));
    deleteButtons.forEach(node => {
      node.addEventListener('click', event => {
        event.preventDefault();
        model.deleteContact(Number(node.id));
        this._clearContacts();
        this._showAllContacts();
      });
    });
  }

  _bindEditContactButtonListener() {
    const editButtons = Array.from(document.getElementsByClassName('edit-contact-button'));
    editButtons.forEach(node => {
      node.addEventListener('click', event => {
        event.preventDefault();
        this._toggleContactForm();
        this._bindSaveContactButtonListener('edit');
      });
    });
  }

  _bindSaveContactButtonListener(source) {
    const saveContactButton = document.getElementById('submit-button');
    saveContactButton.addEventListener('click', event => this._saveButtonEventHandler(event, source));
  }

  _bindCancelButtonListener() {
    const cancelButton = document.getElementById('cancel-button');
    cancelButton.addEventListener('click', event => {
      event.preventDefault();
      this._toggleContactForm();
      this._showAllContacts();
    });
  }

  _saveButtonEventHandler(event, source) {
    event.preventDefault();
    if (source === 'add') {
      this._findUniqueId().then(id => {
        this._populateId(id);
        this._createContact();
      })
    } else {
      // Add edit endpoint
    }
    // rerender the page once done
  }

  _populateId(id) {
    const idField = document.getElementById('id')
    idField.value = id;
  }

  _cleanTagsForSend(tags) {
    if (!tags) {
      return null
    } else {
      return tags
        .split(',')
        .map(tag => tag.trim())
        .join(',');
    }
  }

  _formatPayloadForSend() {
    const id = Number(document.getElementById('id').value);
    const full_name = document.getElementById('full_name').value;
    const email = document.getElementById('email').value;
    const phone_number = document.getElementById('phone_number').value;
    const tags = this._cleanTagsForSend(document.getElementById('tags').value);

    return {
      id,
      full_name,
      email,
      phone_number,
      tags
    }
  }

  async _findUniqueId() {
    const payload = JSON.parse(await model.getAllContacts());
    const lastId = payload[payload.length - 1].id;
    return lastId + 1;
  }

  async _findCurrentContactId() {
  }

  async _createContact() {
    const data = this._formatPayloadForSend();
    let response;
    try {
      response = await model.saveContact(data);
    } catch (error) {
      alert(error);
    }
  }

  // The 'correct' way is to use removeEventListener. 
  // I have not been able to get that to work - I think some closure is required to pass in an argument
  _unbindSaveButtonListener() {
    let oldSaveButton = document.getElementById('submit-button');
    var newSaveButton = oldSaveButton.cloneNode(false);
    oldSaveButton.parentNode.replaceChild(newSaveButton, oldSaveButton);
    oldSaveButton.remove();
  }

  _formatPayloadTags(payload) {
    return payload.map(entry => {
      let entryCopy = Object.assign({}, entry);
      if (entryCopy.tags) entryCopy.tags = entryCopy.tags.split(',');
      return entryCopy;
    });
  }

  // This feels slightly out of place, like it should be in a view component
  // However, an objective of this task is to practice Handlebars, so it will stay here
  _renderContacts(payload) {
    const cleanedPayload = this._formatPayloadTags(payload);
    const cardList = Handlebars.compile(document.getElementById('contactList').innerHTML);
    Handlebars.registerPartial('cardTemplate', document.getElementById('contactCard').innerHTML);
    document.querySelector('body').insertAdjacentHTML("beforeend", cardList({ contact: cleanedPayload }));
  }

  _clearContacts() {
    const contactsArr = Array.from(document.getElementsByClassName('contact-card'));
    contactsArr.forEach(node => node.remove());
  }

  _toggleContactForm() {
    this._unbindSaveButtonListener();
    contactForm.toggleContactForm();
    this._clearContacts();
    headerBar.toggleHeaderbar();
    this._bindEditContactButtonListener();
  }

  async _showAllContacts() {
    this._clearContacts();
    let payload = await contactModel.getAllContacts();
    let data = JSON.parse(payload)
    contactManagerController._renderContacts(data);
    contactManagerController._bindDeleteContactButtonListener();
    contactManagerController._bindEditContactButtonListener();
  }

  async renderHomeView() {
    headerBar.showHeaderBar();
    await contactManagerController._showAllContacts();
    contactManagerController._attachHeaderEventListeners();
  }
}

const contactManagerController = new Controller();

document.addEventListener('DOMContentLoaded', () => {
  // This is the default 'homepage' render
  contactManagerController.renderHomeView();
  contactForm.renderContactForm();
});
