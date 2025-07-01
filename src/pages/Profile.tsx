
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { User, Mail, Upload, Save } from 'lucide-react';
import FloatingNavbar from '@/components/FloatingNavbar';
import { Navigate } from 'react-router-dom';

interface UserProfile {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
}

const Profile = () => {
  const { user, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [fullName, setFullName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        // If profile doesn't exist, create a basic one
        const newProfile = {
          id: user?.id || '',
          email: user?.email || '',
          full_name: user?.user_metadata?.full_name || user?.user_metadata?.username || '',
          avatar_url: user?.user_metadata?.avatar_url || ''
        };
        setProfile(newProfile);
        setFullName(newProfile.full_name || '');
        setAvatarUrl(newProfile.avatar_url || '');
      } else {
        setProfile(data);
        setFullName(data.full_name || '');
        setAvatarUrl(data.avatar_url || '');
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Failed to load profile",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async () => {
    try {
      setSaving(true);
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user?.id,
          email: user?.email,
          full_name: fullName,
          avatar_url: avatarUrl,
          updated_at: new Date().toISOString(),
        });

      if (error) {
        throw error;
      }

      toast({
        title: "Success",
        description: "Profile updated successfully",
      });
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      const file = event.target.files?.[0];
      if (!file) return;

      const fileExt = file.name.split('.').pop();
      const fileName = `${user?.id}-${Math.random()}.${fileExt}`;
      
      // For now, we'll use a placeholder for the upload functionality
      // In a real implementation, you would upload to Supabase Storage
      toast({
        title: "Upload Feature",
        description: "Image upload will be implemented with Supabase Storage",
      });
      
    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  // Redirect to home if not authenticated
  if (!authLoading && !user) {
    return <Navigate to="/" replace />;
  }

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800">
        <FloatingNavbar />
        <div className="container mx-auto px-4 pt-32">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gold-400"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800">
      <FloatingNavbar />
      <div className="container mx-auto px-4 pt-32 pb-16">
        <div className="max-w-2xl mx-auto">
          <div className="glass-morphism rounded-2xl p-8 shadow-2xl">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">Profile</h1>
              <p className="text-gray-300">Manage your account information</p>
            </div>

            {/* Profile Picture Section */}
            <div className="flex flex-col items-center mb-8">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-gradient-gold flex items-center justify-center text-black text-2xl font-bold mb-4">
                  {avatarUrl ? (
                    <img 
                      src={avatarUrl} 
                      alt="Profile" 
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  ) : (
                    <User size={32} />
                  )}
                </div>
                <label 
                  htmlFor="avatar-upload"
                  className="absolute bottom-0 right-0 bg-gold-400 hover:bg-gold-500 text-black p-2 rounded-full cursor-pointer transition-colors"
                >
                  <Upload size={16} />
                </label>
                <input
                  id="avatar-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  disabled={uploading}
                />
              </div>
              {uploading && (
                <p className="text-gold-400 text-sm">Uploading...</p>
              )}
            </div>

            {/* Profile Form */}
            <div className="space-y-6">
              <div>
                <Label htmlFor="email" className="text-white flex items-center gap-2">
                  <Mail size={16} />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={user?.email || ''}
                  disabled
                  className="mt-2 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                />
                <p className="text-gray-400 text-sm mt-1">Email cannot be changed</p>
              </div>

              <div>
                <Label htmlFor="username" className="text-white flex items-center gap-2">
                  <User size={16} />
                  Username/Full Name
                </Label>
                <Input
                  id="username"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="mt-2 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  placeholder="Enter your username or full name"
                />
              </div>

              <div>
                <Label htmlFor="avatar-url" className="text-white">
                  Profile Image URL (Optional)
                </Label>
                <Input
                  id="avatar-url"
                  type="url"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  className="mt-2 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  placeholder="Enter image URL"
                />
              </div>

              <Button
                onClick={updateProfile}
                disabled={saving}
                className="w-full bg-gradient-gold hover:bg-gold-500 text-black font-semibold py-3 rounded-full transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              >
                <Save size={16} />
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>

            {/* Account Info */}
            <div className="mt-8 pt-6 border-t border-white/20">
              <h3 className="text-white font-semibold mb-4">Account Information</h3>
              <div className="space-y-2 text-gray-300">
                <p><span className="text-gold-400">User ID:</span> {user?.id}</p>
                <p><span className="text-gold-400">Account Created:</span> {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'Unknown'}</p>
                <p><span className="text-gold-400">Email Verified:</span> {user?.email_confirmed_at ? 'Yes' : 'No'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
