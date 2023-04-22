import { MongoClient, BSON } from 'mongodb';
import mongoose, { Schema, model, models, connect } from 'mongoose';
import Author from '@/interfaces/author';
const uri = process.env.MONGO_INSTANCE as string;

export async function databaseConnect() {
	// const client = await MongoClient.connect(uri);
	const client = await mongoose.connect(uri);
	return client;
}

export async function getAllDocuments(client, database, collection, sort) {
	const db = client.db(database);
	const documents = await db
		.collection(collection)
		.find()
		.sort(sort)
		.toArray();
	return documents;
}

export async function getDocumentById(
	client,
	database,
	collection,
	documentId
) {
	const db = client.db(database);
	const document = await db
		.collection(collection)
		.find({ _id: new BSON.ObjectId(documentId) });
	return document;
}

export async function insertDocument(client, database, collection, data) {
	const db = client.db(database);
	const res = await db.collection(collection).insertOne(data);
	return res;
}
