import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, Link, Routes, Route, Outlet, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import API from './API.js';
import API_TEST from './API_TEST.js';
import { CustomNavbar, NotFoundPage, userContext } from './components/Utils';
import { ThesisList } from './components/ThesisList/ThesisList';
import { ThesisDetails } from './components/ThesisList/ThesisDetails.jsx';
import { Login } from './components/Login';
import { InsertProposalForm } from './components/InsertProposalForm.jsx';

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
    }).catch((err) => {
      console.error(err.error);
    }
    );
  }

  const logout = () => {
    // TODO implement logout
  }

  return (
    <userContext.Provider value={user}>
      {date === null ? null :
        <Routes>
          <Route path='/' element={<Header logoutCbk={logout} date={date} changeDateCbk={changeVirtualDate} />}>

            {user.email ? <Route path='' element={<Home />} /> :
              <Route path='' element={<Login />} />}
            {/** Add here other routes */}
            <Route path='/proposal' element={<InsertProposalForm />} />
            <Route path='/thesis' element={<ThesisList />} />
            <Route path='/thesis/:id' element={<ThesisDetails />} />

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

/**
 * Home page
 */

function Home() {

}

export default App
