import "../pagesCSSfiles/marketAnalysis.css";
import NavBar from "../components/navBar";
import { useParams } from "react-router-dom";
import SingleMarket from "../components/singleMarket";
import { useLocation } from "react-router-dom";

function MarketAnalysis() {
  const { id } = useParams();
  const location = useLocation();
  const { title, sub_title } = location.state || {};

  return (
    <>
      <NavBar />
      <div className="MarketAnalysis">
        <h1> Analytics for:</h1>
        <div id="displayMarket">
          <SingleMarket title={title ?? id} sub_title={sub_title ?? ""} />
        </div>
      </div>
    </>
  );
}
export default MarketAnalysis;
