import logo from '../assets/logo.png';
import './Loader.css';

export default function Loader({ hidden }) {
    return (
        <div className={`loader ${hidden ? 'is-hidden' : ''}`} aria-hidden={hidden}>
            <img src={logo} alt="" className="loader-logo" />
            <div className="loader-bar" />
        </div>
    );
}
