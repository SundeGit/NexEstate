import  { Card } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaMapMarkerAlt } from 'react-icons/fa';

const PropertyCard = ({ property, preview = false }) => {
    return (
        <LinkContainer to={`/property/${property._id}`} onClick={preview === true ? (e) => e.preventDefault() : null}>
            <Card className="bg-dark text-white border-secondary h-100 position-relative">
                {property.featured === true ? <div className="ribbon">★ Istaknuto</div> : null}
                <Card.Img 
                variant="top"
                src={property.image}
                style={{ height: '200px', objectFit: 'cover' }}
                />
            <Card.Body>
                <p className="mb-1 fw-bold text-white">{property.title}</p>
                <Card.Title className="text-success fw-bold">{property.price.toLocaleString()} €</Card.Title>
                <Card.Text className="text-white mb-1" >
                    <FaMapMarkerAlt className="me-1"/>{property.location}
                </Card.Text>
                <Card.Text>
                    <small>{property.type} {property.area} m²</small>
                </Card.Text>
            </Card.Body>
            </Card>
        </LinkContainer>
    );
};

export default PropertyCard; 