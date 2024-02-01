const pool = require("../database");
const queries = require("./queries");

const getContacts = (req, res) => {
  pool.query(queries.getContacts, (error, results) => {
    if (error) {
      res.status(500).json({
        message: "Fail",
        errorMessage: error.message,
      });
    }
    res.status(200).json({
      message: "Success",
      count: results.rowCount,
      contacts: results.rows,
    });
  });
};

const getContactsById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.getContactsById, [id], (error, results) => {
    if (error) {
      res.status(500).json({
        message: "Fail to fetch Contact by Id",
        errorMessage: error.message,
        status: false
      });
    }
    const noContactsFound = !results.rows.length;
    if (noContactsFound) {
      res.send({
        message: "No such Contact found",
        status: false
      });
    } else {
      res.status(200).json({
        message: "Contact fetched by Id Successfully",
        contact: results.rows,
        status: true,
      });

    }

  });
};

const addContacts = async (req, res) => {
  const { firstName, lastName, age, place, email } = req.body;
  pool.query(queries.checkEmailExists, [email], (error, results) => {
    if (error) {
      return res.status(500).json({
        message: "Fail to check email",
        errorMessage: error.message,
        status: false,
      });
    }
    if (results.rowCount > 0) {
      return res.status(200).json({
        message: "Email has already taken",
        status: false,
      });
    } else {
      pool.query(
        queries.addContacts,
        [firstName, lastName, age, place, email],
        (error, results) => {
          if (error) {
            return res.status(500).json({
              message: "Failed to create new contact",
              errorMessage: error.message,
              status: false,
            });
          }
          res.status(201).send({
            message: "Contact Created Successfully",
            status: true,
          });
        }
      );
    }
  });
};

const updateContacts = (req, res) => {
  const id = parseInt(req.params.id);
  const { firstname, lastname, age, place } = req.body;

  pool.query(queries.getContactsById, [id], (error, results) => {
    const noContactsFound = !results.rows.length;
    if (noContactsFound) {
      res.send({
        message: "No such Contact found in the database",
        status: false
      });
    } else {
      pool.query(
        queries.updateContacts,
        [firstname, lastname, age, place, id],
        (error, results) => {
          if (error) {
            res.status(500).json({
              message: "Fail to update",
              errorMessage: error.message,
              status: false
            });
          }
          res.status(200).send({
            message: "Contact updated Successfully",
            status: true
          });
        }
      );
    }
    
  });
};

const removeContacts = (req, res) => {
  const id = parseInt(req.params.id);

  pool.query(queries.getContactsById, [id], (error, results) => {
    if (error) {
      res.status(500).json({
        message: "Fail to delete",
        errorMessage: error.message,
      });
    }
    const noContactsFound = !results.rows.length;
    if (noContactsFound) {
      res.send("No such contacts exist in the Database");
    } else {
      pool.query(queries.removeContacts, [id], (error, results) => {
        res.status(200).json({
          message: "Contact deleted Successfully",
        });
      });
    }
    
  });
};

module.exports = {
  getContacts,
  addContacts,
  getContactsById,
  updateContacts,
  removeContacts,
};
