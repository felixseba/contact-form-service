const getContacts = "SELECT * FROM contacts";
const addContacts =
  "INSERT INTO contacts (firstname, lastname, age, place, email) VALUES ($1, $2, $3, $4, $5)";
const checkEmailExists = "SELECT email FROM contacts WHERE email = $1";
const getContactsById = "SELECT * FROM contacts WHERE id = $1";

const updateContacts =
  "UPDATE contacts SET firstname = $1, lastname = $2, age = $3, place = $4 WHERE id = $5";
const removeContacts = "DELETE FROM contacts WHERE id = $1";

module.exports = {
  getContacts,
  addContacts,
  checkEmailExists,
  getContactsById,
  updateContacts,
  removeContacts
};
