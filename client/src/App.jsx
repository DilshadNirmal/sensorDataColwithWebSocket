import { Route, Routes } from "react-router-dom";
import SensorDashboard from "./components/SensorDashboard";
import ChartArea from "./components/ChartArea";

function App() {
  return (
    <Routes>
        <Route path="/" element={<SensorDashboard />} />
        <Route path="/graph-data" element={<ChartArea />} />
    </Routes>
  );
}

export default App;
