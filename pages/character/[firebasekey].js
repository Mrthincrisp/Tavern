import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import { getSingleCharacter } from '../../api/characterData';

export default function CharacterView() {
  const [characterData, setCharacterData] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleCharacter(firebaseKey).then(setCharacterData);
  }, [firebaseKey]);

  return (
    <Card className="character-container">
      <h4>{characterData.fullName}</h4>
      <div className="health-box">
        <div>
          <Card.Img
            className="character-image"
            src={characterData.image}
          />
        </div>
        <div className="character-health">
          HP: current/{characterData.hp}
        </div>
      </div>
      <div className="stat-box"> STATS
        <div className="stat">Constitution: {characterData.con}</div>
        <div className="stat">Charisma: {characterData.chr}</div>
        <div className="stat">strength: {characterData.str}</div>
        <div className="stat">Dexterity: {characterData.dex}</div>
        <div className="stat">Intelligence: {characterData.int}</div>
        <div className="stat">Wisdom: {characterData.wis}</div>
      </div>
      <div className="Spell-box">
        Spell Box will go here
      </div>
    </Card>
  );
}
