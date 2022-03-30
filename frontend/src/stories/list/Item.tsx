import { motion } from "framer-motion";
import React from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Icon } from "../common/Icon";
import { Image } from "../detail/Image";

const Container = styled(motion.div)`
  height: 20rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  cursor: pointer;
`;

const TextContainer = styled.div`
  width: 100%;
  height: 20%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 10px;
`;

const AmountContainer = styled.div`
  width: 40%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
  @media screen and (max-width: 768px) {
    width: 50%;
  }
`;

const Title = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 20px;
`;

const Amount = styled.div`
  font-size: 1rem;
`;

interface ItemProps {
  itemHash: string;
  itemTitle: string;
  nickname: string;
  download: number;
  like: number;
  tokenId: string;
}

const Item = ({
  itemHash,
  itemTitle,
  nickname,
  download,
  like,
  tokenId,
}: ItemProps) => {
  const isPc = useMediaQuery({ minWidth: 768 });
  const isTablet = useMediaQuery({ minWidth: 500 });
  const viewMode = isPc ? "list" : isTablet ? "list" : "listM";
  const navigate = useNavigate();

  return (
    <Container
      whileHover={{
        scale: 1.03,
      }}
      onClick={() => navigate(`/detail/${tokenId}`)}
    >
      <Image
        mode={viewMode}
        imageUrl="https://m.secondmorning.co.kr/file_data/secondmorning/2020/11/11/e712578d88cb3d9ca67bfe33405aee6c.jpg"
        // imageUrl={itemHash}
        name={itemTitle}
      />
      <TextContainer>
        <Title>{itemTitle}</Title>
        <Amount>{nickname}</Amount>
      </TextContainer>
      <AmountContainer>
        <Icon mode="fas" icon="download" color="#6667ab" />
        <Amount>{download}</Amount>
        <Icon mode="fas" icon="heart" color="#6667ab" />
        <Amount>{like}</Amount>
      </AmountContainer>
    </Container>
  );
};

export default Item;