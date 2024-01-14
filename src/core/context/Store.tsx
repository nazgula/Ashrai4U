// store.ts
import create from 'zustand';

interface StoreState {
  status: string;
  updateStatus: (newStatus: string) => void;
}

const useStore = create<StoreState>(set => ({
  status: 'initial',
  updateStatus: (newStatus: string) => set(() => ({ status: newStatus })),
}));

export { useStore }