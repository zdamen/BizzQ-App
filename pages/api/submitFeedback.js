// pages/api/submitFeedback.js
import { connectDb,getDb } from "@/components/mongo";

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).send();
    }

    await connectDb();

    const db = getDb();
    const collection = db.collection('feedback');

    const feedbackData = req.body;

    try {
        const result = await collection.insertOne(feedbackData);
        res.status(200).json({ message: 'Feedback submitted!' });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while submitting feedback.' });
    }
}
