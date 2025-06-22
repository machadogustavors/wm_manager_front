import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Router } from "@src/router/index";
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from "@src/contexts/AuthProvider";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false
    }
  }
})

function App() {

  return (
    <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Router />
          <ToastContainer />
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App;