import React from 'react';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { deleteItem } from '../api/itemData';

export default function ItemCard({ itemObj, onUpdate }) {
  const itemDeleter = () => {
    if (window.confirm('Delete this Item from your inventory?')) {
      deleteItem(itemObj.firebaseKey).then(onUpdate);
    }
  };

  return (
    <Card className="selection-card">
      <Card.Title>{itemObj.itemName}</Card.Title>
      <Card.Body className="card-body">
        <div className="button-group">
          {/* <Button className="button create" variant="primary" onClick={onOpen}> Open </Button> */}
          <Button className="button delete" onClick={itemDeleter}>Delete</Button>
        </div>
      </Card.Body>
    </Card>
  );
}

ItemCard.propTypes = {
  itemObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    itemName: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
