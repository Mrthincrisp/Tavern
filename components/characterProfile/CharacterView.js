import React, { useEffect, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { PropTypes } from 'prop-types';
import { updateCharacter } from '../../api/characterData';

export default function CharacterView({ charObj }) { // charObj contains all data from the created characters
  const [edit, setEdit] = useState(false); // sets the state for the edit toggle
  const [tempData, setTempData] = useState({}); // state that contains the data to be edited

  useEffect(() => {
    setTempData(charObj); // stores character data in tempdata
  }, [charObj]); // effect re-initializes if the charObj is changed

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempData({
      ...tempData,
      [name]: value, // targets the matching keys in ...tempData
    });
  };

  const characterUpdater = () => {
    updateCharacter(tempData).then(setEdit(false)); // changes charcter data to the current tempData, and then prevents more editing.
  };

  // modifier formula for the extra stats based off of the dnd rules
  const modifier = (stat) => {
    const mod = Math.floor((stat - 10) / 2);
    return mod;
  };
  // returns a card/form that users can view their character, and edit stats of a character on the same page
  return (
    <Card className="character-container">
      <Form.Check
        type="switch" // this is the toggle for the edit option
        id="editCharacterToggle"
        label="Change Character Stats"
        checked={edit}
        onChange={() => { setEdit(!edit); }} // changes the state to the opposite of whatever is current
      /> {charObj.characterClass} {charObj.level}
      <div>
        <Card.Img className="view-image" src={tempData.image} />
      </div>
      {edit && (
        <input
          className="input character-image-input"
          type="text"
          name="image"
          value={tempData?.image || ''} // ? and || '' are needed to prevent an error for undefined states when the DOM is rendering without mounted components yet
          onChange={handleChange}
          placeholder="Enter image URL"
        />
      )}
      <h4 className="stat">
        <input
          className="input character-fullName"
          type="text"
          name="fullName"
          value={tempData?.fullName || ''}
          onChange={handleChange}
          readOnly={!edit}
        />

      </h4>
      {edit && (
      <Button onClick={characterUpdater} className="save">save</Button>
      )}
      <div className="health-box" />
      <div className="stat-box"> STATS
        <Card.Text>
          HP: <input
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
          <span className="modifiers">
            Deception: {modifier(tempData.chr)}
            <span>Intimidation: {modifier(tempData.chr)}</span> {/* span is used because card.text is considered a <p> tag */}
            <span>Performance: {modifier(tempData.chr)}</span>
            <span>Survival: {modifier(tempData.chr)}</span>
          </span>
        </Card.Text>

        <Card.Text className="stat">Strength: <input
          className="input character-str"
          name="str"
          value={tempData?.str || ''}
          onChange={handleChange}
          readOnly={!edit}
        />
          <span className="modifiers">
            Athletics: {modifier(tempData.str)}
          </span>
        </Card.Text>

        <Card.Text className="stat">Dexterity: <input
          className="input character-dex"
          name="dex"
          value={tempData?.dex || ''}
          onChange={handleChange}
          readOnly={!edit}
        />
          <span className="modifiers">
            <span>Acrobatics: {modifier(tempData.dex)}</span>
            <span>Sleight of Hand: {modifier(tempData.dex)}</span>
            <span>Stealth: {modifier(tempData.dex)}</span>
          </span>
        </Card.Text>

        <Card.Text className="stat">Intelligencen: <input
          className="input character-int"
          name="int"
          value={tempData?.int || ''}
          onChange={handleChange}
          readOnly={!edit}
        />
          <span className="modifiers">
            <span>Arcana: {modifier(tempData.int)}</span>
            <span>History: {modifier(tempData.int)}</span>
            <span>Investigation: {modifier(tempData.int)}</span>
            <span>Nature: {modifier(tempData.int)}</span>
            <span>Religion: {modifier(tempData.int)}</span>
          </span>
        </Card.Text>

        <Card.Text className="stat">Wisdom: <input
          className="input character-wis"
          name="wis"
          value={tempData?.wis || ''}
          onChange={handleChange}
          readOnly={!edit}
        />
          <span className="modifiers">
            <span>Animal Handling: {modifier(tempData.wis)}</span>
            <span>Insight: {modifier(tempData.wis)}</span>
            <span>Medicine: {modifier(tempData.wis)}</span>
            <span>Perception: {modifier(tempData.wis)}</span>
            <span>Survival: {modifier(tempData.wis)}</span>
          </span>
        </Card.Text>
      </div>
    </Card>
  );
}
// required properties for the component to function properly
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
