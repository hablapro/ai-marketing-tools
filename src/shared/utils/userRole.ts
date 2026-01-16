import { supabase } from '@/lib/supabase';

/**
 * Get the user's role from user_profiles table
 * Defaults to 'user' role if no profile exists
 */
export async function getUserRole(userId: string): Promise<string> {
  try {
    console.log(`getUserRole: Fetching role for user ${userId}`);
    const { data, error } = await supabase
      .from('user_profiles')
      .select('role')
      .eq('id', userId)
      .single();

    console.log(`getUserRole: Query result - data:`, data, 'error:', error);

    if (error && error.code !== 'PGRST116') {
      // PGRST116 means "no rows found" - that's OK, we'll default to 'user'
      console.warn('Could not fetch user role:', error);
      return 'user';
    }

    const role = data?.role || 'user';
    console.log(`getUserRole(${userId}): ${role}`);
    return role;
  } catch (err) {
    console.error('Error fetching user role:', err);
    return 'user'; // Default to user role on error
  }
}

/**
 * Check if user is admin
 * Only returns true if role is explicitly set to 'admin'
 */
export async function isUserAdmin(userId: string): Promise<boolean> {
  const role = await getUserRole(userId);
  const isAdmin = role === 'admin';
  console.log(`isUserAdmin(${userId}): role="${role}" → isAdmin=${isAdmin}`);
  return isAdmin;
}

/**
 * Create user profile on signup
 */
export async function createUserProfile(userId: string, role: string = 'user'): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('user_profiles')
      .insert([
        {
          id: userId,
          role: role,
        },
      ]);

    if (error) {
      // User profile might already exist, which is fine
      if (error.code === '23505') {
        // Unique constraint violation - profile already exists
        return true;
      }
      console.warn('Could not create user profile:', error);
      return false;
    }

    return true;
  } catch (err) {
    console.error('Error creating user profile:', err);
    return false;
  }
}
