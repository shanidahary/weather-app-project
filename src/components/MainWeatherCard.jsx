import { Card } from "@/components/ui/card";

const MainWeatherCard = ({
  className = "",
  timezone,
  date,
  temperature,
  icon,
}) => {
  // Formating the date:
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
  return (
    <Card
      className={`w-full max-w-[450px] h-[250px] md:h-[200px] xl:max-w-[1500px] xl:min-h-[300px] md:flex-row px-3 justify-between pt-8 pb-8 items-center bg-[url('./weather-app-main/assets/images/bg-today-large.svg')] bg-center bg-cover text-white border-none lg:max-w-[600px] lg:h-[250px] 2xl:max-w-[1500px] 2xl:min-h-[500px] 2xl:px-14 2xl:py-12 ${className}`}
    >
      <div className="flex flex-col items-center gap-2 text-[25px] 2xl:items-start 2xl:gap-6">
        <span className="font-medium text-[30px] md:text-[24px] lg:text-[32px] xl:text-[40px] 2xl:text-[75px]">
          {timezone}
        </span>
        <span className="text-white/70 text-[18px] xl:text-[23px] 2xl:text-[40px]">
          {formattedDate}
        </span>
      </div>
      <div className="flex items-center gap-5 lg:gap-10 xl:gap-13 2xl:gap-25">
        <span className="inline-flex scale-100 md:scale-120 lg:scale-130 xl:scale-160 2xl:scale-280">
          {icon}
        </span>
        <span className="text-[40px] font-bold md:text-[30px] lg:text-[40px] xl:text-[80px] 2xl:text-[120px]">
          {temperature}
        </span>
      </div>
    </Card>
  );
};

export default MainWeatherCard;
