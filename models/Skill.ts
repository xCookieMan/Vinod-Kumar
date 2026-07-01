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

const SkillSchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    icon: { type: String, required: true },
    description: { type: String, required: true },
    media: { type: [mediaSchema], default: [] }
  },
  { timestamps: true }
);

const Skill = models.Skill || model('Skill', SkillSchema);
export default Skill;
