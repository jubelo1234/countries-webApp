function Card({data, theme}) {
    const population = data.population;

    return (
        <div className="w-[85%] max-w-[300px] shadow-3xl dark:shadow-none bg-white dark:bg-dBlue overflow-hidden rounded-[5px]">
            <div className="w-full h-fit  sm:w-[300px] sm:h-[200px]">
                <img src={data.flags.png} className={`${data.name === "Nepal" || data.name === "Switzerland" ? "eexsm:pl-6 eexsm:mr-auto pl-0 eexsm:pt-6" : "w-full"} max-h-[220px] min-h-[175px] h-full`} alt="flag"/>
            </div>
            <div className={`px-6 pb-8 lap:pb-12 text-left ${!theme && "bords"}`}>
                <h2 className="pb-[18px] pt-7 text-[20px]  font-bold capitalize">{data.name}</h2>
                <div className="flex flex-col items-baseline font-medium justify-start gap-2 text-[14px] exsm:text-[16px]">
                    <p>Population:  <span className="font-extralight">{population.toLocaleString()}</span></p>
                    <p>Region:  <span className="font-extralight">{data.region}</span></p>
                    <p>Capital:  <span className="font-extralight">{data.capital}</span></p>
                </div>
            </div>
        </div>
    )
}

export default Card
