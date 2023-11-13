import { mongooseConnect } from '@/lib/mongoose';
import { Course } from '@/models/Course';

export default async function handler(req, res) {
    const { method } = req;
    await mongooseConnect(req, res);

    if (method === 'GET') {
        if (req.query?.id) {
            res.json(await Course.findOne({ _id: req.query.id }));
        } else {
            res.json(await Course.find());
        }
    }

    if (method === 'POST') {
        const {
            title,
            description,
            priceAr,
            priceEx,
            images,
            duration,
            active,
            requirements,
        } = req.body;
        const courseDoc = await Course.create({
            title,
            description,
            priceAr,
            priceEx,
            images,
            duration,
            active,
            requirements,
        });
        res.json(courseDoc);
    }

    if (method === 'PUT') {
        const {
            title,
            description,
            priceAr,
            priceEx,
            images,
            duration,
            _id,
            active,
            requirements,
        } = req.body;
        await Course.updateOne(
            { _id },
            {
                title,
                description,
                priceAr,
                priceEx,
                images,
                duration,
                active,
                requirements,
            }
        );
        res.json(true);
    }

    if (method === 'DELETE') {
        if (req.query?.id) {
            await Course.deleteOne({ _id: req.query?.id });
        }
        res.json(true);
    }
}
