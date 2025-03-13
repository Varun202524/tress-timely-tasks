
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppointmentProvider } from "@/context/AppointmentContext";
import { AuthProvider } from "@/context/AuthContext";
import Index from "./pages/Index";
import Services from "./pages/Services";
import Stylists from "./pages/Stylists";
import Appointments from "./pages/Appointments";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import DashboardLayout from "./components/dashboard/DashboardLayout";
import DashboardOverview from "./components/dashboard/DashboardOverview";
import ManageUsers from "./components/dashboard/employee/ManageUsers";
import ManageStylists from "./components/dashboard/employee/ManageStylists";
import ManageAppointments from "./components/dashboard/shared/ManageAppointments";
import StylistSchedule from "./components/dashboard/stylist/StylistSchedule";
import StylistProfile from "./components/dashboard/stylist/StylistProfile";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BrowserRouter>
        <AuthProvider>
          <AppointmentProvider>
            <Toaster />
            <Sonner />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/services" element={<Services />} />
              <Route path="/stylists" element={<Stylists />} />
              <Route path="/appointments" element={<Appointments />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/auth" element={<Auth />} />
              
              {/* Employee Dashboard */}
              <Route path="/dashboard/employee" element={<DashboardLayout role="employee" />}>
                <Route index element={<DashboardOverview role="employee" />} />
                <Route path="users" element={<ManageUsers />} />
                <Route path="stylists" element={<ManageStylists />} />
                <Route path="appointments" element={<ManageAppointments role="employee" />} />
              </Route>
              
              {/* Stylist Dashboard */}
              <Route path="/dashboard/stylist" element={<DashboardLayout role="stylist" />}>
                <Route index element={<DashboardOverview role="stylist" />} />
                <Route path="appointments" element={<ManageAppointments role="stylist" />} />
                <Route path="schedule" element={<StylistSchedule />} />
                <Route path="profile" element={<StylistProfile />} />
              </Route>
              
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AppointmentProvider>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
