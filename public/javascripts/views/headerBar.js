class HeaderBar {
  constructor() {
    this.parentDiv;
  }

  _generateHeaderBar() {
    this.parentDiv = document.createElement('div');
    this.parentDiv.id = 'header-bar'
    const searchBar = document.createElement('input');
    searchBar.type = 'text';
    searchBar.id = 'search-bar';
    searchBar.setAttribute('placeholder', 'Type the name of a contact here');
    const addContactButton = document.createElement('button');
    addContactButton.type = 'submit';
    addContactButton.id = 'add-contact-button';
    addContactButton.textContent = 'Add a Contact';
    const resetViewButton = document.createElement('button');
    resetViewButton.type = 'submit';
    resetViewButton.id = 'reset-view-button';
    resetViewButton.textContent = 'Reset View';

    [searchBar, addContactButton, resetViewButton].forEach(node => this.parentDiv.appendChild(node));
  }

  // Use toggle instead of deleting and recreating to avoid excess DOM manipulation
  // Use for Edit and Add Contact pages
  toggleHeaderbar() {
    const displayAttribute = this.parentDiv.getAttribute('display');
    let attribute = (displayAttribute && displayAttribute === 'none') ? 'block' : 'none';
    this.parentDiv.style.display = attribute;
  }

  getSearchInput() {
    return document.getElementById('search-bar').value;
  }

  renderHeaderBar() {
    const header = document.querySelector('header');
    this._generateHeaderBar();
    header.insertAdjacentElement('afterend', this.parentDiv);
  }
}

export default new HeaderBar();