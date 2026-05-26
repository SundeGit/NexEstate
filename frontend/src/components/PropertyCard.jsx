import  { Card } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaMapMarkerAlt } from 'react-icons/fa';

const PropertyCard = ({ property }) => {
    return (
        <LinkContainer to={`/property/${property._id}`}>
            <Card className="bg-dark text-white border-secondary h-100 position-relative">
                <div className="ribbon">★ Istaknuto</div>
                <Card.Img 
                variant="top"
                src={property.image}
                style={{ height: '200px', objectFit: 'cover' }}
                />
            <Card.Body>
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