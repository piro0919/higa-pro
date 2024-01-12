import { create } from "zustand";

type HeaderState = {
  height: number;
  setHeight: (height: number) => void;
};

const useHeaderStore = create<HeaderState>((set) => ({
  height: 0,
  setHeight: (height): void => set({ height }),
}));

export default useHeaderStore;
