import { Container, Row, Col, Badge } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useParams } from 'react-router-dom';
import { FaPhone, FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { useState } from 'react';
import { properties, getInitials } from '../assets/testData';

delete L.Icon.Default.prototype._getUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const PropertyInfoScreen = () => {

    const {id} = useParams();
    const property = properties.find((p) => p._id === id);
    const [saved, setSaved] = useState(false);

    if(!property){
        return <Container className="py-5"><h2>Oglas nije pronađen!</h2></Container>
    }

    return (
        <Container className="py-5">
            <Row>
                <Col md={8}>
                    <img src={property.image} alt={property.location} className="img-fluid rounded mb-4 w-100" style={{ maxHeight: '400px', objectFit: 'cover' }} />
                </Col>
                
                <Row className="mb-2 align-items-center">
                    <Col md={5}>
                        <h5 className="fw-bold mb-3">Lokacija</h5>
                        <p className="text-muted">{property.location}</p>
                    </Col>

                    <Col md={3} className="text-end">
                        <h2 className="fw-bold text-success mb-1">
                            {property.price.toLocaleString()} €
                        </h2>
                    </Col>
                </Row>
                
                <MapContainer center={property.coordinates} zoom={15} style={{ height: '300px', borderRadius:'8px' }}>
                    <TileLayer url="https://tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={property.coordinates}>
                        <Popup>{property.location}</Popup>
                    </Marker>
                </MapContainer>

                <Col md={5}>
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

                    <div className="d-flex mb-3 gap-2">
                            {property.furnished ? 
                            <Badge bg="success">Namešten</Badge>
                            : <Badge bg="secondary">Nenamešten</Badge>
                            }
                            {property.parking ?
                            <Badge bg="success">Parking</Badge> :
                            null
                            }
                            {property.lift ?
                            <Badge bg="success">Lift</Badge> :
                            null
                            }
                    </div>

                    {property.heating.length > 0 ? (
                    <div className="mb-3">
                        <small className="text-muted">Način grejnanja:</small>
                        <div className="d-flex flex-wrap gap-2 mt-2">
                            {property.heating.map((h, index) => (
                                <Badge key={index} bg="outline" className="border border-success text-success">{h}</Badge>
                            ))}
                        </div>
                    </div>) : null}


                    <hr className="border-secondary" />

                    <div>
                        <small className="text-muted">Opis oglasa</small>
                        <p className="mt-2">{property.description}</p>
                    </div>
                </Col>

                <Col md={4} className="offset-md-2 mt-4">
                    <div className="p-4">
                        <h5 className="fw-bold mb-4">Kontakt</h5>
                        <div className="d-flex align-item-center">
                            <div className="rounded-circle bg-success d-flex align-items-center justify-content-center text-white fw-bold me-3"
                            style={{ width: '55px', height: '55px', minWidth: '55px' }}>
                                {getInitials(property.owner.fullName)}
                            </div>
                            <h6 className="mb-0 fw-bold">{property.owner.fullName}</h6>
                        </div>
                    </div>
                    <a href={`tel:${property.owner.phone}`} className="btn btn-success w-100">
                        <FaPhone /> Pozovi oglašavača
                    </a>
                    <button onClick={() => setSaved(!saved)}
                        className={`btn w-100 mt-2 ${saved ? 'btn-success' : 'btn-outline-success'}`}>
                        {saved ? <><FaBookmark className="me-2" />Sačuvano</> : <><FaRegBookmark className="me-2" />Sačuvaj oglas</>}
                    </button>
                </Col>
            </Row>
        </Container>
    );
};

export default PropertyInfoScreen;