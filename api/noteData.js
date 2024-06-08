import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const createNote = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/notes.json`, {
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

const updateNote = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/notes/${payload.firebaseKey}.json`, {
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

const getNotes = (characterId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/notes.json?orderBy="characterId"&equalTo="${characterId}"`, {
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

const getSingleNote = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/notes/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteNote = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/notes/${firebaseKey}.json`, {
    method: 'Delete',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getCharacterNotes = (characterId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/notes.json?orderBy="characterId"&equalTo="${characterId}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

export {
  createNote,
  updateNote,
  getNotes,
  getSingleNote,
  deleteNote,
  getCharacterNotes,
};
