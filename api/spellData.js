import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getSpells = (characterId) => new Promise((resolve, reject) => {
  fetch((`${endpoint}/spells.json?orderBy="characterId"&equalTo="${characterId}"`), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const getSingleSpell = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/spells/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getCharacterSpells = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/spells.json?orderBy="characterId"&equalTo="${firebaseKey}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const createSpell = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/spells.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateSpell = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/spells/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteSpell = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/spells/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  deleteSpell,
  getSpells,
  getSingleSpell,
  createSpell,
  updateSpell,
  getCharacterSpells,
};
