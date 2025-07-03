
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { isAdmin } from '@/utils/adminUtils';

export const useAdminCheck = () => {
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const checkAdminStatus = () => {
      if (!user?.email) {
        setIsAdminUser(false);
        setLoading(false);
        return;
      }

      // Use the adminUtils to check if user is admin
      const adminStatus = isAdmin(user.email);
      setIsAdminUser(adminStatus);
      setLoading(false);
    };

    checkAdminStatus();
  }, [user]);

  return { isAdmin: isAdminUser, loading };
};
