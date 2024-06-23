import { useEffect, useState } from 'react';
import { useAuth } from '../utils/context/authContext';
import { getCharacters } from '../api/characterData';
import CharacterCard from '../components/CharacterCard';

function Home() {
  const { user } = useAuth();
  const [character, setCharacter] = useState([]);

  const getAllCharacters = () => {
    getCharacters(user.uid).then(setCharacter);
  };

  useEffect(() => {
    getAllCharacters(user.uid);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.uid]);

  return (
    <div className="home">
      <div className="text-wrapper">
        <h1 className="header">Which table would you like? </h1>
      </div>
      <div className="character-card">
        {character.map((char) => (
          <CharacterCard key={char.firebaseKey} charObj={char} onUpdate={getAllCharacters} />
        ))}
      </div>
    </div>
  );
}

export default Home;
