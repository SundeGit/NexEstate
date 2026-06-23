import { Container, Row, Col, Badge } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useParams } from 'react-router-dom';
import { FaPhone, FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-toastify';

delete L.Icon.Default.prototype._getUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const getInitials = (name) => {
    if (!name) return '?';
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
};

const PropertyInfoScreen = () => {

    const {id} = useParams();
    const { user } = useSelector((state) => state.auth);
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saved, setSaved] = useState(false);
    const [activeImage, setActiveImage] = useState(0);

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const { data } = await axiosInstance.get(`/properties/${id}`);
                setProperty(data);
                if (user && user.savedProperties) {
                    setSaved(user.savedProperties.includes(id));
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchProperty();
    }, [id]);

    const handleSave = async () => {
        if (!user) {
            toast.error('Morate biti prijavljeni da biste sačuvali oglas');
            return;
        }
        try {
            await axiosInstance.put(`/users/saved/${id}`);
            setSaved(!saved);
            toast.success(saved ? 'Oglas uklonjen iz sačuvanih' : 'Oglas sačuvan!');
        } catch (error) {
            toast.error('Greška pri čuvanju oglasa');
        }
    };

    if (loading) return <Container className="py-5"><p>Učitavanje...</p></Container>;
    if (!property) return <Container className="py-5"><h2>Oglas nije pronađen!</h2></Container>;

    const hasCoords = property.coordinates?.lat && property.coordinates?.lng;
    const images = property.images || [];

    return (
        <Container className="py-5">
            <h2 className="fw-bold mb-4">{property.title}</h2>
            {images.length > 0 ? (
                <Row className="mb-4 g-2">
                    <Col xs={12} md={images.length > 1 ? 9 : 12}>
                        <img
                            src={images[activeImage]}
                            alt={property.title}
                            className="w-100 rounded"
                            style={{ height: '420px', objectFit: 'cover' }}
                        />
                    </Col>
 
                    {images.length > 1 && (
                        <Col xs={12} md={3}>
                            <div
                                className="d-flex flex-md-column flex-row gap-2"
                                style={{ maxHeight: '420px', overflowY: 'auto', overflowX: 'auto' }}
                            >
                                {images.map((img, index) => (
                                    <img
                                        key={index}
                                        src={img}
                                        alt={`slika-${index}`}
                                        onClick={() => setActiveImage(index)}
                                        className="rounded flex-shrink-0"
                                        style={{
                                            width: '100%',
                                            height: '100px',
                                            objectFit: 'cover',
                                            cursor: 'pointer',
                                            border: activeImage === index
                                                ? '2px solid #4caf50'
                                                : '2px solid transparent',
                                            opacity: activeImage === index ? 1 : 0.7,
                                            transition: 'opacity 0.2s, border 0.2s'
                                        }}
                                    />
                                ))}
                            </div>
                        </Col>
                    )}
                </Row>
            ) : (
                <div
                    className="bg-secondary rounded mb-4 w-100 d-flex align-items-center justify-content-center"
                    style={{ height: '420px' }}
                >
                    <p className="text-white">Nema slika</p>
                </div>
            )}
                
                <Row className="mb-2 align-items-center">
                    <Col md={5}>
                        <h5 className="fw-bold mb-3">Lokacija</h5>
                        <p className="text-muted">{property.address}, {property.city}</p>
                    </Col>

                    <Col md={3} className="text-end">
                        <h2 className="fw-bold text-success mb-1">
                            {property.price.toLocaleString()} €
                        </h2>
                    </Col>
                </Row>
                
           {hasCoords && (
                <MapContainer
                    center={[property.coordinates.lat, property.coordinates.lng]}
                    zoom={15}
                    className="mb-4 rounded"
                    style={{ height: '300px' }}
                >
                    <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={[property.coordinates.lat, property.coordinates.lng]}>
                        <Popup>{property.address}, {property.city}</Popup>
                    </Marker>
                </MapContainer>
            )}
 
            <Row>
                <Col md={8}>
                    <Row className="mb-3 mt-3">
                        <Col xs={6}>
                            <small className="text-muted">Tip</small>
                            <p className="mb-0 fw-bold">{property.type}</p>
                        </Col>
                        <Col xs={6}>
                            <small className="text-muted">Površina</small>
                            <p className="mb-0 fw-bold">{property.area} m²</p>
                        </Col>
                        <Col xs={6} className="mt-3">
                            <small className="text-muted">Broj soba</small>
                            <p className="mb-0 fw-bold">{property.rooms}</p>
                        </Col>
                        <Col xs={6} className="mt-3">
                            <small className="text-muted">Sprat</small>
                            <p className="mb-0 fw-bold">{property.floor}.</p>
                        </Col>
                    </Row>
 
                    <hr className="border-secondary" />
 
                    <div className="d-flex mb-3 gap-2 flex-wrap">
                        {property.furnished
                            ? <Badge bg="success">Namešten</Badge>
                            : <Badge bg="secondary">Nenamešten</Badge>
                        }
                        {property.parking && <Badge bg="success">Parking</Badge>}
                        {property.elevator && <Badge bg="success">Lift</Badge>}
                        {property.videoSurveillance && <Badge bg="success">Video nadzor</Badge>}
                    </div>
 
                    {property.heating && property.heating.length > 0 && (
                        <div className="mb-3">
                            <small className="text-muted">Način grejanja:</small>
                            <div className="d-flex flex-wrap gap-2 mt-2">
                                {property.heating.map((h, index) => (
                                    <Badge key={index} bg="outline" className="border border-success text-success">{h}</Badge>
                                ))}
                            </div>
                        </div>
                    )}
 
                    <hr className="border-secondary" />
 
                    <div>
                        <small className="text-muted">Opis oglasa</small>
                        <p className="mt-2">{property.description}</p>
                    </div>
                </Col>
 
                <Col md={4}>
                    <div className="p-4 rounded border border-secondary">
                        <h5 className="fw-bold mb-4">Kontakt</h5>
                        <div className="d-flex align-items-center mb-4">
                            <div
                                className="rounded-circle bg-success d-flex align-items-center justify-content-center text-white fw-bold me-3"
                                style={{ width: '55px', height: '55px', minWidth: '55px' }}
                            >
                                {getInitials(property.owner?.name)}
                            </div>
                            <h6 className="mb-0 fw-bold">{property.owner?.name}</h6>
                        </div>
                        <a href={`tel:${property.owner?.phone}`} className="btn btn-success w-100">
                            <FaPhone className="me-2" /> Pozovi oglašavača
                        </a>
                        <button
                            onClick={handleSave}
                            className={`btn w-100 mt-2 ${saved ? 'btn-success' : 'btn-outline-success'}`}
                        >
                            {saved
                                ? <><FaBookmark className="me-2" />Sačuvano</>
                                : <><FaRegBookmark className="me-2" />Sačuvaj oglas</>
                            }
                        </button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default PropertyInfoScreen;