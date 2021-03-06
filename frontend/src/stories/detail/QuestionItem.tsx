import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 5fr 6fr 15fr;
  justify-content: flex-start;
  place-items: center;
`;
const Category = styled.div`
  cursor: pointer;

  &:hover {
    transition: 0.3s;
    font-size: 1.05rem;
    color: #6667ab;
  }
`;

export interface QuestionProps {
  tokenId?: string;
  articleno: number;
  yn: boolean;
  nickname: string;
  description: string;
}

const QuestionItem = ({
  tokenId,
  articleno,
  yn,
  nickname,
  description,
}: QuestionProps) => {
  const navigate = useNavigate();
  const blocks = JSON.parse(description).blocks;
  return (
    <Container onClick={() => navigate(`/feedback/${tokenId}/${articleno}`)}>
      <div>{yn ? "해결" : "미해결"}</div>
      <div>{nickname}</div>
      <Category>
        {/* {desc.length >= 15 ? desc.slice(0, 15) + "..." : desc} */}
        {blocks.map((block: any) =>
          block.text.length >= 13
            ? block.text.slice(0, 13) + "..."
            : block.text.length > 1 && block.text
        )}
      </Category>
    </Container>
  );
};

export default QuestionItem;
