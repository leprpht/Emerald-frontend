import { useNavigate } from 'react-router';
import './AddButton.css'
import plus from '/src/assets/plus-icon.svg'

export default function AddButton() {
  const nav = useNavigate();

  return (
    <button className="add-button" onClick={() => nav('/new-campaign')}>
      <img src={plus} alt="Add" />
    </button>
  );
}