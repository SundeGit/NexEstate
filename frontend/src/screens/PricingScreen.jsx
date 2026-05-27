import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';

const PricingScreen = () => {
  return (
    <Container className="py-5">
      <h2 className="fw-bold text-center mb-2">Cenovnik</h2>
      <p className="text-center text-muted mb-5">Izaberite paket koji Vam odgovara</p>

      <Row className="justify-content-center">
        <Col md={8}>
          <Table bordered responsive className="text-center border">
            <thead className="bg-dark text-white">
              <tr>
                <th className="text-start">Karakteristike</th>
                <th>Osnovni oglas</th>
                <th className="table-success">Istaknuti oglas</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-start fw-bold">Cena</td>
                <td>5 €</td>
                <td className="text-success fw-bold">20 €</td>
              </tr>
              <tr>
                <td className="text-start fw-bold">Trajanje</td>
                <td>30 dana</td>
                <td>30 dana</td>
              </tr>
              <tr>
                <td className="text-start fw-bold">Prikazivanje u pretrazi</td>
                <td><FaCheck className="text-success" /></td>
                <td><FaCheck className="text-success" /></td>
              </tr>
              <tr>
                <td className="text-start fw-bold">Istaknuto na početnoj</td>
                <td><FaTimes className="text-danger" /></td>
                <td><FaCheck className="text-success" /></td>
              </tr>
              <tr>
                <td className="text-start fw-bold">Ribbon badge</td>
                <td><FaTimes className="text-danger" /></td>
                <td><FaCheck className="text-success" /></td>
              </tr>
              <tr>
                <td className="text-start fw-bold text-center">Postavite svoj oglas!</td>
                <td colSpan={2}>
                  <LinkContainer to="/createPropertyListing">
                    <Button variant="outline-success" className="w-100">Postavi oglas</Button>
                  </LinkContainer>
                </td>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default PricingScreen;