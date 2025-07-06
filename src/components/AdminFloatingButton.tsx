
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useAdminCheck } from '@/hooks/useAdminCheck';
import AdminProductModal from './AdminProductModal';

interface AdminFloatingButtonProps {
  category: 'gadget' | 'headphone' | 'cover';
  subcategory?: string;
  onProductAdded?: () => void;
}

const AdminFloatingButton: React.FC<AdminFloatingButtonProps> = ({ category, subcategory, onProductAdded }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isAdmin, loading } = useAdminCheck();

  const handleModalClose = () => {
    setIsModalOpen(false);
    if (onProductAdded) {
      onProductAdded();
    }
  };

  if (loading || !isAdmin) {
    return null;
  }

  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 left-6 w-14 h-14 rounded-full bg-gradient-gold hover:bg-gold-500 text-black shadow-2xl hover:scale-110 transition-all duration-300 z-40"
        title={`Add ${category}`}
      >
        <Plus size={24} />
      </Button>

      <AdminProductModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        defaultCategory={category}
        defaultSubcategory={subcategory}
        onProductAdded={onProductAdded}
      />
    </>
  );
};

export default AdminFloatingButton;
