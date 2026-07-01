import mongoose, { Schema, model, models } from 'mongoose';

const ContactLogSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
    flagged: { type: Boolean, required: true, default: false },
    reason: { type: String, default: null },
    emailSent: { type: Boolean, required: true, default: false }
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

const ContactLog = models.ContactLog || model('ContactLog', ContactLogSchema);
export default ContactLog;
