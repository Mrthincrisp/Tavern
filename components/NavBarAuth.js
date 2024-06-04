/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';
import { useCharacter } from './CharacterId';

export default function NavBarAuth() {
  const { characterID, setCharacterID } = useCharacter();

  const handleID = () => {
    setCharacterID(null);
  }; // used to Hides tabs related to characters

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand onClick={handleID}>Tavern</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link passHref href="/">
              <Nav.Link onClick={handleID}>Home</Nav.Link>
            </Link>
            {characterID && (
              <>
                <Nav className="link">
                  <Link href={`/character/${characterID}`} passHref>
                    <Nav.Link>Character</Nav.Link>
                  </Link>
                </Nav>
                <Nav className="link">
                  <Link passHref href="/character/notes/notebook">
                    <Nav.Link>Notebook</Nav.Link>
                  </Link>
                </Nav>
              </>
            )}
          </Nav>
          <Button variant="danger" onClick={signOut}>Sign Out</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
