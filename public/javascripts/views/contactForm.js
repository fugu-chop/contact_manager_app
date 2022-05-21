// This should contain the full name, email, telephone and tags fields, and the overall modal/page
class ContactForm {
  constructor() {
    this.parentDiv = document.createElement('div');
    this.parentDiv.id = 'contact-form'
    this.form = document.createElement('form');
    this.form.setAttribute('action', '');
    this.contactDl = document.createElement('dl');
  }

  _generateNameField() {
    const nameDt = document.createElement('dt');
    const nameLabel = document.createElement('label');
    nameLabel.setAttribute('for', 'name');
    nameLabel.value = 'Full Name'
    nameDt.appendChild(nameLabel);
    const nameDd = document.createElement('dd');
    const nameInput = document.createElement('input');
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('name', 'name');
    nameInput.id = 'name';
    nameDd.appendChild(nameInput);
    this.contactDl.appendChild(nameDt);
    this.contactDl.appendChild(nameDd);
  }

  _generateForm() {
    this._generateNameField();
  }

  showContactForm() {
    const header = document.querySelector('header');
    this._generateForm();
    header.insertAdjacentElement('afterend', this.parentDiv);
  }
}

export default new ContactForm();
