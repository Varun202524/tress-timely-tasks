
import mongoose from 'mongoose';

const AppointmentSchema = new mongoose.Schema({
  client_id: {
    type: String,
    required: true
  },
  stylist_id: {
    type: String,
    required: true
  },
  service_id: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  time: {
    type: String,
    required: true
  },
  notes: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'completed'],
    default: 'pending'
  }
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

export const Appointment = mongoose.model('Appointment', AppointmentSchema);
