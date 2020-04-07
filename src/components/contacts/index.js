import React from 'react';
import { connect } from 'react-redux';

import { deleteContact } from './actions';

const Contact = ({ dispatch, user }) => {
  const { firstName, phone, id } = user;

  return (
    <li>
      <span>{`${firstName} ${phone}`}</span>
      <button
        type="button"
        onClick={() => dispatch(deleteContact(id))}
      >
        Delete
      </button>
    </li>
  );
};

const Contacts = ({ dispatch, items }) => (
  <div>
    <form>
      <input type="text" name="firstName" />
    </form>
    <ul>
      {items.map((user) => (
        <Contact
          key={user.id}
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
