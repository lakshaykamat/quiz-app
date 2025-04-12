import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String
}, { timestamps: true });

export default mongoose.model('User', userSchema);
export type User = mongoose.InferSchemaType<typeof userSchema>