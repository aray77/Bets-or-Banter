import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EventPage from "./pages/EventPage";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/markets" element={<EventPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;