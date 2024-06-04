import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import RichTextEditor from '../../../components/Editor';
import NoteTabCard from '../../../components/NoteTabCard';
import { useCharacter } from '../../../components/CharacterId';
import { getNotes } from '../../../api/noteData';
import NoteForm from '../../../components/forms/NoteForm';

const Notebook = () => {
  const { characterID } = useCharacter();
  const [notes, setNotes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  const handleShowModal = () => setShowModal(true);
  const handleHideModal = () => setShowModal(false);

  const getCharacterNotes = () => {
    getNotes(characterID).then(setNotes);
  };

  const reload = () => {
    getNotes(characterID).then(setNotes);
    handleHideModal();
  };

  useEffect(() => {
    getCharacterNotes(characterID);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [characterID]);

  return (
    <div className="note-page-container">
      <Button variant="primary" onClick={handleShowModal}>
        Add Note
      </Button>
      <div className="editor-tab-box">
        {notes.map((note) => (
          <NoteTabCard
            key={note.firebaseKey}
            noteObj={note}
            onUpdate={getCharacterNotes}
            onOpen={() => setSelectedNote(note)}
          />
        ))}
        <NoteForm show={showModal} handleClose={handleHideModal} reload={reload} />
      </div>
      {selectedNote && (
        <div className="editor-display-box">
          <RichTextEditor
            noteID={selectedNote.firebaseKey}
            content={selectedNote.content}
            onSave={reload}
          />
        </div>
      )}
    </div>
  );
};

export default Notebook;
