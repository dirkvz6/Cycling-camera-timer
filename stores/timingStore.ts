import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Race {
  id: string;
  startTime: Date;
  endTime: Date;
  totalTime: number;
  lapTimes: number[];
  riderName: string;
}

interface TimingState {
  races: Race[];
  addRace: (race: Race) => void;
  clearHistory: () => void;
  deleteRace: (id: string) => void;
}

export const useTimingStore = create<TimingState>()(
  persist(
    (set) => ({
      races: [],
      addRace: (race) =>
        set((state) => ({
          races: [...state.races, race],
        })),
      clearHistory: () =>
        set(() => ({
          races: [],
        })),
      deleteRace: (id) =>
        set((state) => ({
          races: state.races.filter((race) => race.id !== id),
        })),
    }),
    {
      name: 'timing-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ races: state.races }),
    }
  )
);