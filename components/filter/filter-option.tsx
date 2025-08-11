import {Button} from "@tremor/react";
interface Props {
  text: string;
  selected: boolean;
  onPress: any;
}

function FilterOption({text, selected, onPress}: Props) {
  return (
    <Button
      size="lg"
      onClick={() => {
        onPress(text);
      }}
      className={`${
        selected
          ? "bg-black dark:bg-[#8143FC] dark:text-white border-none font-black"
          : "bg-gray-400 dark:bg-[#2C206A] border-none font-bold"
      } py-2 px-3 rounded-full hover:font-bold hover:bg-black hover:text-white hover:dark:bg-white hover:dark:text-black`}
    >
      {text}
    </Button>
  );
}

export default FilterOption;
