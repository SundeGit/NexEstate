import { Container, Row, Col, Tab, Nav, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaMapMarkerAlt, FaTrash } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

const MyPropertyListingsScreen = () => {
  const { user } = useSelector((state) => state.auth);
  const [myListings, setMyListings] = useState([]);
  const [savedListings, setSavedListings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [myRes, savedRes] = await Promise.all([
          axiosInstance.get('/properties/my'),
          axiosInstance.get('/users/saved'),
        ]);
        setMyListings(myRes.data);
        setSavedListings(savedRes.data);
        } catch (error) {
          toast.error('Greška pri učitavanju oglasa');
        } finally {
          setLoading(false);
        }
      };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('Da li ste sigurni da želite da obrišete oglas?')) return;
    try {
      await axiosInstance.delete(`/properties/${id}`);
      setMyListings(prev => prev.filter(p => p._id !== id));
      toast.success('Oglas obrisan');
    } catch (error) {
      toast.error('Greška pri brisanju oglasa');
    }
  };

  const handleUnsave = async (id) => {
    try {
      await axiosInstance.put(`/users/saved/${id}`);
      setSavedListings(prev => prev.filter(p => p._id !== id));
      toast.success('Oglas uklonjen iz sačuvanih');
    } catch (error) {
      toast.error('Greška');
    }
  };

  const PropertyListingItem = ({ property, onDelete, onUnsave }) => (
    <div className="d-flex align-items-center justify-content-between bg-dark text-white rounded p-3 mb-3 border border-secondary">
      <LinkContainer to={`/property/${property._id}`} style={{ cursor: 'pointer', flex: 1 }}>
        <div className="d-flex align-items-center">
          <img
            src={property.images?.[0]}
            alt={property.title}
            style={{ width: '100px', height: '70px', objectFit: 'cover', borderRadius: '8px' }}
            className="me-3"
          />
          <div>
            <p className="mb-1 fw-bold">{property.title}</p>
            <small className="text-white">
              {property.type} · {property.area}m² · <FaMapMarkerAlt className="me-1" />{property.address}, {property.city}
            </small>
            <p className="mb-0 text-success fw-bold mt-1">{property.price.toLocaleString()} €</p>
          </div>
        </div>
        </LinkContainer>
          {onDelete && (
            <Button variant="outline-danger" size="sm" className="ms-3" onClick={() => onDelete(property._id)}>
              <FaTrash />
            </Button>
          )}
          {onUnsave && (
            <Button variant="outline-secondary" size="sm" className="ms-3" onClick={() => onUnsave(property._id)}>
              Ukloni
            </Button>
          )}
    </div>
  );

    if (loading) return <Loader />

  return (
    <Container className="py-5">
      <h2 className="fw-bold mb-4">Moji oglasi</h2>
      <Tab.Container defaultActiveKey="postedL">
        <Nav variant="tabs" className="mb-4">
          <Nav.Item>
            <Nav.Link eventKey="postedL" className="text-success">Postavljeni oglasi ({myListings.length})</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="savedL" className="text-success">Sačuvani oglasi ({savedListings.length})</Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content>
          <Tab.Pane eventKey="postedL">
            <Row>
              <Col md={8}>
                {myListings.length === 0 ?(
                  <p className="text-muted">Nemate postavljenih oglasa.</p>
                  
                ) : (
                    myListings.map((property) => (
                      <PropertyListingItem key={property._id} property={property} onDelete={handleDelete} />
                    ))
                  )}
              </Col>
            </Row>
          </Tab.Pane>

          <Tab.Pane eventKey="savedL">
            <Row>
              <Col md={8}>
                {savedListings.length === 0 ? (
                  <p className="text-muted">Nemate sačuvanih oglasa.</p>
                ) : (
                    savedListings.map((property) => (
                        <PropertyListingItem key={property._id} property={property} onUnsave={handleUnsave} />
                    ))
                  )}
              </Col>
            </Row>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </Container>
  );
};

export default MyPropertyListingsScreen;