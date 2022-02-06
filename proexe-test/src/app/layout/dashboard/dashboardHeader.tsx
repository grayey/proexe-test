import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Form, FormControl, Nav, Navbar, NavDropdown } from 'react-bootstrap';

export default function Footer(): JSX.Element {
    return (
    <div className="mb-5">
        <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">Dashboard</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
        </Container>
      </Navbar>
    </div>
    );
}
