const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;

console.log('🔍 MongoDB Diagnostic Tool\n');
console.log('Connection URI:', MONGO_URI);
console.log('Database name from URI:', MONGO_URI.split('/').pop().split('?')[0]);
console.log('\n---\n');

mongoose.connect(MONGO_URI)
    .then(async () => {
        console.log('✅ Connected to MongoDB\n');

        const db = mongoose.connection.db;
        const dbName = db.databaseName;

        console.log('📊 Current Database:', dbName);
        console.log('\n---\n');

        // List all collections
        const collections = await db.listCollections().toArray();
        console.log('📁 Collections in this database:');
        collections.forEach(col => {
            console.log(`  - ${col.name}`);
        });
        console.log('\n---\n');

        // Check sellbikes collection
        const sellbikesExists = collections.find(c => c.name === 'sellbikes');

        if (sellbikesExists) {
            console.log('✅ "sellbikes" collection EXISTS');

            // Count documents
            const count = await db.collection('sellbikes').countDocuments();
            console.log(`📝 Document count: ${count}`);

            if (count > 0) {
                console.log('\n📄 Sample documents:');
                const docs = await db.collection('sellbikes').find({}).limit(3).toArray();
                docs.forEach((doc, i) => {
                    console.log(`\nDocument ${i + 1}:`);
                    console.log(`  _id: ${doc._id}`);
                    console.log(`  bikeName: ${doc.bikeName}`);
                    console.log(`  brand: ${doc.brand}`);
                    console.log(`  status: ${doc.status}`);
                });
            }
        } else {
            console.log('❌ "sellbikes" collection NOT FOUND in this database!');
            console.log('\n💡 Your data might be in a different database.');
            console.log('   Check MongoDB Atlas to see which database contains your sellbikes collection.');
        }

        mongoose.connection.close();
        console.log('\n✅ Diagnostic complete!');
    })
    .catch(err => {
        console.error('❌ Connection error:', err.message);
        process.exit(1);
    });
