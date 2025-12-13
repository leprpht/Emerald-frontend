import './Keyword.css';

export default function Keyword({ text }: { text: string }) {
  return (
    <div className="keyword">
      <span>{text}</span>
    </div>
  );
}