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

export default (state = initialState, action) => {
  switch (action.type) {
    case actionsTypes.ADD_CONTACT:
      return addContact(state, action);
    default:
      return state;
  }
};
