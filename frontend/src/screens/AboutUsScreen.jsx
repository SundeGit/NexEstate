import { Container, Row, Col } from 'react-bootstrap';

const AboutUsScreen = () => {
  return (
    <Container className="py-5">
      <h2 className="fw-bold text-center mb-2">O nama</h2>
      <p className="text-center text-muted mb-5">Upoznajte NexEstate tim</p>

      <Row className="align-items-center mb-5">
        <Col md={6}>
          <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800" alt="O nama" className="img-fluid rounded"/>
        </Col>
        <Col md={6}>
          <h3 className="fw-bold mb-3">Ko smo mi?</h3>
          <p className="text-muted">
            NexEstate je moderna platforma za kupovinu, prodaju i iznajmljivanje nekretnina. 
            Osnovani 2026. godine, sa namerom da pronalazak savršenog doma bude što 
            jednostavniji i brži. Verujemo da svako zaslužuje da pronađe svoju idealnu nekretninu.
          </p>
          <p className="text-muted">
            Sa hiljadama oglasa na jednom mestu, NexEstate je vaš pouzdani partner u svetu nekretnina.
          </p>
        </Col>
      </Row>

      <Row className="align-items-center mb-5">
        <Col md={6}>
          <h3 className="fw-bold mb-3">Naša misija</h3>
          <p className="text-muted">
            Naša misija je da povežemo kupce i prodavce nekretnina na što jednostavniji 
            i transparentniji način. Trudimo se da svaki oglas bude detaljan, tačan i 
            lako dostupan svim korisnicima.
          </p>
          <p className="text-muted">
            Koristimo najnovije tehnologije kako bismo vam pružili najbolje iskustvo 
            pretrage i oglašavanja nekretnina.
          </p>
        </Col>
        <Col md={6}>
          <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800" alt="Naša misija"className="img-fluid rounded" />
        </Col>
      </Row>

      <Row className="align-items-center">
        <Col md={6}>
          <img
            src="https://images.unsplash.com/photo-1448630360428-65456885c650?w=800"
            alt="Naš tim"
            className="img-fluid rounded"
          />
        </Col>
        <Col md={6}>
          <h3 className="fw-bold mb-3">Naš tim</h3>
          <p className="text-muted">
            NexEstate je posvećen da Vam pomogneme da pronađete savršenu nekretninu.
            Naš tim čine iskusni programeri, dizajneri i stručnjaci za nekretnine.
          </p>
          <p className="text-muted">
            Uvek smo tu za vas. Kontaktirajte nas ako imate bilo kakvih pitanja ili predloga.
          </p>
        </Col>
      </Row>

    </Container>
  );
};

export default AboutUsScreen;