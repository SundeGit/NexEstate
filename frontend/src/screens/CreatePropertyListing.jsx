import { useState } from 'react';
import { Container, Row, Col, Form, Button, Spinner } from 'react-bootstrap';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import PropertyCard from '../components/PropertyCard';
import axiosInstance from '../utils/axiosInstance';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const heatingOptions = ['Podno', 'Centralno', 'Etažno', 'Toplotna pumpa', 'Klima', 'Gas', 'Struja', 'Ostalo'];

const CreateListingScreen = () => {
  const navigate = useNavigate();

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
  const [elevator, setElevator] = useState(false);
  const [videoSurveillance, setVideoSurveillance] = useState(false);
  const [heating, setHeating] = useState([]);
  const [plan, setPlan] = useState('');
  const [mainImage, setMainImage] = useState(null);
  const [otherImages, setOtherImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleHeating = (e) => {
    const { value, checked } = e.target;
    setHeating(prev => checked ? [...prev, value] : prev.filter(h => h !== value));
  };

  const validateForm = () => {
      if (!title || !type || !price || !city || !address || !area || !description) {
        toast.error('Molimo popunite sva obavezna polja');
        return false;
      }

      if (!mainImage) {
        toast.error('Dodajte najmanje jednu sliku');
        return false;
      }
      return true;
    };

  const handlePlanSelect = async (selectedPlan) => {
      if (!validateForm()) return;
      setPlan(selectedPlan);
  };

  const getPropertyData = (urls) => ({
    title,
    type,
    price: Number(price),
    city,
    address,
    area: Number(area),
    rooms: rooms ? Number(rooms) : undefined,
    floor: floor || '0',
    description,
    furnished,
    parking,
    elevator,
    videoSurveillance,
    heating,
    images: urls,
  });

  const createOrder = async () => {
    const { data } = await axiosInstance.post('/paypal/create-order', { plan });
    return data.orderID;
  };

  const onApprove = async (data) => {
    try {
      setUploading(true);
      const formData = new FormData();

      if (mainImage) 
        formData.append('images', mainImage);
      otherImages.forEach(img => formData.append('images', img));
        
        formData.append('title', title);
        formData.append('type', type);
        formData.append('price', price);
        formData.append('city', city);
        formData.append('address', address);
        formData.append('area', area);
        if (rooms) formData.append('rooms', rooms);
        formData.append('floor', floor || '0');
        formData.append('description', description);
        formData.append('furnished', furnished);
        formData.append('parking', parking);
        formData.append('elevator', elevator);
        formData.append('videoSurveillance', videoSurveillance);
        heating.forEach(h => formData.append('heating', h));
        formData.append('isFeatured', plan === 'featured');
        if (plan === 'featured') {
          const featuredUntil = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
          formData.append('featuredUntil', featuredUntil);
        }

        formData.append('orderID', data.orderID);
        formData.append('plan', plan);

        const { data: result } = await axiosInstance.post('/properties', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });

        toast.success('Oglas uspešno postavljen!');
        navigate(`/property/${result._id}`);

    } catch (error) {
      toast.error('Greška pri kreiranju oglasa');
    } finally {
      setUploading(false);
    }
  };

  const typeLabels = {
    stan: 'Stan',
    kuca: 'Kuća',
    vikendica: 'Vikendica',
    garaza: 'Garaža',
    plac: 'Plac',
    'poslovni-prostor': 'Poslovni prostor',
  };

  const showRooms = !['garaza', 'plac'].includes(type);

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
              placeholder="Naslov oglasa *"
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
                  onChange={(e) => { setType(e.target.value); setRooms(''); }}
                >
                  <option value="">Vrsta nekretnine *</option>
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
                  placeholder="Cena (€) *"
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
                  placeholder="Grad *"
                  className="bg-dark text-white border-secondary"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </Col>
              <Col md={6}>
                <Form.Control
                  type="text"
                  name="address"
                  placeholder="Adresa *"
                  className="bg-dark text-white border-secondary"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={showRooms ? 4 : 6}>
                <Form.Control
                  type="number"
                  name="area"
                  placeholder="Površina (m²) *"
                  className="bg-dark text-white border-secondary"
                  min={1}
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                />
              </Col>
              {showRooms && (
              <Col md={4}>
                <Form.Select
                  className="bg-dark text-white border-secondary"
                  value={rooms}
                  onChange={(e) => setRooms(e.target.value)}
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
              </Col>
              )}
              <Col md={showRooms ? 4 : 6}>
                <Form.Select
                  className="bg-dark text-white border-secondary"
                  value={floor}
                  onChange={(e) => setFloor(e.target.value)}>
                  {type === 'kuca' ? (
                    <>
                      <option value="1">Jednospratna</option>
                      <option value="2">Dvospratna</option>
                      <option value="3">Trospratna</option>
                      <option value="4">Četvorospratna</option>
                    </>
                  ) : (
                    <>
                      <option value="">Sprat</option>
                      <option value="0">Prizemlje</option>
                      <option value="0-">Nisko prizemlje</option>
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
                    </>
                  )}
                </Form.Select>
              </Col>
            </Row>

            <Form.Control
              as="textarea"
              rows={4}
              placeholder="Opis nekretnine..."
              className="bg-dark text-white border-secondary mb-3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <hr className="border-secondary" />

            <h5 className="text-success mb-3">Dodatne informacije</h5>

            <Row className="mb-3">
              <Col>
                <Form.Check type="checkbox" label="Namešteno" className="text-white"
                checked={furnished} onChange={(e) => setFurnished(e.target.checked)} />
              </Col>
              <Col>
                <Form.Check type="checkbox" label="Parking" className="text-white"
                checked={parking} onChange={(e) => setParking(e.target.checked)} />
              </Col>
              <Col>
                <Form.Check type="checkbox" label="Lift" className="text-white"
                checked={elevator} onChange={(e) => setElevator(e.target.checked)} />
              </Col>
              <Col>
                <Form.Check type="checkbox" label="Video nadzor" className="text-white"
                checked={videoSurveillance} onChange={(e) => setVideoSurveillance(e.target.checked)} />
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
            <Form.Label className="text-white">Naslovna slika *</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              className="bg-dark text-white border-secondary mb-3"
              onChange={(e) => setMainImage(e.target.files[0])}
            />
            <Form.Label className="text-white">Ostale slike</Form.Label>
            <Form.Control
              type="file"
              multiple
              accept="image/*"
              className="bg-dark text-white border-secondary mb-4"
              onChange={(e) => setOtherImages(Array.from(e.target.files))}
            />
            {(mainImage || otherImages.length > 0) && (
              <p className="text-white small mb-4">{1 + otherImages.length} slika izabrano/a</p>
            )}

            <hr className="border-secondary" />
            <h5 className="text-success mb-3">Izaberite paket</h5>

            <Row className="mb-4">
              <Col md={6}>
                <div
                  className={`p-3 rounded border cursor-pointer ${plan === 'basic' ? 'border-success' : 'border-secondary'}`}
                  onClick={() => handlePlanSelect('basic')}
                  style={{ cursor: 'pointer', height: '200px' }}
                >
                  <h6 className="fw-bold">Osnovni oglas</h6>
                  <h4 className="text-success fw-bold">5 €</h4>
                  <small className="text-white">30 dana · Prikazivanje u pretrazi</small>
                </div>
              </Col>
              <Col md={6}>
                <div
                  className={`p-3 rounded border ${plan === 'featured' ? 'border-success' : 'border-secondary'}`}
                  onClick={() => handlePlanSelect('featured')}
                  style={{ cursor: 'pointer', height: '200px' }}
                >
                  <h6 className="fw-bold">Istaknuti oglas ★</h6>
                  <h4 className="text-success fw-bold">20 €</h4>
                   <small className="text-white">30 dana · Početna stranica · Ribbon badge</small>
                </div>
              </Col>
            </Row>

            {uploading && (
              <div className="text-center mb-3">
                <Spinner animation="border" variant="success" size="sm" className="me-2" />
                <span className="text-muted">Upload slika...</span>
              </div>
            )}

            {plan && (
              <PayPalScriptProvider options={{
                'client-id': process.env.REACT_APP_PAYPAL_CLIENT_ID,
                currency: 'EUR'
              }}>
                <PayPalButtons
                  createOrder={createOrder}
                  onApprove={onApprove}
                  onError={() => toast.error('Greška pri plaćanju')}
                  style={{ layout: 'vertical', color: 'gold', shape: 'rect' }}
                />
              </PayPalScriptProvider>
            )}
          </div>
        </Col>


            <Col md={4}>
              <div className="bg-dark text-white rounded p-4">
                <h5 className="text-success mb-3">Pregled oglasa</h5>
                <p className="text-white small mb-3">Izgled Vašeg oglasa:</p>
                <PropertyCard preview={true} property={{
                  _id: 'preview',
                  title: title || 'Naslov oglasa',
                  images: mainImage
                  ? [URL.createObjectURL(mainImage)]
                  : ['https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600'],
                  price: Number(price) || 0,
                  location: `${address}, ${city}`,
                  type: typeLabels[type] || type || 'Tip',
                  area: Number(area) || 0,
                  featured: plan === 'featured',
                }} />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateListingScreen;