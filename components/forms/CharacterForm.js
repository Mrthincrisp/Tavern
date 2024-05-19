import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import { PropTypes } from 'prop-types';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useRouter } from 'next/router';
import { createCharacter, updateCharacter } from '../../api/characterData';
import { useAuth } from '../../utils/context/authContext';

const initialState = {
  fullName: '',
  image: '',
  level: '',
  class: '',
  str: '',
  dex: '',
  int: '',
  wis: '',
  chr: '',
  con: '',
  hp: '',
};

export default function NewCharacterForm({ obj }) {
  const { user } = useAuth();
  const [formInput, setFormInput] = useState({ initialState, uid: user.uid });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateCharacter(formInput).then(() => router.push('/'));
    } else {
      const payload = { ...formInput };
      createCharacter(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateCharacter(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };

  return (
    <Form className="form characterForm" onSubmit={handleSubmit}>
      <h3 className="text headerText">{obj.firebaseKey ? 'Update' : 'Create'} Character</h3>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Character Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter their name"
            name="fullName"
            value={formInput.fullName}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Image</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Get their picture"
            name="image"
            value={formInput.image}
            onChange={handleChange}
          />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formGridAddress1">
        <Form.Label>Level</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="What level are they"
          name="level"
          value={formInput.level}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group as={Col} controlId="formGridState">
        <Form.Label>Class</Form.Label>
        <Form.Select
          required
          type="text"
          placeholder="Select a Class..."
          name="class"
          value={formInput.class}
          onChange={handleChange}
          defaultValue="Select a Class..."
        >
          <option>Choose...</option>
          <option>Paladin</option>
          <option>Cleric</option>
          <option>Rouge</option>
          <option>Scorcerer</option>
          <option>Warlock</option>
          <option>Monk</option>
          <option>Wizard</option>
        </Form.Select>
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>Strength</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder=" "
            name="str"
            value={formInput.str}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>Dexterity</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder=" "
            name="dex"
            value={formInput.dex}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>Constitution</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder=" "
            name="con"
            value={formInput.con}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>Intelligence </Form.Label>
          <Form.Control
            required
            type="number"
            placeholder=" "
            name="int"
            value={formInput.int}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>Wisdom </Form.Label>
          <Form.Control
            required
            type="number"
            placeholder=" "
            name="wis"
            value={formInput.wis}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
          <Form.Label>Charisma </Form.Label>
          <Form.Control
            required
            type="number"
            placeholder=" "
            name="chr"
            value={formInput.chr}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>Health Points</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder=" "
            name="hp"
            value={formInput.hp}
            onChange={handleChange}
          />
        </Form.Group>
      </Row>
      <Button className="button submit submit-button" variant="primary" type="submit">{obj.firebaseKey ? 'Update' : 'Create'}Character</Button>
    </Form>
  );
}

NewCharacterForm.propTypes = {
  obj: PropTypes.shape({
    fullName: PropTypes.string,
    firebaseKey: PropTypes.string,
    image: PropTypes.string,
    level: PropTypes.number,
    class: PropTypes.string,
    str: PropTypes.number,
    dex: PropTypes.number,
    int: PropTypes.number,
    wis: PropTypes.number,
    chr: PropTypes.number,
    con: PropTypes.number,
    hp: PropTypes.number,
  }),
};

NewCharacterForm.defaultProps = {
  obj: initialState,
};
