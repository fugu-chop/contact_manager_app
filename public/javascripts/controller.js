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

  // This pathway does not work after the first interaction
  // After 
  _bindEditContactButtonListener() {
    const editButtons = Array.from(document.getElementsByClassName('edit-contact-button'));
    editButtons.forEach(node => {
      node.addEventListener('click', event => {
        event.preventDefault();
        this._toggleContactForm();
        this._bindSaveContactButtonListener('edit')

      });
    });
  }

  // The function that we call should depend on how we got there
  // We also need to unbind this whenever the general screen renders
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
      console.log('hello friendo, this is add!')
    } else {
      console.log('hello, this is edit!')
    }
  }

  // Try to get this right, rather than cloning
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
      return entryCopy
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
