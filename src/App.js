import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/admin-dashboard/sidebar";
import ViewProducts from "./components/shopping-page/view-products";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/admin-dashboard" element={<Sidebar />} />
          <Route path="/" element={<ViewProducts />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
