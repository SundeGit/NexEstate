import { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import PropertyCard from '../components/PropertyCard';

const CreateListingScreen = () => {

    const [title, setTitle] = useState('');
    const [type, setType] = useState('');
    const [price, setPrice] = useState('');
    const [city, setCity] = useState('');
    const [address, setAddress] = useState('');
    const [area, setArea] = useState('');
    const [rooms, setRooms] = useState('');
    const [floor, setFloor] = useState('');
    const [description, setDescription] = useState('');
    const [furnished, setFurnished] = useState(false);
    const [parking, setParking] = useState(false);
    const [lift, setLift] = useState(false);
    const [heating, setHeating] = useState([]);

    const handleHeating = (e) => {
    const { value, checked } = e.target;
    if (checked) {
        setHeating([...heating, value]);
    } else {
        setHeating(heating.filter((h) => h !== value));
    }
    };

  const heatingOptions = ['Centralno', 'Etažno', 'Podno grejanje', 'Toplotna pumpa', 'Klima', 'Gas', 'Struja', 'Ostalo'];

  return (
    <Container className="py-5">
      <h2 className="fw-bold mb-4">Postavite oglas</h2>
      <Row>
        <Col md={8}>
          <div className="bg-dark text-white rounded p-4">

            <h5 className="text-success mb-3">Osnovne informacije</h5>

            <Form.Control
              type="text"
              name="title"
              placeholder="Naslov oglasa"
              className="bg-dark text-white border-secondary mb-3"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <Row className="mb-3">
              <Col md={6}>
                <Form.Select
                  name="type"
                  className="bg-dark text-white border-secondary"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option value="">Vrsta nekretnine</option>
                  <option value="stan">Stan</option>
                  <option value="kuca">Kuća</option>
                  <option value="vikendica">Vikendica</option>
                  <option value="garaza">Garaža</option>
                  <option value="plac">Plac</option>
                  <option value="poslovni-prostor">Poslovni prostor</option>
                </Form.Select>
              </Col>
              <Col md={6}>
                <Form.Control
                  type="number"
                  name="price"
                  placeholder="Cena (€)"
                  className="bg-dark text-white border-secondary"
                  min={0}
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Control
                  type="text"
                  name="city"
                  placeholder="Grad"
                  className="bg-dark text-white border-secondary"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </Col>
              <Col md={6}>
                <Form.Control
                  type="text"
                  name="address"
                  placeholder="Adresa"
                  className="bg-dark text-white border-secondary"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={4}>
                <Form.Control
                  type="number"
                  name="area"
                  placeholder="Površina (m²)"
                  className="bg-dark text-white border-secondary"
                  min={1}
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                />
              </Col>
              <Col md={4}>
                <Form.Control
                  type="number"
                  name="rooms"
                  placeholder="Broj soba"
                  className="bg-dark text-white border-secondary"
                  value={rooms}
                  onChange={(e) => setRooms(e.target.value)}
                />
              </Col>
              <Col md={4}>
                <Form.Select
                  name="floor"
                  className="bg-dark text-white border-secondary"
                  value={floor}
                  onChange={(e) => setFloor(e.target.value)}>
                    <option value="">Sprat</option>
                    <option value="prizemlje">Prizemlje</option>
                    <option value="nisko-prizemlje">Nisko prizemlje</option>
                    <option value="potkrovlje">Potkrovlje</option>
                    <option value="1">Prvi</option>
                    <option value="2">Drugi</option>
                    <option value="3">Treći</option>
                    <option value="4">Četvrti</option>
                    <option value="5">Peti</option>
                    <option value="6">Šesti</option>
                    <option value="7">Sedmi</option>
                    <option value="8">Osmi</option>
                    <option value="9">Deveti</option>
                    <option value="10">Deseti</option>
                    <option value="11">Jedanaesti</option>
                    <option value="12">Dvanaesti</option>
                    <option value="13">Trinaesti</option>
                    <option value="14">Četrnaesti</option>
                    <option value="15">Petnaesti</option>
                    <option value="16">Šesnaesti</option>
                    <option value="17">Sedamnaesti</option>
                    <option value="18">Osamnaesti</option>
                    <option value="19">Devetnaesti</option>
                    <option value="20">Dvadeseti</option>
                </Form.Select>
              </Col>
            </Row>

            <Form.Control
              as="textarea"
              rows={4}
              name="description"
              placeholder="Opis nekretnine..."
              className="bg-dark text-white border-secondary mb-3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <hr className="border-secondary" />

            <h5 className="text-success mb-3">Dodatne informacije</h5>

            <Row className="mb-3">
              <Col>
                <Form.Check
                  type="checkbox"
                  name="furnished"
                  label="Namešteno"
                  className="text-white"
                  checked={furnished}
                  onChange={(e) => setFurnished(e.target.checked)}
                />
              </Col>
              <Col>
                <Form.Check
                  type="checkbox"
                  name="parking"
                  label="Parking"
                  className="text-white"
                  checked={parking}
                  onChange={(e) => setParking(e.target.checked)}
                />
              </Col>
              <Col>
                <Form.Check
                  type="checkbox"
                  name="lift"
                  label="Lift"
                  className="text-white"
                  checked={lift}
                  onChange={(e) => setLift(e.target.checked)}
                />
              </Col>
            </Row>

            <hr className="border-secondary" />

            <h5 className="text-success mb-3">Grejanje</h5>
            <Row className="mb-4">
              {heatingOptions.map((h) => (
                <Col md={3} key={h}>
                  <Form.Check
                    type="checkbox"
                    name="heating"
                    label={h}
                    value={h}
                    className="text-white mb-2"
                    checked={heating.includes(h)}
                    onChange={handleHeating}
                  />
                </Col>
              ))}
            </Row>

            <hr className="border-secondary" />

            <h5 className="text-success mb-3">Slike</h5>
            <Form.Control
              type="file"
              multiple
              accept="image/*"
              className="bg-dark text-white border-secondary mb-4"
            />

            <Button variant="success" size="lg" className="w-100">
              Postavi oglas
            </Button>

          </div>
        </Col>

        <Col md={4}>
          <div className="bg-dark text-white rounded p-4">
            <h5 className="text-success mb-3">Pregled oglasa</h5>
            <p className="text-white small mb-3">Izgled Vašeg oglasa:</p>
            <PropertyCard preview={true} property={{
                _id: 'preview',
                title: title || 'Naslov oglasa',
                image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600',
                price: price || 0,
                location: address + ", " + city || 'Grad',
                type: type || 'Tip',
                area: area || 0,
                featured: false,
            }}/>
          </div>
        </Col>

      </Row>
    </Container>
  );
};

export default CreateListingScreen;