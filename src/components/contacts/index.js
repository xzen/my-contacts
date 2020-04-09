import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-bootstrap';
import axios from 'axios';

import { deleteContact, initializeContacts } from './actions';


const Contact = ({ dispatch, user }) => {
  const { name, age, id } = user;

  return (
    <li>
      <span>{`${name} ${age}`}</span>
      <Button
        variant="danger"
        type="button"
        onClick={() => dispatch(deleteContact(id))}
      >
        Delete
      </Button>
    </li>
  );
};

class Contacts extends Component {
  componentDidMount() {
    const { dispatch } = this.props;

    axios.post('http://127.0.0.1:3000/users/search', {})
      .then((res) => {
        dispatch(initializeContacts(res.data));
      });
  }

  render() {
    const { dispatch, items } = this.props;

    return (
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
  }
}

const mapToProps = (state) => {
  const { items } = state.contacts;

  return ({ items });
};

export default connect(mapToProps)(Contacts);
