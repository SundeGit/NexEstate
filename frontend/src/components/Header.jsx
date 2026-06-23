import { Navbar, Nav, Container, Button , NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaClipboardList, FaPlus, FaSignInAlt, FaDollarSign, FaUser } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import logo from '../assets/NexEstateLogo.png';

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        toast.success('Uspešna odjava, očekujemo Vas uskoro!');
        navigate('/login');
    };

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
                    <LinkContainer to="/createPropertyListing">
                        <Nav.Link>
                            <Button variant="success" size="sm">Postavi oglas <FaPlus /></Button>
                        </Nav.Link>
                    </LinkContainer>
                    <LinkContainer to="/pricing">
                        <Nav.Link>
                            <FaDollarSign /> Cenovnik
                        </Nav.Link>
                    </LinkContainer>
                    { user ? (
                    <>
                        <LinkContainer to="/myPropertyListings">
                            <Nav.Link>
                                <FaClipboardList /> Moji oglasi
                            </Nav.Link>
                        </LinkContainer>
                        <NavDropdown title={<><FaUser /> {user.name}</>} id="username">
                        <LinkContainer to="/profile">
                            <NavDropdown.Item>Profil</NavDropdown.Item>
                                </LinkContainer>
                                    <NavDropdown.Item onClick={handleLogout}>
                                        Odjavi se
                                </NavDropdown.Item>
                        </NavDropdown>
                    </>
                    ) : (
                    <LinkContainer to="/login">
                        <Nav.Link>
                            <FaSignInAlt /> Prijavi se
                        </Nav.Link>
                    </LinkContainer>
                    )}
                </Nav>

                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;