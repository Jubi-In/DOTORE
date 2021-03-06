import React, { useState } from "react";
import styled from "styled-components";
import { IconName } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "./common/Icon";
import { ItemProps } from "./list/Item";

const InputDiv = styled.div<{ width: string }>`
  width: ${(props) => props.width};
  border-bottom: solid #d9d9d9 1px;
  position: relative;
  svg {
    position: absolute;
    top: calc(50% - 0.5rem);
    left: 0.5rem;
    color: #7b7b7b;
    font-size: 1rem;
  }
`;

const StyledInput = styled.input<{ isPaddingStart: boolean }>`
  padding: 0.7rem 0.7rem 0.7rem 0.1rem;
  margin-left: ${(props) => (props.isPaddingStart ? "2rem" : "0")};
  border: none;
  width: ${(props) => (props.isPaddingStart ? "calc(100% - 2rem)" : "100%")};
  font-family: "SUIT", sans-serif;
  :focus {
    outline: none;
  }
  ::placeholder {
    color: #7b7b7b;
  }
  [type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
  }
`;

const StyledTextArea = styled.textarea`
  padding: 0.7rem 0.7rem 0.7rem 0.1rem;
  border: none;
  width: 100%;
  resize: none;
  font-family: "SUIT", sans-serif;
  :focus {
    outline: none;
  }
  ::placeholder {
    color: #7b7b7b;
  }
`;

interface InputProps {
  placeholder?: string;
  icon?: IconName;
  width: string;
  rows?: number;
  maxLength?: number;
  name?: string;
  value?: string;
  items?: ItemProps[];
  filteredItems?: ItemProps[];
  setFilteredItems?: React.Dispatch<React.SetStateAction<ItemProps[]>>;
  type?: string;
  onBlur?: (event: any) => void;
  onKeyDown?: (event: any) => void;
  onKeyUp?: (event: any) => void;
  onChange?: (event: any) => void;
  onSearch?: (searchInput: string) => void;
}

export const InputBox = ({
  placeholder,
  icon,
  width,
  maxLength = 100,
  type = "text",
  onBlur,
  name,
  value,
  items,
  setFilteredItems,
  onKeyDown,
  onChange,
  onKeyUp,
  ...props
}: InputProps) => {
  const [keyword, setKeyword] = useState<string>("");

  const onKeywordChange = (e: any) => {
    setKeyword(e.target.value);
  };

  return (
    <InputDiv width={width}>
      {icon ? <Icon mode="fas" icon={icon}></Icon> : null}
      <StyledInput
        name={name}
        value={value ? value : keyword}
        placeholder={placeholder}
        isPaddingStart={!!icon}
        type={type}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        onKeyUp={onKeyUp}
        maxLength={maxLength}
        onChange={onChange ? onChange : onKeywordChange}
      ></StyledInput>
    </InputDiv>
  );
};

export const TextAreaBox = ({
  placeholder,
  width,
  rows,
  maxLength = 100,
  value,
  onBlur,
  onChange,
}: InputProps) => {
  return (
    <InputDiv width={width}>
      <StyledTextArea
        placeholder={placeholder}
        rows={rows}
        onBlur={onBlur}
        maxLength={maxLength}
        value={value}
        onChange={onChange}
      ></StyledTextArea>
    </InputDiv>
  );
};
