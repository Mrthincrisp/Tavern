import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import {
  Button, Form, Modal, Row,
} from 'react-bootstrap';
import { createItem, updateItem } from '../../api/itemData';

const initialState = {
  itemName: '',
  str: 0,
  dex: 0,
  int: 0,
  wis: 0,
  chr: 0,
  con: 0,
  hp: 0,
  ac: 0,
  attackBonus: 0,
  damageBonus: 0,
  specialEffect: '',
  quantity: 1,
  equiped: false,
};

export default function InventoryForm({
  show, handleClose, itemType, reload,
}) {
  const router = useRouter();
  const { firebaseKey } = router.query;

  const dependentFormState = itemType === 'gear'
    ? { ...initialState, characterId: firebaseKey, type: itemType } : {
      itemName: '',
      specialEffect: '',
      quantity: 1,
      characterId: firebaseKey,
      type: 'item',
      equiped: false,
    };

  const [formInput, setFormInput] = useState(dependentFormState);

  useEffect(() => {
    setFormInput(dependentFormState);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [itemType, firebaseKey]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevstate) => ({
      ...prevstate,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...formInput };
    createItem(payload).then(({ name }) => {
      const patchPayload = { firebaseKey: name };
      updateItem(patchPayload).then(() => {
        reload();
        setFormInput(initialState);
      });
    });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>Create New Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="new-form" onSubmit={handleSubmit}>

            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Item's name"
                name="itemName"
                value={formInput.itemName}
                onChange={handleChange}
              />
            </Form.Group>

            {itemType === 'gear' && (
              <>
                <Row className="mb-3">
                  <Form.Group controlId="formGridStr">
                    <Form.Label>Strength</Form.Label>
                    <Form.Control
                      required
                      type="number"
                      name="str"
                      value={formInput.str}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="formGridDex">
                    <Form.Label>Dexterity</Form.Label>
                    <Form.Control
                      required
                      type="number"
                      name="dex"
                      value={formInput.dex}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="formGridCon">
                    <Form.Label>Constitution</Form.Label>
                    <Form.Control
                      required
                      type="number"
                      name="con"
                      value={formInput.con}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="formGridInt">
                    <Form.Label>Intelligence</Form.Label>
                    <Form.Control
                      required
                      type="number"
                      name="int"
                      value={formInput.int}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="formGridWis">
                    <Form.Label>Wisdom</Form.Label>
                    <Form.Control
                      required
                      type="number"
                      name="wis"
                      value={formInput.wis}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="formGridChr">
                    <Form.Label>Charisma</Form.Label>
                    <Form.Control
                      required
                      type="number"
                      name="chr"
                      value={formInput.chr}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="formGridHp">
                    <Form.Label>Health Points</Form.Label>
                    <Form.Control
                      required
                      type="number"
                      name="hp"
                      value={formInput.hp}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="formGridAtkBonus">
                    <Form.Label>Attack Bonus</Form.Label>
                    <Form.Control
                      required
                      type="number"
                      name="attackBonus"
                      value={formInput.attackBonus}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group controlId="formGridDmgbonus">
                    <Form.Label>Damage Bonus</Form.Label>
                    <Form.Control
                      required
                      type="number"
                      name="damageBonus"
                      value={formInput.damageBonus}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Row>
              </>
            )}

            <Form.Group>
              <Form.Label>Special Effect</Form.Label>
              <Form.Control
                type="text"
                placeholder="What does the item do?"
                name="specialEffect"
                value={formInput.specialEffect}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>How Many</Form.Label>
              <Form.Control
                type="number"
                placeholder="1"
                name="quantity"
                value={formInput.quantity}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="button">
              Create New Item
            </Button>
          </Form>
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

InventoryForm.propTypes = {
  show: PropTypes.bool,
  handleClose: PropTypes.func,
  itemType: PropTypes.oneOf(['item', 'gear']),
  reload: PropTypes.func,
}.isRequired;

InventoryForm.propTypes = {
  obj: PropTypes.shape({
    itemName: PropTypes.string,
    firebaseKey: PropTypes.string,
    str: PropTypes.number,
    dex: PropTypes.number,
    int: PropTypes.number,
    wis: PropTypes.number,
    chr: PropTypes.number,
    con: PropTypes.number,
    hp: PropTypes.number,
    attackBonus: PropTypes.number,
    damageBonus: PropTypes.number,
    specialEffect: PropTypes.string,
    quantity: PropTypes.number,
    equiped: PropTypes.bool,
  }),
};

InventoryForm.defaultProps = {
  obj: initialState,
};
