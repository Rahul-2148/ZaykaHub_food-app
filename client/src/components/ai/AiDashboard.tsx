// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AiSettings from "./AiSettings";
import AiProfile from "./AiProfile";
import AiAnalytics from "./AiAnalytics";
import AiHistory from "./ChatHistory";

function App() {
  return (
    // <Router>
    //   <Routes>
    //     <Route path="/ai-settings" element={<AiSettings />} />
    //     <Route path="/ai-profile" element={<AiProfile />} />
    //     <Route path="/ai-analytics" element={<AiAnalytics />} />
    //     <Route path="/ai-history" element={<AiHistory />} />
    //   </Routes>
    // </Router>
    <>
    <AiProfile />
    <AiSettings />
    <AiHistory />
    <AiAnalytics />
    </>
  );
}

export default App;
