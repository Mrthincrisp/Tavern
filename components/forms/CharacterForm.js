import React, { useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import {
  Form, Row, Col, Button,
} from 'react-bootstrap';
import { createCharacter, updateCharacter } from '../../api/characterData';
import { useAuth } from '../../utils/context/authContext';

// default values on the form
const initialState = {
  fullName: '',
  image: '',
  level: 1,
  characterClass: '',
  str: 0,
  dex: 0,
  int: 0,
  wis: 0,
  chr: 0,
  con: 0,
  baseHp: 0,
};

export default function NewCharacterForm() {
  const { user } = useAuth();
  const [formInput, setFormInput] = useState({ ...initialState, uid: user.uid }); // uid is added as an item in the initialState
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target; // name will be the input field, and value the current value
    setFormInput((prevState) => ({ // prevState stores current data
      ...prevState,
      [name]: value, // when e.target target's a name/value in ...prevState those values are changed
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...formInput }; // the payload is forminput that becomes appendable to new data
    createCharacter(payload).then(({ name }) => { // Name is destructured from Firebase
      const patchPayload = { firebaseKey: name }; // Firebase: name created in patchPayload
      updateCharacter(patchPayload).then(() => { // patch with firebaseKey added
        router.push('/'); // return home
      });
    });
  };

  return (
    <>
      <div className="text-wrapper">
        <h3 className="headerText">Character Creator</h3>
      </div>
      <Form className="form characterForm" onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridFullName" className="name">
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

          <Form.Group as={Col} controlId="formGridImage">
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

        <Form.Group className="mb-3" controlId="formGridLevel">
          <Form.Label>Level</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="1"
            name="level"
            value={formInput.level}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group as={Col} className="bar" controlId="formGridClass">
          <Form.Label>Class</Form.Label>
          <Form.Select
            required
            name="characterClass"
            value={formInput.characterClass}
            onChange={handleChange}
          >
            <option value="" disabled>Select a Class...</option>
            <option value="Artificer">Artificer</option>
            <option value="Barbarian">Barbarian</option>
            <option value="Bard">Bard</option>
            <option value="Cleric">Cleric</option>
            <option value="Druid">Druid</option>
            <option value="Fighter">Fighter</option>
            <option value="Monk">Monk</option>
            <option value="Paladin">Paladin</option>
            <option value="Ranger">Ranger</option>
            <option value="Rogue">Rogue</option>
            <option value="Sorcerer">Sorcerer</option>
            <option value="Warlock">Warlock</option>
            <option value="Wizard">Wizard</option>
          </Form.Select>
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridStr">
            <Form.Label>Strength</Form.Label>
            <Form.Control
              required
              type="number"
              name="str"
              value={formInput.str}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridDex">
            <Form.Label>Dexterity</Form.Label>
            <Form.Control
              required
              type="number"
              name="dex"
              value={formInput.dex}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridCon">
            <Form.Label>Constitution</Form.Label>
            <Form.Control
              required
              type="number"
              name="con"
              value={formInput.con}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridInt">
            <Form.Label>Intelligence</Form.Label>
            <Form.Control
              required
              type="number"
              name="int"
              value={formInput.int}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridWis">
            <Form.Label>Wisdom</Form.Label>
            <Form.Control
              required
              type="number"
              name="wis"
              value={formInput.wis}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridChr">
            <Form.Label>Charisma</Form.Label>
            <Form.Control
              required
              type="number"
              name="chr"
              value={formInput.chr}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridHp">
            <Form.Label>Health Points</Form.Label>
            <Form.Control
              required
              type="number"
              name="baseHp"
              value={formInput.baseHp}
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Button className="button submit submit-button" variant="primary" type="submit">
          Create Character
        </Button>
      </Form>
    </>
  );
}
// defining the expected types for each prop
NewCharacterForm.propTypes = {
  obj: PropTypes.shape({
    fullName: PropTypes.string,
    firebaseKey: PropTypes.string,
    image: PropTypes.string,
    level: PropTypes.number,
    characterClass: PropTypes.string,
    str: PropTypes.number,
    dex: PropTypes.number,
    int: PropTypes.number,
    wis: PropTypes.number,
    chr: PropTypes.number,
    con: PropTypes.number,
    baseHp: PropTypes.number,
  }),
};
// default values to be used when first initialized
NewCharacterForm.defaultProps = {
  obj: initialState,
};
