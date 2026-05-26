import { Container, Row, Col } from 'react-bootstrap';
import PropertyCard from './PropertyCard';
import { featuredProperties } from '../assets/testData';

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