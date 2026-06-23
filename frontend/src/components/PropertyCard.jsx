import  { Card } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { FaMapMarkerAlt } from 'react-icons/fa';

const typeLabels = {
  stan: 'Stan',
  kuca: 'Kuća',
  vikendica: 'Vikendica',
  garaza: 'Garaža',
  plac: 'Plac',
  'poslovni-prostor': 'Poslovni prostor',
};

const PropertyCard = ({ property, preview = false }) => {
    const location = property.location || (property.address && property.city 
        ? `${property.address}, ${property.city}` 
        : property.city || property.address || '');

    return (
        <LinkContainer to={`/property/${property._id}`} onClick={preview === true ? (e) => e.preventDefault() : null}>
            <Card className="bg-dark text-white border-secondary h-100 position-relative">
                  {property.isFeatured === true ? <div className="ribbon">★ Istaknuto</div> : null}
                <Card.Img 
                variant="top"
                src={property.images?.[0]}
                style={{ height: '200px', objectFit: 'cover' }}
                />
            <Card.Body>
                <p className="mb-1 fw-bold text-white">{property.title}</p>
                <Card.Title className="text-success fw-bold">{property.price.toLocaleString()} €</Card.Title>
                <Card.Text className="text-white mb-1" >
                    <FaMapMarkerAlt className="me-1"/>{location}
                </Card.Text>
                <Card.Text>
                    <small>{typeLabels[property.type] || property.type} · {property.area} m²</small>
                </Card.Text>
            </Card.Body>
            </Card>
        </LinkContainer>
    );
};

export default PropertyCard; 