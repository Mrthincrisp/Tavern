import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getItems = (characterId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/items.json?orderBy="characterId"&equalTo="${characterId}"`, {
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

const getEquipedItems = (characterId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/items.json?orderBy="characterId"&equalTo="${characterId}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        const filteredData = Object.values(data)
          .filter((item) => item.equiped === true) // filters the data to grab items by the equiped key
          .sort((a, b) => a.listIndex - b.listIndex); // sorts the items by index to be displayed when mapped
        resolve(filteredData);
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const getUnequipedItems = (characterId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/items.json?orderBy="characterId"&equalTo="${characterId}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        const filteredData = Object.values(data)
          .filter((item) => item.equiped === false)
          .sort((a, b) => a.listIndex - b.listIndex);
        resolve(filteredData);
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

const createItem = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/items.json`, {
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

const updateItem = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/items/${payload.firebaseKey}.json`, {
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

const getSingleItem = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/items/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const deleteItem = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/items/${firebaseKey}.json`, {
    method: 'Delete',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const getCharacterItems = (characterId) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/items.json?orderBy="characterId"&equalTo="${characterId}"`, {
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
  getItems,
  createItem,
  updateItem,
  deleteItem,
  getSingleItem,
  getCharacterItems,
  getEquipedItems,
  getUnequipedItems,
};
