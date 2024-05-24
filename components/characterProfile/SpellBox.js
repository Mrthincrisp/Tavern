import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { getSpells } from '../../api/spellData';
import SpellForm from '../forms/SpellForm';
import ViewSpellModal from '../ViewSpellModal';

export default function SpellBox({ charObj }) {
  const [spells, setSpells] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectSpell, setSelectSpell] = useState(null);
  // view modal toggles
  const handleShowViewModal = () => setShowViewModal(true);
  const handleCloseViewModal = () => setShowViewModal(false);
  // create modal toggles
  const handleShowCreateModal = () => setShowCreateModal(true);
  const handleCloseCreateModal = () => setShowCreateModal(false);

  useEffect(() => {
    getSpells(charObj.firebaseKey).then(setSpells);
  }, [charObj]);

  const reload = () => {
    getSpells(charObj.firebaseKey).then(setSpells);
    handleCloseCreateModal();
  };

  const handleSpellKey = (firebaseKey) => {
    setSelectSpell(firebaseKey);
    handleShowViewModal();
  };

  return (
    <div>
      <Button className="button" onClick={handleShowCreateModal}>New Spell</Button>
      {spells.map((spell) => (
        <Card className="spell-card" key={spell.firebaseKey} style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>{spell.spellName}</Card.Title>
            <Button variant="primary" onClick={() => handleSpellKey(spell.firebaseKey)}>Details</Button>
          </Card.Body>
        </Card>
      ))}
      <SpellForm show={showCreateModal} handleClose={handleCloseCreateModal} reload={reload} charObj={charObj} />
      { selectSpell && <ViewSpellModal show={showViewModal} handleClose={handleCloseViewModal} spellKey={selectSpell} reload={reload} />}
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
