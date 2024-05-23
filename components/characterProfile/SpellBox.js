import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { getSpells } from '../../api/spellData';
import SpellForm from '../forms/SpellForm';

export default function SpellBox({ charObj }) {
  const [spells, setSpells] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  useEffect(() => {
    getSpells(charObj.firebaseKey).then(setSpells);
  }, [charObj]);

  const reload = () => {
    getSpells(charObj.firebaseKey).then(setSpells);
    handleCloseModal();
  };

  return (
    <div>
      <Button onClick={handleShowModal}>New Spell</Button>
      {spells.map((spell) => (
        <Card key={spell.firebaseKey} style={{ width: '18rem' }}>
          <Card.Body>
            {console.warn('charObj in spellbox Card', charObj)}
            {console.warn('spell in spellbox Card', spell)}
            <Card.Title>{spell.spellName}</Card.Title>
            <Link href={`spells/${charObj.firebaseKey}`} passHref>
              <Button variant="primary">Details</Button>
            </Link>
          </Card.Body>
        </Card>
      ))}
      <SpellForm show={showModal} handleClose={handleCloseModal} reload={reload} charObj={charObj} />
    </div>
  );
}

SpellBox.propTypes = {
  charObj: PropTypes.shape({
    firebaseKey: PropTypes.string,
    uid: PropTypes.string,
    characterClass: PropTypes.string,
  }).isRequired,
};
