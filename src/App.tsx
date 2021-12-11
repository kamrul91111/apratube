import "./App.css";

// components
import Topbar from "./components/Topbar/Topbar";

// pages
import Home from "./Pages/Home/Home";

const App = () => {
  return (
    <div className="App">
      <Topbar />
      <Home />
    </div>
  );
};

export default App;
