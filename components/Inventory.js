import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Button, Modal } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { getEquipedItems, getUnequipedItems, updateItem } from '../api/itemData';
import InventoryForm from './forms/InventoryForm';
import ItemCard from './ItemCard';

// a modal used to select wihich version of a form the user will fill out
export const ButtonSelection = ({ show, hide, handleItemType }) => (
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
  const [equipedItems, setEquipedItems] = useState([]);
  const [unequipedItems, setUnequipedItems] = useState([]);
  const [itemType, setItemType] = useState('');
  const [buttonModal, setButtonModal] = useState(false);
  const [formModal, setFormModal] = useState(false);

  const handleShowButtonModal = () => setButtonModal(true);
  const handleHideButtonModal = () => setButtonModal(false);

  const handleHideFormModal = () => setFormModal(false);

  const handleItemType = (type) => { // a handle for the ButtonSelection modal to determine the item type being made, and updating the modal displayed.
    setItemType(type);
    setButtonModal(false);
    setFormModal(true);
  };

  const reload = () => { // a reload function used to update the cards being displayed when data is changed.
    console.warn('click');
    getUnequipedItems(characterId).then(setUnequipedItems);
    getEquipedItems(characterId).then(setEquipedItems);
    handleHideFormModal();
  };

  // equiped items
  useEffect(() => {
    getEquipedItems(characterId).then(setEquipedItems);
  }, [characterId]);

  // non equiped items
  useEffect(() => {
    getUnequipedItems(characterId).then(setUnequipedItems);
  }, [characterId]);

  const getCharacterItems = () => {
    getUnequipedItems(characterId).then(setUnequipedItems);
  };

  const getCharacterEquipment = () => {
    getEquipedItems(characterId).then(setEquipedItems);
  };

  const updateEquipment = (draggableId, status, index) => {
    const payload = { firebaseKey: draggableId, equiped: status, listIndex: index };
    updateItem(payload);
  };

  const outOfListMove = (sourceList, destinationList, sourceIndex, destinationIndex) => { // an abstraction of logic used to handle drag-n-drop between lists
    const sorc = Array.from(sourceList); // grabs the list, and arrays data for the source of where an item is picked up from.
    const dest = Array.from(destinationList); // grabs the list, and arrays data for the destination of where an item is dropped
    const [removed] = sorc.splice(sourceIndex, 1); // splice is used to remove the item from the array
    dest.splice(destinationIndex, 0, removed); // splice is used to put the item into the new array
    return [sorc, dest]; // these will be the updated versions of the lists of items
  };

  const inListMove = (sourceList, sourceIndex, destinationIndex) => { // a function used to handle when an item is moved within the same list.
    const sorc = Array.from(sourceList);
    const [removed] = sorc.splice(sourceIndex, 1);
    sorc.splice(destinationIndex, 0, removed);
    return sorc;
  };

  const handleOnDragEnd = (result) => { // The main function that handles the drag-and-drop data, result is Beautiful-dnd's returning data from a moved item
    if (!result.destination) return; // if the item is dropped outside of a "Droppable" component the item is returned to its starting poistion
    const start = result.source.droppableId;
    const finish = result.destination.droppableId;

    if (start === finish) { // checks for Moving within the same list
      if (start === 'equipedItems') {
        // equiped items list control
        const updatedList = inListMove(equipedItems, result.source.index, result.destination.index);
        setEquipedItems(updatedList);
        updatedList.forEach((item, index) => {
          updateEquipment(item.firebaseKey, item.equiped, index);
        });
      } else {
        // unequipped items control
        const updatedList = inListMove(unequipedItems, result.source.index, result.destination.index);
        setUnequipedItems(updatedList);
        updatedList.forEach((item, index) => {
          updateEquipment(item.firebaseKey, item.equiped, index);
        });
      }
      // checks for moving items between lists
    } else if (start === 'equipedItems') {
      // If an Item is equiped -> unequiped
      const [newEquipment, newItems] = outOfListMove(equipedItems, unequipedItems, result.source.index, result.destination.index);
      setUnequipedItems(newItems);
      setEquipedItems(newEquipment);
      newEquipment.forEach((item, index) => {
        updateEquipment(item.firebaseKey, true, index); // Updating both status and index
      });
      newItems.forEach((item, index) => {
        updateEquipment(item.firebaseKey, false, index);
      });
    } else {
      // If an item is unequiped -> equied
      const [newItems, newEquipment] = outOfListMove(unequipedItems, equipedItems, result.source.index, result.destination.index);
      setUnequipedItems(newItems);
      setEquipedItems(newEquipment);
      newItems.forEach((item, index) => {
        updateEquipment(item.firebaseKey, false, index); // Updating both status and index
      });
      newEquipment.forEach((item, index) => {
        updateEquipment(item.firebaseKey, true, index); // Updating both status and index
      });
    }
  };

  return (
    <>
      equiped Items:
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="equipedItems">{/* droppableId is needed for Beautifil-dnd to recogize a list */}
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <ul className="character-equipment">
                {equipedItems.map((gear, index) => (
                  <Draggable key={gear.firebaseKey} draggableId={gear.firebaseKey} index={index}>
                    {(provide) => (
                      <ul ref={provide.innerRef} {...provide.draggableProps} {...provide.dragHandleProps}>
                        <ItemCard itemObj={gear} onUpdate={getCharacterEquipment} reload={reload} />
                      </ul>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            </div>
          )}
        </Droppable>

        <Droppable droppableId="unequipedItems">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              unequiped:
              <ul className="character-items">
                {unequipedItems.map((item, index) => (
                  <Draggable key={item.firebaseKey} draggableId={item.firebaseKey} index={index}>
                    {(provide) => (
                      <ul ref={provide.innerRef} {...provide.draggableProps} {...provide.dragHandleProps}>
                        <ItemCard itemObj={item} onUpdate={getCharacterItems} reload={reload} />
                      </ul>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <Button className="button" onClick={handleShowButtonModal}>Add Item</Button>
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
    </>
  );
}

Inventory.propTypes = {
  characterId: PropTypes.string,
}.isRequired;
