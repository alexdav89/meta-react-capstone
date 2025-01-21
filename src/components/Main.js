import React, { useReducer, useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Booking from "./Booking";
import ConfirmedBooking from "./ConfirmedBooking";
import Header from "./Header";


const Main = () => {

    const seededRandom = function (seed) {
        const modulus = 2 ** 35 - 31;
        const multiplier = 185852;
        let state = seed % modulus;
      
        return function () {
          state = (state * multiplier) % modulus;
          return state / modulus;
        };
      };
      
      const fetchAPI = function (date) {
        if (!(date instanceof Date)) {
          throw new Error("Invalid date provided to fetchAPI.");
        }
      
        const result = [];
        const random = seededRandom(date.getDate());
      
        for (let hour = 17; hour <= 23; hour++) {
          if (random() < 0.5) result.push(`${hour}:00`);
          if (random() < 0.5) result.push(`${hour}:30`);
        }
      
        // Fallback to dummy data if no times are generated
        return result.length > 0
          ? result
          : ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
    };
      
    const submitAPI = function(formData) {
        return true;
    };

    const initialState = {availableTimes:  fetchAPI(new Date())}
    const [state, dispatch] = useReducer(updateTimes, initialState);

    function updateTimes(state, date) {
        return {availableTimes: fetchAPI(new Date(date))}
    }
    const navigate = useNavigate();
    function submitForm (formData) {
        if (submitAPI(formData)) {
            navigate("/confirmed")
        }
    }

    return(
        <main>
            <Routes>
                <Route path="/" element={<Header />} />
                <Route path="/booking" element={<Booking availableTimes={state} dispatch={dispatch} submitForm={submitForm}/>} />
                <Route path="/confirmed" element={<ConfirmedBooking/> } />
            </Routes>
        </main>


    )
}

export default Main;