import ReactHooks from "./Topics/ReactHooks";
import { Route, BrowserRouter as Router, Routes } from "react-router"
import UserDetail from "./Topics/UserDetail";
import CrudExample from "./components/CrudExample";

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import User from "./components/User";

const queryClient = new QueryClient()


function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<ReactHooks />} />
          <Route path="/:id" element={<UserDetail />} />
          <Route path="/fake-server" element={<CrudExample />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>

  )
}

export default App;