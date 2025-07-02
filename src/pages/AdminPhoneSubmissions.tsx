
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import FloatingNavbar from '@/components/FloatingNavbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle, XCircle, Eye, DollarSign } from 'lucide-react';

interface PhoneSubmission {
  id: string;
  user_id: string;
  brand: string;
  model_name: string;
  storage: string;
  ram: string;
  condition: string;
  usage_duration: string;
  asking_price: number | null;
  phone_images: string[] | null;
  additional_notes: string | null;
  status: string;
  admin_notes: string | null;
  created_at: string;
}

const AdminPhoneSubmissions = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [submissions, setSubmissions] = useState<PhoneSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState<PhoneSubmission | null>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [finalPrice, setFinalPrice] = useState('');

  useEffect(() => {
    if (user) {
      fetchSubmissions();
    }
  }, [user]);

  const fetchSubmissions = async () => {
    try {
      const { data, error } = await supabase
        .from('phone_submissions')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSubmissions(data || []);
    } catch (error) {
      console.error('Error fetching submissions:', error);
      toast({
        title: "Error",
        description: "Failed to fetch phone submissions",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (submissionId: string, status: 'approved' | 'rejected') => {
    try {
      const updateData: any = {
        status,
        admin_notes: adminNotes || null,
        updated_at: new Date().toISOString()
      };

      // If approving, add the final price
      if (status === 'approved' && finalPrice) {
        updateData.asking_price = parseFloat(finalPrice);
      }

      const { error } = await supabase
        .from('phone_submissions')
        .update(updateData)
        .eq('id', submissionId);

      if (error) throw error;

      toast({
        title: `Submission ${status}!`,
        description: `Phone submission has been ${status}`,
      });

      setSelectedSubmission(null);
      setAdminNotes('');
      setFinalPrice('');
      fetchSubmissions();
    } catch (error) {
      console.error('Error updating submission:', error);
      toast({
        title: "Error",
        description: "Failed to update submission",
        variant: "destructive"
      });
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-black">
        <FloatingNavbar />
        <section className="min-h-screen flex items-center justify-center">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold text-white mb-6">Access Denied</h1>
            <p className="text-xl text-gray-400 mb-8">Please sign in to access admin panel</p>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <FloatingNavbar />
        <section className="min-h-screen flex items-center justify-center">
          <div className="text-white text-xl">Loading submissions...</div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <FloatingNavbar />
      
      <section className="py-32">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold mb-8 text-center">
            <span className="text-shimmer">Phone Submissions Admin</span>
          </h1>

          <div className="grid gap-6">
            {submissions.length === 0 ? (
              <div className="glass-morphism rounded-2xl p-8 text-center">
                <p className="text-xl text-gray-400">No submissions found</p>
              </div>
            ) : (
              submissions.map((submission) => (
                <div key={submission.id} className="glass-morphism rounded-2xl p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-4">
                        {submission.brand} {submission.model_name}
                      </h3>
                      <div className="space-y-2 text-gray-300">
                        <p><strong>Storage:</strong> {submission.storage}</p>
                        <p><strong>RAM:</strong> {submission.ram}</p>
                        <p><strong>Condition:</strong> {submission.condition}</p>
                        <p><strong>Usage:</strong> {submission.usage_duration}</p>
                        <p><strong>Asking Price:</strong> Rs. {submission.asking_price || 'Not specified'}</p>
                        <p><strong>Status:</strong> 
                          <span className={`ml-2 px-2 py-1 rounded text-sm ${
                            submission.status === 'approved' ? 'bg-green-600' :
                            submission.status === 'rejected' ? 'bg-red-600' : 'bg-yellow-600'
                          }`}>
                            {submission.status}
                          </span>
                        </p>
                        <p><strong>Submitted:</strong> {new Date(submission.created_at).toLocaleDateString()}</p>
                        {submission.additional_notes && (
                          <p><strong>Notes:</strong> {submission.additional_notes}</p>
                        )}
                      </div>
                    </div>

                    <div>
                      {submission.phone_images && submission.phone_images.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-lg font-semibold text-white mb-2">Images:</h4>
                          <div className="grid grid-cols-2 gap-2">
                            {submission.phone_images.slice(0, 4).map((image, index) => (
                              <img
                                key={index}
                                src={image}
                                alt={`Phone ${index + 1}`}
                                className="w-full h-24 object-cover rounded-lg"
                              />
                            ))}
                          </div>
                        </div>
                      )}

                      {submission.status === 'pending' && (
                        <div className="flex gap-2">
                          <Button
                            onClick={() => setSelectedSubmission(submission)}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            <Eye size={16} className="mr-2" />
                            Review
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Review Modal */}
          {selectedSubmission && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
              <div className="glass-morphism rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <h2 className="text-3xl font-bold text-white mb-6">
                  Review Submission: {selectedSubmission.model_name}
                </h2>

                <div className="space-y-6">
                  <div>
                    <Label htmlFor="admin_notes" className="text-white text-lg font-semibold">
                      Admin Notes
                    </Label>
                    <textarea
                      id="admin_notes"
                      value={adminNotes}
                      onChange={(e) => setAdminNotes(e.target.value)}
                      placeholder="Add notes about this submission..."
                      rows={3}
                      className="w-full mt-2 p-3 rounded-md bg-gray-800 border border-gray-600 text-white resize-none"
                    />
                  </div>

                  <div>
                    <Label htmlFor="final_price" className="text-white text-lg font-semibold">
                      Final Price (if approving)
                    </Label>
                    <Input
                      id="final_price"
                      type="number"
                      value={finalPrice}
                      onChange={(e) => setFinalPrice(e.target.value)}
                      placeholder="Enter final selling price"
                      className="mt-2 bg-gray-800 border-gray-600 text-white"
                    />
                  </div>

                  <div className="flex gap-4">
                    <Button
                      onClick={() => handleStatusUpdate(selectedSubmission.id, 'approved')}
                      className="bg-green-600 hover:bg-green-700 text-white flex-1"
                    >
                      <CheckCircle size={20} className="mr-2" />
                      Approve
                    </Button>
                    <Button
                      onClick={() => handleStatusUpdate(selectedSubmission.id, 'rejected')}
                      className="bg-red-600 hover:bg-red-700 text-white flex-1"
                    >
                      <XCircle size={20} className="mr-2" />
                      Reject
                    </Button>
                  </div>

                  <Button
                    onClick={() => setSelectedSubmission(null)}
                    variant="ghost"
                    className="w-full text-gray-400 hover:text-white"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default AdminPhoneSubmissions;
