import { useState } from 'react';
import Typeahead from '../Typeahead/Typeahead';
import Keyword from '../Keyword/Keyword';
import './KeywordContainer.css';

export default function KeywordContainer() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  
  const handleAddTag = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  
  const handleRemoveTag = (index: number) => {
    setSelectedTags(selectedTags.filter((_, i) => i !== index));
  };
  
  return (
    <div className="keyword-container">
      <h3>Keywords</h3>
      <Typeahead onSelect={handleAddTag} />
      
      <div className="selected-keywords">
        {selectedTags.map((tag, index) => (
          <Keyword 
            key={index} 
            text={tag} 
            onRemove={() => handleRemoveTag(index)}
          />
        ))}
      </div>
    </div>
  );
}