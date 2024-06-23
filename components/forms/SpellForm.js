import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { Button, Form, Modal } from 'react-bootstrap';
import { createSpell, updateSpell } from '../../api/spellData';

const initialState = {
  description: '',
  spellName: '',
};

export default function SpellForm({
  show, handleClose, reload, charKey,
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
      const patchPayload = { firebaseKey: name, characterId: charKey };
      updateSpell(patchPayload).then(() => {
        reload();
        setformInput(initialState);
      });
    });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>Create New Spell</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="new-form" onSubmit={handleSubmit}>
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
          <div className="btn-box">
            <Button variant="primary" type="submit" className="button">
              Create New Spell
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

SpellForm.propTypes = {
  show: PropTypes.bool,
  reload: PropTypes.func,
  handleClose: PropTypes.func,
  charKey: PropTypes.string,
}.isRequired;
