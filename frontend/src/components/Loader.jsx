import { Spinner } from 'react-bootstrap';

const Loader = () => (
    <div className="text-center py-5">
        <Spinner animation="border" variant="success" />
    </div>
);

export default Loader;