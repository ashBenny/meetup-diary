// POST : api/newMeetup

import { MongoClient } from "mongodb";


export default async function newMeetupHandler (req,res) {

    
    if(req.method === 'POST') {
        const data = req.body;

        try {

        const client = await MongoClient.connect("mongodb+srv://admin:123@cluster0.ql3qe.mongodb.net/letsMeetup_DB?retryWrites=true&w=majority")

        const db = client.db();

        const meetupsCollection = db.collection("meetups");

        const result = await meetupsCollection.insertOne(data);

        console.log(result);

        client.close();

        res.status(201).json({message : "Meetup has been Added"})
            
        } catch (error) {
            console.log(error);
            res.status(500).json({message : "Error while adding!!"})
        }

    };
};