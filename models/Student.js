import mongoose, { model, Schema, models } from 'mongoose';
import { Course } from './Course';

const StudentSchema = new Schema(
    {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        nationality: { type: String, required: true },
        courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
    },
    {
        timestamps: true,
    }
);

export const Student = models?.Student || model('Student', StudentSchema);
