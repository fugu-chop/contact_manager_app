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
      this._showAllContacts();
    });
  }

  _bindSearchBarListener() {
    let searchBar = document.getElementById('search-bar');
    searchBar.addEventListener('input', event => {
      event.preventDefault();
      // Wrap this in a function that calls this._debounce
      const searchTerm = searchBar.value.toLowerCase();
      const results = this._findContactsByName(searchTerm);
      const filteredPayloads = results.map(this._createPayloadFromCard);
      this._clearContacts();
      this._renderContacts(filteredPayloads);
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

  // Currently, this method does not call itself
  // I.e. you can't filter tags further than the first click
  _bindTagsListener() {
    let tags = Array.from(document.querySelectorAll('a'));
    tags.forEach(tag => tag.addEventListener('click', event => {
      event.preventDefault();
      const filteredContacts = this._filterTags(event);
      const filteredPayloads = filteredContacts.map(this._createPayloadFromCard);
      this._clearContacts();
      this._renderContacts(filteredPayloads);
    }));
  }

  _bindDeleteContactButtonListener() {
    const deleteButtons = Array.from(document.getElementsByClassName('delete-contact-button'));
    deleteButtons.forEach(node => {
      node.addEventListener('click', event => {
        event.preventDefault();
        model.deleteContact(Number(node.id));
        alert('Contact deleted!');
        this._showAllContacts();
      });
    });
  }

  _bindEditContactButtonListener() {
    const editButtons = Array.from(document.getElementsByClassName('edit-contact-button'));
    editButtons.forEach(node => {
      node.addEventListener('click', event => {
        event.preventDefault();
        this._populateId(event.target.id);
        this._populateContactFormInfo();
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
      this._addContactSequence().then(() => {
        this._cleanupContactFormActions();
      });
    } else {
      this._editContactSequence().then(response => {
        alert(`Contact details for ${JSON.parse(response).full_name} successfully updated!`);
        this._cleanupContactFormActions();
      })
    }
  }

  _populateContactFormInfo() {
    const contactId = document.getElementById('id').value;
    model.getContact(contactId).then(payload => {
      const payloadObject = JSON.parse(payload);
      document.getElementById('full_name').value = payloadObject.full_name;
      document.getElementById('email').value = payloadObject.email;
      document.getElementById('phone_number').value = payloadObject.phone_number;
      document.getElementById('tags').value = payloadObject.tags;
    });
  }

  _createPayloadFromCard(card) {
    const nameField = card.querySelector('h3');
    const paragraphFields = Array.from(card.querySelectorAll('p'))
      .map(element => element.textContent);
    const tagFields = Array.from(card.querySelectorAll('a'))
      .map(element => element.textContent);

    return {
      "id": Number(paragraphFields[0]),
      "full_name": nameField.textContent,
      "email": paragraphFields[1],
      "phone_number": paragraphFields[2],
      "tags": tagFields.join(',')
    }
  }

  _findContactsByName(searchTerm) {
    const contactsArr = Array.from(document.getElementsByClassName('contact-card'));
    return contactsArr.filter(contact => {
      return contact.querySelector('h3')
        .textContent
        .toLowerCase()
        .match(searchTerm);
    });
  }

  _filterTags(event) {
    const tagName = event.target.textContent;
    const contactsArr = Array.from(document.getElementsByClassName('contact-card'));
    return contactsArr.filter(contact => {
      return Array.from(contact.querySelectorAll('a'))
        .map(aTag => aTag.textContent).includes(tagName);
    });
  }

  async _editContactSequence() {
    const id = document.getElementById('id').value;
    const payload = this._formatPayloadForSend();
    try {
      const response = model.updateContact(id, payload);
      return response;
    } catch (error) {
      alert(error);
    }
  }

  _cleanupContactFormActions() {
    contactForm.clearContactFormFields();
    this._toggleContactForm();
    this._showAllContacts();
  }

  async _addContactSequence() {
    const id = await this._findUniqueId();
    this._populateId(id);
    this._createContact();
  }

  _populateId(id) {
    const idField = document.getElementById('id');
    idField.value = id;
  }

  _cleanTagsForSend(tags) {
    if (!tags) {
      return null
    } else {
      return tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag.length > 0)
        .reduce((arr, tag) => {
          if (!arr.includes(tag)) arr.push(tag);
          return arr;
        }, [])
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

  async _createContact() {
    const data = this._formatPayloadForSend();
    let response;
    try {
      response = await model.saveContact(data);
      alert(`Contact created for ${JSON.parse(response).full_name}!`);
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
    let data = JSON.parse(payload);
    contactManagerController._renderContacts(data);
    contactManagerController._bindDeleteContactButtonListener();
    contactManagerController._bindEditContactButtonListener();
    contactManagerController._bindTagsListener();
  }

  async renderHomeView() {
    headerBar.showHeaderBar();
    await contactManagerController._showAllContacts();
    contactManagerController._attachHeaderEventListeners();
  }
}

const contactManagerController = new Controller();

document.addEventListener('DOMContentLoaded', () => {
  contactManagerController.renderHomeView();
  contactForm.renderContactForm();
});
