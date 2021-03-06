import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Title } from "../../stories/Title";
import { InputBox, TextAreaBox } from "../../stories/InputBox";
import { FileDropBox } from "../../stories/minting/FileDropBox";
import { TagInputBox } from "../../stories/minting/TagInputBox";
import { Button } from "../../stories/Button";
import { useRecoilValue } from "recoil";
import { isLoggedInState, userInfoState } from "../..";
import { createToken } from "../../contracts/api/first";
import { postFile, modifyTokenId } from "../../api/item";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../stories/common/LoadingSpinner";
import {
  errorAlert,
  successAlert,
  warnAlert,
} from "../../stories/common/alert";
import { LoadContainer } from '../Detail';

const Container = styled.div`
  padding: 8rem 0;
`;

const MintingContainer = styled.div`
  width: 50rem;
  margin: auto;
  @media screen and (max-width: 768px) {
    width: 23rem;
  }
`;

const TitleContainer = styled.header`
  text-align: left;
  padding-bottom: 3rem;
  @media screen and (max-width: 768px) {
    text-align: center;
  }
`;

const SubTitleContainer = styled.span<{ isRequired: boolean }>`
  margin: 0.8rem 0.8rem 0 0rem;
  font-size: 1.2rem;
  font-weight: 700;
  ::after {
    display: ${(props) => (props.isRequired ? "inline" : "none")};
    position: relative;
    top: -0.4rem;
    right: -0.2rem;
    font-size: 0.8rem;
    content: "*";
    color: red;
  }
`;

const SmallMutedText = styled.span`
  font-size: 0.6rem;
  color: rgb(112, 122, 131);
`;

const FormatInfo = styled.p`
  font-size: 0.9rem;
  margin: 0.8rem 0;
  color: rgb(112, 122, 131);
`;

const InputContainer = styled.section`
  width: 100%;
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 4rem;
  }
`;

const InputTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 3rem;
  @media screen and (max-width: 768px) {
    gap: 2rem;
  }
`;

const ParentMinting = () => {
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const userInfo = useRecoilValue(userInfoState);
  const [itemTitle, setItemTitle] = useState<string>("");
  const [itemDesc, setitemDesc] = useState<string>("");
  const [itemTags, setitemTags] = useState<string[]>([]);
  const [itemFile, setitemFile] = useState<Blob>(new Blob());
  const [ispending, setisPending] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleTitleChanged = (e: any) => {
    setItemTitle(e.target.value);
    validateTitle();
  };
  const handleDescChanged = (e: any) => {
    setitemDesc(e.target.value);
  };
  const handleTagChanged = (label: string) => {
    setitemTags((prev) => [...prev, label]);
  };
  const handleFileChanged = (file: Blob) => {
    setitemFile(file);
  };

  const uploadFile = async () => {
    const data = new FormData();
    data.append("data", itemFile);
    const response = await postFile(data);
    return response.data.imageUrl;
  };

  const onClickCreateToken = async () => {
    if (!validateTitle()) {
      errorAlert("????????? ????????? ??????????????????");
      return;
    } else if (itemFile.size === 0) {
      errorAlert("????????? ??????????????????");
      return;
    } else if (!itemDesc) {
      errorAlert("????????? ??????????????????");
      return;
    }
    try {
      if (!isLoggedIn) {
        return;
      }
      setisPending(true);
      const format = itemFile.type.split("/")[0]; // ?????? ??????

      // ???????????? ?????? ?????????
      const fileUrl = await uploadFile(); // ????????? Url

      // ???????????? ?????????????????? ??????
      const { tx, txHash } = await createToken({
        title: itemTitle,
        description: itemDesc,
        tokenUrl: fileUrl,
        tags: itemTags,
        format,
        userAddress: userInfo.address,
      });

      // ?????? ??????????????? ??????????????? ???????????? ?????? ????????? ??????
      const tokenId = tx.events.Transfer.returnValues.tokenId;

      modifyTokenId({ itemTrxHash: txHash, tokenId: tokenId });
      successAlert("????????? ?????????????????????!!");
    } catch (err: any) {
      if (err.code === 4001) {
        errorAlert("????????? ?????????????????????!!");
      } else {
        warnAlert("??????????????? ?????????????????? ????????? ???????????? ????????????.");
      }
    }
    navigate(`/artist/${userInfo.address}`, { replace: true });
  };

  const validateTitle = () => {
    const special_pattern = /[`~!@#$%^&*|\\\'\";:\/?]/gi;
    if (
      itemTitle.length < 1 ||
      itemTitle.length > 100 ||
      special_pattern.test(itemTitle)
    ) {
      return false;
    }
    return true;
  };
  const onDeleteTag = (itemTag: string) => {
    const idx = itemTags.findIndex(
      (currentItemTag) => currentItemTag === itemTag
    );
    setitemTags((prev) => [...prev.slice(0, idx), ...prev.slice(idx + 1)]);
  };

  useEffect(() => {
    if (!isLoggedIn.isLoggedIn) {
      navigate(-1);
      errorAlert("???????????? ????????? ??????????????????.");
    }
  }, [isLoggedIn]);

  return (
    <Container>
      {ispending && (
        <>
          <LoadContainer>
            <div> ?????? ????????????. ????????? ??????????????????...</div>
            <LoadingSpinner />
          </LoadContainer>
        </>
      )}
      {!ispending && (
        <MintingContainer>
          <TitleContainer>
            <Title label={"1??? NFT ??????"} size={"1.5rem"}></Title>
          </TitleContainer>
          <InputContainer>
            <div>
              <SubTitleContainer isRequired={true}>
                ?????????, ?????????, ?????????
              </SubTitleContainer>
              <FormatInfo>
                ?????? ???????????? ?????? ???????????? 2??? ????????? ????????? ????????? ???????????????
              </FormatInfo>
              <FormatInfo>Max Size: 10MB</FormatInfo>
              <FileDropBox handleFileChanged={handleFileChanged}></FileDropBox>
            </div>
            <InputTextContainer>
              <div>
                <SubTitleContainer isRequired={true}>??????</SubTitleContainer>
                <SmallMutedText>?????? ?????? ?????? ??????</SmallMutedText>
                <InputBox
                  placeholder="?????? ??????"
                  width="23rem"
                  onBlur={handleTitleChanged}
                ></InputBox>
              </div>
              <div>
                <SubTitleContainer isRequired={true}>??????</SubTitleContainer>
                <TextAreaBox
                  placeholder="?????? ??????"
                  width="23rem"
                  rows={6}
                  onBlur={handleDescChanged}
                  maxLength={500}
                ></TextAreaBox>
              </div>
              <div>
                <SubTitleContainer isRequired={false}>??????</SubTitleContainer>
                <SmallMutedText>??????, ?????? ?????? ?????? ??????</SmallMutedText>
                <TagInputBox
                  handleTagChanged={handleTagChanged}
                  onDeleteTag={onDeleteTag}
                ></TagInputBox>
              </div>
              <Button
                label={"?????? ??????"}
                width="7rem"
                backgroundColor="#6667ab"
                onClick={onClickCreateToken}
              ></Button>
            </InputTextContainer>
          </InputContainer>
        </MintingContainer>
      )}
    </Container>
  );
};

export default ParentMinting;
