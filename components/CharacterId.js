import React, { createContext, useContext, useState } from 'react';

const CharacterContext = createContext();

export const useCharacter = () => useContext(CharacterContext);

// eslint-disable-next-line react/prop-types
export const CharacterId = ({ children }) => {
  const [characterID, setCharacterID] = useState(null);

  return (
    <CharacterContext.Provider value={{ characterID, setCharacterID }}>
      {children}
    </CharacterContext.Provider>
  );
};
