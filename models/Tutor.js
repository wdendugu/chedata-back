import mongoose, { model, Schema, models } from 'mongoose';

const TutorSchema = new Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        costPerHour: { type: Number, required: true },
        courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    },
    {
        timestamps: true,
    }
);

export const Tutor = models?.Tutor || model('Tutor', TutorSchema);
