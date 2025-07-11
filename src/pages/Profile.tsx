
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Camera, User, Upload } from 'lucide-react';
import FloatingNavbar from '@/components/FloatingNavbar';
import Footer from '@/components/Footer';

const Profile = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [fullName, setFullName] = useState('');

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      console.log('Fetching profile for user:', user?.id);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error);
        throw error;
      }

      if (data) {
        console.log('Profile found:', data);
        setProfile(data);
        setFullName(data.full_name || '');
      } else {
        console.log('No profile found, creating new one');
        // Create profile if it doesn't exist
        const newProfile = {
          id: user?.id,
          email: user?.email,
          full_name: '',
          avatar_url: null
        };
        
        const { error: insertError } = await supabase
          .from('profiles')
          .insert(newProfile);
        
        if (insertError) {
          console.error('Error creating profile:', insertError);
          toast({
            title: "Error creating profile",
            description: insertError.message,
            variant: "destructive",
          });
        } else {
          console.log('Profile created successfully');
          setProfile(newProfile);
          setFullName('');
        }
      }
    } catch (error: any) {
      console.error('Error in fetchProfile:', error);
      toast({
        title: "Error fetching profile",
        description: error.message || "Could not load your profile information",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      console.log('Starting avatar upload...');
      
      if (!event.target.files || event.target.files.length === 0) {
        console.log('No file selected');
        return;
      }

      const file = event.target.files[0];
      console.log('File selected:', file.name, file.type, file.size);
      
      // Check file type
      if (!file.type.startsWith('image/')) {
        throw new Error('Please select an image file.');
      }
      
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        throw new Error('File size must be less than 5MB.');
      }

      const fileExt = file.name.split('.').pop();
      const fileName = `${user?.id}-${Date.now()}.${fileExt}`;

      console.log('Uploading file as:', fileName);

      // Upload the file to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(fileName, file, { 
          upsert: true,
          contentType: file.type
        });

      if (uploadError) {
        console.error('Upload error:', uploadError);
        throw uploadError;
      }

      console.log('File uploaded successfully');

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      const avatarUrl = `${publicUrl}?t=${Date.now()}`;
      console.log('Avatar URL generated:', avatarUrl);

      // Update the profile with the new avatar URL
      const { error: updateError } = await supabase
        .from('profiles')
        .upsert({
          id: user?.id,
          email: user?.email,
          full_name: fullName,
          avatar_url: avatarUrl,
          updated_at: new Date().toISOString(),
        });

      if (updateError) {
        console.error('Profile update error:', updateError);
        throw updateError;
      }

      console.log('Profile updated with new avatar');

      // Update local state
      setProfile(prev => ({ ...prev, avatar_url: avatarUrl }));
      
      toast({
        title: "Avatar updated! ✅",
        description: "Your profile picture has been updated successfully",
        className: "bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold",
      });

    } catch (error: any) {
      console.error('Error uploading avatar:', error);
      toast({
        title: "Error uploading avatar ❌",
        description: error.message || "There was an error uploading your avatar",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
      // Reset the file input
      if (event.target) {
        event.target.value = '';
      }
    }
  };

  const updateProfile = async () => {
    try {
      setUpdating(true);
      console.log('Updating profile with name:', fullName);
      
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user?.id,
          full_name: fullName,
          email: user?.email,
          avatar_url: profile?.avatar_url,
          updated_at: new Date().toISOString(),
        });

      if (error) {
        console.error('Update profile error:', error);
        throw error;
      }

      console.log('Profile updated successfully');

      // Update local profile state
      setProfile(prev => ({ ...prev, full_name: fullName }));

      toast({
        title: "Profile updated! ✅",
        description: "Your profile has been updated successfully",
        className: "bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold",
      });

    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast({
        title: "Error updating profile ❌",
        description: error.message || "Could not update your profile",
        variant: "destructive",
      });
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-8xl mb-6">⏳</div>
          <p className="text-xl text-gray-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <FloatingNavbar />
      
      <section className="py-32">
        <div className="container mx-auto px-6 max-w-2xl">
          <div className="glass-morphism rounded-2xl p-8">
            <h1 className="text-4xl font-bold text-center mb-8">
              <span className="text-shimmer">Profile Settings</span>
            </h1>

            <div className="space-y-8">
              {/* Avatar Section */}
              <div className="text-center">
                <div className="relative inline-block">
                  <div className="w-32 h-32 rounded-full overflow-hidden bg-gradient-to-r from-gold-400 to-gold-600 flex items-center justify-center mx-auto mb-4">
                    {profile?.avatar_url ? (
                      <img
                        src={profile.avatar_url}
                        alt="Avatar"
                        className="w-full h-full object-cover"
                        key={profile.avatar_url}
                        onError={(e) => {
                          console.error("Failed to load avatar:", profile.avatar_url);
                          e.currentTarget.style.display = "none";
                        }}
                      />
                    ) : (
                      <User size={48} className="text-black" />
                    )}
                  </div>
                  
                  <label className="absolute bottom-2 right-2 bg-gold-400 hover:bg-gold-500 text-black p-2 rounded-full cursor-pointer transition-colors">
                    <Camera size={16} />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={uploadAvatar}
                      disabled={uploading}
                      className="hidden"
                    />
                  </label>
                </div>
                
                {uploading && (
                  <p className="text-gold-400 text-sm">Uploading avatar...</p>
                )}
              </div>

              {/* Profile Form */}
              <div className="space-y-6">
                <div>
                  <Label htmlFor="email" className="text-gold-400 font-medium">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={user?.email || ''}
                    disabled
                    className="bg-gray-800/50 border-gold-400/30 text-gray-300 mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="fullName" className="text-gold-400 font-medium">
                    Full Name
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="bg-gray-800/50 border-gold-400/30 text-white mt-2"
                    placeholder="Enter your full name"
                  />
                </div>

                <Button
                  onClick={updateProfile}
                  disabled={updating}
                  className="w-full bg-gradient-to-r from-gold-400 to-gold-600 hover:from-gold-500 hover:to-gold-700 text-black font-semibold py-3 rounded-full transition-all duration-300 hover:scale-105"
                >
                  <Upload size={20} className="mr-2" />
                  {updating ? 'Updating...' : 'Update Profile'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Profile;
