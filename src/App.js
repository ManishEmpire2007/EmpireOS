import './App.css';
import React, { useState, useEffect } from 'react';
import { FaBatteryThreeQuarters, FaSignal, FaWifi } from "react-icons/fa";
// =====
import loader from './assets/Loader.gif';
import fp from './assets/wired-fingerprint.png';
import discord from './assets/icons/discord.png';
import zoom from './assets/icons/zoom.png';
import twitter from './assets/icons/twitter.png';
import locker from './assets/icons/locker.png';
import spotify from './assets/icons/spotify.png';
import youtube from './assets/icons/youtube.png';
import notion from './assets/icons/notion.png';
import settings from './assets/icons/settings.png';
import google from './assets/icons/google.png';
import mail from './assets/icons/mail.png';
import weather from './assets/icons/weather.png';
import calendar from './assets/icons/calendar.png';

function App() {
  useEffect(() => {
    const timeout = setTimeout(() => {
      const loader = document.querySelector('.loader');
      if (loader) {
        loader.style.transition = '0.25s';
        loader.style.opacity = 0;
        document.querySelector(".loader").classList.add("loader-open")
        document.querySelector(".shadow-img").classList.add("shadow-img-open")
        setTimeout(() => {
          loader.style.display = 'none';
        }, 500);
      }
    }, 2500);
    return () => clearTimeout(timeout);
  }, []);
  // =====
  function open() {
    const lc = document.querySelector(".lock_screen");
    lc.classList.add("opened")
    setTimeout(() => {
      lc.style.display = 'none';
    }, 500);
  }
  function close() {
    const lc = document.querySelector(".lock_screen");
    lc.style.display = 'block';
    lc.classList.remove("opened");
    lc.classList.add("closed");
  }
  // =====
  const [time, setTime] = useState('');
  const [day, setDay] = useState('');
  const [date, setDate] = useState('');
  const [amPm, setAmPm] = useState('');

  useEffect(() => {
    const Clock = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const dayOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][now.getDay()];
      const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][now.getMonth()];
      const dayOfMonth = now.getDate();
      const isPm = hours >= 12;
      const amPmValue = isPm ? 'PM' : 'AM';
      const hours12 = hours % 12 || 12;
      setTime(`${hours12}:${minutes.toString().padStart(2, '0')}`);
      setAmPm(amPmValue);
      setDay(dayOfWeek);
      setDate(`${month} ${dayOfMonth}`);
    };
    return () => Clock();
  }, []);
  // =====
  useEffect(() => {
    const secondHand = document.querySelector('.second-hand');
    const minuteHand = document.querySelector('.min-hand');
    const hourHand = document.querySelector('.hour-hand');

    const setDate = () => {
      const now = new Date();
      const seconds = now.getSeconds();
      const secondsDegrees = ((seconds / 60) * 360) + 90;
      secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

      const minutes = now.getMinutes();
      const minutesDegrees = ((minutes / 60) * 360) + 90;
      minuteHand.style.transform = `rotate(${minutesDegrees}deg)`;

      const hours = now.getHours();
      const hoursDegrees = ((hours / 12) * 360) + 90;
      hourHand.style.transform = `rotate(${hoursDegrees}deg)`;
    }

    const intervalId = setInterval(setDate, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  // =====
 return (
    <div className="flex items-center justify-center w-screen h-screen text-white bg-black App">
      <div className="relative overflow-hidden bg-black frame rounded-frame">
        <div className="absolute z-20 w-full h-full lock_screen">
          <div className="absolute z-20 flex items-center justify-center w-full h-full bg-black loader">
            <img
              src={loader}
              alt="loader"
              className="h-40 loader-img"
            />
          </div>
          <div className="flex flex-col items-center justify-center w-full h-56 clock">
            <div className="font-bold text-7xl">{time}<span className="hidden text-sm">{amPm}</span></div>
            <div className="text-sm font-bold">{day}, {date}</div>
          </div>
          <div className="flex items-center justify-center w-full h-32 mt-56 open">
            <img
              src={fp}
              onClick={open}
              alt="fingerprint"
              className="h-24 fb"
            />
          </div>
        </div>
        <div className="relative z-10 flex flex-col items-center w-full h-full home_screen justify-evenly">
          <div className="absolute top-0 flex items-center justify-around w-full p-4 n-menu bg-slate-950/0">
            <div className="ml-5 text-sm font-bold">{time}</div>
            <div className="flex items-end justify-end pr-3 icon w-80">
              <div className="flex items-center justify-around w-16 main">
                <FaSignal className="h-2.5" />
                <FaWifi className="h-2.5" />
                <FaBatteryThreeQuarters className="h-2.5" />
              </div>
            </div>
          </div>
          <div className="clock2">
              <div className="middle"></div>
              <div className="relative clock2-face">
                  <div className="dots">
                      <div className="dot"></div>
                      <div className="dot"></div>
                      <div className="dot"></div>
                      <div className="dot"></div>
                      <div className="dot"></div>
                      <div className="dot"></div>
                  </div>
                  <div className="hand hour-hand"></div>
                  <div className="hand min-hand"></div>
                  <div className="hand second-hand"></div>
              </div>
          </div>
          <div className="apps">
              <div className="app">
                <img src={discord} alt="discord" />
                <img src={zoom} alt="zoom" />
                <img src={twitter} alt="twitter" />
                <img src={locker} alt="Locker" onClick={close} />
              </div>
              <div className="app">
                <img src={spotify} alt="spotify" />
                <img src={youtube} alt="youtube" />
                <img src={notion} alt="notion" />
                <img src={settings} alt="settings" />
              </div>
          </div>
          <div className="dock">
              <div className="dots">
                  <div className="d0"></div>
                  <div className="d0"></div>
                  <div className="d0"></div>
              </div>
              <img src={google} alt="google" />
              <img src={mail} alt="mail" />
              <img src={weather} alt="weather" />
              <img src={calendar} alt="calendar" />
          </div>
          <div className="info absolute bottom-2.5 font-bold text-red-500 text-xs">Apps are unavailable!</div>
        </div>
      </div>
      <div className="shadow-img rounded-frame-2"></div>
    </div>
  );
}

export default App;
