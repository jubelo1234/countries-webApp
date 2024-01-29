import "../App.css";
import lightMoon from "../images/light.png";
import darkMoon from "../images/dark.png";
import lightSearch from "../images/lightS.png";
import darkSearch from "../images/darkS.png";
import downLight from "../images/darrLight.svg";
import downDark from "../images/darrDark.svg";
import { useState, useEffect } from "react";
import countryData from "../data";
import Card from "./Card";
import InfoPage from "./InfoPage";

function App() {
  const [theme, setTheme] = useState(true);
  const [themeLoaded, setThemeLoaded] = useState(false);
  const [shuffledArray, setShuffledArray] = useState([]);

  const [home, setHome] = useState(true)

  const moon = theme ? lightMoon : darkMoon;

  useEffect(() => {
    const savedTheme = localStorage.getItem("selectedTheme");
    if (savedTheme) {
      applyTheme(savedTheme);
      setTheme(savedTheme === "dark");
    } else {
      applyTheme("light");
      setTheme(false);
      setThemeInLocalStorage("light");
    }

    setThemeLoaded(true);
  }, []);

  useEffect(() => {
    const shuffleArray = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    setShuffledArray(shuffleArray([...countryData]));
  }, []);

  // Function to apply the selected theme
  function applyTheme(theme) {
    const rootElement = document.documentElement;
    rootElement.classList.toggle("dark", theme === "dark");
  }

  function handleChange() {
    const newTheme = theme ? "light" : "dark";
    setTheme(!theme);
    setThemeInLocalStorage(newTheme);
    applyTheme(newTheme);
  }

  // Function to set the theme in localStorage
  function setThemeInLocalStorage(theme) {
    localStorage.setItem("selectedTheme", theme);
  }

  const testData1 = countryData.find((item) =>
    item.name.toLowerCase().includes("switzerland")
  );

  return (
    <div
      className={`${
        themeLoaded ? "" : "hidden"
      } bg-vlGray dark:bg-vdBlue min-h-screen w-screen text-vdBlueTxt dark:text-white`}
    >
      <div className="flex sticky top-0 justify-between z-20 text-vdBlueTxt dark:text-white items-center bg-white px-[5vw] tlap:px-[4vw] py-4 dark:bg-dBlue">
        <h3 className=" font-extrabold text-[14px] exsm:text-[16.5px] lap:text-[22px]">
          Where in the world?
        </h3>
        <div
          onClick={handleChange}
          className="flex text-[14px] exsm:text-[16px] items-center font-semibold justify-center"
        >
          <img src={moon} alt="theme" className="w-[32px] exsm:w-[40px]" />
          <h4>{`${!theme ? "Dark" : "Light"} Mode`}</h4>
        </div>
      </div>
      <div className="pt-[30px] lap:pt-[50px] px-[5vw] tlap:px-[2vw] max-w-[1710px] mx-auto">
        <div className={` mb-16 ${home ? "flex" : "hidden"} items-baseline flex-col justify-start  gap-6 lap:flex-row lap:justify-between`}>
          <Search theme={theme} />
          <Region theme={theme} />
        </div>
        <div className="flex pb-10 items-center justify-center tlap:justify-center  gap-10 sm:gap-14 tlap:gap-[80px] flex-wrap">
          {shuffledArray.map((item, key) => (
            <Card data={item} theme={theme} key={key}/>
          ))}
          {/* <InfoPage data={testData1} theme={theme} /> */}
        </div>
      </div>
    </div>
  );
}

function Search({ theme }) {
  const searchImg = theme ? lightSearch : darkSearch;
  return (
    <div
      id="sec"
      className="flex max-w-[500px] shadow-3xl dark:shadow-none lap:h-[55px] w-full items-center bg-white dark:bg-dBlue gap-4 py-[10px] px-5 rounded-[5px]"
    >
      <img
        src={searchImg}
        alt="search"
        className="w-[16 px] h-[16px] exsm:w-[18px] exsm:h-[18px]"
      />
      <input
        type="search"
        placeholder="Search for a country.."
        className=" w-full text-[14px] exsm:text-[16.5px] border-none bg-transparent text-vdBlueTxt dark:text-white py-[2px] pl-[2px]"
      />
    </div>
  );
}

function Region({ theme }) {
  const [show, setShow] = useState(false);

  function handleDrop() {
    setShow(!show);
  }
  return (
    <div className="flex shadow-3xl dark:shadow-none max-w-[250px] lap:h-[55px] cursor-pointer relative text-[14px] sm:text-[16px] py-3 px-5 dark:bg-dBlue bg-white font-light justify-center items-center w-[60%] rounded-[5px]">
      <div
        onClick={handleDrop}
        className="w-full h-full flex items-center justify-between"
      >
        <h3>Filter by Region</h3>
        <img src={theme ? downLight : downDark} className="w-[12px]" />
      </div>
      <div
        className={`absolute top-[115%] left-0 py-4 px-6 rounded-[5px] w-full dark:bg-dBlue ${
          show ? "flex" : "hidden"
        } flex-col h-fit gap-2 sm:gap-3 items-baseline bg-white font-light" id="drop`}
      >
        <button value="africa">Africa</button>
        <button value="America">America</button>
        <button value="Asia">Asia</button>
        <button value="Europe">Europe</button>
        <button value="Oceania">Oceania</button>
      </div>
    </div>
  );
}

export default App;
