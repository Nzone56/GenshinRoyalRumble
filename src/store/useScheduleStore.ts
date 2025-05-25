import type { Schedule } from "@mytypes/Tournament";
import { create } from "zustand";

interface ScheduleStore {
  schedule: Schedule | null;
  selectedRound: number;
  currentRound: number;
  loading: boolean;

  setSchedule: (schedule: Schedule) => void;
  setCurrentRound: (round: number) => void;
  setSelectedRound: (round: number) => void;
  setLoading: (value: boolean) => void;
  resetSchedule: () => void;
}

export const useScheduleStore = create<ScheduleStore>((set) => ({
  schedule: null,
  currentRound: 1,
  loading: false,
  selectedRound: 1,

  setSchedule: (schedule) => set({ schedule }),
  setCurrentRound: (round: number) => set({ currentRound: round }),
  setSelectedRound: (round: number) => set({ selectedRound: round }),
  setLoading: (value) => set({ loading: value }),
  resetSchedule: () => set({ schedule: null }),
}));
