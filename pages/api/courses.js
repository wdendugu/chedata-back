import { mongooseConnect } from '@/lib/mongoose';
import { Course } from '@/models/Course';

export default async function handler(req, res) {
    const { method } = req;
    await mongooseConnect(req, res);

    const commonProperties = {
        title: req.body.title,
        description: req.body.description,
        priceAr: req.body.priceAr,
        priceEx: req.body.priceEx,
        images: req.body.images,
        duration: req.body.duration,
        active: req.body.active,
        requirements: req.body.requirements,
    };

    if (method === 'GET') {
        if (req.query?.id) {
            res.json(await Course.findOne({ _id: req.query.id }));
        } else {
            res.json(await Course.find());
        }
    }

    if (method === 'POST') {
        const courseDoc = await Course.create(commonProperties);
        res.json(courseDoc);
    }

    if (method === 'PUT') {
        const { _id } = req.body;
        await Course.updateOne({ _id }, { ...commonProperties });
        res.json(true);
    }

    if (method === 'DELETE') {
        if (req.query?.id) {
            await Course.deleteOne({ _id: req.query?.id });
        }
        res.json(true);
    }
}
