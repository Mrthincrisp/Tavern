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

  useEffect(() => {
    getCharacterNotes(firebaseKey);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [firebaseKey]);

  const handleOpen = (note) => {
    setSelectedNote(note);
  };

  return (
    <div className="note-page-container">
      <Button variant="primary button" onClick={handleShowModal}>
        Add Note
      </Button>
      <div className="note-content">
        <div className="editor-tab-box">
          {notes.map((note) => (
            <NoteTabCard
              key={note.firebaseKey}
              noteObj={note}
              onUpdate={getCharacterNotes}
              onOpen={() => handleOpen(note)}
            />
          ))}  {/* on Open sets the selected note when "opening" a tab, thus loading the editor with the notes data */}
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
    </div>
  );
};

export default Notebook;
