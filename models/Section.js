import mongoose, { model, Schema, models } from 'mongoose';

const SectionrSchema = new Schema(
    {
        tutor: { type: String, required: true },
        course: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }],
        fromDate: { type: Date, required: true },
        toDate: { type: Date, required: true },
        fromHour: { type: String, required: true },
        toHour: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

export const Sectionr = models?.Sectionr || model('Sectionr', SectionrSchema);
