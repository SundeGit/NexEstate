import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';

const cities = [
  { value: 'novi-sad', label: 'Novi Sad' },
  { value: 'beograd', label: 'Beograd' },
  { value: 'nis', label: 'Niš' },
  { value: 'kragujevac', label: 'Kragujevac' },
  { value: 'subotica', label: 'Subotica' },
  { value: 'zrenjanin', label: 'Zrenjanin' },
  { value: 'pancevo', label: 'Pančevo' },
  { value: 'cacak', label: 'Čačak' },
  { value: 'novi-pazar', label: 'Novi Pazar' },
  { value: 'kraljevo', label: 'Kraljevo' },
];

const HomeScreen = () => {

    const [city, setCity] = useState([]);
    const [type, setType] = useState([]);
    const [price, setPrice] = useState([0, 500000]);
    const [area, setArea] = useState([0, 500]);

    return (
        <>
        <div className="hero-section">
            <div className="hero-overlay">
                <Container className="h-100 d-flex flex-column justify-content-center align-items-center text-white text-center">
                    <h1 className="fw-bold mb-2">Prava nekretnina samo čeka da je pronađeš!</h1>
                    <p className="mb-4 fs-5">Hiljade oglasa na jednom mestu...</p>
                    <div className="w-75 bg-dark bg-opacity-75 rounded p-4">
                        <Row className="mb-3">
                            <Col md={6}>
                                <Typeahead 
                                id="city-search" 
                                options={cities} 
                                placeholder="Izabere grad" 
                                onChange={setCity} 
                                selected={city} 
                                inputProps={{ className: 'bg-dark text-white border-secondary' }}/>
                            </Col>
                            <Col md={6}>
                                <Form.Select value={type} onChange={(e) => setType(e.target.value)} className="bg-dark text-white border-secondary">
                                    <option value="">Vrsta nekretnine</option>
                                    <option value="stan">Stan</option>
                                    <option value="kuca">Kuća</option>
                                    <option value="vikendica">Vikendica</option>
                                    <option value="garaza">Garaža</option>
                                    <option value="plac">Plac</option>
                                    <option value="poslovni-prostor">Poslovni prostor</option>
                                </Form.Select>
                            </Col>
                        </Row>

                        <Row className="mb-4">
                            <Col md={6}>
                                <p className="text-white mb-1 small">
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
                                handleStyle={[ {borderColor: '#4caf50' }, { borderColor: '#4caf50' }]}
                                />
                            </Col>

                            <Col md={6}>
                                <p className="text-white mb-1 small">
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
                            </Col>
                        </Row>

                        <Button variant="success" size="lg" className="w-100">Pretraži</Button>
                    </div>
                </Container>
            </div>

        </div>
        </>
    );
};

export default HomeScreen;