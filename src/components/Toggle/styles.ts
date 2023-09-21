import styled from "styled-components";

export const ToggleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`;

interface ActiveToggleProps {
  active: string | null;
}

export const ToggleButton = styled.div<ActiveToggleProps>`
  padding: 0.5rem;
  border: 1px solid
    ${(props) =>
      props.active ? props.theme["gray-400"] : props.theme["gray-600"]};
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.15s linear;

  &:hover {
    border-color: ${(props) => props.theme["gray-400"]};

    svg {
      color: ${(props) => props.theme["gray-300"]};
    }
  }

  svg {
    color: ${(props) =>
      props.active ? props.theme["gray-300"] : props.theme["gray-400"]};
  }
`;
