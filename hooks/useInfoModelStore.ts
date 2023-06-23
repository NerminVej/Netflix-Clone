import { create } from "zustand";

// Define the interface for the modal store
export interface ModalStoreInterface {
  movieId?: string; // The ID of the movie associated with the modal
  isOpen: boolean; // Flag indicating whether the modal is open or not
  openModal: (movieId: string) => void; // Function to open the modal for a specific movie
  closeModal: () => void; // Function to close the modal
}

// Create the modal store using Zustand's create function
const useInfoModalStore = create<ModalStoreInterface>((set) => ({
  movieId: undefined, // Initially, no movie ID is set
  isOpen: false, // Initially, the modal is closed
  openModal: (movieId: string) => set({ isOpen: true, movieId }), // Function to open the modal
  closeModal: () => set({ isOpen: false, movieId: undefined }), // Function to close the modal
}));

export default useInfoModalStore;
