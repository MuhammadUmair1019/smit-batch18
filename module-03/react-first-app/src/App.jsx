import ReactHooks from "./Topics/ReactHooks";
import { Route, BrowserRouter as Router, Routes } from "react-router"
import UserDetail from "./Topics/UserDetail";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<ReactHooks />} />
        <Route path="/:id" element={<UserDetail />} />
      </Routes>
    </Router>
  )
}

export default App;