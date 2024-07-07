
import { BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Home from "./components/HomePage";
import { MainPage } from "./components/MainPage";
const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mainpage" element={<MainPage/>}/>
      </Routes>
    </Router>
  );
};

export default App


