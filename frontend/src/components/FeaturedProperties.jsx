import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PropertyCard from './PropertyCard';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axiosInstance from '../utils/axiosInstance';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  responsive: [
    { breakpoint: 1200, settings: { slidesToShow: 3 } },
    { breakpoint: 768, settings: { slidesToShow: 2 } },
    { breakpoint: 576, settings: { slidesToShow: 1 } },
  ],
};

const FeaturedProperties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data } = await axiosInstance.get('/properties/featured');
        setProperties(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  if (loading) return <p className="text-center">Učitavanje...</p>;
  if (properties.length === 0) return null;

  
  return (
    <Container className="my-5">
      <h2 className="text-center fw-bold mb-4">Istaknuti oglasi</h2>
      <Slider {...settings}>
        {properties.map((property) => (
          <div key={property._id} className="px-2">
            <PropertyCard property={property} />
          </div>
        ))}
      </Slider>
    </Container>
  );
};

export default FeaturedProperties;