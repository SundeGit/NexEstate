import { useState, useEffect } from 'react';
import { Container, Tab, Nav, Table, Button, Badge } from 'react-bootstrap';
import { FaTrash, FaCheck, FaTimes } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

const AdminScreen = () => {
    const { user } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const [users, setUsers] = useState([]);
    const [properties, setProperties] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user || !user.isAdmin) {
            navigate('/');
            return;
        }
        const fetchData = async () => {
            try {
                const [usersRes, propertiesRes, reviewsRes] = await Promise.all([
                    axiosInstance.get('/users'),
                    axiosInstance.get('/properties'),
                    axiosInstance.get('/reviews'),
                ]);
                setUsers(usersRes.data);
                setProperties(propertiesRes.data.properties);
                setReviews(reviewsRes.data);
            } catch (error) {
                toast.error('Greška pri učitavanju podataka');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleDeleteUser = async (id) => {
        if (!window.confirm('Obrisati korisnika i sve njegove oglase?')) return;
        try {
            await axiosInstance.delete(`/users/${id}`);
            setUsers(prev => prev.filter(u => u._id !== id));
            toast.success('Korisnik obrisan');
        } catch (error) {
            toast.error('Greška pri brisanju korisnika');
        }
    };

    const handleDeleteProperty = async (id) => {
        if (!window.confirm('Obrisati oglas?')) return;
        try {
            await axiosInstance.delete(`/properties/${id}`);
            setProperties(prev => prev.filter(p => p._id !== id));
            toast.success('Oglas obrisan');
        } catch (error) {
            toast.error('Greška pri brisanju oglasa');
        }
    };

    const handleDeleteReview = async (id) => {
        if (!window.confirm('Obrisati recenziju?')) return;
        try {
            await axiosInstance.delete(`/reviews/${id}`);
            setReviews(prev => prev.filter(r => r._id !== id));
            toast.success('Recenzija obrisana');
        } catch (error) {
            toast.error('Greška pri brisanju recenzije');
        }
    };

    if (loading) return <Loader />

    return (
        <Container className="py-5">
            <h2 className="fw-bold mb-4">Admin panel</h2>

            <Tab.Container defaultActiveKey="users">
                <Nav variant="tabs" className="mb-4">
                    <Nav.Item>
                        <Nav.Link eventKey="users" className="text-success">
                            Korisnici ({users.length})
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="properties" className="text-success">
                            Oglasi ({properties.length})
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link eventKey="reviews" className="text-success">
                            Recenzije ({reviews.length})
                        </Nav.Link>
                    </Nav.Item>
                </Nav>

                <Tab.Content>
                    {/* KORISNICI */}
                    <Tab.Pane eventKey="users">
                        <Table responsive bordered className="text-white border-secondary" style={{ backgroundColor: '#212529' }}>
                            <thead>
                                <tr>
                                    <th>Ime</th>
                                    <th>Email</th>
                                    <th>Telefon</th>
                                    <th>Admin</th>
                                    <th>Datum</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map(u => (
                                    <tr key={u._id}>
                                        <td>{u.name}</td>
                                        <td>{u.email}</td>
                                        <td>{u.phone || '-'}</td>
                                        <td>
                                            {u.isAdmin
                                                ? <FaCheck className="text-success" />
                                                : <FaTimes className="text-danger" />
                                            }
                                        </td>
                                        <td>{new Date(u.createdAt).toLocaleDateString('sr-RS')}</td>
                                        <td>
                                            {!u.isAdmin && (
                                                <Button variant="outline-danger" size="sm"
                                                    onClick={() => handleDeleteUser(u._id)}>
                                                    <FaTrash />
                                                </Button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Tab.Pane>

                    {/* OGLASI */}
                    <Tab.Pane eventKey="properties">
                        <Table responsive bordered className="text-white border-secondary" style={{ backgroundColor: '#212529' }}>
                            <thead>
                                <tr>
                                    <th>Naziv</th>
                                    <th>Vlasnik</th>
                                    <th>Grad</th>
                                    <th>Cena</th>
                                    <th>Istaknut</th>
                                    <th>Datum</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {properties.map(p => (
                                    <tr key={p._id}>
                                        <td>
                                            <LinkContainer to={`/property/${p._id}`}>
                                                <span style={{ cursor: 'pointer', color: '#4caf50' }}>{p.title}</span>
                                            </LinkContainer>
                                        </td>
                                        <td>{p.owner?.name || '-'}</td>
                                        <td>{p.city}</td>
                                        <td>{p.price?.toLocaleString()} €</td>
                                        <td>
                                            {p.isFeatured
                                                ? <Badge bg="success">Da</Badge>
                                                : <Badge bg="secondary">Ne</Badge>
                                            }
                                        </td>
                                        <td>{new Date(p.createdAt).toLocaleDateString('sr-RS')}</td>
                                        <td>
                                            <Button variant="outline-danger" size="sm"
                                                onClick={() => handleDeleteProperty(p._id)}>
                                                <FaTrash />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Tab.Pane>

                    {/* RECENZIJE */}
                    <Tab.Pane eventKey="reviews">
                        <Table responsive bordered className="text-white border-secondary" style={{ backgroundColor: '#212529' }}>
                            <thead>
                                <tr>
                                    <th>Ime</th>
                                    <th>Tekst</th>
                                    <th>Datum</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {reviews.map(r => (
                                    <tr key={r._id}>
                                        <td>{r.fullName}</td>
                                        <td>{r.text.length > 60 ? r.text.substring(0, 60) + '...' : r.text}</td>
                                        <td>{new Date(r.createdAt).toLocaleDateString('sr-RS')}</td>
                                        <td>
                                            <Button variant="outline-danger" size="sm"
                                                onClick={() => handleDeleteReview(r._id)}>
                                                <FaTrash />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>
        </Container>
    );
};

export default AdminScreen;