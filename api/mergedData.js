import { deleteCharacter } from './characterData';
import { deleteSpell, getCharacterSpells } from './spellData';

const deleteCharacterAndSpells = (charId) => new Promise((resolve, reject) => {
  getCharacterSpells(charId).then((spellArray) => {
    const deleteCharacterSpells = spellArray.map((spell) => deleteSpell(spell.firebaseKey));
    Promise.all(deleteCharacterSpells).then(() => {
      deleteCharacter(charId).then(resolve);
    });
  }).catch((error) => reject(error));
});

export default deleteCharacterAndSpells;
