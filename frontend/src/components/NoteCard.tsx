import React, { useState } from 'react';
import { Edit3, Trash2, Save, X, AlertCircle, Eye } from 'lucide-react';
import { Note } from '../types/note';
import { validateNote, getCharacterCountColor } from '../utils/validation';

interface NoteCardProps {
  note: Note;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onSave: (id: number, updates: { title: string; content: string }) => void;
  onCancel: () => void;
  onView: (note: Note) => void; // Add this new prop
  isEditing: boolean;
}

const NoteCard: React.FC<NoteCardProps> = ({
  note,
  onEdit,
  onDelete,
  onSave,
  onCancel,
  onView, // Add this
  isEditing,
}) => {
  const [editTitle, setEditTitle] = useState(note.title);
  const [editContent, setEditContent] = useState(note.content);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  const handleSave = () => {
    const validation = validateNote(editTitle, editContent);
    
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      return;
    }

    setValidationErrors([]);
    onSave(note.id, { title: editTitle.trim(), content: editContent.trim() });
  };

  const handleCancel = () => {
    setEditTitle(note.title);
    setEditContent(note.content);
    setValidationErrors([]);
    onCancel();
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    if (newTitle.length <= 50) {
      setEditTitle(newTitle);
      if (validationErrors.length > 0) {
        setValidationErrors([]);
      }
    }
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    if (newContent.length <= 500) {
      setEditContent(newContent);
      if (validationErrors.length > 0) {
        setValidationErrors([]);
      }
    }
  };

  if (isEditing) {
    const titleColor = getCharacterCountColor(editTitle.length, 50);
    const contentColor = getCharacterCountColor(editContent.length, 500);

    return (
      <div className="card edit-note-form">
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

        <div className="card-header">
          <div className="input-group flex-1">
            <input
              type="text"
              value={editTitle}
              onChange={handleTitleChange}
              className={`input title ${editTitle.length >= 45 ? 'warning' : ''}`}
              placeholder="Note title..."
            />
            <div className="character-count" style={{ color: titleColor }}>
              {editTitle.length}/50
            </div>
          </div>
          <div className="card-actions">
            <button 
              onClick={handleSave} 
              className="icon-button save" 
              title="Save changes"
              disabled={!editTitle.trim()}
            >
              <Save size={18} />
            </button>
            <button onClick={handleCancel} className="icon-button cancel" title="Cancel editing">
              <X size={18} />
            </button>
          </div>
        </div>
        
        <div className="input-group">
          <textarea
            value={editContent}
            onChange={handleContentChange}
            className={`textarea ${editContent.length >= 450 ? 'warning' : ''}`}
            placeholder="Write your note here..."
          />
          <div className="character-count" style={{ color: contentColor }}>
            {editContent.length}/500
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">{note.title}</h3>
        <div className="card-actions">
          <button
            onClick={() => onView(note)}
            className="icon-button view"
            title="View note"
          >
            <Eye size={18} />
          </button>
          <button
            onClick={() => onEdit(note.id)}
            className="icon-button edit"
            title="Edit note"
          >
            <Edit3 size={18} />
          </button>
          <button
            onClick={() => onDelete(note.id)}
            className="icon-button delete"
            title="Delete note"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
      <div className="card-content">
        {note.content.length > 150 
          ? `${note.content.substring(0, 150)}...` 
          : note.content || <em style={{ color: '#9ca3af' }}>No content</em>
        }
      </div>
      <div className="card-date">
        Created: {new Date(note.createdAt).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}
      </div>
    </div>
  );
};

export default NoteCard;