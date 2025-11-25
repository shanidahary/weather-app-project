import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

const fields = [
  {
    fieldLable: "Temperature",
    fieldName: "temperature",
    fieldValues: [
      {
        value: "°C",
        label: "Celsius",
      },
      {
        value: "°F",
        label: "Fahrenheit",
      },
    ],
  },
  {
    fieldLable: "Wind Speed",
    fieldName: "windSpeed",
    fieldValues: [
      {
        value: "km/h",
        label: "km",
      },
      {
        value: "mph",
        label: "mph",
      },
    ],
  },
  {
    fieldLable: "Precipitation",
    fieldName: "precipitation",
    fieldValues: [
      {
        value: "mm",
        label: "Millimeters (mm)",
      },
      {
        value: "in",
        label: "Inches (in)",
      },
    ],
  },
];

const Units = ({ setUnitSettings, unitSettings }) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (fieldName, value) => {
    setUnitSettings((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="flex items-center w-[80px] gap-2 bg-neutral-700 text-white text-[15px] border-none px-5 lg:w-[120px] lg:h-[50px] 2xl:w-[200px] 2xl:h-[80px]"
        >
          <img
            src="./weather-app-main/assets/images/icon-units.svg"
            alt="Units Icon"
            className="w-[12px] lg:w-[17px] 2xl:w-[30px]"
          ></img>
          <span className="lg:text-[20px] 2xl:text-[35px]">Units</span>
          <ChevronDown className="!w-4 !h-4 2xl:!w-9 2xl:!h-10" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandList>
            {fields.map((field) => (
              <CommandGroup key={field.fieldName}>
                <span className="lg:text-[22px] xl:text-[25px] 2xl:text-[40px]">
                  {field.fieldName}
                </span>
                {field.fieldValues.map((fv) => (
                  <CommandItem
                    className="lg:text-[18px] xl:text-[22px] 2xl:text-[32px]"
                    key={fv.value}
                    value={fv.value}
                    onSelect={() => handleSelect(field.fieldName, fv.value)}
                  >
                    {console.log(fv.label)}

                    {fv.label}
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        unitSettings[field.fieldName] === fv.value
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default Units;
