import { deleteCharacter } from './characterData';
import { deleteNote, getCharacterNotes } from './noteData';
import { deleteSpell, getCharacterSpells } from './spellData';

const deleteCharacterAndRelatedData = (charId) => new Promise((resolve, reject) => {
  getCharacterNotes(charId).then((noteArray) => {
    const deleteCharacterNotes = noteArray.map((note) => deleteNote(note.firebaseKey));
    getCharacterSpells(charId).then((spellArray) => {
      const deleteCharacterSpells = spellArray.map((spell) => deleteSpell(spell.firebaseKey));
      Promise.all(deleteCharacterSpells, deleteCharacterNotes).then(() => {
        deleteCharacter(charId).then(resolve);
      });
    });
  }).catch((error) => reject(error));
});

export default deleteCharacterAndRelatedData;
