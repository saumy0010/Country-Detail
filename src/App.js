import {Box} from "@mui/material";
import NavBar from "./components/appBar/NavBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {CountryDetails} from "./components/container/CountryDetails";
import CountryList from "./components/container/CountryList";

function App() {



  return (
    <Box>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/country/:code" element={<CountryDetails />} />
          <Route path="/" element={<CountryList />} />
        </Routes>

      </Router>


    </Box>
  );
}

export default App;
