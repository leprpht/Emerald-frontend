import { useState } from 'react';
import './Typeahead.css'
import tags from '../../taglist'

export default function Typeahead({ onSelect }: { onSelect: (tag: string) => void }) {
  const [query, setQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const filteredItems = query
    ? tags.filter(tag => 
        tag.toLowerCase().includes(query.toLowerCase())
      )
    : [];
  
  const handleSelect = (tag: string) => {
    onSelect(tag);
    setQuery('');
    setShowSuggestions(false);
  };
  
  return (
    <div className="typeahead-container">
      <input
        type="text"
        className="typeahead-input"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setShowSuggestions(true);
        }}
        onFocus={() => setShowSuggestions(true)}
        onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        placeholder="Type to search..."
      />
      
      {showSuggestions && filteredItems.length > 0 && (
        <ul className="typeahead-suggestions">
          {filteredItems.map((tag, index) => (
            <li
              key={index}
              className="typeahead-suggestion-item"
              onClick={() => handleSelect(tag)}
            >
              {tag}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}