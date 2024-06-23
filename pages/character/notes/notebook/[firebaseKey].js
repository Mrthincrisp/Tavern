import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { RichTextEditor } from '../../../../components/editor/Index';
import NoteTabCard from '../../../../components/NoteTabCard';
import { getNotes } from '../../../../api/noteData';
import NoteForm from '../../../../components/forms/NoteForm';

const Notebook = () => {
  const [notes, setNotes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const router = useRouter();
  const { firebaseKey } = router.query;

  const handleShowModal = () => setShowModal(true);
  const handleHideModal = () => setShowModal(false);

  const getCharacterNotes = () => {
    getNotes(firebaseKey).then(setNotes);
  };

  const reload = () => {
    getNotes(firebaseKey).then(setNotes);
    handleHideModal();
  };

  const save = () => {
    if (window.alert('Entry Saved.')) {
      getNotes(firebaseKey).then(setNotes);
      handleHideModal();
    }
  };

  const closeEditor = () => {
    setSelectedNote(null);
  };

  useEffect(() => {
    getCharacterNotes(firebaseKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firebaseKey]);

  const handleOpen = (note) => {
    setSelectedNote(note);
  };

  return (
    <div className="note-page-container">
      <div className="note-content">
        <div className="editor-tab-box">
          <Button variant="primary button" onClick={handleShowModal}>
            Add Note
          </Button>
          {notes.map((note) => (
            <NoteTabCard
              key={note.firebaseKey}
              noteObj={note}
              onUpdate={getCharacterNotes}
              onOpen={() => handleOpen(note)}
              onClose={() => closeEditor()}
            />
          ))}

          <NoteForm show={showModal} handleClose={handleHideModal} reload={reload} />
        </div>
        {selectedNote && (
          <div className="editor-container">
            <h2 className="note-title">{selectedNote.noteTitle}</h2>
            <div className="editor-display-box">
              <RichTextEditor
                noteID={selectedNote.firebaseKey}
                content={selectedNote.content}
                onSave={save}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notebook;
