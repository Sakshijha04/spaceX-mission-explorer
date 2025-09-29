import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import MainContent from "./components/MainContent";
import MissionDetail from "./components/MissionDetails";

function App() {
  return (
    
      <Routes>
        {/* Home page with Header */}
        <Route
          path="/"
          element={
            <>
              <Header />
              <MainContent />
            </>
          }
        />

        {/* Mission detail page WITHOUT header */}
        <Route path="/missions/:id" element={<MissionDetail />} />
      </Routes>
   
  );
}

export default App;
