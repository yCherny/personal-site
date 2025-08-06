import {AdjustmentsHorizontalIcon} from "@heroicons/react/24/outline";
import FilterOption from "./filter-option";
import {useState} from "react";

type Props = {
  onClick: any;
  filterOptions: string[];
  path: string;
};

function FilterPanel({onClick, filterOptions, path}: Props) {
  const [selected, setSelected] = useState<number | null>(null);

  function handleOptionSelect(option: string, index: number) {
    setSelected(selected === index ? null : index);
    onClick(option);
  }

  return (
    <header
      className="flex flex-wrap h-full w-full md:w-auto z-50 drop-shadow-lg gap-2 p-3 rounded-lg items-center
			bg-white dark:bg-[#1C1348] dark:text-white 
		"
    >
      <div className="w-10 p-2 border dark:border-[#413D57] rounded-full">
        <AdjustmentsHorizontalIcon />
      </div>

      {filterOptions.map((option, index) => {
        return (
          <FilterOption
            text={option}
            key={option}
            selected={selected === index}
            onPress={(option: string) => handleOptionSelect(option, index)}
          />
        );
      })}
    </header>
  );
}

export default FilterPanel;
