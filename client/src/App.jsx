import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useContext, useEffect, useState } from 'react';
import { BrowserRouter, Link, Routes, Route, Outlet } from 'react-router-dom';
import dayjs from 'dayjs';
import API from './API.js';
import API_TEST from './API_TEST.js';
import PropTypes from 'prop-types';
import { CustomNavbar, NotFoundPage, userContext } from './components/Utils';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Button } from 'react-bootstrap';

import { ThesisList } from './components/ThesisList/ThesisList';
import { ThesisDetails } from './components/ThesisList/ThesisDetails.jsx';
import { Login } from './components/Login';
import { InsertProposalForm } from './components/InsertProposalForm.jsx';
import { ApplyForm } from './components/ApplyForm.jsx';
import { BrowseForm } from './components/browseApplication/BrowseForm.jsx';
import { ApplicationsStudent } from './components/browseApplication/ApplicationsStudent.jsx';
import { ApplicationsProfessor } from './components/browseApplication/ApplicationsProfessor.jsx';
import { UpdateProposal } from './components/UpdateProposal.jsx';
import { CopyProposal } from './components/CopyProposal.jsx';
import { InsertStudentProposal } from './components/startRequests/InsertStudentProposal.jsx';
import { STRlist } from './components/startRequests/STRlist.jsx';
import { STRManagement } from './components/startRequests/STRManagement.jsx';
import { ChangeRequest } from './components/startRequests/ChangeRequest.jsx';
import STRDetails from './components/startRequests/STRDetails/STRDetails.jsx';
import NotificationList from './components/notifications/NotificationList.jsx';


function App() {
  // DO NOT WRITE HERE, use Main instead
  return (
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  );
}

/**
 * The actual main app.
 * This is used instead of the default App component because Main can be encapsulated in
 * a BrowserRouter component, giving it the possibility of using the useNavigate hook.
 */
function Main() {
  /** SAMPLE CODE
    * newDoc = NewDocModel{ ... data ...}
    * API.insert_test(newDoc);
  */

  const [user, setUser] = useState({});
  const [date, setDate] = useState(null);

  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const userInfo = await API.getUser(currentUser.email)
          setUser(userInfo)
        } catch (err) {
          console.log("Not logged")
          console.log(err)
        }
      }
    });

    return () => unsubscribe()
  }, [auth]);


  useEffect(() => {
    if (date === null) {
      API.getVirtualDate().then((date) => {
        setDate(dayjs(date).format('YYYY-MM-DD'));
      }
      ).catch((err) => {
        console.error(err.error);
      });
    }
  }, [date]);

  const changeVirtualDate = (newDate) => {
    API.changeVirtualDate(newDate).then(() => {
      setDate(newDate);
    }).then(() => {
        API.notifyThesisExpiration(newDate)
    }).catch((err) => {
      console.error(err.error);
    });
  }

  const logout = () => {
    API.logOut()
    setUser({})
  }
  // const a = async () => {
  // const res = await API.getApplications(null);
  // if(res.status === 200){
  //   res.applications.forEach(e => console.log(e))
  // } else{
  //   console.log(res.error)
  // }
  // const res = await API.getApplicationDetails('nvt7M3McN9nXT5ZBZJtL');
  //   console.log(res)
  // }

  // useEffect(()=> {
  //   a()
  // })
  return (
    <userContext.Provider value={user}>
      {date === null ? null :
        <Routes>
          <Route path='/' element={<Header logoutCbk={logout} date={date} changeDateCbk={changeVirtualDate} />}>

            {user.email ? <Route path='' element={<Home date={date} />} /> :
              <Route path='' element={<Login />} />}
            {/** Add here other routes */}

            <Route path='/proposal' element={user.email ? (user.role === "teacher" ? <InsertProposalForm date={date} /> : (user.role == "student" ? <InsertStudentProposal date={date} /> : <NotFoundPage />)) : <Login />} />
            <Route path='/upproposal/:id' element={user.email ? (user.role === "teacher" ? <UpdateProposal date={date} /> : <NotFoundPage />) : <Login />} />
            <Route path='/cpproposal/:id' element={user.email ? (user.role === "teacher" ? <CopyProposal date={date} /> : <NotFoundPage />) : <Login />} />
            <Route path='/thesis/:id' element={user.email ? (user.role === "teacher" || user.role == "student" ? <ThesisDetails date={date} /> : <NotFoundPage />) : <Login />} />
            <Route path='/thesis/:id/apply' element={user.email ? (user.role === "student" ? <ApplyForm virtualDate={date} /> : <NotFoundPage />) : <Login />} />
            <Route path='/applications' element={user.email ? (user.role === "teacher" ? <ApplicationsProfessor /> : (user.role === "student" ? <ApplicationsStudent /> : <NotFoundPage />)) : <Login />} />
            <Route path='/applications/:id/:state' element={user.email ? (user.role === "teacher" ? <BrowseForm /> : <NotFoundPage />) : <Login />} />
            <Route path='/browse' element={user.email ? (user.role === "teacher" ? <BrowseForm /> : <NotFoundPage />) : <Login />} />
            <Route path='/archive' element={user.email ? (user.role === "teacher" ? <ThesisList date={date} archive={true} /> : <NotFoundPage />) : <Login />} />
            <Route path='/STRlist' element={user.email ? ((user.role === "teacher" || user.role == "secretary") ? <STRlist date={date} /> : <NotFoundPage />) : <Login />} />
            <Route path='/STRlist/:id' element={user.email ? (user.role === "secretary" ? <STRManagement /> : (user.role == "teacher" ? <STRDetails /> : <NotFoundPage/>)) : <Login />} />
            <Route path='/STRlist/:id/changeRequest' element={user.email ? (user.role === "teacher" ? <ChangeRequest /> : <NotFoundPage />) : <Login />} />
            <Route path='/notifications' element={<NotificationList/>}/>
          </Route>
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      }
    </userContext.Provider>
  );
}

/**
 * Header of the app, containing the navbar
 * 
 * @param props.logoutCbk callback to perform the user logout
 * @param props.date the setted date
 * @param props.changeDateCbk callback to change the date
 *  
 * @returns 
 */

function Header(props) {
  return <>
    <CustomNavbar logoutCbk={props.logoutCbk} date={props.date} changeDateCbk={props.changeDateCbk} />
    <Outlet />
  </>
}

Header.propTypes = {
  date: PropTypes.string.isRequired,
  logoutCbk: PropTypes.func.isRequired,
  changeDateCbk: PropTypes.func.isRequired
}

/**
 * Search bar 
 */

function Home(props) {
  const user = useContext(userContext);
  return (<>
    {
      user.role == "secretary" ?
        <STRlist date={props.date} />
        : <>
          <ThesisList date={props.date} />
          {
            <Button as={Link} to='proposal' className="floating-button orangeButton">
              New Proposal
            </Button>
          }
        </>
    }

  </>);

}

Home.propTypes = {
  date: PropTypes.string.isRequired
}

export default App
