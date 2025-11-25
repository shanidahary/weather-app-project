import { Card, CardContent } from "@/components/ui/card";
import DaysSelector from "./DaysSelector";
import HourCard from "./HourCard";

const HourlyForecastCard = ({
  className = "",
  hoursArray,
  weatherDay,
  tempUnit,
  setSelectedDay,
  convertTemp,
}) => {
  return (
    <Card
      className={`min-h-[600px] w-full max-w-[240px] md:max-w-[260px] md:h-[650px] lg:max-w-[400px] lg:h-[700px] xl:h-[800px] xl:max-w-[800px] bg-neutral-800 border-none 2xl:max-w-[750px] 2xl:min-h-[1250px] ${className}`}
    >
      <CardContent className="flex flex-col gap-3 2xl:gap-8 2xl:px-6 2xl:py-6">
        <div className="flex items-center justify-between px-2 2xl:px-0">
          <h6 className="text-white text-[17px] lg:text-[19px] xl:text-[23px] font-medium 2xl:text-[45px]">
            Hourly Forecast
          </h6>
          <DaysSelector
            weatherDay={weatherDay}
            setSelectedDay={setSelectedDay}
          ></DaysSelector>
        </div>
        <div className="flex flex-col justify-center gap-2 w-full md:mt-5 2xl:gap-5">
          {hoursArray.map((time) => (
            <HourCard
              key={time.hour}
              hour={time.hour}
              icon={time.icon}
              temp={time.temp}
              convertTemp={convertTemp}
              tempUnit={tempUnit}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default HourlyForecastCard;
