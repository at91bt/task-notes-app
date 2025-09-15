import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { Note, CreateNoteDto, UpdateNoteDto, PaginatedResult } from './types/note';
import { notesApi } from './api/notesApi';
import NoteCard from './components/NoteCard';
import AddNoteForm from './components/AddNoteForm';
import LoadingSpinner from './components/LoadingSpinner';
import Pagination from './components/Pagination';
import NoteModal from './components/NoteModal'; // Add this import

const App: React.FC = () => {
  const [notesData, setNotesData] = useState<PaginatedResult<Note> | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Modal state
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const notesPerPage = 5;

  useEffect(() => {
    loadNotes(currentPage);
  }, [currentPage]);

  const loadNotes = async (page: number = 1) => {
    try {
      setLoading(true);
      setError(null);
      const fetchedData = await notesApi.getAllNotes({ 
        page, 
        limit: notesPerPage 
      });
      setNotesData(fetchedData);
    } catch (err) {
      setError('Failed to load notes. Please check if the backend is running on http://localhost:3001');
      console.error('Error loading notes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNote = async (noteData: CreateNoteDto) => {
    try {
      setActionLoading(true);
      setError(null);
      await notesApi.createNote(noteData);
      
      // Refresh the current page or go to first page
      await loadNotes(1);
      setCurrentPage(1);
      setShowAddForm(false);
    } catch (err) {
      setError('Failed to create note.');
      console.error('Error adding note:', err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdateNote = async (id: number, updates: UpdateNoteDto) => {
    try {
      setActionLoading(true);
      setError(null);
      const updatedNote = await notesApi.updateNote(id, updates);
      
      // Update the note in current page data
      if (notesData) {
        setNotesData({
          ...notesData,
          data: notesData.data.map(note => 
            note.id === id ? updatedNote : note
          )
        });
      }
      
      // Update the selected note if it's the one being viewed in modal
      if (selectedNote && selectedNote.id === id) {
        setSelectedNote(updatedNote);
      }
      
      setEditingId(null);
    } catch (err) {
      setError('Failed to update note.');
      console.error('Error updating note:', err);
    } finally {
      setActionLoading(false);
    }
  };

  const handleDeleteNote = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      try {
        setActionLoading(true);
        setError(null);
        await notesApi.deleteNote(id);
        
        // Close modal if the deleted note was being viewed
        if (selectedNote && selectedNote.id === id) {
          setIsModalOpen(false);
          setSelectedNote(null);
        }
        
        // Refresh current page, but check if we need to go to previous page
        const currentData = notesData;
        if (currentData && currentData.data.length === 1 && currentPage > 1) {
          // Last item on page, go to previous page
          const newPage = currentPage - 1;
          setCurrentPage(newPage);
          await loadNotes(newPage);
        } else {
          // Refresh current page
          await loadNotes(currentPage);
        }
      } catch (err) {
        setError('Failed to delete note.');
        console.error('Error deleting note:', err);
      } finally {
        setActionLoading(false);
      }
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setEditingId(null); // Cancel any editing when changing pages
    setShowAddForm(false); // Hide add form when changing pages
  };

  // Modal handlers
  const handleViewNote = (note: Note) => {
    setSelectedNote(note);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedNote(null);
  };

  const handleEditFromModal = (id: number) => {
    setEditingId(id);
    // Note: Modal will be closed by the NoteModal component
  };

  const notes = notesData?.data || [];
  const isEmpty = !loading && notes.length === 0 && currentPage === 1;

  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <h1>My Notes</h1>
        <p>Full-Stack TypeScript Application with Pagination</p>
        {notesData && (
          <div style={{ marginTop: '8px', color: '#6b7280', fontSize: '0.9rem' }}>
            Total Notes: {notesData.total} | Page {notesData.page} of {notesData.totalPages}
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {/* Add Note Button */}
      <button
        onClick={() => setShowAddForm(!showAddForm)}
        className="add-note-button"
      >
        <Plus size={20} />
        Add New Note
      </button>

      {/* Action Loading Overlay */}
      {actionLoading && (
        <div className="loading-overlay">
          <div className="card">
            <LoadingSpinner />
          </div>
        </div>
      )}

      {/* Add Note Form */}
      {showAddForm && (
        <AddNoteForm
          onSubmit={handleAddNote}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {/* Main Content */}
      {loading ? (
        <LoadingSpinner />
      ) : isEmpty ? (
        <div className="empty-state">
          <div className="icon">📝</div>
          <h2>No notes yet</h2>
          <p>Create your first note to get started!</p>
        </div>
      ) : (
        <>
          {/* Notes List */}
          <div>
            {notes.map(note => (
              <NoteCard
                key={note.id}
                note={note}
                isEditing={editingId === note.id}
                onEdit={setEditingId}
                onDelete={handleDeleteNote}
                onSave={handleUpdateNote}
                onCancel={() => setEditingId(null)}
                onView={handleViewNote} // Add this prop
              />
            ))}
          </div>

          {/* Pagination */}
          {notesData && (
            <Pagination
              currentPage={notesData.page}
              totalPages={notesData.totalPages}
              hasNext={notesData.hasNext}
              hasPrev={notesData.hasPrev}
              onPageChange={handlePageChange}
              total={notesData.total}
              limit={notesData.limit}
            />
          )}
        </>
      )}

      {/* Note Modal */}
      {selectedNote && (
        <NoteModal
          note={selectedNote}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onEdit={handleEditFromModal}
          onDelete={handleDeleteNote}
        />
      )}

      {/* Footer */}
      <div className="footer">
        <p>Featuring server-side pagination for optimal performance</p>
        <p>Alex Trajkovski</p>
      </div>
    </div>
  );
};

export default App;