import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CharacterView from '../../components/characterProfile/CharacterView';
import { getSingleCharacter } from '../../api/characterData';
import SpellBox from '../../components/characterProfile/SpellBox';

export default function CharacterSheet() {
  const [characterData, setCharacterData] = useState({});
  const router = useRouter();
  const { firebaseKey } = router.query;

  useEffect(() => {
    getSingleCharacter(firebaseKey).then(setCharacterData);
  }, [firebaseKey]);

  return (
    <div className="layout-container">
      <div className="character-view">
        <CharacterView charObj={characterData} />
      </div>
      <div className="spell-box">
        <SpellBox charKey={characterData.firebaseKey} />
      </div>
    </div>
  );
}
