import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { getSingleItem, updateItem } from '../api/itemData';

export default function ViewItemModal({
  show, handleClose, itemObj, reload,
}) {
  const [tempData, setTempData] = useState({});
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    getSingleItem(itemObj.firebaseKey).then(setTempData);
  }, [itemObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempData({
      ...tempData,
      [name]: value,
    });
  };

  const itemUpdate = () => {
    updateItem(tempData).then(setEdit(false)).then(reload);
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
      >
        <Form>
          <Modal.Header>

            <Modal.Title className="item-input item-name">
              <input
                className="name-input"
                type="text"
                name="itemName"
                value={tempData?.itemName || ''}
                onChange={handleChange}
                readOnly={!edit}
              />
            </Modal.Title>
          </Modal.Header>

          <Modal.Body className="item-input item-description">
            <textarea
              className="description-field"
              type="text"
              name="specialEffect"
              value={tempData?.specialEffect || ''}
              onChange={handleChange}
              readOnly={!edit}
            />
            {itemObj.type === 'gear' && (
            <div className="form-grid">
              <Form.Group>
                <Form.Label>Str</Form.Label>
                <Form.Control
                  className="modal-input"
                  type="number"
                  placeholder="0"
                  name="str"
                  value={tempData?.str || ''}
                  onChange={handleChange}
                  readOnly={!edit}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>Dex</Form.Label>
                <Form.Control
                  className="modal-input"
                  type="number"
                  placeholder="0"
                  name="dex"
                  value={tempData?.dex || ''}
                  onChange={handleChange}
                  readOnly={!edit}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>int</Form.Label>
                <Form.Control
                  className="modal-input"
                  type="number"
                  placeholder="0"
                  name="int"
                  value={tempData?.int || ''}
                  onChange={handleChange}
                  readOnly={!edit}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>wis</Form.Label>
                <Form.Control
                  className="modal-input"
                  type="number"
                  placeholder="0"
                  name="wis"
                  value={tempData?.wis || ''}
                  onChange={handleChange}
                  readOnly={!edit}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>chr</Form.Label>
                <Form.Control
                  className="modal-input"
                  type="number"
                  placeholder="0"
                  name="chr"
                  value={tempData?.chr || ''}
                  onChange={handleChange}
                  readOnly={!edit}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>con</Form.Label>
                <Form.Control
                  className="modal-input"
                  type="number"
                  placeholder="0"
                  name="con"
                  value={tempData?.con || ''}
                  onChange={handleChange}
                  readOnly={!edit}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>hp</Form.Label>
                <Form.Control
                  className="modal-input"
                  type="number"
                  placeholder="0"
                  name="hp"
                  value={tempData?.hp || ''}
                  onChange={handleChange}
                  readOnly={!edit}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>ac</Form.Label>
                <Form.Control
                  className="modal-input"
                  type="number"
                  placeholder="0"
                  name="ac"
                  value={tempData?.ac || ''}
                  onChange={handleChange}
                  readOnly={!edit}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>attackBonus</Form.Label>
                <Form.Control
                  className="modal-input"
                  type="number"
                  placeholder="0"
                  name="attackBonus"
                  value={tempData?.attackBonus || ''}
                  onChange={handleChange}
                  readOnly={!edit}
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>damageBonus</Form.Label>
                <Form.Control
                  className="modal-input"
                  type="number"
                  placeholder="0"
                  name="damageBonus"
                  value={tempData?.damageBonus || ''}
                  onChange={handleChange}
                  readOnly={!edit}
                />
              </Form.Group>

            </div>
            )}

          </Modal.Body>

          <Modal.Footer>
            {edit && (
            <Button onClick={itemUpdate} className="button save">save</Button>
            )}
            <Form.Check
              type="switch"
              id="editItemToggle"
              label="Edit"
              checked={edit}
              onChange={() => { setEdit(!edit); }}
            />
            <Button className="button" variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}

ViewItemModal.propTypes = {
  itemObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    itemName: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  reload: PropTypes.func,
}.isRequired;
