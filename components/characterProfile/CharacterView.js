/* eslint-disable react/no-array-index-key */
/* eslint-disable radix */
import React, { useEffect, useState } from 'react';
import {
  Accordion, AccordionBody, AccordionHeader, Button, Card, Form,
  ListGroup,
} from 'react-bootstrap';
import { PropTypes } from 'prop-types';
import { updateCharacter } from '../../api/characterData';
import WindowWarning from '../WindowWarning';
import { getEquipedItems } from '../../api/itemData';

export default function CharacterView({ charObj }) { // charObj contains all data from the created characters
  const [edit, setEdit] = useState(false); // sets the state for the edit toggle
  const [initData, setInitData] = useState({}); // used in part of a check if data is changed
  const [tempData, setTempData] = useState({}); // state that contains the data to be edited
  const [gearStats, setGearStats] = useState([]);
  const [charGear, setCharGear] = useState({});

  useEffect(() => {
    setTempData(charObj); // stores character data in tempdata
    setInitData(charObj); // stores character data to be used as refence in windowWarning check
  }, [charObj]); // effect re-initializes if the charObj is changed

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempData({
      ...tempData,
      [name]: value, // targets the matching keys in ...tempData [] makes the name dynamic for each field, and value the input for that field.
    });
  };

  useEffect(() => {
    getEquipedItems(charObj.firebaseKey).then(setGearStats);
  }, [charObj.firebaseKey]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const gearValue = { // sets a base to add the array data into
      ac: 0,
      attackBonus: 0,
      chr: 0,
      con: 0,
      damageBonus: 0,
      dex: 0,
      hp: 0,
      int: 0,
      specialEffect: [],
      str: 0,
      wis: 0,
    };

    if (gearStats.length <= 0) return setCharGear(gearValue); // default value if no gear is made yet

    gearStats.forEach((obj) => { // combines the data from the array into one object
      gearValue.ac += parseInt(obj.ac, 10);
      gearValue.attackBonus += parseInt(obj.attackBonus, 10);
      gearValue.chr += parseInt(obj.chr, 10);
      gearValue.con += parseInt(obj.con, 10);
      gearValue.damageBonus += parseInt(obj.damageBonus, 10);
      gearValue.dex += parseInt(obj.dex, 10);
      gearValue.hp += parseInt(obj.hp, 10);
      gearValue.int += parseInt(obj.int, 10);
      gearValue.specialEffect.push(obj.specialEffect);
      gearValue.str += parseInt(obj.str, 10);
      gearValue.wis += parseInt(obj.wis, 10);

      return setCharGear(gearValue); // sets charGear to the new object
    });
  }, [gearStats]);

  const characterUpdater = () => {
    updateCharacter(tempData).then(setEdit(false)); // changes charcter data to the current tempData, and then prevents more editing.
    setInitData(tempData);
  };

  // modifier formula for the extra stats based off of the dnd rules
  const modifier = (stat) => {
    const mod = Math.floor((stat - 10) / 2);
    return mod;
  };

  const statTotals = (gear, base) => {
    const total = gear + parseInt(base);
    return total;
  };

  const hasUnsavedChanges = () => initData !== tempData; // checks if current data is different from ost recent save

  // returns a card/form that users can view their character, and edit stats of a character on the same page
  return (
    <WindowWarning hasUnsavedChanges={hasUnsavedChanges}> {/* A wrap component to throw a warning if data is unsaved */}

      <Card className="character-container">
        <Form.Check
          type="switch" // this is the toggle for the edit option
          id="editCharacterToggle"
          label="Edit Character"
          checked={edit}
          onChange={() => { setEdit(!edit); }}
        />
        {edit && (
        <Button onClick={characterUpdater} className="save">save</Button>
        )}
        <div>
          <Card.Img className="view-image" src={tempData.image} />
        </div>
        {edit && (
        <input
          className="character-input character-image-input"
          type="text"
          name="image"
          value={tempData?.image || ''} // ? and || '' are needed to prevent an error for undefined states when the DOM is rendering without mounted components yet
          onChange={handleChange}
          placeholder="Enter image URL"
        />
        )}
        <h4 className="stat">
          <input
            className="name-input character-fullName"
            type="text"
            name="fullName"
            value={tempData?.fullName || ''}
            onChange={handleChange}
            readOnly={!edit}
          />

        </h4>
        <div className="level-row">{charObj.characterClass} <input
          className="character-input character-con"
          type="number"
          name="level"
          value={tempData?.level || ''}
          onChange={handleChange}
          readOnly={!edit}
        />
        </div>
        <div className="health-box" />
        <div className="stat-and-effect-container">
          <div className="stat-box"> STATS
            <ListGroup>
              <ListGroup.Item>AttackBonus: {charGear.attackBonus}
                <div>DamageBonus: {charGear.damageBonus} </div>
              </ListGroup.Item>

              <Card.Text className="stat">
                Max HP: {charGear.hp + parseInt(tempData.baseHp)}/ <input
                  className="character-input character-health"
                  type="number"
                  name="currentHp"
                  value={tempData?.currentHp || tempData?.baseHp || ''}
                  onChange={handleChange}
                  readOnly={!edit}
                />
                <div>
                  Base HP: <input
                    className="character-input character-health"
                    type="number"
                    name="baseHp"
                    value={tempData?.baseHp || ''}
                    onChange={handleChange}
                    readOnly={!edit}
                  />
                </div>
                <div>Gear HP: {charGear.hp} </div>
              </Card.Text>

              <ListGroup.Item className="stat">Constitution: {(charGear.con + parseInt(tempData.con))}
                <div>Base: <input
                  className="character-input character-con"
                  type="number"
                  name="con"
                  value={tempData?.con || ''}
                  onChange={handleChange}
                  readOnly={!edit}
                />
                  <div>Gear:{charGear.con}</div>
                </div>
              </ListGroup.Item>

              <Card.Text className="stat">Charisma: {statTotals(charGear.chr, tempData.chr)}
                <div>Base: <input
                  className="character-input character-chr"
                  name="chr"
                  value={tempData?.chr || ''}
                  onChange={handleChange}
                  readOnly={!edit}
                />
                </div>
                <div>Gear: {charGear.chr}</div>
                <Accordion className="accordion">
                  <AccordionHeader className="accordion-header"> Chr Skills</AccordionHeader>
                  <AccordionBody className="accordion-body">
                    <span className="modifiers">
                      Deception: {modifier(statTotals(charGear.chr, tempData.chr))}
                      <span>Intimidation: {modifier(statTotals(charGear.chr, tempData.chr))}</span> {/* span is used because card.text is considered a <p> tag */}
                      <span>Performance: {modifier(statTotals(charGear.chr, tempData.chr))}</span>
                      <span>Survival: {modifier(statTotals(charGear.chr, tempData.chr))}</span>
                    </span>
                  </AccordionBody>
                </Accordion>
              </Card.Text>

              <ListGroup.Item className="stat">Strength: {statTotals(charGear.str, tempData.str)}
                <div> Base: <input
                  className="character-input character-str"
                  name="str"
                  value={tempData?.str || ''}
                  onChange={handleChange}
                  readOnly={!edit}
                />
                </div>
                <div>Gear: {charGear.str}</div>
                <span className="modifiers">
                  Athletics: {modifier(statTotals(charGear.str, tempData.str))}
                </span>
              </ListGroup.Item>

              <Card.Text className="stat">Dexterity: {statTotals(charGear.dex, tempData.dex)}
                <div>Base: <input
                  className="character-input character-dex"
                  name="dex"
                  value={tempData?.dex || ''}
                  onChange={handleChange}
                  readOnly={!edit}
                />
                </div>
                <div>Gear: {charGear.dex}</div>
                <Accordion className="accordion">
                  <AccordionHeader className="accordion-header"> Dex Skills</AccordionHeader>
                  <AccordionBody className="accordion-body">
                    <span className="modifiers">
                      <span>Acrobatics: {modifier(statTotals(charGear.dex, tempData.dex))}</span>
                      <span>Sleight of Hand: {modifier(statTotals(charGear.dex, tempData.dex))}</span>
                      <span>Stealth: {modifier(statTotals(charGear.dex, tempData.dex))}</span>
                    </span>
                  </AccordionBody>
                </Accordion>
              </Card.Text>

              <ListGroup.Item className="stat">Intelligence: {statTotals(charGear.int, tempData.int)}
                <div>Base: <input
                  className="character-input character-int"
                  name="int"
                  value={tempData?.int || ''}
                  onChange={handleChange}
                  readOnly={!edit}
                />
                </div>
                <div>Gear: {charGear.int}</div>
                <Accordion className="accordion">
                  <AccordionHeader className="accordion-header"> Int Skills</AccordionHeader>
                  <AccordionBody className="accordion-body">
                    <span className="modifiers">
                      <span>Arcana: {modifier(tempData.int)}</span>
                      <span>History: {modifier(tempData.int)}</span>
                      <span>Investigation: {modifier(tempData.int)}</span>
                      <span>Nature: {modifier(tempData.int)}</span>
                      <span>Religion: {modifier(tempData.int)}</span>
                    </span>
                  </AccordionBody>
                </Accordion>
              </ListGroup.Item>

              <Card.Text className="stat">Wisdom: {statTotals(charGear.wis, tempData.wis)}
                <div>Base: <input
                  className="character-input character-wis"
                  name="wis"
                  value={tempData?.wis || ''}
                  onChange={handleChange}
                  readOnly={!edit}
                />
                </div>
                <div>Gear: {charGear.wis} </div>
                <Accordion className="accordion">
                  <AccordionHeader className="accordion-header"> Wis Skills</AccordionHeader>
                  <AccordionBody className="accordion-body">
                    <span className="modifiers">
                      <span>Animal Handling: {modifier(statTotals(charGear.wis, tempData.wis))}</span>
                      <span>Insight: {modifier(statTotals(charGear.wis, tempData.wis))}</span>
                      <span>Medicine: {modifier(statTotals(charGear.wis, tempData.wis))}</span>
                      <span>Perception: {modifier(statTotals(charGear.wis, tempData.wis))}</span>
                      <span>Survival: {modifier(statTotals(charGear.wis, tempData.wis))}</span>
                    </span>
                  </AccordionBody>
                </Accordion>
              </Card.Text>
            </ListGroup>
          </div>
          <div className="effect-box">
            Special Effects:
            {charGear.specialEffect?.map((effect, index) => (<ul key={index}>{effect}</ul>))}
          </div>
        </div>
      </Card>
    </WindowWarning>
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
    baseHp: PropTypes.number,
    currentHp: PropTypes.number,
  }).isRequired,
};
