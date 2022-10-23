import React, { useState } from "react";
import { Text } from "../Text";
import {
  StyledOption,
  StyledSelect,
  StyledSelectContainer,
  StyledSelectGroup,
} from "./styles";
import { SelectProps } from "./types";

const Select: <T>(props: SelectProps<T>) => React.ReactElement = ({
  id,
  layout,
  options,
  onChange,
  placeholder,
  errorMessage,
  renderOption,
  value,
  label,
  ...otherProps
}) => {
  const [InFocus, setInFocus] = useState(false);

  return (
    <StyledSelectContainer {...otherProps}>
      {label && (
        <Text
          mb="4px"
          fontSize="14px"
          lineHeight="18px"
          fontWeight={600}
          value={label}
        />
      )}

      <StyledSelectGroup hasError={!!errorMessage} inFocus={InFocus}>
        <StyledSelect
          id={id}
          value={value}
          layout={layout}
          placeholder={placeholder || "Selecione"}
          onChange={(event) =>
            onChange(options[parseInt(event.target.value, 10)])
          }
          onFocus={() => setInFocus(true)}
          onBlur={() => setInFocus(false)}
        >
          <StyledOption hidden id="empty">
            {placeholder || "Selecione"}
          </StyledOption>
          {options.map((option, index) => (
            <StyledOption key={index} value={index}>
              {renderOption ? renderOption(option) : <>{option}</>}
            </StyledOption>
          ))}
        </StyledSelect>
      </StyledSelectGroup>
    </StyledSelectContainer>
  );
};

export default Select;
