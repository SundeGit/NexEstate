import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import PropertyCard from '../components/PropertyCard';
import { Typeahead } from 'react-bootstrap-typeahead';
import { Collapse } from 'react-bootstrap';
import { cities, properties } from '../assets/testData';

const PropertiesScreen = () => {

    const [city, setCity] = useState('');
    const [type, setType] = useState('');
    const [rooms, setRooms] = useState('');
    const [price, setPrice] = useState([0, 500000]);
    const [area, setArea] = useState([0, 500]);
    const [open, setOpen] = useState(false);

    return (
        <Container className="py-5">
            <Row>
                <Col md={4}>
                    <div className="bg-dark text-white rounded p-4">
                        <h5 className="fw-bold mb-4">Filteri</h5>

                        <Form.Select value={type} onChange={(e) => setType(e.target.value)} className="bg-dark text-white border-secondary mb-3">
                            <option value="">Vrsta nekretnine</option>
                            <option value="sve">Sve</option>
                            <option value="stan">Stan</option>
                            <option value="kuca">Kuća</option>
                            <option value="vikendica">Vikendica</option>
                            <option value="garaza">Garaža</option>
                            <option value="plac">Plac</option>
                            <option value="poslovni-prostor">Poslovni prostor</option>
                        </Form.Select>


                        <Form.Select
                            value={rooms}
                            onChange={(e) => setRooms(e.target.value)}
                            className="bg-dark text-white border-secondary mb-3"
                        >
                            <option value="">Broj soba</option>
                            <option value="0.5">Garsonjera</option>
                            <option value="1">Jednosoban</option>
                            <option value="1.5">Jednoiposoban</option>
                            <option value="2">Dvosoban</option>
                            <option value="2.5">Dvoiposoban</option>
                            <option value="3">Trosoban</option>
                            <option value="4">Četvorosoban</option>
                            <option value="4+">Četvoroiposoban i više</option>
                        </Form.Select>

                        <p className="text-white mt-3 mb-3">
                            Cena: <span className="text-success">{price[0].toLocaleString()}€ - {price[1].toLocaleString()}€</span>
                        </p>
                        <Slider
                            range
                            min={0}
                            max={500000}
                            step={500}
                            value={price}
                            onChange={setPrice}
                            trackStyle={[{ backgroundColor: '#4caf50' }]}
                            handleStyle={[{ borderColor: '#4caf50' }, { borderColor: '#4caf50' }]}
                        />
                        <p className="text-white mt-3 mb-3">
                            Površina: <span className="text-success">{area[0]}m² - {area[1]}m²</span>
                        </p>
                        <Slider
                            range
                            min={0}
                            max={500}
                            step={10}
                            value={area}
                            onChange={setArea}
                            trackStyle={[{ backgroundColor: '#4caf50' }]}
                            handleStyle={[{ borderColor: '#4caf50' }, { borderColor: '#4caf50' }]}
                        />

                        <Typeahead
                        id="city-search"
                        options={cities}
                        placeholder="Unesite grad..."
                        onChange={setCity}
                        selected={city}
                        inputProps={{ className: 'bg-dark text-white border-secondary mb-3 mt-3' }}
                        />

                        <Button 
                        variant="outline-secondary" 
                        className="w-100 mb-3"
                        onClick={() => setOpen(!open)}
                        >
                        {open ? 'Sakrij' : 'Napredni filteri ▼'}
                        </Button>

                        <Collapse in={open}>
                            <div>
                                <Form.Select className="bg-dark text-white border-secondary mb-3 mt-2">
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

                                <Form.Check type="checkbox" label="Namešten" className="text-white mb-2" />
                                <Form.Check type="checkbox" label="Parking mesto" className="text-white mb-2" />

                                <p className="text-white mb-2 mt-3">Infrastruktura:</p>
                                <Form.Check type="checkbox" label="Lift" className="text-white mb-2" />
                                <Form.Check type="checkbox" label="Video nadzor" className="text-white mb-2" />

                                <p className="text-white mb-2 mt-3">Grejanje:</p>
                                <Form.Check type="checkbox" label="Podno grejanje" className="text-white mb-2" />
                                <Form.Check type="checkbox" label="Centralno" className="text-white mb-2" />
                                <Form.Check type="checkbox" label="Etažno" className="text-white mb-2" />
                                <Form.Check type="checkbox" label="Toplotna pumpa" className="text-white mb-2" />
                                <Form.Check type="checkbox" label="Klima" className="text-white mb-2" />
                                <Form.Check type="checkbox" label="Gas" className="text-white mb-2" />
                                <Form.Check type="checkbox" label="Struja" className="text-white mb-2" />
                                <Form.Check type="checkbox" label="Ostalo" className="text-white mb-2" />
                            </div>
                        </Collapse>

                        <Button variant="success" className="w-100 mt-3">Primeni filtere</Button>
                    </div>
                </Col>

                <Col md={8}>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h5 className="fw-bold mb-0">{properties.length} oglasa</h5>
                         <Form.Select className="w-25">
                        <option value="">Sortiraj</option>
                        <option value="price-asc">Cena rastuće</option>
                        <option value="price-desc">Cena opadajuće</option>
                        <option value="area-asc">Površina rastuće</option>
                        <option value="area-desc">Površina opadajuće</option>
                        </Form.Select>
                    </div>
                    <Row>
                        {properties.map((property) => (
                            <Col key={property._id} sm={12} md={6} className="mb-4">
                                <PropertyCard property={property} />
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

export default PropertiesScreen;