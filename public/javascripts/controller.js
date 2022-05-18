import contactModel from './model.js'

// let testPayload = {
//   'full_name': 'Bryan Brobby',
//   'email': 'test@test.com',
//   'phone_number': '12345678901',
//   'tags': ''
// }

// contactModel.saveContact(testPayload)
//   .then(response => console.log(response))
//   .catch(error => console.log(error));

// contactModel.deleteContact(6).catch(result => console.log(result));
contactModel.getAllContacts().then(result => console.log(result));