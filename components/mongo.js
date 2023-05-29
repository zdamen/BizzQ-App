const { MongoClient } = require("mongodb");

const uri = process.env.NEXT_PUBLIC_MONGODB_URI;

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

let db;

const connectDb = async () => {
    if (db) {
        return;
    }
    await client.connect();
    db = client.db(process.env.NEXT_PUBLIC_DATABASE_NAME);
};

const getDb = () => {
    return db;
};

module.exports = { connectDb, getDb };
