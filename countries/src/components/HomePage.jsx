import Card from "./Card";
import { useRef, useEffect } from "react";

function HomePage({ data, theme, setHome, setCountry, scrll }) {
  // Restore the scroll position when the component mounts
  useEffect(() => {
    window.scrollTo(0, scrll.current);
  }, [scrll]);

  // Save the scroll position when the component unmounts or before it updates
  useEffect(() => {
    const handleScroll = () => {
      scrll.current = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrll]);

  return (
    <div className="flex w-full items-center justify-center tlap:justify-center  gap-10 sm:gap-14 tlap:gap-[60px] flex-wrap">
      {data.map((item, key) => (
        <Card
          data={item}
          theme={theme}
          key={key}
          setHom={setHome}
          setCountry={setCountry}
        />
      ))}
    </div>
  );
}

export default HomePage;
