import React from 'react';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { deleteNote } from '../api/noteData';

export default function NoteTabCard({
  noteObj, onUpdate, onOpen, onClose,
}) {
  const noteDeleter = () => {
    if (window.confirm('Delete this note?')) {
      deleteNote(noteObj.firebaseKey).then(onUpdate).then(onClose);
    }
  };
  return (
    <Card className="selection-card">
      <Card.Title>{noteObj.noteTitle}</Card.Title>
      <Card.Body className="card-body">
        <div className="button-group">
          <Button className="button create" variant="primary" onClick={onOpen}> Open </Button>
          <Button className="button delete" onClick={noteDeleter}>Delete</Button>
        </div>
      </Card.Body>
    </Card>
  );
}

NoteTabCard.propTypes = {
  noteObj: PropTypes.shape({
    noteTitle: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func,
  onOpen: PropTypes.func,
}.isRequired;
