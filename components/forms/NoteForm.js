import React, { useState } from 'react';
import { PropTypes } from 'prop-types';
import { Button, Form, Modal } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { createNote, updateNote } from '../../api/noteData';

const initialState = {
  noteTitle: '',
};

export default function NoteForm({
  show, handleClose, reload,
}) {
  const [formInput, setFormInput] = useState({ ...initialState });
  const router = useRouter();
  const { firebaseKey } = router.query;

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
      const patchPayload = { firebaseKey: name, characterId: firebaseKey };
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
              required
              type="text"
              placeholder="Entry Title"
              name="noteTitle"
              value={formInput.noteTitle}
              onChange={handleChange}
            />
          </Form.Group>
          <div className="btn-box">
            <Button variant="primary" type="submit" className="button">
              Create New Note
            </Button>
          </div>
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
