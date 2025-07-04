
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useAdminCheck } from '@/hooks/useAdminCheck';
import AdminProductModal from './AdminProductModal';

interface AdminPhoneButtonProps {
  category: string;
  subcategory?: string;
}

const AdminPhoneButton: React.FC<AdminPhoneButtonProps> = ({ category, subcategory }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAdmin, loading } = useAdminCheck();

  if (loading || !isAdmin) {
    return null;
  }

  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 left-6 w-14 h-14 rounded-full bg-gradient-gold hover:bg-gold-500 text-black shadow-2xl hover:scale-110 transition-all duration-300 z-40"
        title={`Add ${category} Phone`}
      >
        <Plus size={24} />
      </Button>

      <AdminProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        category="gadget"
        subcategory={`${category}-phone`}
      />
    </>
  );
};

export default AdminPhoneButton;
