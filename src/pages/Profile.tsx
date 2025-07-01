
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { User, Mail, Upload, Save, Camera } from 'lucide-react';
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

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
        throw error;
      }

      if (data) {
        setProfile(data);
        setFullName(data.full_name || '');
        setAvatarUrl(data.avatar_url || '');
      } else {
        // Create basic profile from user data
        const newProfile = {
          id: user?.id || '',
          email: user?.email || '',
          full_name: user?.user_metadata?.full_name || user?.user_metadata?.username || '',
          avatar_url: user?.user_metadata?.avatar_url || ''
        };
        setProfile(newProfile);
        setFullName(newProfile.full_name || '');
        setAvatarUrl(newProfile.avatar_url || '');
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
    if (!user) return;
    
    try {
      setSaving(true);
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          email: user.email,
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
      
      // Refresh profile data
      await fetchProfile();
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

      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Invalid File",
          description: "Please select an image file",
          variant: "destructive",
        });
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File Too Large",
          description: "Please select an image smaller than 5MB",
          variant: "destructive",
        });
        return;
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${user?.id}/${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      setAvatarUrl(data.publicUrl);
      
      toast({
        title: "Success",
        description: "Profile image uploaded successfully",
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
                <div className="w-24 h-24 rounded-full bg-gradient-gold flex items-center justify-center text-black text-2xl font-bold mb-4 overflow-hidden border-4 border-gold-400">
                  {avatarUrl ? (
                    <img 
                      src={avatarUrl} 
                      alt="Profile" 
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <User size={32} />
                  )}
                </div>
                <label 
                  htmlFor="avatar-upload"
                  className="absolute bottom-0 right-0 bg-gold-400 hover:bg-gold-500 text-black p-2 rounded-full cursor-pointer transition-colors shadow-lg"
                >
                  {uploading ? (
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-black"></div>
                  ) : (
                    <Camera size={16} />
                  )}
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
                <p className="text-gold-400 text-sm">Uploading image...</p>
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
                <p><span className="text-gold-400">Provider:</span> {user?.app_metadata?.provider || 'email'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
