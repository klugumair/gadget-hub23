
import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AdminPhoneProductModal from './AdminPhoneProductModal';
import { useAuth } from '@/contexts/AuthContext';
import { isAdmin } from '@/utils/adminUtils';

interface AdminPhoneButtonProps {
  category: string;
  onProductAdded?: () => void | Promise<void>;
}

const AdminPhoneButton: React.FC<AdminPhoneButtonProps> = ({ category, onProductAdded }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();
  const [isAdminUser, setIsAdminUser] = React.useState(false);

  React.useEffect(() => {
    const checkAdminStatus = () => {
      if (user?.email) {
        setIsAdminUser(isAdmin(user.email));
      } else {
        setIsAdminUser(false);
      }
    };

    checkAdminStatus();
  }, [user]);

  const handleProductAdded = async () => {
    setIsModalOpen(false);
    if (onProductAdded) {
      await onProductAdded();
    }
  };

  if (!isAdminUser) {
    return null;
  }

  return (
    <>
      <div className="fixed bottom-6 left-6 z-50">
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-gold-400 hover:bg-gold-500 text-black rounded-full w-16 h-16 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
        >
          <Plus size={24} />
        </Button>
      </div>

      <AdminPhoneProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onProductAdded={handleProductAdded}
        defaultSubcategory={category}
      />
    </>
  );
};

export default AdminPhoneButton;
