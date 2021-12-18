import { useRouter } from 'next/router';
import React from 'react';
import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import Head from "next/head";

const NewMeetupPage = () => {
    const router = useRouter()

    async function addMeetupHandler(enteredData){

        const response = await fetch("/api/newMeetup", {
            method: 'POST',
            body : JSON.stringify(enteredData),
            headers: {"Content-type": "application/json"}
        });
        
        const data = await response.json();
        router.push("/")
    };

    return (
        <>
        <Head>
                <title>New Meetup</title>
                <meta
                    name = 'description'
                    content = "Add a new meetup."
                />
            </Head>

        <NewMeetupForm onAddMeetup={addMeetupHandler} />
        </>
    )
};


export default NewMeetupPage;
