import { MongoClient } from "mongodb";
import Head from "next/head";

import MeetupList from "../components/meetups/MeetupList";

const DUMMY_MEETUPS = [
  {
    id: "m1",
    title: "Sydney Opera House and the Harbour Bridge",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Sydney_Opera_House_and_Harbour_Bridge_Dusk_%282%29_2019-06-21.jpg/2560px-Sydney_Opera_House_and_Harbour_Bridge_Dusk_%282%29_2019-06-21.jpg",
    address: "1 George St, Sydney 2000",
    description: "This is Sydney",
  },
  {
    id: "m2",
    title: "The skyline of Melbourne",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/9/91/Melbourne_as_viewed_from_the_Shrine%2C_January_2019.png",
    address: "1 George St, Melbourne 2000",
    description: "This is Melbourne",
  },
];

const HomePage = (props) => {
  return (
    <div>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="It is all about react meetups!" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </div>
  );
};

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   return {
//     props: {
//       meetups: DUMMY_MEETUPS,
//     },
//   };
// }

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://Keith-Next:MiMNk0yG6uCkRbn2@keithcluster.qhg7v.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  const db = client.db();

  const meetupCollection = db.collection("meetups");

  const meetups = await meetupCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        description: meetup.description,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 1,
  };
}

export default HomePage;
