import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import PropertyCard from '../components/PropertyCard';
import { Typeahead } from 'react-bootstrap-typeahead';
import { Collapse } from 'react-bootstrap';
import axiosInstance from '../utils/axiosInstance';
import { useLocation } from 'react-router-dom';

const PropertiesScreen = () => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    const [city, setCity] = useState(searchParams.get('city') ? [searchParams.get('city')] : []);
    const [type, setType] = useState(searchParams.get('type') || '');
    const [rooms, setRooms] = useState('');
    const [price, setPrice] = useState([
        Number(searchParams.get('minPrice')) || 0,
        Number(searchParams.get('maxPrice')) || 500000,
    ]);
    const [area, setArea] = useState([
        Number(searchParams.get('minArea')) || 0,
        Number(searchParams.get('maxArea')) || 500,
    ]);
    const [open, setOpen] = useState(false);
    const [floor, setFloor] = useState('');
    const [furnished, setFurnished] = useState(false);
    const [parking, setParking] = useState(false);
    const [elevator, setElevator] = useState(false);
    const [videoSurveillance, setVideoSurveillance] = useState(false);
    const [heating, setHeating] = useState([]);
    const [sort, setSort] = useState('');

    const [properties, setProperties] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1);
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(true);


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

    const fetchProperties = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (type && type !== 'sve') params.append('type', type);
            if (rooms) params.append('rooms', rooms);
            if (city.length > 0) params.append('city', city[0]);
            if (price[0] > 0) params.append('minPrice', price[0]);
            if (price[1] < 500000) params.append('maxPrice', price[1]);
            if (area[0] > 0) params.append('minArea', area[0]);
            if (area[1] < 500) params.append('maxArea', area[1]);
            if (furnished) params.append('furnished', true);
            if (parking) params.append('parking', true);
            if (elevator) params.append('elevator', true);
            if (videoSurveillance) params.append('videoSurveillance', true);
            if (floor) params.append('floor', floor);
            if (heating.length > 0) params.append('heating', heating.join(','));
            if (sort) params.append('sort', sort);
            params.append('page', page);

            const { data } = await axiosInstance.get(`/properties?${params.toString()}`);
            setProperties(data.properties);
            setTotal(data.total);
            setPages(data.pages);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProperties();
    }, [page, sort, location.search]);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        if (searchParams.get('city')) setCity([searchParams.get('city')]);
        if (searchParams.get('type')) setType(searchParams.get('type'));
        if (searchParams.get('minPrice') || searchParams.get('maxPrice')) {
            setPrice([
                Number(searchParams.get('minPrice')) || 0,
                Number(searchParams.get('maxPrice')) || 500000,
            ]);
        }
        if (searchParams.get('minArea') || searchParams.get('maxArea')) {
            setArea([
                Number(searchParams.get('minArea')) || 0,
                Number(searchParams.get('maxArea')) || 500,
            ]);
        }
    }, [location.search]);

    const handleHeatingChange = (value) => {
        setHeating(prev =>
            prev.includes(value) ? prev.filter(h => h !== value) : [...prev, value]
        );
    };

    const handleApplyFilters = () => {
        setPage(1);
        fetchProperties();
    };

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
                            step={100}
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
                            step={5}
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
                                <Form.Select value={floor} onChange={(e) => setFloor(e.target.value)} className="bg-dark text-white border-secondary mb-3 mt-2">
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

                                <Form.Check type="checkbox" label="Namešten" className="text-white mb-2"
                                checked={furnished} onChange={(e) => setFurnished(e.target.checked)} />
                                <Form.Check type="checkbox" label="Parking mesto" className="text-white mb-2"
                                checked={parking} onChange={(e) => setParking(e.target.checked)} />

                                <p className="text-white mb-2 mt-3">Infrastruktura:</p>
                                <Form.Check type="checkbox" label="Lift" className="text-white mb-2"
                                checked={elevator} onChange={(e) => setElevator(e.target.checked)} />
                                <Form.Check type="checkbox" label="Video nadzor" className="text-white mb-2"
                                checked={videoSurveillance} onChange={(e) => setVideoSurveillance(e.target.checked)} />

                                <p className="text-white mb-2 mt-3">Grejanje:</p>
                                 {['Podno', 'Centralno', 'Etažno', 'Toplotna pumpa', 'Klima', 'Gas', 'Struja', 'Ostalo'].map(h => (
                                    <Form.Check key={h} type="checkbox" label={h} className="text-white mb-2"
                                        checked={heating.includes(h)}
                                        onChange={() => handleHeatingChange(h)} />
                                ))}
                            </div>
                        </Collapse>

                        <Button variant="success" className="w-100 mt-3" onClick={handleApplyFilters} >Primeni filtere</Button>
                    </div>
                </Col>

                <Col md={8}>
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h5 className="fw-bold mb-0">{total} oglasa</h5>
                         <Form.Select className="w-25" value={sort} onChange={(e) => setSort(e.target.value)}>
                        <option value="">Sortiraj</option>
                        <option value="price-asc">Cena rastuće</option>
                        <option value="price-desc">Cena opadajuće</option>
                        <option value="area-asc">Površina rastuće</option>
                        <option value="area-desc">Površina opadajuće</option>
                        </Form.Select>
                    </div>
                    
                    {loading ? (
                        <p className="text-center">Učitavanje...</p>
                    ) : properties.length === 0 ? (
                        <p className="text-center">Nema oglasa za zadate filtere.</p>
                    ) : (
                        <Row>
                            {properties.map((property) => (
                                <Col key={property._id} sm={12} md={6} className="mb-4">
                                    <PropertyCard property={property} />
                                </Col>
                            ))}
                        </Row>
                    )}

                    {pages > 1 && (
                        <div className="d-flex justify-content-center gap-2 mt-4">
                            {[...Array(pages)].map((_, i) => (
                                <Button
                                    key={i}
                                    variant={page === i + 1 ? 'success' : 'outline-success'}
                                    onClick={() => setPage(i + 1)}
                                >
                                    {i + 1}
                                </Button>
                            ))}
                        </div>
                    )}
                    
                </Col>
            </Row>
        </Container>
    );
};

export default PropertiesScreen;