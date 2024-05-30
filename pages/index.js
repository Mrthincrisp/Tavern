import { Button } from 'react-bootstrap';
import Link from 'next/link';
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
    <div>
      <h1 className="header">Hello {user.displayName}! </h1>
      <Link href="character/new" passHref>
        <Button className="button create create-character-button">Create a Character</Button>
      </Link>
      <div className="character-card">
        {character.map((char) => (
          <CharacterCard key={char.firebaseKey} charObj={char} onUpdate={getAllCharacters} />
        ))}
      </div>
    </div>
  );
}

export default Home;
