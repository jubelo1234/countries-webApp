import lBack from "../images/lightB.png";
import dBack from "../images/darkB.png";
import countryData from "../data";

function InfoPage({ data, theme }) {

  console.log(data);

  const population = data.population;
  const domain = data.topLevelDomain?.join(", ");

  const currencyNames = data.currencies
    ?.map((currency) => currency.name)
    .join(", ");
  const language = data.languages?.map((currency) => currency.name).join(", ");

  return (
    <div className="w-[95%] mt-4 lap:mt-6">
      <button className="border-none bg-transparent font-light bg-white dark:bg-dBlue shadow-3xl dark:shadow-none mr-auto rounded-[5px]">
        <div className="flex justify-center items-center gap-[6px] py-[6px] px-6 ">
          <img className="w-[25px]" alt="back" src={theme ? lBack : dBack} />{" "}
          <p>Back</p>
        </div>
      </button>
      <div>
        <img alt="flag" src={data.flags.png} className="w-full max-h-[220px]" />
        <div>
          <h2>{data.name}</h2>
          <div className="font-medium capitalize">
            <div>
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
            <div>
              <p>
                top level domain: &nbsp;
                <span className="font-extralight">{domain}</span>
              </p>
              <p>
                Currencies: &nbsp;
                <span className="font-extralight">{currencyNames}</span>
              </p>
              <p>
                Languages: &nbsp;
                <span className="font-extralight">{language}</span>
              </p>
            </div>
            <div className="flex items-start justify-start flex-wrap lap:flex-nowrap gap-x-6 gap-y-6">
              <h4>Border Countries:</h4>
              {data.borders ? <div className="text-center flex gap-[10px] justify-start items-center flex-wrap">
                {data.borders.map((item, index) => {
                  const borderCountry = countryData.find(
                    (country) => country.alpha3Code === item
                  );

                  return (
                    <p
                      key={index}
                      className="bg-white text-[14px] capitalize dark:bg-dBlue shadow-3xl dark:shadow-none w-[30%] rounded-[4px] min-w-fit px-4 py-[5px]"
                    >
                      {borderCountry.name}
                    </p>
                  );
                })}
              </div> : "None"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoPage;
