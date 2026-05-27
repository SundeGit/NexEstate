import { Container, Row, Col, Tab, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { properties } from '../assets/testData';
import { FaMapMarkerAlt } from 'react-icons/fa';

const MyPropertyListingsScreen = () => {
  const myListings = properties;
  const savedListings = [properties[1], properties[2], properties[4]];

  const PropertyListingItem = ({ property }) => (
    <LinkContainer to={`/property/${property._id}`}>
      <div className="d-flex align-items-center bg-dark text-white rounded p-3 mb-3 border border-secondary" style={{ cursor: 'pointer' }}>
        <img
          src={property.image}
          alt={property.title}
          style={{ width: '100px', height: '70px', objectFit: 'cover', borderRadius: '8px' }}
          className="me-3"
        />
        <div>
          <p className="mb-1 fw-bold">{property.title}</p>
          <small className="text-white">
            {property.type} · {property.area}m² · <FaMapMarkerAlt className="me-1" />{property.location}
          </small>
          <p className="mb-0 text-success fw-bold mt-1">{property.price.toLocaleString()} €</p>
        </div>
      </div>
    </LinkContainer>
  );

  return (
    <Container className="py-5">
      <h2 className="fw-bold mb-4">Moji oglasi</h2>
      <Tab.Container defaultActiveKey="postedL">
        <Nav variant="tabs" className="mb-4">
          <Nav.Item>
            <Nav.Link eventKey="postedL" className="text-success">Postavljeni oglasi</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="savedL" className="text-success">Sačuvani oglasi</Nav.Link>
          </Nav.Item>
        </Nav>

        <Tab.Content>
          <Tab.Pane eventKey="postedL">
            <Row>
              <Col md={8}>
                {myListings.map((property) => (
                  <PropertyListingItem key={property._id} property={property} />
                ))}
              </Col>
            </Row>
          </Tab.Pane>

          <Tab.Pane eventKey="savedL">
            <Row>
              <Col md={8}>
                {savedListings.map((property) => (
                  <PropertyListingItem key={property._id} property={property} />
                ))}
              </Col>
            </Row>
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </Container>
  );
};

export default MyPropertyListingsScreen;