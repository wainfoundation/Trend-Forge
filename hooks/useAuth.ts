import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthState {
  isAuthenticated: boolean;
  username: string | null;
  isSubscribed: boolean;
  articleCount: number;
  lastCountDate: string | null;
  
  // Actions
  signIn: (username: string) => void;
  signOut: () => void;
  subscribe: () => void;
  incrementArticleCount: () => number;
  resetArticleCount: () => void;
  checkAndResetDailyCount: () => void;
}

const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      username: null,
      isSubscribed: false,
      articleCount: 0,
      lastCountDate: null,
      
      signIn: (username: string) => set({ 
        isAuthenticated: true, 
        username 
      }),
      
      signOut: () => set({ 
        isAuthenticated: false, 
        username: null,
        isSubscribed: false
      }),
      
      subscribe: () => set({ 
        isSubscribed: true 
      }),
      
      incrementArticleCount: () => {
        const { checkAndResetDailyCount } = get();
        checkAndResetDailyCount();
        
        const newCount = get().articleCount + 1;
        set({ articleCount: newCount });
        return newCount;
      },
      
      resetArticleCount: () => set({ 
        articleCount: 0,
        lastCountDate: new Date().toDateString()
      }),
      
      checkAndResetDailyCount: () => {
        const today = new Date().toDateString();
        const { lastCountDate } = get();
        
        if (lastCountDate !== today) {
          set({ 
            articleCount: 0,
            lastCountDate: today
          });
        }
      }
    }),
    {
      name: "trend-forge-auth",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useAuth;
