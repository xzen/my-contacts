import actionsTypes from './actions-types';

/**
 * Add contact
 */
export const addContact = (contact) => ({
  type: actionsTypes.ADD_CONTACT,
  contact
});

/**
 * Delete contact
 */
export const deleteContact = (id) => ({
  type: actionsTypes.DELETE_CONTACT,
  id
});

/**
 * Initialize Contacts
 */
export const initializeContacts = (contacts) => ({
  type: actionsTypes.INITIALIZE_CONTACTS,
  contacts
});

/**
 * Search contact
 */
export const searchContacts = (pipe) => ({
  type: actionsTypes.SEARCH_CONTACT,
  pipe
});
