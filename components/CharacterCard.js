import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { deleteCharacter } from '../api/characterData';
// import { useAuth } from '../utils/context/authContext';

export default function CharacterCard({ charObj, onUpdate }) {
  const characterDeleter = () => {
    if (window.confirm(`Kick ${charObj.fullName} out of the Tavern?`)) {
      deleteCharacter(charObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={charObj.image} />
      <Card.Body>
        <Card.Title>{charObj.fullName}</Card.Title>
        <Link href={`/character/${charObj.firebaseKey}`} passHref>
          <Button variant="primary">play</Button>
        </Link>
        <Button className="button delete" onClick={characterDeleter}>Delete</Button>
      </Card.Body>
    </Card>
  );
}

CharacterCard.propTypes = {
  charObj: PropTypes.shape({
    image: PropTypes.string,
    fullName: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};
