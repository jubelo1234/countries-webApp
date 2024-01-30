import "../App.css";
import lightMoon from "../images/light.png";
import darkMoon from "../images/dark.png";
import lightSearch from "../images/lightS.png";
import darkSearch from "../images/darkS.png";
import downLight from "../images/darrLight.svg";
import downDark from "../images/darrDark.svg";
import darkUp from "../images/darkUp.png";
import lightUp from "../images/lighUp.png";
import { useState, useEffect, useMemo, useRef } from "react";
import countryData from "../data";
import Card from "./Card";
import InfoPage from "./InfoPage";
import HomePage from "./HomePage";

function App() {
  const [theme, setTheme] = useState(true);
  const [themeLoaded, setThemeLoaded] = useState(false);
  const [shuffledArray, setShuffledArray] = useState([]);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");

  const scrollPositionRef = useRef(0);

  const [home, setHome] = useState(true);
  const [inner, setInner] = useState("nepal");

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

  // filter using the search
  const searchedData = useMemo(() => {
    return search.trim() !== ""
      ? shuffledArray.filter((item) => item.name.toLowerCase().includes(search))
      : shuffledArray;
  }, [search, shuffledArray]);

  const regionData =
    region === "" || region === "all"
      ? searchedData
      : searchedData.filter(
          (item) => item.region.toLowerCase() === region.toLowerCase()
        );

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

  function toTop() {
    window.scrollTo(0, 0);
  }

  const innerPageData =
    inner.trim() !== ""
      ? countryData.find(
          (item) => item.name.toLowerCase() === inner.toLowerCase()
        )
      : null;

  return (
    <div
      className={`${
        themeLoaded ? "" : "hidden"
      } bg-vlGray dark:bg-vdBlue min-h-screen w-screen text-vdBlueTxt dark:text-white`}
    >
      <div className="flex sticky top-0 justify-between z-20 text-vdBlueTxt dark:text-white items-center bg-white px-[5vw] tlap:px-[4vw] py-4 dark:bg-dBlue">
        <h3
          onClick={toTop}
          className=" font-extrabold cursor-pointer text-[14px] exsm:text-[16.5px] lap:text-[22px]"
        >
          Where in the world?
        </h3>
        <div
          onClick={handleChange}
          className="flex text-[14px] cursor-pointer exsm:text-[16px] items-center font-semibold justify-center"
        >
          <img src={moon} alt="theme" className="w-[32px] exsm:w-[40px]" />
          <h4>{`${!theme ? "Dark" : "Light"} Mode`}</h4>
        </div>
      </div>
      {home && (
        <div
          onClick={toTop}
          className="rounded-[50%] border-2 tlap:border-3 border-yellow-300 fixed bottom-[20px] right-[5vw] ttlap:right-[14px] w-fit h-fit p-3 bg-white dark:bg-dBlue shadow-3xl dark:shadow-none tbtn"
        >
          <img
            alt="top"
            src={!theme ? darkUp : lightUp}
            className="w-[18px] exsm:w-[22px] sm:w-[25px]"
          />
        </div>
      )}
      <div className="pt-[30px] lap:pt-[50px] px-[5vw] tlap:px-[2vw] max-w-[1710px] mx-auto">
        <div
          className={` mb-16 ${
            home ? "flex" : "hidden"
          } items-baseline flex-col justify-start  gap-6 lap:flex-row lap:justify-between`}
        >
          <Search setVal={setSearch} val={search} theme={theme} />
          <Region theme={theme} set={setRegion} regn={region} />
        </div>
        <div className="flex pb-9 items-center justify-center tlap:justify-center  gap-10 sm:gap-14 tlap:gap-[80px] flex-wrap">
          {home ? (
            search.trim() !== "" && regionData < 1 ? (
              <div className="w-full h-[30vh] flex flex-col items-center justify-center">
                <h1 className="capitalize text-[34px] sm:text-[44px] font-bold text-center">
                  Not found!
                </h1>
                <p className="capitalize text-center text-[14px] exsm:text-[16px] sm:text-[18px]">
                  Try searching for another Country
                </p>
              </div>
            ) : (
              <HomePage
                data={regionData}
                theme={theme}
                setHome={setHome}
                setCountry={setInner}
                scrll={scrollPositionRef}
              />
            )
          ) : (
            innerPageData && (
              <InfoPage
                data={innerPageData}
                theme={theme}
                setHom={setHome}
                setCountry={setInner}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}

function Search({ theme, setVal, val }) {
  const searchImg = theme ? lightSearch : darkSearch;

  function handleChange(e) {
    setVal(e.target.value);
  }
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
        value={val}
        onChange={handleChange}
        placeholder="Search for a country.."
        className=" w-full text-[14px] exsm:text-[16.5px] border-none bg-transparent text-vdBlueTxt dark:text-white py-[2px] pl-[2px]"
      />
    </div>
  );
}

function Region({ theme, set, regn }) {
  const [show, setShow] = useState(false);

  function handleDrop() {
    setShow(!show);
  }

  function handleClick(e) {
    set(e.target.value);
    handleDrop();
  }
  return (
    <div className="flex shadow-3xl dark:shadow-none max-w-[250px] lap:h-[55px] cursor-pointer relative text-[14px] sm:text-[16px] py-3 px-5 dark:bg-dBlue bg-white font-light justify-center items-center w-[60%] rounded-[5px]">
      <div
        onClick={handleDrop}
        className="w-full h-full flex items-center justify-between"
      >
        <h3 className=" capitalize">
          {regn === "" ? "Filter by Region" : regn}
        </h3>

        <img src={theme ? downLight : downDark} className="w-[12px]" />
      </div>
      <div
        className={`absolute top-[115%] left-0 py-4 px-6 rounded-[5px] w-full dark:bg-dBlue ${
          show ? "flex" : "hidden"
        } flex-col h-fit gap-2 sm:gap-3 items-baseline bg-white font-light" id="drop`}
      >
        <button onClick={handleClick} value="africa">
          Africa
        </button>
        <button onClick={handleClick} value="Americas">
          Americas
        </button>
        <button onClick={handleClick} value="Asia">
          Asia
        </button>
        <button onClick={handleClick} value="Europe">
          Europe
        </button>
        <button onClick={handleClick} value="Oceania">
          Oceania
        </button>
        <button onClick={handleClick} value="all">
          All
        </button>
      </div>
    </div>
  );
}

export default App;
