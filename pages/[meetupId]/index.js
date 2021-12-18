import { MongoClient, ObjectId } from 'mongodb';
import React from 'react';
import MeetupDetail from "../../components/meetups/MeetupDetails";
import Head from "next/head"

const MeetupDetails = (props) => {
    return (
        <>
            <Head>
                    <title>{props.meetupData.title}</title>
                    <meta
                        name = 'description'
                        content = "Meetup Description"
                    />
                </Head>

            <MeetupDetail
                image = {props.meetupData.image}
                title = {props.meetupData.title}
                description = {props.meetupData.description}
                address = {props.meetupData.address}
            />
        </>
    )
}

export default MeetupDetails;


export async function getStaticPaths(){

    // Connect to mongoDb
    const client = await MongoClient.connect("mongodb+srv://admin:123@cluster0.ql3qe.mongodb.net/letsMeetup_DB?retryWrites=true&w=majority")
    const db = client.db();
    const meetupsCollection = db.collection("meetups");

    const meetups = await meetupsCollection.find({}, {_id: 1}).toArray();
    client.close();

    return {

        paths : meetups.map(meetup => ({
            params : { meetupId : meetup._id.toString() }
        })),
        fallback : false
    }
};


export async function getStaticProps(context) {

    const meetupId = context.params.meetupId;

    // Connect to mongoDb
    const client = await MongoClient.connect("mongodb+srv://admin:123@cluster0.ql3qe.mongodb.net/letsMeetup_DB?retryWrites=true&w=majority")
    const db = client.db();
    const meetupsCollection = db.collection("meetups");

    const selectedMeetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) });
    client.close();

    return {
        props : {
            meetupData : {
                id : selectedMeetup._id.toString(),
                image : selectedMeetup.image,
                title : selectedMeetup.title,
                description : selectedMeetup.description,
                address : selectedMeetup.address
            }
        }
    }
};
