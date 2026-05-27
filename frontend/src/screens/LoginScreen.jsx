import { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const LoginScreen = () => {

    const [activeTab, setActiveTab] = useState('login');

    return (
        <Container className="py-5">
            <Row className="justify-content-center">
                <Col md={5}>
                    <div className="bg-dark text-white rounded p-4">

                        <div className="d-flex border border-secondary rounded mb-4 overflow-hidden">
                            <button className={`btn w-50 rounded-0 ${activeTab === 'login' ? 'btn-success' : 'btn-dark text-white' }`}
                            onClick={() => setActiveTab('login')}>
                                Prijavi se
                            </button>

                            <button className={`btn w-50 rounded-0 ${activeTab === 'register' ? 'btn-success' : 'btn-dark text-white' }`}
                            onClick={() => setActiveTab('register')}>
                                Registruj se
                            </button>
                        </div>

                        {activeTab === 'login' && (
                        <>
                            <Form.Control type="email" placeholder="Email" className="bg-dark text-white border-secondary mb-3" />
                            <Form.Control type="password" placeholder="Lozinka" className="bg-dark text-white border-secondary mb-4" />
                            <Button variant="success" className="w-100">Prijavi se</Button>
                            <p className="text-center text-white mt-3 mb-0" style={ {fontSize: '14px'}}>
                                Nemaš nalog? <span className="text-success" style={{ cursor: 'pointer' }} onClick={() => setActiveTab('register')}>
                                    Registruj se!
                                </span>
                            </p>
                        </>
                        )}

                        {activeTab === 'register' && (
                            <>
                                <Form.Control type="text" placeholder="Ime" className="bg-dark text-white border-secondary mb-3" />
                                <Form.Control type="text" placeholder="Prezime" className="bg-dark text-white border-secondary mb-3" />
                                <Form.Control type="email" placeholder="Email" className="bg-dark text-white border-secondary mb-3" />
                                <Form.Control type="password" placeholder="Lozinka" className="bg-dark text-white border-secondary mb-3" />
                                <Form.Control type="password" placeholder="Potvrdi lozinku" className="bg-dark text-white border-secondary mb-4" />

                                <Button variant="success" className="w-100">Registruj se</Button>
                                <p className="text-center text-white mt-3 mb-0" style={{ fontSize: '14px' }}>
                                    Već imaš nalog?{' '}
                                    <span className="text-success" style={{ cursor: 'pointer' }} onClick={() => setActiveTab('login')}>
                                        Prijavi se!
                                    </span>
                                </p>
                            </>
                        )}
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default LoginScreen;
