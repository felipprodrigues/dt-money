import { ChartLine, Rows } from "phosphor-react";
import { ToggleButton, ToggleContainer } from "./styles";

interface ToggleProps {
  setToggle: React.Dispatch<React.SetStateAction<string>>;
  toggle: string;
}

export function Toggle({ setToggle, toggle }: ToggleProps) {
  const handleClick = (value: string) => {
    setToggle(value);
  };

  return (
    <ToggleContainer>
      <ToggleButton
        onClick={() => handleClick("table")}
        active={toggle === "table" ? toggle : null}
      >
        <Rows size={18} />
      </ToggleButton>

      <ToggleButton
        onClick={() => handleClick("chart")}
        active={toggle === "chart" ? toggle : null}
      >
        <ChartLine size={18} />
      </ToggleButton>
    </ToggleContainer>
  );
}
