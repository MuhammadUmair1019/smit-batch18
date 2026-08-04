import ReactHooks from "./Topics/ReactHooks";
import { Route, BrowserRouter as Router, Routes } from "react-router"
import UserDetail from "./Topics/UserDetail";
import CrudExample from "./components/CrudExample";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ReactHooks />} />
        <Route path="/:id" element={<UserDetail />} />
        <Route path="/fake-server" element={<CrudExample />} />
      </Routes>
    </Router>
  )
}

export default App;