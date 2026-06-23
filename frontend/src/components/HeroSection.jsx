import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import axiosInstance from '../utils/axiosInstance';


const HeroSection = () => {

    const [city, setCity] = useState([]);
    const [type, setType] = useState([]);
    const [price, setPrice] = useState([0, 500000]);
    const [area, setArea] = useState([0, 500]);
    const navigate = useNavigate();

    const handleSearch = () => {
        const params = new URLSearchParams();
        if (city.length > 0) params.append('city', city[0]);
        if (type) params.append('type', type);
        if (price[0] > 0) params.append('minPrice', price[0]);
        if (price[1] < 500000) params.append('maxPrice', price[1]);
        if (area[0] > 0) params.append('minArea', area[0]);
        if (area[1] < 500) params.append('maxArea', area[1]);
        navigate(`/property?${params.toString()}`);
    };

    const [cities, setCities] = useState([]);

    useEffect(() => {
        const fetchCities = async () => {
            try {
                const { data } = await axiosInstance.get('/properties');
                const uniqueCities = [...new Set(data.properties.map(p => p.city))];
                setCities(uniqueCities);
            } catch (error) {
                console.error(error);
            }
        };
        fetchCities();
    }, []);

    return (
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
                                step={100} 
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
                                step={5}
                                value={area}
                                onChange={setArea}
                                trackStyle={[{ backgroundColor: '#4caf50' }]}
                                handleStyle={[{ borderColor: '#4caf50' }, { borderColor: '#4caf50' }]} 
                                />
                            </Col>
                        </Row>

                        <div className="d-flex gap-2 align-items-center">
                            <Button variant="success" size="lg" className="w-50" onClick={handleSearch} >Pretraži</Button>
                            <LinkContainer to="/property">
                                <Button variant="outline-light" size="lg" className="w-50">Svi oglasi</Button>
                            </LinkContainer>
                        </div>
                        
                    </div>
                </Container>
            </div>

        </div>
    );
};

export default HeroSection;