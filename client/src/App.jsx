import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, Link, Routes, Route, Outlet, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

// import { API } from './API';

import { CustomNavbar, NotFoundPage, userContext } from './components/Utils';
import { ThesisList } from './components/ThesisList/ThesisList';
import { Login } from './components/Login';

function App() {
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
  const [user, setUser] = useState({});
  const [date, setDate] = useState(dayjs().format('YYYY-MM-DD'));

  // useEffect(() => {
  //   API.getDate().then((date) => {
  //     setDate(date);
  //   }
  //   ).catch((err) => {
  //     console.error(err.error);
  //   });
  // }, [date]);

  const changeDate = (newDate) => {
    // API.changeDate(newDate).then(() => {
    //   setDate(newDate);
    // }).catch((err) => {
    //   console.error(err.error);
    // }
    // );
  }

  const logout = () => {
    // TODO implement logout
  }

  return (
    <userContext.Provider value={user}>
      <Routes>
        <Route path='/' element={<Header logoutCbk={logout} changeDateCbk={changeDate} />}>

          {user.email ? <Route path='' element={<Home />} /> :
            <Route path='' element={<Login />} />}  {/** TODO change to Login after Login component implemented  */}
          
          <Route path='/thesis' element={<ThesisList />} />

        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </userContext.Provider>
  );
}

/**
 * Header of the app, containing the navbar
 * 
 * @param props.logoutCbk callback to perform the user logout
 * @param props.changeDateCbk callback to change the date
 *  
 * @returns 
 */

function Header(props) {
  return <>
    <CustomNavbar logoutCbk={props.logoutCbk} changeDate={props.changeDateCbk} />
    <Outlet />
  </>
}

/**
 * Home page
 */

function Home() {
  
}

export default App
