const assert = require('assert');
const MongoClient = require('mongodb').MongoClient;
var db = null;

describe('MongoDB', () => {
    describe('#Testing MongoDB basic functions', () => {
        it('Performing connection test', async () =>  {
            try {
                let client = await MongoClient.connect("mongodb://localhost:27017/test", { useNewUrlParser: true });
                db = await client.db('test');
            } catch (e) {
                assert.equal(null, e.message);
            } finally {
                assert.equal(false, false);
            }

        });

        it('Attempting to insert records.', () => {
            db.collection('documents').insertMany([{a : 1}, {a : 2}, {a : 3}], (err, result) => {
                assert.equal(err, null);
                assert.equal(3, result.result.n);
                assert.equal(3, result.ops.length);
            });
        });

        it('Add a query that returns all the documents.', () => {
            db.collection('documents').find({}).toArray((err, docs) => {
                assert.equal(err, null);
            });
        });

        it('Find Documents with a Query Filter.', () => {
            db.collection('documents').find({'a': 3}).toArray((err, docs) => {
                assert.equal(err, null);
            });
        });

        it('The following operation updates a document in the documents collection.', () => {
            db.collection('documents').updateOne({ a : 2 }, { $set: { b : 1 } }, (err, result) => {
                assert.equal(err, null);
            });
        });

        it('Remove the document where the field a is equal to 3.', () => {
            db.collection('documents').deleteOne({ a : 3 }, (err, result) => {
                assert.equal(err, null);
                assert.equal(1, result.result.n);
            });
        });

        it('Remove all documents', (done) => {
            db.collection('documents').deleteMany({}, (err, result) => {
                assert.equal(err, null);
            });

            done();
        });
    });
});
