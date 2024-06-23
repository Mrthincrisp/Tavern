import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Tab, Tabs } from 'react-bootstrap';
import CharacterView from '../../components/characterProfile/CharacterView';
import { getSingleCharacter } from '../../api/characterData';
import SpellBox from '../../components/characterProfile/SpellBox';
import DiceBox from '../../components/characterProfile/DiceBox';

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
      <div className="tab-box">
        <Tabs defaultActiveKey="profile" className="justify-tab-example custom-tab" justify>
          <Tab eventKey="profile" title="Spells" className="tab-text">
            <div className="tab-content">
              <div className="spell-box">
                <SpellBox charKey={characterData.firebaseKey} />
              </div>
            </div>
          </Tab>
          <Tab eventKey="dice" title="Dice Box" className="tab-text">
            <div className="tab-content">
              <div>
                <DiceBox />
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
