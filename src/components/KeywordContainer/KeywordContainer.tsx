import { useState, useEffect } from 'react';
import Typeahead from '../Typeahead/Typeahead';
import Keyword from '../Keyword/Keyword';
import './KeywordContainer.css';

interface KeywordContainerProps {
  keywords: string[];
  onKeywordsChange: (keywords: string[]) => void;
}

export default function KeywordContainer({ keywords, onKeywordsChange }: KeywordContainerProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>(keywords);
  
  useEffect(() => {
    setSelectedTags(keywords);
  }, [keywords]);
  
  const handleAddTag = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      const newTags = [...selectedTags, tag];
      setSelectedTags(newTags);
      onKeywordsChange(newTags);
    }
  };
  
  const handleRemoveTag = (index: number) => {
    const newTags = selectedTags.filter((_, i) => i !== index);
    setSelectedTags(newTags);
    onKeywordsChange(newTags);
  };
  
  return (
    <div className="keyword-container">
      <h3>Keywords</h3>
      <Typeahead onSelect={handleAddTag} />
      <div className="selected-keywords">
        {selectedTags.map((tag, index) => (
          <Keyword key={index} text={tag} onRemove={() => handleRemoveTag(index)} />
        ))}
      </div>
    </div>
  );
}