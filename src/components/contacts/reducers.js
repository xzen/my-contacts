import actionsTypes from './actions-types';

const initialState = {
  items: [{
    id: '1',
    firstName: 'Cyril',
    lastName: 'Vimard',
    phone: '0603938765',
    city: 'paris'
  }, {
    id: '2',
    firstName: 'Elies',
    lastName: 'Amarelo',
    phone: '0603938765',
    city: 'paris'
  }]
};

const addContact = (state, action) => ({
  items: state.items.concat(action.contact)
});

const deleteContact = (state, action) => ({
  items: state.items.filter((user) => user.id !== action.id)
});

export default (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.ADD_CONTACT:
      return addContact(state, action);
    case actionsTypes.DELETE_CONTACT:
      return deleteContact(state, action);
    default:
      return state;
  }
};
