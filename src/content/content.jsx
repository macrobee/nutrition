
import SummaryContainer from "../components/summary/summary";
import LogsContainer from "../components/logs/logscontainer";

import "./content.styles.css";

const Content = () => {
  return (
    <div className="main-content">
      <LogsContainer />
      <SummaryContainer />
    </div>
  );
};
export default Content;
