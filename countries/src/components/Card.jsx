function Card({data, theme}) {
    console.log(data)
    return (
        <div className="w-[85%] max-w-[300px] shadow-3xl dark:shadow-none bg-white dark:bg-dBlue overflow-hidden rounded-[5px]">
            <div className="w-full h-fit sm:w-[300px] sm:h-[175px]">
                <img src={data.flags.png} className="w-full h-full" alt="flag"/>
            </div>
            <div className={`px-6 pb-12 text-left ${!theme && "bords"}`}>
                <h2 className="pb-[18px] pt-7 text-[20px] exsm:text-[20px] font-extrabold capitalize">{data.name}</h2>
                <div className="flex flex-col items-baseline font-medium justify-start gap-2 text-[14px] exsm:text-[16px]">
                    <p>Population:  <span className="font-light">{data.population}</span></p>
                    <p>Region:  <span className="font-light">{data.region}</span></p>
                    <p>Capital:  <span className="font-light">{data.capital}</span></p>
                </div>
            </div>
        </div>
    )
}

export default Card
