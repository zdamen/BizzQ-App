// pages/api/getFeedback.js
import { connectDb, getDb } from "@/components/mongo";

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).send();
    }

    await connectDb();

    const db = getDb();
    const collection = db.collection('feedback');

    try {
        const feedback = await collection.find().sort({_id: -1}).limit(1).toArray();
        res.status(200).json(feedback[0]);  // send the last feedback
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while retrieving feedback.' });
    }
}
