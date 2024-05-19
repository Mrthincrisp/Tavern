// import React, { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
// import { useAuth } from '../utils/context/authContext';

export default function CharacterCard({ charObj }) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={charObj.image} />
      <Card.Body>
        <Card.Title>{charObj.fullName}</Card.Title>
        <Button variant="primary">play</Button>
        <Button>delete</Button>
      </Card.Body>
    </Card>
  );
}

CharacterCard.propTypes = {
  charObj: PropTypes.shape({
    image: PropTypes.string,
    fullName: PropTypes.string,
  }).isRequired,
};
