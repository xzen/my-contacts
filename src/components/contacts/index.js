import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Table,
  InputGroup,
  FormControl,
  Container,
  Row,
  Col
} from 'react-bootstrap';
import axios from 'axios';

import { deleteContact, initializeContacts } from './actions';

const ContactsList = ({ dispatch, items, onHandleDelete }) => (
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
        <th>Update</th>
      </tr>
    </thead>
    <tbody>
      {items.map((user) => (
        <tr key={user.id}>
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
              onClick={() => onHandleDelete(user.id)}
            >
              Delete
            </Button>
          </td>
          <td>
            <Button
              variant="primary"
              type="button"
              onClick={() => dispatch(deleteContact(user.id))}
            >
              Update
            </Button>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
);

class Contacts extends Component {
  constructor() {
    super();

    this.onHandleDelete = this.onHandleDelete.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;

    axios.post('http://127.0.0.1:3000/users/search', {})
      .then((res) => {
        dispatch(initializeContacts(res.data));
      });
  }

  onHandleDelete(id) {
    const { dispatch } = this.props;

    axios.delete(`http://127.0.0.1:3000/user/delete/${id}`)
      .then(() => {
        dispatch(deleteContact(id));
      });
  }

  render() {
    const { dispatch, items } = this.props;

    return (
      <Container className="mt-3" fluid="md">
        {/* Search Engine */}
        <Row>
          <Col>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Search"
                aria-label="Search"
                aria-describedby="You can search an user"
              />
              <InputGroup.Append>
                <Button variant="outline-secondary">Search</Button>
              </InputGroup.Append>
            </InputGroup>
          </Col>
        </Row>
        {/* Contacts List */}
        <Row>
          <Col>
            <ContactsList
              dispatch={dispatch}
              items={items}
              onHandleDelete={this.onHandleDelete}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapToProps = (state) => {
  const { items } = state.contacts;

  return ({ items });
};

export default connect(mapToProps)(Contacts);
