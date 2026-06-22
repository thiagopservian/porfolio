import { useTheme } from '../context/ThemeContext';
import logoDark from '../assets/logo_tema_oscuro.png';
import logoLight from '../assets/logo_tema_claro.png';
import './Loader.css';

export default function Loader({ hidden }) {
    const { theme } = useTheme();
    return (
        <div className={`loader ${hidden ? 'is-hidden' : ''}`} aria-hidden={hidden}>
            <img src={theme === 'dark' ? logoDark : logoLight} alt="" className="loader-logo" />
            <div className="loader-bar" />
        </div>
    );
}
