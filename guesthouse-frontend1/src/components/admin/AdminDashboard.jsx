import { useState, useEffect } from 'react';
import { getBookingStats, getOccupancyRates } from '../../services/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalBookings: 0,
    pendingApprovals: 0,
    occupancyRate: 0,
    activeGuestHouses: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [bookingStats, occupancy] = await Promise.all([
          getBookingStats(),
          getOccupancyRates()
        ]);
        setStats({
          totalBookings: bookingStats.total,
          pendingApprovals: bookingStats.pending,
          occupancyRate: occupancy.rate,
          activeGuestHouses: occupancy.activeGuestHouses
        });
      } catch (error) {
        console.error('Failed to load dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Bookings</h3>
          <p>{stats.totalBookings}</p>
        </div>
        <div className="stat-card">
          <h3>Pending Approvals</h3>
          <p>{stats.pendingApprovals}</p>
        </div>
        <div className="stat-card">
          <h3>Occupancy Rate</h3>
          <p>{stats.occupancyRate}%</p>
        </div>
        <div className="stat-card">
          <h3>Active Guest Houses</h3>
          <p>{stats.activeGuestHouses}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;