import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { getSpells } from '../../api/spellData';
import SpellForm from '../forms/SpellForm';
import ViewSpellModal from '../ViewSpellModal';

export default function SpellBox({ charKey }) {
  const [spells, setSpells] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false); // default state for the modal
  const [showViewModal, setShowViewModal] = useState(false); // two modals two states
  const [selectSpell, setSelectSpell] = useState(null);

  // view modal toggles
  const handleShowViewModal = () => setShowViewModal(true);
  const handleCloseViewModal = () => setShowViewModal(false);

  // create modal toggles
  const handleShowCreateModal = () => setShowCreateModal(true);
  const handleCloseCreateModal = () => setShowCreateModal(false);

  useEffect(() => {
    getSpells(charKey).then(setSpells);
  }, [charKey]);// filles the spellbox data from the specific character

  // reloads the spell data when a modal changes data
  const reload = () => {
    getSpells(charKey).then(setSpells);
    handleCloseCreateModal();
  };

  // Gets the firebaseKey for a specific spell, then shows the spell data the in a modal
  const handleSpellKey = (firebaseKey) => {
    setSelectSpell(firebaseKey);
    handleShowViewModal();
  };

  return (
    <div>
      <Button className="button" onClick={handleShowCreateModal}>New Spell</Button> {/* Button to launch the SpellForm modal */}
      {spells.map((spell) => (
        <Card className="spell-card" key={spell.firebaseKey} style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Title>{spell.spellName}</Card.Title>
            <Button variant="primary" onClick={() => handleSpellKey(spell.firebaseKey)}>Details</Button> {/* Button to launch the ViewSpellModal */}
          </Card.Body>
        </Card>
      ))}
      <SpellForm show={showCreateModal} handleClose={handleCloseCreateModal} reload={reload} charKey={charKey} /> {/* This Modal appears when the New Spell button is clicked */}
      { selectSpell && <ViewSpellModal show={showViewModal} handleClose={handleCloseViewModal} spellKey={selectSpell} reload={reload} />} {/* Conditional rendering to prevent unwanted modals from loading */}
    </div>
  );
}

SpellBox.propTypes = {
  charKey: PropTypes.string,
};

SpellBox.defaultProps = {
  charKey: '',
};
