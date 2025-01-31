import { model, models, Schema } from 'mongoose';

const settingSchema = new Schema({
  name: { type: String, required: true, unique: true },
  value: { type: Object },
});

export const Setting = models?.Setting || model('Setting', settingSchema);
