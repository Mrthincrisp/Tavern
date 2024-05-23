import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { Button, Form, Modal } from 'react-bootstrap';
import { createSpell, updateSpell } from '../../api/spellData';

const initialState = {
  characterId: '',
  description: '',
  spellName: '',
};

export default function SpellForm({
  show, handleClose, reload, charObj,
}) {
  const [formInput, setformInput] = useState({ ...initialState });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...formInput };
    createSpell(payload).then(({ name }) => {
      const patchPayload = { firebaseKey: name, characterId: charObj.firebaseKey };
      updateSpell(patchPayload).then(() => {
        reload();
      });
    });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Create New Spell</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="new-spell-form" onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Spell's name"
              name="spellName"
              value={formInput.spellName}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Give it a description"
              name="description"
              value={formInput.description}
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Create New Spell
          </Button>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

SpellForm.propTypes = {
  show: PropTypes.bool.isRequired,
  reload: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
  charObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
  }).isRequired,
};
