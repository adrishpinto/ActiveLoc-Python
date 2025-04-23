import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MachineTranslate from "./pages/MachineTranslate";
import PostEditTranslate from "./pages/PostEditTranslate";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Speech2Text from "./pages/Speech2Text";
import VoiceIsolator from "./pages/VoiceIsolator";
import FileList from "./pages/FileList";
import Text2Speech from "./pages/Text2Speech";
import Text2SpeechBatch from "./pages/Text2SpeechBatch";
import LanguageDropdown from "./components/LanguageDropdownT2S";
import MergeMTPE from "./pages/MergeMTPE";
import Workbench from "./pages/Workbench";
import Test from "./pages/Test";
import UserProfile from "./pages/UserProfile";
import ResetPassword from "./pages/ResetPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./Layout";
import ProtectedRoute from "./ProtectedRoute";
import CustomerDashboard from "./groups/customer/pages/CustomerDashboard";
import AddCustomer from "./groups/sales/pages/AddCustomer";
import CustomerTable from "./groups/sales/pages/CustomerTable";
import VendorTable from "./groups/operations/pages/VendorTable";
import AddVendor from "./groups/operations/pages/AddVendor";
import UserTable from "./groups/admin/pages/UserTable";
import AddUser from "./groups/admin/pages/AddUser";
import MachineTranslate_V2 from "./pages/MachineTranslate_V2";
import VendorDashboard from "./groups/vendor/pages/VendorDashboard";
import Glossary from "./pages/Glossary";
import RequirementsForm from "./groups/customer/pages/RequirementsForm";
import RequirementsList from "./groups/sales/pages/RequirementsList";
import Quotation from "./pages/QuotationForm";
import QuotationTable from "./pages/QuotationTable";

const internalGroups = ["Admin", "Sales", "Operations"];

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Protected routes under layout */}
        <Route element={<Layout />}>
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute allowedGroups={internalGroups}>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/machine-translate"
            element={
              <ProtectedRoute allowedGroups={internalGroups}>
                <MachineTranslate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/machine-translate_v2"
            element={
              <ProtectedRoute allowedGroups={internalGroups}>
                <MachineTranslate_V2 />
              </ProtectedRoute>
            }
          />
          <Route
            path="/postedit-translate"
            element={
              <ProtectedRoute allowedGroups={internalGroups}>
                <PostEditTranslate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/speechtotext"
            element={
              <ProtectedRoute allowedGroups={internalGroups}>
                <Speech2Text />
              </ProtectedRoute>
            }
          />
          <Route
            path="/voice-isolator"
            element={
              <ProtectedRoute allowedGroups={internalGroups}>
                <VoiceIsolator />
              </ProtectedRoute>
            }
          />
          <Route
            path="/file-list"
            element={
              <ProtectedRoute allowedGroups={internalGroups}>
                <FileList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/texttospeech"
            element={
              <ProtectedRoute allowedGroups={internalGroups}>
                <Text2Speech />
              </ProtectedRoute>
            }
          />
          <Route
            path="/texttospeechbatch"
            element={
              <ProtectedRoute allowedGroups={internalGroups}>
                <Text2SpeechBatch />
              </ProtectedRoute>
            }
          />
          <Route
            path="/t"
            element={
              <ProtectedRoute allowedGroups={internalGroups}>
                <LanguageDropdown />
              </ProtectedRoute>
            }
          />
          <Route
            path="/merge-mtpe"
            element={
              <ProtectedRoute allowedGroups={internalGroups}>
                <MergeMTPE />
              </ProtectedRoute>
            }
          />
          <Route
            path="/workbench"
            element={
              <ProtectedRoute allowedGroups={internalGroups}>
                <Workbench />
              </ProtectedRoute>
            }
          />
          <Route
            path="/test"
            element={
              <ProtectedRoute allowedGroups={internalGroups}>
                <Test />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user-profile"
            element={
              <ProtectedRoute allowedGroups={[...internalGroups, "Customer"]}>
                <UserProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add-glossary"
            element={
              <ProtectedRoute allowedGroups={[...internalGroups]}>
                <Glossary />
              </ProtectedRoute>
            }
          />

          <Route
            path="/quotation/:id"
            element={
              <ProtectedRoute allowedGroups={[...internalGroups]}>
                <Quotation />
              </ProtectedRoute>
            }
          />

          <Route
            path="/quotation-table"
            element={
              <ProtectedRoute allowedGroups={[...internalGroups]}>
                <QuotationTable />
              </ProtectedRoute>
            }
          />

          {/* SALES SPECIFIC ROUTES */}
          <Route
            path="/add-customer"
            element={
              <ProtectedRoute allowedGroups={["Sales", "Admin", "Operations"]}>
                <AddCustomer />
              </ProtectedRoute>
            }
          />

          <Route
            path="/customer-table"
            element={
              <ProtectedRoute allowedGroups={["Sales", "Admin", "Operations"]}>
                <CustomerTable />
              </ProtectedRoute>
            }
          />

          <Route
            path="/requirements-list"
            element={
              <ProtectedRoute allowedGroups={["Sales", "Admin", "Operations"]}>
                <RequirementsList />
              </ProtectedRoute>
            }
          />

          {/* Operation Routes */}
          <Route
            path="/vendor-table"
            element={
              <ProtectedRoute allowedGroups={internalGroups}>
                <VendorTable />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add-vendor"
            element={
              <ProtectedRoute allowedGroups={internalGroups}>
                <AddVendor />
              </ProtectedRoute>
            }
          />

          {/* Admin Specific user */}
          <Route
            path="/user-table"
            element={
              <ProtectedRoute allowedGroups={["Admin"]}>
                <UserTable />
              </ProtectedRoute>
            }
          />

          <Route
            path="/add-user"
            element={
              <ProtectedRoute allowedGroups={["Admin"]}>
                <AddUser />
              </ProtectedRoute>
            }
          />
          {/* Customer specific routes */}
          <Route
            path="/dashboard-c"
            element={
              <ProtectedRoute allowedGroups={["Admin", "Customer"]}>
                <CustomerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/requirements-form"
            element={
              <ProtectedRoute allowedGroups={["Admin", "Customer"]}>
                <RequirementsForm />
              </ProtectedRoute>
            }
          />

          {/* Vendor specific routes */}
          <Route
            path="/dashboard-v"
            element={
              <ProtectedRoute allowedGroups={["Vendor", "Admin"]}>
                <VendorDashboard />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
    </Router>
  );
}
