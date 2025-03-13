
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Session, User } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';

type Profile = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: 'client' | 'stylist' | 'employee';
  avatar_url: string | null;
};

type AuthContextType = {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<Profile>) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setIsLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Fetch user profile when user changes
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) {
        setProfile(null);
        return;
      }

      try {
        // Use the get_current_user_role function to safely get role without infinite recursion
        const { data: roleData, error: roleError } = await supabase.rpc('get_current_user_role');
        
        if (roleError) {
          console.error('Error fetching user role:', roleError);
        }
        
        // Get the profile separately using .eq instead of directly fetching by ID
        const { data, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching user profile:', error);
          return;
        }

        if (data) {
          // Use the role from the function if available, otherwise fall back to the profile role
          const userRole = roleData || data.role || 'client';
          
          // Ensure role is one of the valid types
          let role: 'client' | 'stylist' | 'employee' = 'client';
          if (userRole === 'stylist' || userRole === 'employee') {
            role = userRole as 'client' | 'stylist' | 'employee';
          }
          
          setProfile({
            id: data.id,
            first_name: data.first_name || '',
            last_name: data.last_name || '',
            email: data.email || user.email || '',
            role: role,
            avatar_url: data.avatar_url,
          });
        } else {
          // If no profile is found (which shouldn't happen due to the trigger), create a basic one
          const newProfile = {
            id: user.id,
            first_name: '',
            last_name: '',
            email: user.email || '',
            role: 'client' as const,
            avatar_url: null,
          };
          setProfile(newProfile);
          
          // Create the profile in the database
          const { error: insertError } = await supabase
            .from('profiles')
            .insert([
              { 
                id: user.id, 
                email: user.email,
                role: 'client'
              }
            ]);
            
          if (insertError) {
            console.error('Error creating user profile:', insertError);
          }
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [user]);

  const signIn = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) throw error;

      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
      });
      
      navigate('/');
    } catch (error: any) {
      toast({
        title: "Sign in failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      setIsLoading(true);
      const { error: signUpError, data } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          }
        }
      });

      if (signUpError) throw signUpError;

      toast({
        title: "Account created!",
        description: "Please check your email for a confirmation link.",
      });

      // Let's sign them in directly for a better experience
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      
      if (!signInError) {
        // Create profile in case the trigger fails
        if (data.user) {
          await supabase
            .from('profiles')
            .insert([
              { 
                id: data.user.id, 
                first_name: firstName,
                last_name: lastName,
                email: email,
                role: 'client'
              }
            ])
            .single();
        }
        
        navigate('/');
      }
    } catch (error: any) {
      toast({
        title: "Sign up failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setIsLoading(true);
      await supabase.auth.signOut();
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
      navigate('/');
    } catch (error: any) {
      toast({
        title: "Error",
        description: "There was an error signing out.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (data: Partial<Profile>) => {
    try {
      if (!user) throw new Error("Not authenticated");
      
      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', user.id);

      if (error) throw error;

      // Update local state
      setProfile(prev => prev ? { ...prev, ...data } : null);
      
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        profile,
        isLoading,
        signIn,
        signUp,
        signOut,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
