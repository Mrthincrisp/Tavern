import React, { useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { PropTypes } from 'prop-types';
import { updateCharacter } from '../../api/characterData';

export default function CharacterView({ charObj }) {
  const [edit, setEdit] = useState(false);
  const [tempData, setTempData] = useState({});

  useEffect(() => {
    setTempData(charObj);
  }, [charObj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempData({
      ...tempData,
      [name]: value,
    });
  };

  const characterUpdater = () => {
    updateCharacter(tempData).then(setEdit(false));
  };

  const modifier = (stat) => {
    const mod = Math.floor((stat - 10) / 2);
    return mod;
  };

  return (
    <Card className="character-container">
      <div>
        <Card.Img
          className="character-image"
          src={tempData.image}
        />
      </div>
      <h4>{tempData.fullName}</h4>
      <div className="health-box">
        <Form.Check
          type="switch"
          id="editToggle"
          label="Character Stats"
          checked={edit}
          onChange={() => { setEdit(!edit); }}
        />
        {edit && (
          <Button onClick={characterUpdater} className="save">save</Button>
        )}
      </div>
      <div className="stat-box"> STATS
        <Card.Text>
          HP: current/ <input
            className="input character-health"
            name="hp"
            value={tempData?.hp || ''}
            onChange={handleChange}
            readOnly={!edit}
          />
        </Card.Text>
        <Card.Text className="stat">Constitution: <input
          className="input character-con"
          name="con"
          value={tempData?.con || ''}
          onChange={handleChange}
          readOnly={!edit}
        />
        </Card.Text>
        <Card.Text className="stat">Charisma: <input
          className="input character-chr"
          name="chr"
          value={tempData?.chr || ''}
          onChange={handleChange}
          readOnly={!edit}
        />
          Deception: {modifier(tempData.chr)}
          Intimidation: {modifier(tempData.chr)}
          Performance: {modifier(tempData.chr)}
          Survival: {modifier(tempData.chr)}
        </Card.Text>
        <Card.Text className="stat">Strength: <input
          className="input character-str"
          name="str"
          value={tempData?.str || ''}
          onChange={handleChange}
          readOnly={!edit}
        />
          Athletics: {modifier(tempData.str)}
        </Card.Text>
        <Card.Text className="stat">Dexterity: <input
          className="input character-dex"
          name="dex"
          value={tempData?.dex || ''}
          onChange={handleChange}
          readOnly={!edit}
        />
          Acrobatics: {modifier(tempData.dex)}
          Sleight of Hand: {modifier(tempData.dex)}
          Stealth:  {modifier(tempData.dex)}
        </Card.Text>
        <Card.Text className="stat">Intelligencen: <input
          className="input character-int"
          name="int"
          value={tempData?.int || ''}
          onChange={handleChange}
          readOnly={!edit}
        />
          Arcana: {modifier(tempData.int)}
          History: {modifier(tempData.int)}
          Investigation: {modifier(tempData.int)}
          Nature: {modifier(tempData.int)}
          Religion: Arcana: {modifier(tempData.int)}
        </Card.Text>
        <Card.Text className="stat">Wisdom: <input
          className="input character-wis"
          name="wis"
          value={tempData?.wis || ''}
          onChange={handleChange}
          readOnly={!edit}
        />
          Animal Handling: {modifier(tempData.wis)}
          Insight: {modifier(tempData.wis)}
          Medicine: {modifier(tempData.wis)}
          Perception: {modifier(tempData.wis)}
          Survival: {modifier(tempData.wis)}
        </Card.Text>
      </div>
    </Card>
  );
}

CharacterView.propTypes = {
  charObj: PropTypes.shape({
    fullName: PropTypes.string,
    firebaseKey: PropTypes.string,
    image: PropTypes.string,
    level: PropTypes.number,
    characterClass: PropTypes.string,
    str: PropTypes.number,
    dex: PropTypes.number,
    int: PropTypes.number,
    wis: PropTypes.number,
    chr: PropTypes.number,
    con: PropTypes.number,
    hp: PropTypes.number,
  }).isRequired,
};
