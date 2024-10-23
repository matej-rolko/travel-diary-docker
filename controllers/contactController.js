const asyncHandler = require("express-async-handler");

const Contact = require("../models/contactModel");

// @desc Get all contacts
// @routes GET /api/contacts
//  @access private
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(201).json(contacts);
});

// @desc Get all contacts
// @routes GET /api/contacts/:id
//  @access private
const getContact = asyncHandler(async (req, res, next) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    // Log to see that the contact was not found
    console.log("Contact not found, setting status 404");
    // Set status to 404 and create an error
    const error = new Error("Contact not found");
    res.status(404); // Set status to 404 (Not Found)
    return next(error); // Pass the error to the error handler
  }

  // If contact is found, send it with status 200
  console.log("Contact found, sending response", contact);
  res.status(200).json(contact);
});

// @desc create new contact
// @routes POST /api/contacts
//  @access private
const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  console.log(name + email + phone);

  if (!name?.trim() || !email?.trim() || !phone?.trim()) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  res.status(201).json(contact);
});

// @desc update contact
// @routes PUT /api/contacts/:id
//  @access private
const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update contacts");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(201).json(updatedContact);
});

// @desc delete contact
// @routes DELETE /api/contacts/:id
//  @access private
const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to delete contacts");
  }

  await contact.deleteOne();
  res.status(201).json(contact);
});

module.exports = {
  getContact,
  getContacts,
  createContact,
  updateContact,
  deleteContact,
};
