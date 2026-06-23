import { useState } from 'react';
import { Container, Row, Col, Form, Button, FormGroup } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaFacebook, FaInstagram, FaBuilding, FaPhone, FaHome, FaTag, FaDollarSign, FaClipboardList, FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axiosInstance from '../utils/axiosInstance';
import logo from '../assets/NexEstateLogo.png';

const Footer = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [text, setText] = useState('');

    const handleSubmit = async () => {
        if (!firstName || !lastName || !text) {
            toast.error('Sva polja su obavezna');
            return;
        }
        try {
            await axiosInstance.post('/reviews', {
                fullName: `${firstName} ${lastName}`,
                text,
            });
            toast.success('Recenzija uspešno poslata!');
            setFirstName('');
            setLastName('');
            setText('');
        } catch (error) {
            toast.error('Greška pri slanju recenzije');
        }
    };


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
                                <LinkContainer to="/pricing">
                                    <a className="text-white text-decoration-none">
                                        <FaDollarSign className="me-2" /> Cenovnik
                                    </a>
                                </LinkContainer>
                            </li>
                            <li className="mb-2">
                                <LinkContainer to="/aboutUs">
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
                            <Form.Control type="text" placeholder="Vaše ime" className="bg-dark text-white border-secondary mb-2" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                            <Form.Control type="text" placeholder="Vaše prezime" className="bg-dark text-white border-secondary mb-2" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                            <Form.Control as="textarea" rows={3} placeholder="Recenzija..." className="bg-dark text-white border-secondary mb-2" value={text} onChange={(e) => setText(e.target.value)} />

                            <Button variant="success" size="md" className="w-50" onClick={handleSubmit} >Pošalji</Button>
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