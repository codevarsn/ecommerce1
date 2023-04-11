import React, { useEffect, useState } from 'react';
import { Container, Nav, Navbar, NavDropdown, Offcanvas } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import SideCart from './SideCart';

const NavBar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token")
    
    


    //canvas cart
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        if(token){
            setShow(true)
        } else {
            navigate("/login")
        }
        
    };

    const logout = () => {
        localStorage.setItem("token", "")
        navigate("/login")
    }
    const getPurchases = () => {
        if (token) {
            navigate("/purchases")
        } else {
            navigate("/login")
        }
    }

    return (
        <>
            <Navbar className='navbar' fixed="top" bg="primary" variant="dark" expand="sm">
                <Container>
                    <Navbar.Brand as={Link} to={"/"}>E-comerce</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to={"/"}>Home</Nav.Link>
                            <Nav.Link as={Link} to={"/login"}><i className='bx bx-user bx-sm'></i></Nav.Link>
                            <Nav.Link onClick={() => getPurchases()}><i className='bx bx-list-check bx-md'></i></Nav.Link>
                            {
                                
                            }
                            <Nav.Link onClick={handleShow}><i className='bx bx-cart-alt bx-sm'></i></Nav.Link>
                            {token &&
                                <Nav.Link onClick={() => logout()}>Log Out</Nav.Link>
                            }

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <SideCart show={show} handleClose={handleClose} />
        </>
    );
};

export default NavBar;