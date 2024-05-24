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
          className="view-image"
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
          <div className="modifiers">
            Deception: {modifier(tempData.chr)}
            <div>Intimidation: {modifier(tempData.chr)}</div>
            <div>Performance: {modifier(tempData.chr)}</div>
            <div>Survival: {modifier(tempData.chr)}</div>
          </div>
        </Card.Text>
        <Card.Text className="stat">Strength: <input
          className="input character-str"
          name="str"
          value={tempData?.str || ''}
          onChange={handleChange}
          readOnly={!edit}
        />
          <div className="modifiers">
            Athletics: {modifier(tempData.str)}
          </div>
        </Card.Text>
        <Card.Text className="stat">Dexterity: <input
          className="input character-dex"
          name="dex"
          value={tempData?.dex || ''}
          onChange={handleChange}
          readOnly={!edit}
        />
          <div className="modifiers">
            <div>Acrobatics: {modifier(tempData.dex)}</div>
            <div>Sleight of Hand: {modifier(tempData.dex)}</div>
            <div>Stealth: {modifier(tempData.dex)}</div>
          </div>
        </Card.Text>
        <Card.Text className="stat">Intelligencen: <input
          className="input character-int"
          name="int"
          value={tempData?.int || ''}
          onChange={handleChange}
          readOnly={!edit}
        />
          <div className="modifiers">
            <div>Arcana: {modifier(tempData.int)}</div>
            <div>History: {modifier(tempData.int)}</div>
            <div>Investigation: {modifier(tempData.int)}</div>
            <div>Nature: {modifier(tempData.int)}</div>
            <div>Religion: {modifier(tempData.int)}</div>
          </div>
        </Card.Text>
        <Card.Text className="stat">Wisdom: <input
          className="input character-wis"
          name="wis"
          value={tempData?.wis || ''}
          onChange={handleChange}
          readOnly={!edit}
        />
          <div className="modifiers">
            <div>Animal Handling: {modifier(tempData.wis)}</div>
            <div>Insight: {modifier(tempData.wis)}</div>
            <div>Medicine: {modifier(tempData.wis)}</div>
            <div>Perception: {modifier(tempData.wis)}</div>
            <div>Survival: {modifier(tempData.wis)}</div>
          </div>
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
