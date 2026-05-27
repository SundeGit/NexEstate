import { Container, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const AboutSection = () => {
    return (
        <Container>
            <Row className="align-items-center">
                <Col md={6}>
                    <img 
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800"
                    alt="O nama"
                    className="img-fluid rounded"/>
                </Col>
                <Col md={6}>
                    <h2 className="fw bold mb-3">O nama</h2>
                    <p className="text-muted">
                    NexEstate je moderna platforma za kupovinu i prodaju nekretnina.
                    Naš cilj je da pronalazak savršenog doma bude što jednostavniji i brži.
                    Poseban fokus stavlja se na profesionalnost, transparentnost i poverenje u radu sa klijentima. 
                    Zahvaljujući kvalitetnoj usluzi i savremenom pristupu poslovanju, kompanija uspešno gradi prepoznatljivost na tržištu nekretnina. 
                    </p>
                    <LinkContainer to="/aboutUs">
                        <a className="text-success text-decoration-none fw-bold">
                            Saznajte više →
                        </a>
                    </LinkContainer>
                </Col>
            </Row>
        </Container>
    );
};

export default AboutSection;