import mongoose, { Schema, model, models } from 'mongoose';

const mediaSchema = new Schema(
  {
    type: {
      type: String,
      enum: ['image', 'video', 'audio'],
      required: true
    },
    url: { type: String, required: true },
    label: { type: String, required: true },
    posterUrl: { type: String, default: '' }
  },
  { _id: false }
);

const ExperienceSchema = new Schema(
  {
    title: { type: String, required: true },
    organization: { type: String, required: true },
    yearRange: { type: String, required: true },
    category: {
      type: String,
      enum: ['Academic', 'Production', 'Freelance'],
      required: true
    },
    description: { type: String, required: true },
    thumbnail: { type: String, required: true, default: '' },
    media: { type: [mediaSchema], default: [] },
    order: { type: Number, required: true }
  },
  { timestamps: true }
);

const Experience = models.Experience || model('Experience', ExperienceSchema);
export default Experience;
