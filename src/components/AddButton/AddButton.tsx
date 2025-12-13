import './AddButton.css'
import plus from '/src/assets/plus-icon.svg'

export default function AddButton() {
  return (
    <button className="add-button">
      <img src={plus} alt="Add" />
    </button>
  );
}