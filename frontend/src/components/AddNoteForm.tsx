import React, { useState } from 'react';
import { X, AlertCircle } from 'lucide-react';
import { CreateNoteDto } from '../types/note';
import { validateNote, getCharacterCountColor } from '../utils/validation';

interface AddNoteFormProps {
  onSubmit: (noteData: CreateNoteDto) => void;
  onCancel: () => void;
}

const AddNoteForm: React.FC<AddNoteFormProps> = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const handleSubmit = () => {
    const validation = validateNote(title, content);
    
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      return;
    }

    setValidationErrors([]);
    onSubmit({ 
      title: title.trim(), 
      content: content.trim() 
    });
    setTitle('');
    setContent('');
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    if (newTitle.length <= 50) {
      setTitle(newTitle);
      // Clear validation errors when user starts typing
      if (validationErrors.length > 0) {
        setValidationErrors([]);
      }
    }
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    if (newContent.length <= 500) {
      setContent(newContent);
      // Clear validation errors when user starts typing
      if (validationErrors.length > 0) {
        setValidationErrors([]);
      }
    }
  };

  const titleColor = getCharacterCountColor(title.length, 50);
  const contentColor = getCharacterCountColor(content.length, 500);

  return (
    <div className="card add-note-form">
      <div className="card-header">
        <h3 className="card-title">Add New Note</h3>
        <button onClick={onCancel} className="icon-button cancel">
          <X size={18} />
        </button>
      </div>

      {/* Validation Errors */}
      {validationErrors.length > 0 && (
        <div className="validation-errors">
          <div className="validation-error-header">
            <AlertCircle size={16} />
            Please fix the following errors:
          </div>
          <ul>
            {validationErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Title Input */}
      <div className="input-group">
        <input
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Note title..."
          className={`input title ${title.length >= 45 ? 'warning' : ''}`}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        />
        <div className="character-count" style={{ color: titleColor }}>
          {title.length}/50
        </div>
      </div>

      {/* Content Textarea */}
      <div className="input-group">
        <textarea
          value={content}
          onChange={handleContentChange}
          placeholder="Write your note here..."
          className={`textarea ${content.length >= 450 ? 'warning' : ''}`}
        />
        <div className="character-count" style={{ color: contentColor }}>
          {content.length}/500
        </div>
      </div>

      <div className="form-actions">
        <button 
          onClick={handleSubmit} 
          className="btn btn-primary"
          disabled={!title.trim()}
        >
          Save Note
        </button>
        <button onClick={onCancel} className="btn btn-secondary">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddNoteForm;