import { Container, Row, Col, Form, Button, FormGroup } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaFacebook, FaInstagram, FaBuilding, FaPhone, FaHome, FaTag, FaDollarSign, FaClipboardList, FaUser } from 'react-icons/fa';
import logo from '../assets/NexEstateLogo.png';

const Footer = () => {
    return (
        <footer className="bg-dark text-white mt-5">
            <Container className="py-5">
                <Row>
                    <Col md={3}>
                        <img src={logo} alt="NexEstate Logo" width={170} height={150}/>
                        <div className="d-flex gap-4 pt-3">
                            <a href="https://facebook.com" target='_blank' className="text-white fs-3">
                                <FaFacebook />
                            </a>
                            <a href="https://instagram.com" target="_blank" className="text-white fs-3">
                                <FaInstagram />
                            </a>
                            <a href="tel:+381601234567" className="text-white fs-3">
                                <FaPhone />
                            </a>
                        </div>
                    </Col>

                    <Col md={3}>
                        <h6 className="tex-success text-uppercase mb-3">Linkovi</h6>
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <LinkContainer to="/">
                                    <a className="text-white text-decoration-none">
                                        <FaHome className="me-2" /> Početna
                                    </a>
                                </LinkContainer>
                            </li>
                            <li className="mb-2">
                                <LinkContainer to="/property">
                                    <a className="text-white text-decoration-none">
                                        <FaBuilding className="me-2"/> Oglasi
                                    </a>
                                </LinkContainer>
                            </li>                            
                            <li className="mb-2">
                                <LinkContainer to="/myPropertyListings">
                                    <a className="text-white text-decoration-none">
                                        <FaClipboardList className="me-2" /> Moji oglasi
                                    </a>
                                </LinkContainer>
                            </li>
                            <li className="mb-2">
                                <LinkContainer to="/">
                                    <a className="text-white text-decoration-none">
                                        <FaDollarSign className="me-2" /> Cenovnik
                                    </a>
                                </LinkContainer>
                            </li>
                            <li className="mb-2">
                                <LinkContainer to="/">
                                    <a className="text-white text-decoration-none">
                                        <FaUser className="me-2" /> O nama
                                    </a>
                                </LinkContainer>
                            </li>
                        </ul>
                    </Col>
                    
                    <Col md={6}>
                        <h6 className="text-success text-uppercase mb-3">Ostavi recenziju</h6>
                        <Form>
                            <Form.Control type="text" placeholder="Vaše ime" className="bg-dark text-white border-secondary mb-2" />
                            <Form.Control type="text" placeholder="Vaše prezime" className="bg-dark text-white border-secondary mb-2" />
                            <Form.Control as="textarea" rows={3} placeholder="Recenzija..." className="bg-dark text-white border-secondary mb-2" />

                            <Button variant="success" size="md" className="w-50">Pošalji</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>

            <div className="border-top border-secondary py-3 text-center text-white">
                <small>© {new Date().getFullYear()}. NexEstate. All rights reserved.</small>
            </div>
        </footer>
    );
};

export default Footer;