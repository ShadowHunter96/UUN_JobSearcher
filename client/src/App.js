
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './layout/Navbar';
import Home from './pages/Home.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AddUser from './users/AddUser.js';
import EditUser from './users/EditUser.js';
import ViewUser from './users/ViewUser.js';
import AddTechJob from './jobs/AddTechJob.js';
import ViewTechJob from './jobs/ViewTechJob.js'
import AddApplicant from './applicants/AddApplicant.js';
import ApplicantList from './applicants/ApplicantList.js';
import ViewApplicant from './applicants/ViewApplicant.js';
import EditApplicant from './applicants/EditApplicant.js';
import SuccessPage from './components/SuccessPage.js';
import ApplyTechJob from './jobs/ApplyTechJob.js';
import JobListAdmin from './jobs/JobListAdmin.js';
import EditTechJob from './jobs/EditTechJob.js';
import EditTechJobEmployer from './jobs/EditTechJobEmployer.js';
import JobList from "./jobs/JobList.js"


function App() {
  return (
    <div className="App">
      <Router>
      <Navbar/>
      <Routes>
        <Route exact path="/" element={<Home/>}></Route>
        <Route exact path="/adduser" element={<AddUser/>}></Route>
        <Route exact path="/edituser/:id" element={<EditUser/>}></Route>
        <Route exact path="/viewuser/:id" element={<ViewUser/>}></Route>
        <Route exact path="/addtechjob" element={<AddTechJob/>}></Route>
        <Route exact path="/edittechjob/:id" element={<EditTechJob/>}></Route>
        <Route exact path="/job/:id" element={<ViewTechJob/>}></Route>
        <Route exact path="/addapplicant" element={<AddApplicant/>}></Route>
        <Route exact path="/applicant-list" element={<ApplicantList/>}></Route>
        <Route exact path="/viewapplicant/:id" element={<ViewApplicant/>}></Route>
        <Route exact path="/editapplicant/:id" element={<EditApplicant/>}></Route>
        <Route exact path="/applytechjob/:jobId" element={<ApplyTechJob/>}></Route>
        <Route exact path="/successpage" element={<SuccessPage/>}></Route>
        <Route exact path="/joblistadmin" element={<JobListAdmin/>}></Route>
        <Route exact path="/joblist" element={<JobList/>}></Route>
        <Route exact path="/edittechjobemployer/:id" element={<EditTechJobEmployer/>}></Route>

      </Routes>


      

      </Router>
      
    </div>
  );
}

export default App;
