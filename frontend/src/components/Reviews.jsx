import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Container } from "react-bootstrap";

const getInitials = (fullName) => {
    const name = fullName.trim().split(' ')[0];
    const surname = fullName.trim().split(' ')[1];
    if(name != null && surname != null)
        return `${name[0]}${surname[0]}`.toUpperCase();
    else
        return `${name[0]}`;
}

const reviews = [
  { _id: '1', fullName: 'Marko Petrović', text: 'Odličan sajt, pronašao sam stan za koji sam dugo tražio. Preporučujem svima!' },
  { _id: '2', fullName: 'Jovana Nikolić', text: 'Veoma jednostavno za korišćenje, oglasi su detaljni i ažurni.' },
  { _id: '3', fullName: 'Stefan Jovanović', text: 'Prodao sam stan za kratko vreme zahvaljujući NexEstate platformi.' },
  { _id: '4', fullName: 'Ana Đorđević', text: 'Preporučujem svima koji traže ili prodaju nekretnine.' },
];

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