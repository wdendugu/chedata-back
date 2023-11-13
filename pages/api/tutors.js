import { mongooseConnect } from '@/lib/mongoose';
import { Tutor } from '@/models/Tutor';

export default async function handler(req, res) {
    const { method } = req;
    await mongooseConnect(req, res);

    const commonProperties = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        costPerHour: req.body.costPerHour,
        courses: req.body.courses
    };

    if (method === 'GET') {
        if (req.query?.id) {
            res.json(await Tutor.findOne({ _id: req.query.id }));
        } else {
            res.json(await Tutor.find());
        }
    }

    if (method === 'POST') {
        const TutorDoc = await Tutor.create(commonProperties);
        res.json(TutorDoc);
    }

    if (method === 'PUT') {
        const { _id } = req.body;
        await Tutor.updateOne({ _id }, { ...commonProperties });
        res.json(true);
    }

    if (method === 'DELETE') {
        if (req.query?.id) {
            await Tutor.deleteOne({ _id: req.query?.id });
        }
        res.json(true);
    }
}
