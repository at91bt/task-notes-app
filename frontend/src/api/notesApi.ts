import axios from 'axios';
import { Note, CreateNoteDto, UpdateNoteDto, PaginatedResult, PaginationParams } from '../types/note';

const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const notesApi = {
  // Get paginated notes
  getAllNotes: async (params?: PaginationParams): Promise<PaginatedResult<Note>> => {
    const response = await api.get<PaginatedResult<Note>>('/notes', { params });
    return response.data;
  },

  // Get single note by ID
  getNoteById: async (id: number): Promise<Note> => {
    const response = await api.get<Note>(`/notes/${id}`);
    return response.data;
  },

  // Create new note
  createNote: async (noteData: CreateNoteDto): Promise<Note> => {
    const response = await api.post<Note>('/notes', noteData);
    return response.data;
  },

  // Update existing note
  updateNote: async (id: number, updates: UpdateNoteDto): Promise<Note> => {
    const response = await api.patch<Note>(`/notes/${id}`, updates);
    return response.data;
  },

  // Delete note
  deleteNote: async (id: number): Promise<void> => {
    await api.delete(`/notes/${id}`);
  },
};