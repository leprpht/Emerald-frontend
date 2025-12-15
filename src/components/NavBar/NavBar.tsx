import { useNavigate } from 'react-router';
import './NavBar.css'

export default function NavBar() {
  const nav = useNavigate();

  return (
    <nav className="navbar">
      <button onClick={() => nav('/')}>
        <h2>Emerald</h2>
      </button>
      <button className='balance' onClick={() => nav('/demo-account')}>
        <h2>$ 2000</h2>
      </button>
    </nav>
  );
}