import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import AdminDashboard from '../components/admin/AdminDashboard';
import GuestHouseCRUD from '../components/admin/GuestHouseCRUD';
import BookingApproval from '../components/admin/BookingApproval';
import Header from '../components/common/Header';

const AdminPage = () => {
  const { user } = useAuth();

  return (
    <div className="admin-page">
      <Header user={user} />
      <div className="admin-content">
        <AdminDashboard />
        <div className="admin-sections">
          <GuestHouseCRUD />
          <BookingApproval />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;