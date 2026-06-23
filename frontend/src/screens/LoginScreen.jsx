import { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCredentials } from '../slices/authSlice';
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-toastify';

const LoginScreen = () => {

    const [activeTab, setActiveTab] = useState('login');

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [registerEmail, setRegisterEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!loginEmail || !loginPassword) {
            toast.error('Sva polja su obavezna');
            return;
        }
        try {
        const { data } = await axiosInstance.post('/auth/login', {
            email: loginEmail,
            password: loginPassword,
        });
        dispatch(setCredentials(data));
        toast.success('Uspešno ste se prijavili!');
        navigate('/');
        } catch (error) {
        toast.error(error.response?.data?.message || 'Pogrešna email adresa ili lozinka');
        }
    };

    const handleRegister = async (e) => {
    e.preventDefault();
    if (!firstName || !lastName || !registerEmail || !registerPassword || !confirmPassword) {
        toast.error('Sva polja su obavezna');
        return;
    }
    if (registerPassword !== confirmPassword) {
      toast.error('Lozinke se ne poklapaju');
      return;
    }
    try {
        const name = `${firstName} ${lastName}`;
        const { data } = await axiosInstance.post('/auth/register', {
            name,
            email: registerEmail,
            password: registerPassword,
        });
        dispatch(setCredentials(data));
        toast.success('Uspešno ste se registrovali!');
        navigate('/');
        } catch (error) {
        toast.error(error.response?.data?.message || 'Greška pri registraciji');
        }
    };

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
                            <Form.Control type="email" placeholder="Email" className="bg-dark text-white border-secondary mb-3" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
                            <Form.Control type="password" placeholder="Lozinka" className="bg-dark text-white border-secondary mb-4" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
                            <Button variant="success" className="w-100" onClick={handleLogin}>Prijavi se</Button>
                            <p className="text-center text-white mt-3 mb-0" style={ {fontSize: '14px'}}>
                                Nemaš nalog? <span className="text-success" style={{ cursor: 'pointer' }} onClick={() => setActiveTab('register')}>
                                    Registruj se!
                                </span>
                            </p>
                        </>
                        )}

                        {activeTab === 'register' && (
                            <>
                                <Form.Control type="text" placeholder="Ime" className="bg-dark text-white border-secondary mb-3" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                                <Form.Control type="text" placeholder="Prezime" className="bg-dark text-white border-secondary mb-3" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                                <Form.Control type="email" placeholder="Email" className="bg-dark text-white border-secondary mb-3" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} />
                                <Form.Control type="password" placeholder="Lozinka" className="bg-dark text-white border-secondary mb-3" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} />
                                <Form.Control type="password" placeholder="Potvrdi lozinku" className="bg-dark text-white border-secondary mb-4" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

                                <Button variant="success" className="w-100" onClick={handleRegister}>Registruj se</Button>
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
