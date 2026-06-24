import { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { setCredentials } from '../slices/authSlice';
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-toastify';
import { FaUser } from 'react-icons/fa';

const ProfileScreen = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setName(user.name || '');
            setEmail(user.email || '');
            setPhone(user.phone || '');
            setPreview(user.avatar || null);
        }
    }, [user]);

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatar(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('user iz redux:', user);
        console.log('localStorage:', localStorage.getItem('user'));

        if (password && password !== confirmPassword) {
            toast.error('Lozinke se ne poklapaju');
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('email', email);
            formData.append('phone', phone);
            if (password) formData.append('password', password);
            if (avatar) formData.append('avatar', avatar);

            const { data } = await axiosInstance.put('/users/profile', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            dispatch(setCredentials(data));
            toast.success('Profil uspešno ažuriran');
            setPassword('');
            setConfirmPassword('');
        } catch (error) {
            toast.error('Greška pri ažuriranju profila');
        } finally {
            setLoading(false);
        }
    };

    const getInitials = (name) => {
        if (!name) return '?';
        return name.split(' ').map(n => n[0]).join('').toUpperCase();
    };

    return (
        <Container className="py-5">
            <h2 className="fw-bold mb-4">Uredi profil</h2>
            <Row>
                <Col md={4} className="text-center mb-4">
                    <div className="mb-3">
                        {preview ? (
                            <img
                                src={preview}
                                alt="avatar"
                                className="rounded-circle"
                                style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                            />
                        ) : (
                            <div className="rounded-circle bg-success d-flex align-items-center justify-content-center text-white fw-bold mx-auto"
                                style={{ width: '120px', height: '120px', fontSize: '2rem' }}>
                                {getInitials(name)}
                            </div>
                        )}
                    </div>
                    <Form.Label className="btn btn-outline-success btn-sm">
                        Promeni sliku
                        <Form.Control
                            type="file"
                            accept="image/*"
                            onChange={handleAvatarChange}
                            className="d-none"
                        />
                    </Form.Label>
                </Col>

                <Col md={8}>
                    <div className="bg-dark text-white rounded p-4">
                        <h5 className="text-success mb-3">Lični podaci</h5>

                        <Form onSubmit={handleSubmit}>
                            <Form.Control
                                type="text"
                                placeholder="Ime i prezime"
                                className="bg-dark text-white border-secondary mb-3"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <Form.Control
                                type="email"
                                placeholder="Email adresa"
                                className="bg-dark text-white border-secondary mb-3"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Form.Control
                                type="tel"
                                placeholder="Broj telefona"
                                className="bg-dark text-white border-secondary mb-3"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />

                            <hr className="border-secondary" />
                            <h5 className="text-success mb-3">Promena lozinke</h5>

                            <Form.Control
                                type="password"
                                placeholder="Nova lozinka (ostavite prazno ako ne menjate)"
                                className="bg-dark text-white border-secondary mb-3"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Form.Control
                                type="password"
                                placeholder="Potvrdite novu lozinku"
                                className="bg-dark text-white border-secondary mb-3"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />

                            <Button
                                type="submit"
                                variant="success"
                                className="w-100"
                                disabled={loading}
                            >
                                {loading
                                    ? <><Spinner animation="border" size="sm" className="me-2" />Čuvanje...</>
                                    : 'Sačuvaj izmene'
                                }
                            </Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default ProfileScreen;