import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { FaClipboardList, FaPlus, FaSignInAlt, FaDollarSign } from 'react-icons/fa';
import logo from '../assets/NexEstateLogo.png';

const Header = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>
                        <img src={logo} alt="NexEstate Logo" width={100} height={50} />
                    </Navbar.Brand>
                </LinkContainer>

                <Navbar.Toggle aria-controls='navbarContent' />

                <Navbar.Collapse id="navbarContent">

                <Nav className="ms-auto align-items-center gap-2">
                    <LinkContainer to="/">
                        <Nav.Link>
                            <Button variant="success" size="sm">Postavi oglas <FaPlus /></Button>
                        </Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/">
                        <Nav.Link>
                            <FaDollarSign /> Cenovnik
                        </Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/">
                        <Nav.Link>
                            <FaClipboardList /> Moji oglasi
                        </Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/">
                        <Nav.Link>
                            <FaSignInAlt /> Prijavi se
                        </Nav.Link>
                    </LinkContainer>
                </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;