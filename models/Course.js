import { model, Schema, models } from 'mongoose';

const CourseSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String, required: true },
        priceAr: { type: Number, required: true },
        priceEx: { type: Number, required: true },
        images: [{ type: String }],
        requirements: [{ type: String }],
        duration: { type: Number, required: true },
        active: { type: Boolean, requiered: true },
    },
    {
        timestamps: true,
    }
);

export const Course = models?.Course || model('Course', CourseSchema);
