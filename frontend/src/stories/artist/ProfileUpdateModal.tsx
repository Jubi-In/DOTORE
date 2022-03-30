import React, { useState } from "react";
import styled from "styled-components";
import { userInfoTypes } from "../..";
import { useMediaQuery } from "react-responsive";
import { ProfileImg } from "../profile/ProfileImg";
import { InputBox, TextAreaBox } from "../InputBox";
import { Button } from "../Button";
import { Icon } from "../common/Icon";
import { updateDesc, updateNickname } from "../../api/user";
import { SetterOrUpdater } from "recoil";

const Section = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: absolute;
`;
const ModalContainer = styled.div`
  /* display: grid; */
  /* width: 100%; */
  /* modal container */
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: hidden;

  position: fixed;
  width: 32rem;
  background: #ffffff;
  box-shadow: 0px 10px 20px rgba(32, 37, 38, 0.1),
    0px 20px 50px rgba(32, 37, 38, 0.1);
  border-radius: 6px;
  z-index: 10000;
  @media screen and (max-width: 768px) {
    width: 28rem;
  }
  @media screen and (max-width: 500px) {
    width: 24rem;
  }
`;

const ModalHeader = styled.div`
  display: flex;
  padding: 1rem;
  position: static;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  /* color: #6667AB; */
  h3 {
    /* 내 정보 수정 */
    font-weight: 700;
    font-size: 1.5rem;
    line-height: 2rem;
    /* identical to box height */
    color: #6667ab;
    /* Inside auto layout */
    flex: none;
    order: 0;
    flex-grow: 0;
    @media screen and (max-width: 500px) {
      font-size: 1.2rem;
    }
  }
  svg {
    font-size: 1.5rem;
  }
`;

const IconContainer = styled.div`
  cursor: pointer;
`;

const ModalBorder = styled.div`
  /* border */
  height: 2px;
  background: #f0f1f1;
  width: 100%;
  /* Inside auto layout */
  flex: none;
  order: 1;
  flex-grow: 0;
  margin: 0px 0px;
  height: 2px;
`;

const ModalBody = styled.div`
  /* body text */
  /* Auto layout */
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding: 2rem 1rem;
  /* Inside auto layout */
  flex: none;
  order: 2;
  flex-grow: 0;
  margin: 0px 0px;
  .content {
    width: 100%;
    left: 0px;
    top: 30px;
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 175%;
    /* or 32px */

    color: #3f575c;

    /* Inside auto layout */
    flex: none;
    order: 0;
    flex-grow: 0;
  }
  @media screen and (max-width: 768px) {
    padding: 1rem;
  }
`;

const ProfileImgContainer = styled.div`
  border-radius: 400px;
  box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
`;

const ModalInputBoxContainer = styled.div`
  width: 100%;
  padding-left: 1rem;
`;

const ModalFooter = styled.div`
  /* footer */
  /* Auto layout */
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  background: #f1f1f1;
  padding: 1rem;
  /* Inside auto layout */
  flex: none;
  order: 3;
  flex-grow: 0;
  width: 100%;
  .buttons {
    /* buttons */
    /* Auto layout */
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    /* Inside auto layout */
    flex: none;
    button {
      margin-left: 10px;
      box-shadow: 0px 6px 10px rgba(32, 37, 38, 0.1);
    }
  }
`;

const Backdrop = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.2);
`;

export interface ProfileUpdateModalProps {
  userInfo: userInfoTypes;
  setUserInfo: SetterOrUpdater<userInfoTypes>;
  onClose?: () => void;
  onValidate?: () => void;
  onClickToggleModal: () => void;
}

// interface IUserInfo {
//   nickname: string,
//   profileImgUrl: string,
//   description: string,
// }

export const ProfileUpdateModal = ({
  userInfo,
  setUserInfo,
  onClose,
  onValidate,
  onClickToggleModal,
  ...props
}: ProfileUpdateModalProps) => {
  const isMoblie = useMediaQuery({ maxWidth: 500 });
  const isPc = useMediaQuery({ minWidth: 768 });
  const imageSize = isMoblie ? "6rem" : isPc ? "10rem" : "7rem";
  const [nickname, setNickname] = useState<string>(userInfo.nickname);
  const [desc, setDesc] = useState<string>(userInfo.description);
  console.log(desc);
  const onClickSaveButton = () => {
    console.log("save!");
    if (nickname) {
      updateNickname(userInfo.address, nickname).then((res) => {
        console.log(res);
        setUserInfo({ ...userInfo, nickname });
      });
    }

    if (desc) {
      updateDesc(userInfo.address, desc).then((res) => {
        setUserInfo({ ...userInfo, description: desc });

        console.log(res);
      });
    }
    onClickToggleModal();
    // window.location.reload();
  };

  const onNicknameChange = (e: any) => {
    setNickname(e.target.value);
  };

  const onDescChange = (e: any) => {
    setDesc(e.target.value);
  };

  return (
    <Section>
      <ModalContainer>
        <ModalHeader>
          <h3>내 정보 수정</h3>
          <IconContainer onClick={onClickToggleModal}>
            <Icon mode="fas" icon="xmark" color="#9FABAE" />
          </IconContainer>
        </ModalHeader>
        <ModalBorder></ModalBorder>
        <ModalBody>
          <ProfileImgContainer>
            <ProfileImg
              profileImgUrl={userInfo.profile_img_url}
              size={imageSize}
            ></ProfileImg>
          </ProfileImgContainer>
          <ModalInputBoxContainer>
            <InputBox
              placeholder="닉네임"
              width="100%"
              maxLength={10}
              value={nickname}
              onChange={onNicknameChange}
            ></InputBox>
            <TextAreaBox
              placeholder="한 줄 소개"
              width="100%"
              rows={5}
              value={desc}
              onChange={onDescChange}
            ></TextAreaBox>
          </ModalInputBoxContainer>
        </ModalBody>
        <ModalFooter>
          <div className="buttons">
            <Button
              width={isMoblie ? "4rem" : "6rem"}
              label="취소"
              backgroundColor="#a09fae"
              onClick={onClickToggleModal}
            />
            <Button
              width={isMoblie ? "4rem" : "6rem"}
              label="저장"
              backgroundColor="#6667AB"
              onClick={onClickSaveButton}
            />
          </div>
        </ModalFooter>
      </ModalContainer>
      <Backdrop onClick={onClickToggleModal} />
    </Section>
  );
};
