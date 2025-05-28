import { useState, useEffect } from 'react';
import { useBooking } from '../../context/BookingContext';
import DateRangePicker from '../ui/DateRangePicker';
import { fetchGuestHouses, fetchAvailableRooms, fetchAvailableBeds } from '../../services/api';
import Notification from '../ui/Notification';

const BookingForm = () => {
  const { createBooking } = useBooking();
  const [formData, setFormData] = useState({
    guestHouse: '',
    room: '',
    bed: '',
    dateRange: { start: null, end: null },
    purpose: '',
    remarks: ''
  });
  const [guestHouses, setGuestHouses] = useState([]);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [availableBeds, setAvailableBeds] = useState([]);
  const [loading, setLoading] = useState({
    guestHouses: false,
    rooms: false,
    beds: false
  });
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const loadGuestHouses = async () => {
      setLoading(prev => ({...prev, guestHouses: true}));
      try {
        const data = await fetchGuestHouses();
        setGuestHouses(data);
      } catch (error) {
        setMessage({ text: 'Failed to load guest houses', type: 'error' });
      } finally {
        setLoading(prev => ({...prev, guestHouses: false}));
      }
    };
    loadGuestHouses();
  }, []);

  useEffect(() => {
    const loadAvailableRooms = async () => {
      if (formData.guestHouse && formData.dateRange.start && formData.dateRange.end) {
        setLoading(prev => ({...prev, rooms: true}));
        try {
          const data = await fetchAvailableRooms(formData.guestHouse, formData.dateRange);
          setAvailableRooms(data);
          setFormData(prev => ({...prev, room: '', bed: ''}));
        } catch (error) {
          setMessage({ text: 'Failed to load available rooms', type: 'error' });
        } finally {
          setLoading(prev => ({...prev, rooms: false}));
        }
      }
    };
    loadAvailableRooms();
  }, [formData.guestHouse, formData.dateRange]);

  useEffect(() => {
    const loadAvailableBeds = async () => {
      if (formData.room) {
        setLoading(prev => ({...prev, beds: true}));
        try {
          const data = await fetchAvailableBeds(formData.room, formData.dateRange);
          setAvailableBeds(data);
          setFormData(prev => ({...prev, bed: ''}));
        } catch (error) {
          setMessage({ text: 'Failed to load available beds', type: 'error' });
        } finally {
          setLoading(prev => ({...prev, beds: false}));
        }
      }
    };
    loadAvailableBeds();
  }, [formData.room, formData.dateRange]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.guestHouse || !formData.room || !formData.bed || !formData.dateRange.start || !formData.dateRange.end) {
      setMessage({ text: 'Please fill all required fields', type: 'error' });
      return;
    }
    try {
      await createBooking({
        guestHouseId: formData.guestHouse,
        roomId: formData.room,
        bedId: formData.bed,
        startDate: formData.dateRange.start,
        endDate: formData.dateRange.end,
        purpose: formData.purpose,
        remarks: formData.remarks
      });
      setMessage({ text: 'Booking request submitted successfully', type: 'success' });
      setFormData({
        guestHouse: '',
        room: '',
        bed: '',
        dateRange: { start: null, end: null },
        purpose: '',
        remarks: ''
      });
    } catch (error) {
      setMessage({ text: 'Failed to submit booking request', type: 'error' });
    }
  };

  return (
    <div className="booking-form">
      <h2>New Booking Request</h2>
      {message && <Notification message={message.text} type={message.type} />}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Dates</label>
          <DateRangePicker
            onChange={(range) => setFormData({...formData, dateRange: range})}
            value={formData.dateRange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="guestHouse">Guest House</label>
          <select
            id="guestHouse"
            value={formData.guestHouse}
            onChange={(e) => setFormData({...formData, guestHouse: e.target.value, room: '', bed: ''})}
            disabled={loading.guestHouses}
          >
            <option value="">Select Guest House</option>
            {guestHouses.map(gh => (
              <option key={gh.id} value={gh.id}>{gh.name}</option>
            ))}
          </select>
          {loading.guestHouses && <span className="loading-indicator">Loading...</span>}
        </div>

        <div className="form-group">
          <label htmlFor="room">Room</label>
          <select
            id="room"
            value={formData.room}
            onChange={(e) => setFormData({...formData, room: e.target.value, bed: ''})}
            disabled={!formData.guestHouse || loading.rooms}
          >
            <option value="">Select Room</option>
            {availableRooms.map(room => (
              <option key={room.id} value={room.id}>Room {room.number} ({room.type})</option>
            ))}
          </select>
          {loading.rooms && <span className="loading-indicator">Loading...</span>}
        </div>

        <div className="form-group">
          <label htmlFor="bed">Bed</label>
          <select
            id="bed"
            value={formData.bed}
            onChange={(e) => setFormData({...formData, bed: e.target.value})}
            disabled={!formData.room || loading.beds}
          >
            <option value="">Select Bed</option>
            {availableBeds.map(bed => (
              <option key={bed.id} value={bed.id}>Bed {bed.number} ({bed.type})</option>
            ))}
          </select>
          {loading.beds && <span className="loading-indicator">Loading...</span>}
        </div>

        <div className="form-group">
          <label htmlFor="purpose">Purpose of Stay</label>
          <input
            id="purpose"
            type="text"
            value={formData.purpose}
            onChange={(e) => setFormData({...formData, purpose: e.target.value})}
          />
        </div>

        <div className="form-group">
          <label htmlFor="remarks">Remarks</label>
          <textarea
            id="remarks"
            value={formData.remarks}
            onChange={(e) => setFormData({...formData, remarks: e.target.value})}
          />
        </div>

        <button type="submit" className="submit-button" disabled={loading.beds || loading.rooms || loading.guestHouses}>
          Submit Booking Request
        </button>
      </form>
    </div>
  );
};

export default BookingForm;