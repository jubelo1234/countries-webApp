import lBack from "../images/lightB.png";
import dBack from "../images/darkB.png";
import countryData from "../data";
import { useState, useEffect } from "react";

function InfoPage({ data, theme }) {
  console.log(data);
  const population = data.population;
  const domain = data.topLevelDomain?.join(", ");

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); 

  const flagImg = screenWidth >= 1200 ? data.flags.svg : data.flags.png;

  const currencyNames = data.currencies
    ?.map((currency) => currency.name)
    .join(", ");
  const language = data.languages?.map((currency) => currency.name).join(", ");

  return (
    <div className="w-[95%] mt-3 lap:mt-0">

      <button className="border-none bg-transparent font-light bg-white dark:bg-dBlue shadow-3xl dark:shadow-none mr-auto rounded-[5px]">
        <div className="flex justify-center items-center text-[14px] exsm:text-[16px] gap-[6px] py-[6px] px-6 ">
          <img className="w-[22px] exsm:w-[25px]" alt="back" src={theme ? lBack : dBack} />{" "}
          <p>Back</p>
        </div>
      </button>


      <div className="mt-12 tlap:mt-16 ttlap:flex ttlap:items-center ttlap:justify-between ttlap:w-full">
        <img
          alt="flag"
          src={flagImg}
          className={` ${
            data.name === "Nepal" || data.name === "Switzerland"
              ? "ttlap:mx-auto"
              : "w-full ttlap:mr-auto ttlap:ml-0"
          } max-h-[180px] ttlap:w-[43%] max-w-[462px] ttlap:max-w-full mx-auto  exsm:min-h-[180px] exsm:max-h-[230px]  mbt:max-h-[270px] ttlap:max-h-[420px] shadow-3xl dark:shadow-none`}
        />
        <div className="sm:w-[500px] tab:w-[600px] mx-auto ttlap:w-[43%]">
          <h2 className="pb-[26px] pt-10 sm:pt-16 ttlap:pt-0 text-[20px] exsm:text-[24px] ttlap:text-[34px]  font-bold capitalize">
            {data.name}
          </h2>
          <div className="font-medium capitalize flex flex-col sm:flex-row sm:items-start sm:justify-between  items-baseline gap-12 text-[14px] exsm:text-[16px] tlap:text-[18px]">
            <div className="flex flex-col items-baseline  justify-start gap-[14px] ">
              <p>
                Native Name:&nbsp;
                <span className="font-extralight">{data.nativeName}</span>
              </p>
              <p>
                Population:&nbsp;
                <span className="font-extralight">
                  {population.toLocaleString()}
                </span>
              </p>
              <p>
                Region: &nbsp;
                <span className="font-extralight">{data.region}</span>
              </p>
              <p>
                Sub Region: &nbsp;
                <span className="font-extralight">{data.subregion}</span>
              </p>
              <p>
                Capital: &nbsp;
                <span className="font-extralight">{data.capital}</span>
              </p>
            </div>
            <div className="flex flex-col items-baseline  justify-start gap-[14px]">
              <p>
                top level domain: &nbsp;
                <span className="font-extralight">{domain}</span>
              </p>
              <p>
                citizen: &nbsp;
                <span className="font-extralight">{data.demonym}</span>
              </p>
              <p>
                Currencies: &nbsp;
                <span className="font-extralight">{currencyNames}</span>
              </p>
              <p>
                Languages: &nbsp;
                <span className="font-extralight">{language}</span>
              </p>
              <p>
                Independent: &nbsp;
                <span className="font-extralight">{data.independent ? "Yes" : "No"}</span>
              </p>
            </div>
          </div>
          <div className="flex mt-12 items-start justify-start flex-wrap w-full gap-x-5 mb-3 gap-y-4">
            <h4 className="text-[17px] exsm:text-[20px] font-medium text-nowrap">
              Border Countries:
            </h4>
            {data.borders ? (
              <div className="text-center flex gap-[10px] mbt:gap-3 justify-start items-center flex-wrap">
                {data.borders.map((item, index) => {
                  const borderCountry = countryData.find(
                    (country) => country.alpha3Code === item
                  );

                  return (
                    <p
                      key={index}
                      className="bg-white text-[13px] exsm:text-[14px] tlap:text-[15px] capitalize dark:bg-dBlue shadow-3xl dark:shadow-none w-[30%] ttlap:w-fit rounded-[3px] min-w-fit px-4 py-[5px]"
                    >
                      {borderCountry.name}
                    </p>
                  );
                })}
              </div>
            ) : (
              "None"
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoPage;
