import actionsTypes from './actions-types';

const initialState = {
  items: []
};

const addContact = (state, action) => ({
  items: state.items.concat(action.contact)
});

const deleteContact = (state, action) => ({
  items: state.items.filter((user) => user.id !== action.id)
});

const initializeContacts = (state, action) => ({
  items: state.items.concat(action.contacts)
});

export default (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.INITIALIZE_CONTACTS:
      return initializeContacts(state, action);
    case actionsTypes.ADD_CONTACT:
      return addContact(state, action);
    case actionsTypes.DELETE_CONTACT:
      return deleteContact(state, action);
    default:
      return state;
  }
};
