import Head from "next/head";
import { getFeaturedEvents } from "../helpers/api-utils";
import EventList from "../components/events/event-list";
import { getDatabase,   child,get, ref, onValue} from "firebase/database";
import {database, appCheck} from '../firebase'
import useSWR from 'swr'
import { useEffect, useState } from "react";
// import { getFeaturedEvents } from "../dummy-data";

function HomePage(params) {
const [events, setEvents] = useState({})

// useEffect(() => {
// console.log('db');

// onValue(ref(database), (snapshot) => { 
//   const data = snapshot.val();
//   let atet = snapshot.forEach( item => 
//     {console.log(item)
//       console.log(item.val());
//     }
//     )
//   console.log(atet);
//   // console.log(snapshot.val());
//   // console.log(data.events);
//   // setEvents(data.events)
//   // setEvents(current => [...current, data.events]);

//  })
//  console.log(events);
//   return () => {
//   }
  
// }, [])

  // useSWR-Hook
  // useSWR(<request-url>, (url) => fetch(url).then(res => res.json()))
  // const { daty, error } = useSWR(
  //   "https://udemyevents-default-rtdb.firebaseio.com/events.json",
  //   (url) => {
  //     console.log(url);
  //     fetch(url).then((res) => res.json());
  //   }
  // );
  
  
  return (
    <div>
      <Head>
        <title>NextJs | Events</title>
        <meta
          name="description"
          content="Find a lot of events you will be interested."
        />
      </Head>
      <EventList items={params.events} />
    </div>
  );
}

export async function getStaticProps() {
  // console.log(proper);
  const featuredEvents = await getFeaturedEvents();
  console.log("featured-Events");
  console.log(featuredEvents);
try {
  console.log('in ehere...');
  // let runThis = () => {
  //   onValue(ref(database), (snapshot) => { 
  //     const datta = snapshot.val();
  //     console.log('data:');
  //     console.log(datta);
  //    })
  // }
  // runThis()
} catch (error) {
  
}
  return { props: { events: featuredEvents }, revalidate: 1800 };
}
export default HomePage;
