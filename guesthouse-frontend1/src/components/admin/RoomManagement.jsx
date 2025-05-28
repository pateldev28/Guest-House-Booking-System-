import { useState, useEffect } from 'react';
import { fetchRooms, createRoom, updateRoom, deleteRoom } from '../../services/api';

const RoomManagement = ({ guestHouseId }) => {
  const [rooms, setRooms] = useState([]);
  const [formData, setFormData] = useState({
    number: '',
    type: 'standard',
    capacity: 1,
    amenities: ''
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    if (guestHouseId) {
      loadRooms();
    }
  }, [guestHouseId]);

  const loadRooms = async () => {
    const data = await fetchRooms(guestHouseId);
    setRooms(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateRoom(guestHouseId, editingId, formData);
    } else {
      await createRoom(guestHouseId, formData);
    }
    setEditingId(null);
    setFormData({ number: '', type: 'standard', capacity: 1, amenities: '' });
    loadRooms();
  };

  const handleEdit = (room) => {
    setEditingId(room.id);
    setFormData({
      number: room.number,
      type: room.type,
      capacity: room.capacity,
      amenities: room.amenities
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this room?')) {
      await deleteRoom(guestHouseId, id);
      loadRooms();
    }
  };

  return (
    <div className="room-management">
      <h3>Manage Rooms</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Room Number"
          value={formData.number}
          onChange={(e) => setFormData({...formData, number: e.target.value})}
          required
        />
        <select
          value={formData.type}
          onChange={(e) => setFormData({...formData, type: e.target.value})}
        >
          <option value="standard">Standard</option>
          <option value="deluxe">Deluxe</option>
          <option value="suite">Suite</option>
        </select>
        <input
          type="number"
          min="1"
          placeholder="Capacity"
          value={formData.capacity}
          onChange={(e) => setFormData({...formData, capacity: parseInt(e.target.value)})}
          required
        />
        <input
          type="text"
          placeholder="Amenities (comma separated)"
          value={formData.amenities}
          onChange={(e) => setFormData({...formData, amenities: e.target.value})}
        />
        <button type="submit">{editingId ? 'Update' : 'Create'}</button>
        {editingId && (
          <button type="button" onClick={() => setEditingId(null)}>Cancel</button>
        )}
      </form>

      <div className="room-list">
        {rooms.map(room => (
          <div key={room.id} className="room-item">
            <h4>Room {room.number}</h4>
            <p>Type: {room.type}</p>
            <p>Capacity: {room.capacity}</p>
            <div className="actions">
              <button onClick={() => handleEdit(room)}>Edit</button>
              <button onClick={() => handleDelete(room.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomManagement;