/* eslint-disable jsx-a11y/anchor-is-valid */
import { useRouter } from 'next/router';
import React from 'react';
import Link from 'next/link';
import {
  Navbar, Container, Nav, Button,
} from 'react-bootstrap';
import { signOut } from '../utils/auth';

export default function NavBarAuth() {
  const router = useRouter();
  const { firebaseKey } = router.query;

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Link passHref href="/">
          <Navbar.Brand>Tavern</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link passHref href="/">
              <Nav.Link>Home</Nav.Link>
            </Link>
            {firebaseKey && (
              <>
                <Nav className="link">
                  <Link href={`/character/${firebaseKey}`} passHref>
                    <Nav.Link>Character</Nav.Link>
                  </Link>
                </Nav>
                <Nav className="link">
                  <Link passHref href={`/character/notes/notebook/${firebaseKey}`}>
                    <Nav.Link>Notebook</Nav.Link>
                  </Link>
                </Nav>
                <Nav className="link">
                  <Link passHref href={`/character/inventory/${firebaseKey}`}>
                    <Nav.Link>Inventory</Nav.Link>
                  </Link>
                </Nav>
              </>
            )}
          </Nav>
          {!firebaseKey && (
          <Link href="character/new" passHref>
            <Button className="button create create-character-button">Create a Character</Button>
          </Link>
          )}
          <Button variant="danger" onClick={signOut}>Sign Out</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
