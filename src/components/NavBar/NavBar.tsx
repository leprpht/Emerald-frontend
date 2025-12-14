import { useNavigate } from 'react-router';
import './NavBar.css'

export default function NavBar() {
  const nav = useNavigate();

  return (
    <nav className="navbar" onClick={() => nav('/')}>
      <button>
        <h2>Emerald</h2>
      </button>
    </nav>
  );
}