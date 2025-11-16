import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "../pagesCSSfiles/EventPage.css";
import NavBar from "../components/navBar";

function EventPage() {
  const location = useLocation();
  const passedData = location.state?.searchData || {}; // passes query
  const query = passedData.query; // uses query field of searchData

  const [events, setEvents] = useState([]); // store fetched events
  const [loading, setLoading] = useState(false); // loading state
  const [error, setError] = useState(null); // error state

  useEffect(() => {
    if (!query) return; // exit early if no query

    const fetchEvents = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `http://127.0.0.1:8000/kalshi/events/search_title?keyword=${query}`
        );
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setEvents(data.events || []);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch search results ");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [query]);

  return (
    <div className="EventPage">
      <NavBar />
      <div className="Markets">
        <h1 style={{ margin: "20px", fontSize: "2.5rem" }}>
          <b>Markets for: </b> "{query}"
        </h1>

        {loading && <p>Loading events...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {!loading && !error && events.length === 0 && (
          <p>No events found for this search.</p>
        )}

        {!loading && !error && events.length > 0 && (
          <ul>
            {events.map((event, index) => (
              <li key={index}>
                <b>{event.title}</b> - {event.sub_title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default EventPage;
