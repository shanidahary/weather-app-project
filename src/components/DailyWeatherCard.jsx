import { Card, CardContent, CardTitle } from "@/components/ui/card";

const DailyWeatherCard = ({ day, min, max, icon }) => {
  return (
    <Card className="flex flex-col gap-2 !p-0 py-4 md:py-2 w-[90px] h-[150px] md:w-[80px] md:h-[135px] md:text-[15px] lg:text-[20px] bg-neutral-800 border-none text-white text-[18px] text-[rgba(255,255,255,0.85)] lg:w-[69px] lg:h-[160px] xl:w-[105px] xl:h-[200px] 2xl:w-[150px] 2xl:h-[300px] 2xl:flex-1">
      <div className="flex flex-col gap-2 lg:gap-3 xl:gap-4 items-center pt-2 md:pt-1 md:text-[14px] xl:text-[22px] xl:mt-2 2xl:gap-6 2xl:text-[40px]">
        <CardTitle className="pt-3 2xl:mb-4">{day}</CardTitle>
        <span className="2xl:h-[80px] inline-flex items-center justify-center scale-100 2xl:scale-150">
          {icon}
        </span>
      </div>
      <CardContent className="flex justify-between w-full px-2 pt-3 md:text-[14px] xl:text-[22px] xl:mt-2 2xl:text-[35px] 2xl:px-4">
        <span className="">{min}</span>
        <span className="">{max}</span>
      </CardContent>
    </Card>
  );
};

export default DailyWeatherCard;
