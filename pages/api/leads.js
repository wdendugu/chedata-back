import { mongooseConnect } from '@/lib/mongoose';
import { Student } from '@/models/Student';

export default async function handler(req, res) {
    await mongooseConnect();
    const { method } = req;

    if (method === 'GET') {
        res.json(await Student.find());
    }
}
