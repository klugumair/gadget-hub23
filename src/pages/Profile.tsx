
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FloatingNavbar from '@/components/FloatingNavbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, LogOut, Mail, User as UserIcon, Phone } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import AuthModal from '@/components/AuthModal';

const Profile = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (user) {
      fetchProfile();
    } else {
      setShowAuthModal(true);
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        throw error;
      }

      if (data) {
        setFullName(data.full_name || '');
        setEmail(data.email || user.email || '');
        setAvatarUrl(data.avatar_url || '');
      } else {
        setEmail(user.email || '');
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Error loading profile');
    }
  };

  const updateProfile = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          full_name: fullName,
          email: email,
          avatar_url: avatarUrl,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${user?.id}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true });

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath);

      setAvatarUrl(data.publicUrl);
      toast.success('Avatar uploaded successfully!');
    } catch (error) {
      console.error('Error uploading avatar:', error);
      toast.error('Error uploading avatar');
    } finally {
      setUploading(false);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    toast.success('Signed out successfully!');
    navigate('/');
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-black">
        <FloatingNavbar />
        <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <FloatingNavbar />
      
      <section className="py-32">
        <div className="container mx-auto px-6 max-w-2xl">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">
              <span className="text-shimmer">Profile Settings</span>
            </h1>
            <p className="text-xl text-gray-400">
              Manage your account information
            </p>
          </div>

          <Card className="glass-morphism border-gold-400/30">
            <CardHeader>
              <CardTitle className="text-gold-400 text-2xl">Account Information</CardTitle>
              <CardDescription className="text-gray-400">
                Update your profile details below
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Section */}
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full border-2 border-gold-400 overflow-hidden">
                    {avatarUrl ? (
                      <img 
                        src={avatarUrl} 
                        alt="Avatar" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center">
                        <UserIcon size={32} className="text-black" />
                      </div>
                    )}
                  </div>
                  <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-gold-400 rounded-full p-2 cursor-pointer hover:bg-gold-500 transition-colors">
                    <Camera size={16} className="text-black" />
                  </label>
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={uploadAvatar}
                    disabled={uploading}
                    className="hidden"
                  />
                </div>
                {uploading && (
                  <p className="text-gold-400 text-sm">Uploading...</p>
                )}
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email" className="text-gold-400 flex items-center">
                    <Mail size={16} className="mr-2" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-black/30 border-gold-400/30 text-white"
                    disabled
                  />
                  <p className="text-gray-400 text-sm mt-1">Email cannot be changed</p>
                </div>

                <div>
                  <Label htmlFor="fullName" className="text-gold-400 flex items-center">
                    <UserIcon size={16} className="mr-2" />
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="bg-black/30 border-gold-400/30 text-white"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col space-y-4 pt-6">
                <Button
                  onClick={updateProfile}
                  disabled={loading}
                  className="bg-gold-400 hover:bg-gold-500 text-black font-semibold"
                >
                  {loading ? 'Updating...' : 'Update Profile'}
                </Button>
                
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  className="border-red-400 text-red-400 hover:bg-red-400/10 hover:text-red-300"
                >
                  <LogOut size={18} className="mr-2" />
                  Sign Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Profile;
