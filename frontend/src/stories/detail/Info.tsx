import React from "react";
import styled from "styled-components";
import InfoItem from "./InfoItem";
import { Title } from "./Title";

const Container = styled.div``;
const InnerContainer = styled.div`
  height: 6rem;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  margin-top: 30px;
`;
interface InfoProps {
  address: string;
  tokenId: string;
  standard: string;
}
const Info = ({ address, tokenId, standard }: InfoProps) => {
  return (
    <Container>
      <Title color="#6667ab" title="NFT 정보" />
      <InnerContainer>
        <InfoItem title="거래 주소" content={address} />
        <InfoItem title="토큰 ID" content={tokenId} />
        <InfoItem title="표준 토큰" content={standard} />
      </InnerContainer>
    </Container>
  );
};

export default Info;
