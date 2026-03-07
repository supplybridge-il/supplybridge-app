import dbConnect from '@/lib/db/connect';
import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
  event: { type: String, required: true },
  payload: { type: Object, required: true },
  timestamp: { type: Date, default: Date.now }
});

const EventModel = mongoose.models.Event || mongoose.model('Event', EventSchema);

// Define the structure for marketplace search and view analytics
interface AnalyticsPayload {
  query?: string;
  filters?: Record<string, string | boolean | undefined>;
  count?: number;
  productId?: string;
  userId?: string;
}

export async function logEvent(
  event: 'product.view' | 'product.search', 
  payload: AnalyticsPayload
) {
  try {
    await dbConnect();
    // Non-blocking execution to ensure UI performance isn't impacted
    EventModel.create({ event, payload }).catch(console.error);
  } catch (error) {
    console.error('Analytics Error:', error);
  }
}