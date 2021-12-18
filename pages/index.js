import React from 'react';
import Head from "next/head";
import MeetupList from "../components/meetups/MeetupList";
import Layout from "../components/layout/Layout";
import { MongoClient } from 'mongodb';



const HomePage = (props) => {
    return (
            <>
            <Head>
                <title>Let's Meetup</title>
                <meta
                    name = 'description'
                    content = "Add and Browse huge list of meetups anytime,anywere."
                />
            </Head>
            
            < MeetupList meetups = { props.meetups }/>
            </>
    )
};

export default HomePage;


export async function getStaticProps(){

    // Connect to mongoDb
    const client = await MongoClient.connect("mongodb+srv://admin:123@cluster0.ql3qe.mongodb.net/letsMeetup_DB?retryWrites=true&w=majority")
    const db = client.db();
    const meetupsCollection = db.collection("meetups");

    const meetups = await meetupsCollection.find().toArray();
    client.close();

    return {
        props : {
            meetups : meetups.map(meetup =>({
                id : meetup._id.toString(),
                title: meetup.title,
                address: meetup.address,
                description: meetup.description,
                image: meetup.image
            }))
        },
        revalidate : 1
    }
};


// export async function getServerSideProps(context) {
//     const req = context.req;
//     const res = context.res;

//     return {
//         props : {
//             meetups : DUMMY_MEETUPS
//         }
//     }
// };
