import React, { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { getItems } from '../api/itemData';
import InventoryForm from './forms/InventoryForm';
import ItemCard from './ItemCard';

const ButtonSelection = ({ show, hide, handleItemType }) => (
  <Modal show={show} onHide={hide}>
    <Modal.Header>
      <Modal.Title>Which item type are you making?</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Button className="button" onClick={() => handleItemType('item')}>item</Button>
      <Button className="button" onClick={() => handleItemType('gear')}>gear</Button>
    </Modal.Body>
  </Modal>
);
ButtonSelection.propTypes = {
  show: PropTypes.func,
  hide: PropTypes.func,
  handleItemType: PropTypes.func,
}.isRequired;

export default function Inventory({ characterId }) {
  const [items, setItems] = useState([]);
  const [itemType, setItemType] = useState('');
  const [buttonModal, setButtonModal] = useState(false);
  const [formModal, setFormModal] = useState(false);

  const handleShowButtonModal = () => setButtonModal(true);
  const handleHideButtonModal = () => setButtonModal(false);

  const handleHideFormModal = () => setFormModal(false);

  const handleItemType = (type) => {
    setItemType(type);
    setButtonModal(false);
    setFormModal(true);
  };

  const reload = () => {
    getItems(characterId).then(setItems);
    handleHideFormModal();
  };

  useEffect(() => {
    getItems(characterId).then(setItems);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [characterId]);

  const getCharacterItems = () => {
    getItems(characterId).then(setItems);
  };

  return (
    <div>
      <div>
        gear
      </div>
      <div>
        items
        <Button className="button" onClick={handleShowButtonModal}>Add Item</Button>
        {items.map((item) => (
          <ItemCard
            key={item.firebaseKey}
            itemObj={item}
            onUpdate={getCharacterItems}
          />
        ))}
        <ButtonSelection
          show={buttonModal}
          hide={handleHideButtonModal}
          handleItemType={handleItemType}
        />
        <InventoryForm
          show={formModal}
          handleClose={handleHideFormModal}
          itemType={itemType}
          reload={reload}
        />
      </div>
    </div>
  );
}

Inventory.propTypes = {
  characterId: PropTypes.string,
}.isRequired;
