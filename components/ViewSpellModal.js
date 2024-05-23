import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Modal } from 'react-bootstrap';
import { getSingleSpell, updateSpell } from '../api/spellData';

const initialState = {
  spellName: '',
  description: '',
};

export default function ViewSpellModal({ show, handleClose, spellKey }) {
  const [edit, setEdit] = useState(false);
  const [tempData, setTempData] = useState({ ...initialState });

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
    updateSpell(tempData).then(setEdit(false));
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Form.Check
            type="switch"
            id="editToggle"
            label="Spell data"
            checked={edit}
            onChange={() => { setEdit(!edit); }}
          />
          {edit && (
          <Button onClick={spellUpdate} className="save">save</Button>
          )}
          <Modal.Title className="input spell-input spell-name">
            <input
              type="text"
              name="spellName"
              value={tempData?.spellName || ''}
              onChange={handleChange}
              readOnly={!edit}
            />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="input spell-input spell-description">
          <input
            type="text"
            name="description"
            value={tempData?.description || ''}
            onChange={handleChange}
            readOnly={!edit}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

ViewSpellModal.propTypes = {
  show: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  spellKey: PropTypes.string.isRequired,
  tempData: PropTypes.shape({
    spellName: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
};
