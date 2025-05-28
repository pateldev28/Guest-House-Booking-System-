import { useState, useEffect } from 'react';
import { fetchBeds, createBed, updateBed, deleteBed } from '../../services/api';

const BedManagement = ({ guestHouseId, roomId }) => {
  const [beds, setBeds] = useState([]);
  const [formData, setFormData] = useState({
    number: '',
    type: 'single',
    status: 'available'
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (guestHouseId && roomId) {
      loadBeds();
    }
  }, [guestHouseId, roomId]);

  const loadBeds = async () => {
    const data = await fetchBeds(guestHouseId, roomId);
    setBeds(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateBed(guestHouseId, roomId, editingId, formData);
    } else {
      await createBed(guestHouseId, roomId, formData);
    }
    setEditingId(null);
    setFormData({ number: '', type: 'single', status: 'available' });
    loadBeds();
  };

  const handleEdit = (bed) => {
    setEditingId(bed.id);
    setFormData({
      number: bed.number,
      type: bed.type,
      status: bed.status
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this bed?')) {
      await deleteBed(guestHouseId, roomId, id);
      loadBeds();
    }
  };

  return (
    <div className="bed-management">
      <h3>Manage Beds</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Bed Number"
          value={formData.number}
          onChange={(e) => setFormData({...formData, number: e.target.value})}
          required
        />
        <select
          value={formData.type}
          onChange={(e) => setFormData({...formData, type: e.target.value})}
        >
          <option value="single">Single</option>
          <option value="double">Double</option>
          <option value="bunk">Bunk</option>
        </select>
        <select
          value={formData.status}
          onChange={(e) => setFormData({...formData, status: e.target.value})}
        >
          <option value="available">Available</option>
          <option value="maintenance">Maintenance</option>
        </select>
        <button type="submit">{editingId ? 'Update' : 'Create'}</button>
        {editingId && (
          <button type="button" onClick={() => setEditingId(null)}>Cancel</button>
        )}
      </form>

      <div className="bed-list">
        {beds.map(bed => (
          <div key={bed.id} className="bed-item">
            <h4>Bed {bed.number}</h4>
            <p>Type: {bed.type}</p>
            <p>Status: <span className={`status-${bed.status}`}>{bed.status}</span></p>
            <div className="actions">
              <button onClick={() => handleEdit(bed)}>Edit</button>
              <button onClick={() => handleDelete(bed.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BedManagement;