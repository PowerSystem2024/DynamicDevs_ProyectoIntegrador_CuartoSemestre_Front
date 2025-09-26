import { Button } from 'react-bootstrap';
import error from '../../assets/error404alfajor.png'
import { Link } from 'react-router-dom';


const Error404 = () => {
    return (
        <section className="mainSection text-center">
        <img src={error} alt="error 404" className='imagenError'/>
        <div>
        <Link className='btn btn-warning buttonError' to="/" >Volver al inicio</Link>

        </div>
    </section>
    );
};

export default Error404;