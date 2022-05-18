class Model {
  getAllContacts() {
    return new Promise((resolve) => {
      const request = new XMLHttpRequest();
      request.open('GET', '/api/contacts');
      request.addEventListener('load', () => {
        resolve(request.response);
      });
      request.send();
    });
  };

  getContact(id) {
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.open('GET', `api/contacts/${id}`);
      request.addEventListener('load', () => {
        if (request.status === 200) {
          resolve(request.response);
        } else {
          reject('Error: That contact could not be found');
        }
      });
      request.send();
    })
  }

  saveContact(payload) {
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.open('POST', '/api/contacts');
      request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
      request.addEventListener('load', () => {
        if (request.status === 201) {
          resolve(request.response)
        } else {
          reject('Error: Unable to add contact')
        }
      })
      request.send(JSON.stringify(payload));
    });
  }

  updateContact(id, payload) {
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.open('PUT', `api/contacts/${id}`);
      request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
      request.addEventListener('load', () => {
        if (request.status === 201) {
          resolve(request.response);
        } else {
          reject('Error: unable to update user.');
        }
      })
      request.send(JSON.stringify(payload));
    });
  }

  deleteContact(id) {
    return new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.open('DELETE', `api/contacts/${id}`);
      request.addEventListener('load', () => {
        if (request.status === 204) {
          resolve(request.response);
        } else {
          reject('Error: That contact could not be found.');
        }
      })
      request.send();
    });
  }
}

export default new Model();
