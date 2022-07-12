import { getFilteredEvents } from "../../dummy-data";
import { useRouter } from "next/router";
import EventList from "../../components/events/event-list";
import { Fragment, useState, useEffect } from "react";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/user-interface/button";
import ErrorAlert from "../../components/user-interface/error-alert";
import { getFeaturedEvents } from "../../helpers/api-utils";
import useSWR from "swr";
import Head from "next/head";

export default function FilteredEvents(props) {
  const [loadedEvents, setEvents] = useState();
  const router = useRouter();
  const filterData = router.query.slug;
  console.log(`router.query: ${router.query}`);

  console.log(filterData);
  const { data, error } = useSWR(
    "https://udemyevents-default-rtdb.firebaseio.com/events.json",
    (url) => {
      console.log(url);
      fetch(url).then((res) => res.json());
    }
  );

  const { daty,erry } = useSWR(
    'https://udemyevents-default-rtdb.firebaseio.com/events.json', 
    (apiURL) => fetch(apiURL).then(res => res.json()))
  console.log(data);
  console.log(daty);
  console.log(erry);
const getData = async () => { 
  const response = await fetch(
    "https://udemyevents-default-rtdb.firebaseio.com/events.json"
  );
  if (response) {
    console.log("**** **** **** **** **** **** response**** **** **** **** **** ");
  console.log("response");
  console.log(response);
  // console.log(data);
  // const data = response.json();
  return response
  }
 }
getData()
 console.log(getData());

  useEffect(() => {
    if (data) {
      const events = [];

      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }
      setEvents(events);
      console.log("loaded-this-Events");
      console.log(loadedEvents);
    }

    return () => {};
  }, [data]);

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];
  // Transform String to Number
  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  let pageHeadData = (
    <Head>
      <title>Filtered | Events</title>
      <meta
        name="description"
        content={`Al list if events.`}
      />
    </Head>
  );
  if (!loadedEvents) {
    return (
      <Fragment>
        {pageHeadData}
        <p className="center">Loading.....</p>
      </Fragment>
    );
  }

  // Header function
  pageHeadData = (
    <Head>
      <title>Filtered | Events</title>
      <meta
        name="description"
        content={`All events for ${numMonth}/${numYear}}.`}
      />
    </Head>
  );

  // check if not a string
  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear < 2021 ||
    numYear > 2030 ||
    numMonth < 1 ||
    numMonth > 12|| error
  ) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>Invalid.Please adjust your values</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show all events</Button>
        </div>
      </Fragment>
    );
  }

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>No events found for the chosen filter</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show all events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(numYear, numMonth - 1);
  return (
    <Fragment>
      {/* {pageHeadData} */}
      <h1>Some Filtered Events</h1>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}

// !optional
// export async function getServerSideProps(context) {
//   const { params } = context;

//   const filterData = params.slug;

//   const filteredYear = filterData[0];
//   const filteredMonth = filterData[1];
//   console.log(`filterData: ${filterData}`);

//   // Transform String to Number
//   const numYear = +filteredYear;
//   const numMonth = +filteredMonth;

//   // check if not a string
//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear < 2021 ||
//     numYear > 2030 ||
//     numMonth < 1 ||
//     numMonth > 12
//   ) {
//     return { props: { hasError: true } };
//   }

//   const filteredEvents = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   });
//   console.log("filteredEvents");
//   console.log(filteredEvents);
//   return {
//     props: {
//       filtered: filteredEvents,
//       date: { year: numYear, month: numMonth },
//     },
//   };
// }
