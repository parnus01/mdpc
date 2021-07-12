import create from 'zustand';
import { combine } from "zustand/middleware";

export const useAppStore = create(
  combine(
    {loading: false},
    (set) => (
      {
        activeLoading: () => set(state => ({loading: true})),
        inactiveLoading: () => set(state => ({loading: false}))
      })
  ),
);