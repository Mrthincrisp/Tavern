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
    getAllCharacters(user.id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user.id]);

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <h1>Hello {user.displayName}! </h1>
      {character.map((char) => (
        <CharacterCard charObj={char} />
      ))}
      <Link href="character/new" passHref>
        <Button className="button create create-character-button">Create a Character</Button>
      </Link>
    </div>
  );
}

export default Home;
