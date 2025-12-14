import './Keyword.css';

export default function Keyword({ text, onRemove }: { text: string; onRemove: () => void }) {
  return (
    <div className="keyword" onClick={onRemove}>
      <span>{text}</span>
    </div>
  );
}