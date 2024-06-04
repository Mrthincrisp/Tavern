import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { Button, Form, Modal } from 'react-bootstrap';
import { createNote, updateNote } from '../../api/noteData';
import { useCharacter } from '../CharacterId';

const initialState = {
  noteTitle: '',
};

export default function NoteForm({
  show, handleClose, reload,
}) {
  const [formInput, setFormInput] = useState({ ...initialState });
  const { characterID } = useCharacter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const payload = { ...formInput };
    createNote(payload).then(({ name }) => {
      const patchPayload = { firebaseKey: name, characterId: characterID };
      updateNote(patchPayload).then(() => {
        reload();
        setFormInput(initialState);
      });
    });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>New Note Entry</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="new-note-form" onSubmit={handleUpdate}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Entry Title"
              name="noteTitle"
              value={formInput.noteTitle}
              onChange={handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="button">
            Create New Note
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

NoteForm.propTypes = {
  show: PropTypes.bool,
  reload: PropTypes.func,
  handleClose: PropTypes.func,
  charKey: PropTypes.string,
}.isRequired;
