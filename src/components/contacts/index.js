import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Table } from 'react-bootstrap';
import axios from 'axios';

import { deleteContact, initializeContacts } from './actions';

const ContactsList = ({ dispatch, items }) => (
  <Table>
    <thead>
      <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Gender</th>
        <th>Age</th>
        <th>Adress</th>
        <th>City</th>
        <th>Delete</th>
      </tr>
    </thead>
    <tbody>
      {items.map((user) => (
        <tr>
          <td>
            <span>{`${user.firstName}`}</span>
          </td>
          <td>
            <span>{`${user.lastName}`}</span>
          </td>
          <td>
            <span>{`${user.gender}`}</span>
          </td>
          <td>
            <span>{`${user.age}`}</span>
          </td>
          <td>
            <span>{`${user.adressNumber} ${user.adressType} ${user.adressName}`}</span>
          </td>
          <td>
            <span>{`${user.cityName} ${user.cityCode}`}</span>
          </td>
          <td>
            <Button
              variant="danger"
              type="button"
              onClick={() => dispatch(deleteContact(user.id))}
            >
              Delete
            </Button>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);

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
        <ContactsList
          dispatch={dispatch}
          items={items}
        />
      </div>
    );
  }
}

const mapToProps = (state) => {
  const { items } = state.contacts;

  return ({ items });
};

export default connect(mapToProps)(Contacts);
