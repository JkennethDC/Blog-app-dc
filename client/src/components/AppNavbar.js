import { useState, useContext, useEffect } from "react";
import { FormControl, Form, Button, Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';

import UserContext from '../context/UserContext';

import { FaBloggerB, FaRegistered, FaUser, FaSearch } from "react-icons/fa";
import { IoLogOut, IoLogIn } from "react-icons/io5";
import { MdAdminPanelSettings } from "react-icons/md";

export default function AppNavbar() {
    const { user } = useContext(UserContext);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery) {
        navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
        }
    };

    useEffect(() => {
        console.log('AppNavbar: user', user);
      }, [user]);

    return (
        <>
        {(user.isAdmin === true) ? 
            <Navbar expand="lg" bg="primary" variant="light" sticky="top">
            <Container fluid={true}>
            <Navbar.Brand className="ms-5"><MdAdminPanelSettings size={40} color="white"/></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="m-auto">
                    <Nav.Link as={NavLink} to="/blogs"><FaBloggerB size={30} color="white"/></Nav.Link>
                    <Nav.Link as={NavLink} to="/user"><FaUser size={25} color="white" /></Nav.Link>
                    <Nav.Link as={NavLink} to="/logout"><IoLogOut size={30} color="white"/></Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>

        :
       
        <Navbar expand="lg" className="bg-dark" variant="dark">
        <Container fluid={true}>
            <Navbar.Brand as={NavLink} to="/" className="ms-5">J-Blog</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
                {(user.id !== null) ? 
                    <>
                    <Nav.Link as={NavLink} to="/blogs"><FaBloggerB size={30} color="white" /></Nav.Link>
                    <Nav.Link as={NavLink} to="/user"><FaUser size={25} color="white" /></Nav.Link>
                    <Nav.Link as={NavLink} to="/logout"><IoLogOut size={30} color="white" /></Nav.Link>
                    </>
                : <>
                    <Nav.Link as={NavLink} to="/login"><IoLogIn size={30} color="white"/></Nav.Link>
                    <Nav.Link as={NavLink} to="/register"><FaRegistered size={30} color="white" /></Nav.Link>
                    </>
                }
            </Nav>
            <Form className="d-flex ms-5" onSubmit={handleSearch}>
            <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button variant="outline-light" type="submit" ><FaSearch size={20} /></Button>
            </Form>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    } 
    </>
    );
}