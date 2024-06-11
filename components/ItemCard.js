import React, { useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { deleteItem } from '../api/itemData';
import ViewItemModal from './ViewItemModal';

export default function ItemCard({ itemObj, onUpdate }) {
  const [showModal, setShowModal] = useState(false);

  const itemDeleter = (e) => {
    e.stopPropagation(); // prevents the delete button from triggering the modal from opening
    if (window.confirm('Delete this Item from your inventory?')) {
      deleteItem(itemObj.firebaseKey).then(onUpdate);
    }
  };

  const handleOpen = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <>
      <Card onClick={handleOpen} className="selection-card item-card">
        <Card.Title>{itemObj.itemName}</Card.Title>
        <Card.Body className="card-body">
          <div className="button-group">
            {/* <Button className="button create" variant="primary" onClick={onOpen}> Open </Button> */}
            <Button className="button delete" onClick={itemDeleter}>Delete</Button>
          </div>
        </Card.Body>
      </Card>
      <ViewItemModal
        show={showModal}
        handleClose={handleClose}
        itemObj={itemObj}
        initialData={itemObj}
      />
    </>
  );
}

ItemCard.propTypes = {
  itemObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    itemName: PropTypes.string,
    type: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
