import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Modal } from 'react-bootstrap';
import { deleteSpell, getSingleSpell, updateSpell } from '../api/spellData';

const initialState = {
  spellName: '',
  description: '',
};

export default function ViewSpellModal({
  show, handleClose, spellKey, reload,
}) {
  const [edit, setEdit] = useState(false); // toggle for editing data
  const [tempData, setTempData] = useState({ ...initialState }); // used to store data when changing data

  const spellDeleter = () => {
    if (window.confirm('Do you want to delete this spell?')) {
      deleteSpell(spellKey).then(handleClose).then(reload);
    }
  };

  useEffect(() => {
    getSingleSpell(spellKey).then(setTempData);
  }, [spellKey]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempData({
      ...tempData,
      [name]: value,
    });
  };

  const spellUpdate = () => {
    updateSpell(tempData).then(setEdit(false)).then(reload);
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
      >
        <Modal.Header>

          <Modal.Title className="input spell-input spell-name">
            <input
              className="input"
              type="text"
              name="spellName"
              value={tempData?.spellName || ''} // ? and || '' needed to prevent warning when data is being loaded
              onChange={handleChange}
              readOnly={!edit}
            />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="input spell-input spell-description">
          <textarea
            className="input description-field"
            type="text"
            name="description"
            value={tempData?.description || ''}
            onChange={handleChange}
            readOnly={!edit}
          />
        </Modal.Body>
        <Modal.Footer>
          {edit && (
          <Button onClick={spellUpdate} className="save">save</Button>
          )}
          <Form.Check
            type="switch"
            id="editSpellToggle"
            label="Spell data"
            checked={edit}
            onChange={() => { setEdit(!edit); }}
          />
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button className="delete" onClick={spellDeleter}>Delete</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

ViewSpellModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  spellKey: PropTypes.string.isRequired,
  reload: PropTypes.func.isRequired,
}.isRequired;
