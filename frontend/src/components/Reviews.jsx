import { useEffect, useState } from 'react';
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Container } from "react-bootstrap";
import axiosInstance from '../utils/axiosInstance';

const getInitials = (name) => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
};

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
      }
    }
  ]
};

const Reviews = () => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await axiosInstance.get('/reviews');
        setReviews(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchReviews();
  }, []);

  if (reviews.length === 0) return null;

    return (
        <div className="py-5 mt-5">
            <Container>
                <h2 className="text-center fw-bold mb-2">Recenzije korisnika</h2>
                <p className="text-center text-muted mb-5">Šta naši korisnici misle o nama?</p>
                <Slider {...settings}>
                    {reviews.map((review) => (
                        <div key={review._id} className="px-2">
                            <div className="border border-success rounded p-4 review-card">
                                <div className="d-flex align-items-center mb-3">
                                    <div 
                                    className="rounded-circle bg-success d-flex align-items-center justify-content-center text-white fw-bold me-3"
                                    style={{ width: '50px', height: '50px', minWidth: '50px' }}>
                                        {getInitials(review.fullName)}
                                    </div>
                                    <h6 className="mb-0">{review.fullName}</h6>
                                </div>
                                <p className="mb-0 text-muted">{review.text}</p>
                            </div>
                        </div>
                    ))}
                </Slider>
            </Container>
        </div>
    );
};

export default Reviews;