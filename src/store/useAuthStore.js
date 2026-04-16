import { create } from 'zustand'
import { supabase } from '../lib/supabaseClient'

export const useAuthStore = create((set, get) => ({
  user: null,
  session: null,
  loading: true,
  error: null,
  showAuthModal: false,
  authModalCallback: null, // function to call after successful login

  // Initialize auth listener — call once on app mount
  initialize: () => {
    // Get current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      set({
        user: session?.user ?? null,
        session: session,
        loading: false,
      })
    })

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const prevUser = get().user
        const newUser = session?.user ?? null

        set({
          user: newUser,
          session: session,
          loading: false,
        })

        // If user just logged in and there's a pending callback, execute it
        if (!prevUser && newUser && get().authModalCallback) {
          const callback = get().authModalCallback
          set({ showAuthModal: false, authModalCallback: null })
          // Small delay to ensure state is settled
          setTimeout(() => callback(newUser), 100)
        }
      }
    )

    // Return unsubscribe function
    return () => subscription.unsubscribe()
  },

  // Sign up with email & password
  signUp: async (email, password, fullName) => {
    set({ error: null, loading: true })
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
      },
    })

    if (error) {
      set({ error: error.message, loading: false })
      return { success: false, error: error.message }
    }

    set({ loading: false })
    return { success: true, data }
  },

  // Sign in with email & password
  signIn: async (email, password) => {
    set({ error: null, loading: true })
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      set({ error: error.message, loading: false })
      return { success: false, error: error.message }
    }

    set({ loading: false })
    return { success: true, data }
  },

  // Sign in with Google OAuth
  signInWithGoogle: async () => {
    set({ error: null })
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    })

    if (error) {
      set({ error: error.message })
      return { success: false, error: error.message }
    }

    return { success: true, data }
  },

  // Sign out
  signOut: async () => {
    set({ error: null })
    const { error } = await supabase.auth.signOut()
    if (error) {
      set({ error: error.message })
    } else {
      set({ user: null, session: null })
    }
  },

  // Open auth modal, optionally with a callback after login
  openAuthModal: (callback = null) => {
    set({ showAuthModal: true, authModalCallback: callback })
  },

  // Close auth modal
  closeAuthModal: () => {
    set({ showAuthModal: false, authModalCallback: null })
  },

  // Clear error
  clearError: () => set({ error: null }),

  // Helper
  isLoggedIn: () => !!get().user,
}))
