import { useNavigate, useLocation } from 'react-router';
import { fetchDemoAccountBalance } from '../../services/api';
import './NavBar.css'
import { useEffect, useState } from 'react';
import { styleNumbers } from '../../util/util';

export default function NavBar() {
  const [balance, setBalance] = useState<number>(0);
  const nav = useNavigate();
  const location = useLocation();

  useEffect(() => {
    async function loadBalance() {
      setBalance(await fetchDemoAccountBalance());
    }
    loadBalance();
  }, [location]);

  return (
    <nav className="navbar">
      <button onClick={() => nav('/')}>
        <h2>Emerald</h2>
      </button>
      <button className='balance' onClick={() => nav('/demo-account')}>
        <h2>$ {styleNumbers(balance)}</h2>
      </button>
    </nav>
  );
}