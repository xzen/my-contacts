import React from 'react';
import { connect } from 'react-redux';

import { addContact } from './actions';

const Contact = ({ dispatch, user }) => {
  const { firstName, phone } = user;

  return (
    <li key={user.id}>
      <span>{`${firstName} ${phone}`}</span>
      <button
        type="button"
        onClick={() => dispatch(addContact({ firstName, phone }))}
      >
        Delete
      </button>
    </li>
  );
};

const Contacts = ({ dispatch, items }) => (
  <div>
    <ul>
      {items.map((user) => (
        <Contact
          dispatch={dispatch}
          user={user}
        />
      ))}
    </ul>
  </div>
);

const mapToProps = (state) => {
  const { items } = state.contacts;

  return ({ items });
};

export default connect(mapToProps)(Contacts);
