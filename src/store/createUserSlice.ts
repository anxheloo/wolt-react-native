import { StateCreator } from "zustand";

export interface UserSlice {
  isGuest: boolean;
  user: any;
  updateUserSlice: (state: Partial<UserSlice>) => void;
}

export const createUserSlice: StateCreator<UserSlice> = (set) => ({
  isGuest: false,
  user: null,
  updateUserSlice: set,
});
