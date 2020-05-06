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

    this.state = {
      input: '',
      ageMax: null,
      gender: null
    };

    this.onHandleDelete = this.onHandleDelete.bind(this);
    this.onHandleSearch = this.onHandleSearch.bind(this);
    this.onHandleSearchAgeMax = this.onHandleSearchAgeMax.bind(this);
    this.onHandleSearchGender = this.onHandleSearchGender.bind(this);
    this.onHandleClickSearch = this.onHandleClickSearch.bind(this);
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

  onHandleSearchAgeMax(e) {
    this.setState({
      ageMax: parseInt(e.target.value, 10)
    });
  }

  onHandleSearchGender(e) {
    this.setState({
      gender: e.target.value
    });
  }

  onHandleSearch(e) {
    this.setState({
      input: e.target.value
    });
  }

  onHandleClickSearch() {
    const { dispatch } = this.props;
    const { input, ageMax, gender } = this.state;
    const params = {
      firstName: input
    };

    if (ageMax) {
      Object.assign(params, {
        age_max: ageMax
      });
    }

    if (gender) {
      Object.assign(params, {
        gender
      });
    }

    axios.post('http://127.0.0.1:3000/users/search', params)
      .then((res) => {
        dispatch(initializeContacts(res.data));
      });
  }

  render() {
    const { dispatch, items } = this.props;
    const { input } = this.state;

    return (
      <Container className="mt-3" fluid="md">
        {/* Search Engine */}
        <Row>
          <Col>
            <InputGroup className="mb-3">
              <Row>
                <Col sm={8}>
                  <FormControl
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="You can search an user"
                    value={input}
                    onChange={this.onHandleSearch}
                  />
                </Col>
                <Col sm={2}>
                  <FormControl
                    onChange={this.onHandleSearchAgeMax}
                    as="select"
                    custom
                  >
                    <option selected="selected">Age max</option>
                    <option>18</option>
                    <option>30</option>
                    <option>40</option>
                    <option>50</option>
                    <option>60</option>
                  </FormControl>
                </Col>
                <Col sm={2}>
                  <FormControl
                    onChange={this.onHandleSearchGender}
                    as="select"
                    custom
                  >
                    <option selected="selected">Gender</option>
                    <option>M</option>
                    <option>F</option>
                  </FormControl>
                </Col>
                <Col sm={2}>
                  <InputGroup.Append>
                    <Button variant="outline-secondary" onClick={this.onHandleClickSearch}>
                      Search
                    </Button>
                  </InputGroup.Append>
                </Col>
              </Row>
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
