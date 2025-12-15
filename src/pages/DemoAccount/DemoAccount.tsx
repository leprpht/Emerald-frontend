import './DemoAccount.css'

export default function DemoAccount() {
  return (
    <div className="demo-account-container">
      <div className="demo-account-card">
        <h2>Demo Account</h2>
        <h3>$ 2000</h3>
        <div className="demo-account-btns">
          <button className="demo-account-button">+</button>
          <button className="demo-account-button">-</button>
        </div>
      </div>
    </div>
  );
}