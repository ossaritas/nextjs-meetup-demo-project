import { MongoClient } from "mongodb";
import { Fragment } from "react";
import Head from "next/head";

import MeetupList from "../components/meetups/MeetupList";

const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="Amazing React Meetups" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
};

// export const getServerSideProps = (context) => {
//   const res = context.res;
//   const req = context.req;

//   //fetching data
//   return {
//     props: {
//       meetups: DUMMY_MEETUP,
//     },
//   };
// };

export const getStaticProps = async () => {
  //fetch or whatever

  const client = await MongoClient.connect(
    "mongodb+srv://nextjsuser:cy1jubhDu5wzxlFr@cluster0.yeatg.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
};

export default HomePage;
