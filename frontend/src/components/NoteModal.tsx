import React, { useEffect } from 'react';
import { X, Edit3, Trash2 } from 'lucide-react';
import { Note } from '../types/note';

interface NoteModalProps {
  note: Note;
  isOpen: boolean;
  onClose: () => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const NoteModal: React.FC<NoteModalProps> = ({
  note,
  isOpen,
  onClose,
  onEdit,
  onDelete,
}) => {
  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleEdit = () => {
    onEdit(note.id);
    onClose();
  };

  const handleDelete = () => {
    onDelete(note.id);
    onClose();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <div className="modal-overlay" onClick={handleBackdropClick}>
      <div className="modal-content">
        {/* Modal Header */}
        <div className="modal-header">
          <h2 className="modal-title">{note.title}</h2>
          <div className="modal-actions">
            <button
              onClick={handleEdit}
              className="modal-action-btn edit"
              title="Edit note"
            >
              <Edit3 size={18} />
            </button>
            <button
              onClick={handleDelete}
              className="modal-action-btn delete"
              title="Delete note"
            >
              <Trash2 size={18} />
            </button>
            <button
              onClick={onClose}
              className="modal-close-btn"
              title="Close modal"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          <div className="modal-content-text">
            {note.content || <em className="no-content">No content provided</em>}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="modal-footer">
          <div className="modal-dates">
            <div className="modal-date">
              <strong>Created:</strong> {formatDate(note.createdAt)}
            </div>
            {note.updatedAt !== note.createdAt && (
              <div className="modal-date">
                <strong>Last updated:</strong> {formatDate(note.updatedAt)}
              </div>
            )}
          </div>
          <div className="modal-stats">
            <span className="modal-stat">
              Title: {note.title.length}/50 characters
            </span>
            <span className="modal-stat">
              Content: {note.content.length}/500 characters
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;