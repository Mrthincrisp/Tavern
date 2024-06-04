import { Button, Card } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';
import deleteCharacterAndSpells from '../api/mergedData';
import { useCharacter } from './CharacterId';
// import { useAuth } from '../utils/context/authContext';

export default function CharacterCard({ charObj, onUpdate }) {
  const { setCharacterID } = useCharacter();

  const characterDeleter = () => {
    if (window.confirm(`Kick ${charObj.fullName} out of the Tavern?`)) {
      deleteCharacterAndSpells(charObj.firebaseKey).then(() => onUpdate());
    }
  };

  const handleID = () => {
    setCharacterID(charObj.firebaseKey);
  }; // sets the "global ID" to the selected character's firebaseKey

  return (
    <Card className="selection-card">
      <Card.Title>{charObj.fullName}</Card.Title>
      <div className="card-image-container">
        <Card.Img
          variant="top"
          src={charObj.image}
          className="card-image"
        />
      </div>
      <Card.Body className="card-body">
        <div className="button-group">
          <Link href={`/character/${charObj.firebaseKey}`} passHref>
            <Button className="button play" variant="primary" onClick={handleID}>Play</Button>
          </Link>
          <Button className="button delete" onClick={characterDeleter}>Delete</Button>
        </div>
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
