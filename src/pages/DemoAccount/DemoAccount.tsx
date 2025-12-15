import './DemoAccount.css'
import { fetchDemoAccountBalance, updateDemoAccountBalance } from '../../services/api';
import { useEffect, useState } from 'react';
import { styleNumbers } from '../../util/util';

export default function DemoAccount() {
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    async function loadBalance() {
      setBalance(await fetchDemoAccountBalance());
    }
    loadBalance();
  }, []);

  async function changeBalance(amount: number) {
    await updateDemoAccountBalance(amount);
    setBalance(await fetchDemoAccountBalance());
  }

  return (
    <div className="demo-account-container">
      <div className="demo-account-card">
        <h2>Demo Account</h2>
        <h3>$ {styleNumbers(balance)}</h3>
        <div className="demo-account-buttons">
          <button className="demo-account-button" onClick={() => changeBalance(50)}>+</button>
          <button className="demo-account-button" onClick={() => changeBalance(-50)}>-</button>
        </div>
      </div>
    </div>
  );
}