class ContactForm {
  constructor() {
    this.parentDiv = document.createElement('div');
    this.parentDiv.id = 'contact-div'
    this.form = document.createElement('form');
    this.form.id = 'contact-form'
    this.fieldset = document.createElement('fieldset');
    this.parentDiv.appendChild(this.fieldset)
    this.fieldset.appendChild(this.form);
    this.contactDl = document.createElement('dl');
    this.form.appendChild(this.contactDl);
  }

  _generateNameField() {
    const nameDt = document.createElement('dt');
    const nameLabel = document.createElement('label');
    nameLabel.setAttribute('for', 'name');
    nameLabel.textContent = 'Full Name'
    nameDt.appendChild(nameLabel);
    const nameDd = document.createElement('dd');
    const nameInput = document.createElement('input');
    nameInput.setAttribute('type', 'text');
    nameInput.setAttribute('name', 'name');
    nameInput.setAttribute('placeholder', 'Enter a full name');
    nameInput.setAttribute('required', '');
    nameInput.id = 'name';
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
    phoneLabel.setAttribute('for', 'phone');
    phoneLabel.textContent = 'Phone Number (format 0123456789)'
    phoneDt.appendChild(phoneLabel);
    const phoneDd = document.createElement('dd');
    const phoneInput = document.createElement('input');
    phoneInput.setAttribute('type', 'tel');
    phoneInput.setAttribute('name', 'phone');
    phoneInput.setAttribute('pattern', '[0-9]{10}')
    phoneInput.setAttribute('placeholder', 'Enter a phone number:');
    phoneInput.setAttribute('required', '');
    phoneInput.id = 'phone';
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

  _generateSubmitButton() {
    const submitButton = document.createElement('input');
    submitButton.setAttribute('type', 'submit');
    submitButton.className = 'submit-button';
    submitButton.value = "Add contact";
    this.contactDl.appendChild(submitButton);
  }

  _generateForm() {
    this._generateNameField();
    this._generateEmailField();
    this._generatePhoneField();
    this._generateTagsField();
    this._generateSubmitButton();
  }

  showContactForm() {
    const header = document.querySelector('header');
    this._generateForm();
    header.insertAdjacentElement('afterend', this.parentDiv);
  }
}

export default new ContactForm();
