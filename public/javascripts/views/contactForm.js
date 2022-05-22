class ContactForm {
  constructor() {
    this.parentDiv = document.createElement('div');
    this.parentDiv.id = 'contact-div';
    this.parentDiv.style = 'display: none';
    this.form = document.createElement('form');
    this.form.id = 'contact-form'
    this.fieldset = document.createElement('fieldset');
    this.parentDiv.appendChild(this.fieldset)
    this.fieldset.appendChild(this.form);
    this.contactDl = document.createElement('dl');
    this.form.appendChild(this.contactDl);
  }

  // Set this as invisible once the autopopulation is working
  _generateIdField() {
    const idDt = document.createElement('dt');
    const idLabel = document.createElement('label');
    idLabel.setAttribute('for', 'id');
    idLabel.textContent = 'Contact ID'
    idDt.appendChild(idLabel);
    const idDd = document.createElement('dd');
    const idInput = document.createElement('input');
    idInput.setAttribute('type', 'text');
    idInput.setAttribute('name', 'id');
    idInput.setAttribute('required', '');
    idInput.id = 'id';
    idDd.appendChild(idInput);
    this.contactDl.appendChild(idDt);
    this.contactDl.appendChild(idDd);
  }

  _generateNameField() {
    const nameDt = document.createElement('dt');
    const nameLabel = document.createElement('label');
    nameLabel.setAttribute('for', 'full_name');
    nameLabel.textContent = 'Full Name'
    nameDt.appendChild(nameLabel);
    const nameDd = document.createElement('dd');
    const nameInput = document.createElement('input');
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('name', 'full_name');
    nameInput.setAttribute('placeholder', 'Enter a full name');
    nameInput.setAttribute('required', '');
    nameInput.id = 'full_name';
    nameDd.appendChild(nameInput);
    this.contactDl.appendChild(nameDt);
    this.contactDl.appendChild(nameDd);
  }

  _generateEmailField() {
    const emailDt = document.createElement('dt');
    const emailLabel = document.createElement('label');
    emailLabel.setAttribute('for', 'email');
    emailLabel.textContent = 'Email'
    emailDt.appendChild(emailLabel);
    const emailDd = document.createElement('dd');
    const emailInput = document.createElement('input');
    emailInput.setAttribute('type', 'email');
    emailInput.setAttribute('name', 'email');
    emailInput.setAttribute('placeholder', 'Enter an email');
    emailInput.setAttribute('required', '');
    emailInput.id = 'email';
    emailDd.appendChild(emailInput);
    this.contactDl.appendChild(emailDt);
    this.contactDl.appendChild(emailDd);
  }

  _generatePhoneField() {
    const phoneDt = document.createElement('dt');
    const phoneLabel = document.createElement('label');
    phoneLabel.setAttribute('for', 'phone_number');
    phoneLabel.textContent = 'Phone Number (format 0123456789)'
    phoneDt.appendChild(phoneLabel);
    const phoneDd = document.createElement('dd');
    const phoneInput = document.createElement('input');
    phoneInput.setAttribute('type', 'tel');
    phoneInput.setAttribute('name', 'phone_number');
    phoneInput.setAttribute('pattern', '[0-9]{10}')
    phoneInput.setAttribute('placeholder', 'Enter a phone number:');
    phoneInput.setAttribute('required', '');
    phoneInput.id = 'phone_number';
    phoneDd.appendChild(phoneInput);
    this.contactDl.appendChild(phoneDt);
    this.contactDl.appendChild(phoneDd);
  }

  _generateTagsField() {
    const tagDt = document.createElement('dt');
    const tagLabel = document.createElement('label');
    tagLabel.setAttribute('for', 'tags');
    tagLabel.textContent = 'Tags'
    tagDt.appendChild(tagLabel);
    const tagDd = document.createElement('dd');
    const tagInput = document.createElement('input');
    tagInput.setAttribute('type', 'text');
    tagInput.setAttribute('name', 'tags');
    tagInput.setAttribute('placeholder', 'Optional: Enter tags');
    tagInput.id = 'tags';
    tagDd.appendChild(tagInput);
    this.contactDl.appendChild(tagDt);
    this.contactDl.appendChild(tagDd);
  }

  _generateCancelButton() {
    const cancelButton = document.createElement('input');
    cancelButton.setAttribute('type', 'submit');
    cancelButton.id = 'cancel-button';
    cancelButton.value = "Cancel";
    this.contactDl.appendChild(cancelButton);
  }

  _generateSubmitButton() {
    const submitButton = document.createElement('input');
    submitButton.setAttribute('type', 'submit');
    submitButton.id = 'submit-button';
    submitButton.value = "Save contact";
    this.contactDl.appendChild(submitButton);
  }

  _generateForm() {
    this._generateIdField();
    this._generateNameField();
    this._generateEmailField();
    this._generatePhoneField();
    this._generateTagsField();
    this._generateSubmitButton();
    this._generateCancelButton();
  }

  toggleContactForm() {
    const displayAttribute = this.parentDiv.getAttribute('style');
    let attribute = (displayAttribute === 'display: none;' ||
      displayAttribute === 'display: none') ? 'block' : 'none';
    this.parentDiv.setAttribute('style', `display: ${attribute}`);
  }

  renderContactForm() {
    const header = document.querySelector('header');
    this._generateForm();
    header.insertAdjacentElement('afterend', this.parentDiv);
  }
}

export default new ContactForm();
