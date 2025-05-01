import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import StudentDetail from "./pages/StudentDetails/StudentDetails";
import AddStudent from "./pages/StudentDetails/AddStudentDetails";
import AddBook from "./pages/Tables/AddBook";
import BookDetail from "./pages/Tables/BookDetails";
import EditBook from "./pages/Tables/EditBook";
import Membership from "./pages/Membership";
import Payment from "./pages/Payment";
import EditStudent from "./pages/StudentDetails/EditStudents";
import BookIssued from "./pages/Tables/LendedBook";
import LendedBooksForm from "./pages/Tables/LendedBooksForm";
import StudentIdCard from "./pages/StudentDetails/StudentIdCard";
import QrDetailsPage from "./pages/StudentDetails/QrDetailsPage";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Home />} />

            {/* Others Page */}
            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/blank" element={<Blank />} />

            {/* Forms */}
            <Route path="/form-elements" element={<FormElements />} />

            {/* Tables */}
            <Route path="/basic-tables" element={<BasicTables />} />
            <Route path="/add-book" element={<AddBook />} />
            <Route path="/books/:id" element={<BookDetail />} />
            <Route path="/edit-book/:id" element={<EditBook />} />
            <Route path="/lended-books-form" element={<LendedBooksForm />} />
            <Route path="/lended-books" element={<BookIssued />} />




            {/* Ui Elements */}
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />

            {/* Charts */}
            <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} />
            <Route path="/student/:id" element={<StudentDetail/>} />
            <Route path="/edit-student/:id" element={<EditStudent />} />
            <Route path="/add-student" element={<AddStudent/>} />
            <Route path="/membership/:id" element={<Membership />} />
            <Route path="/student-id-card/:id" element={<StudentIdCard />} />
            <Route path="/payment" element={<Payment />} />

          </Route>
          <Route path="/qr-details/:id" element={<QrDetailsPage />} />


          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          



          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
