import './App.css';
import { Home } from './Pages/Home Page/Home';
import {Route,Routes} from "react-router-dom";
import { SearchPage } from './Pages/Search Page/SearchPage';
import { Checkout } from './Pages/CheckoutPage/Checkout';
import { Payment } from './Pages/PaymentPage/Payment';
import { NavBar } from './Components/NavBar/NavBar';

function App() {
  return (
    <div style={{backgroundImage:"url(https://img.freepik.com/free-vector/time-travel-cartoon-landing-page-passenger-airplane-flying-sky-buy-ticket-online-concept-with-plane-flight-booking-service-airline-traveling-journey-vacation-holidays-vector-web-banner_107791-9220.jpg?w=2000)",height:"100%",width:"100vw"}}>
    <NavBar/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/search' element={<SearchPage/>}/>
      <Route path='/checkout/:id/:from/:to/:no_of_passengers'element={<Checkout/>}/>
      <Route  path='/payment' element={<Payment/>}/>
    </Routes>
    </div>
    
    
  );
}

export default App;
