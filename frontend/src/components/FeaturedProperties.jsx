import { Container, Row, Col } from 'react-bootstrap';
import PropertyCard from './PropertyCard';

const featuredProperties = [
  { _id: '1', image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600', price: 150000, location: 'Novi Sad', type: 'Stan', area: 65 },
  { _id: '2', image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600', price: 280000, location: 'Beograd', type: 'Kuća', area: 180 },
  { _id: '3', image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=600', price: 95000, location: 'Niš', type: 'Stan', area: 45 },
  { _id: '4', image: 'https://images.unsplash.com/photo-1416331108676-a22ccb276e35?w=600', price: 45000, location: 'Subotica', type: 'Plac', area: 500 },
];

const FeaturedProperties = () => {
  return (
    <Container className="my-5">
      <h2 className="text-center fw-bold mb-4">Istaknuti oglasi</h2>
      <Row>
        {featuredProperties.map((property) => (
          <Col key={property._id} sm={12} md={6} lg={3} className="mb-4">
            <PropertyCard property={property} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default FeaturedProperties;