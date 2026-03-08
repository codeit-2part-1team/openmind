import styled from "styled-components";
import ThumbUp from "../../assets/icons/icon-thumbs-up.svg?react";
import ThumbDown from "../../assets/icons/icon-thumbs-down.svg?react";
import { useState } from "react";

export default function LikeButton() {
  const [likeCount, setLikeCount] = useState(10);
  const [dislikeCount, setDislikeCount] = useState(2);

  const [selected, setSelected] = useState(null); 
  // null | "like" | "dislike"

  const handleLike = () => {
    if (selected === "like") return;

    if (selected === "dislike") {
      setDislikeCount((prev) => prev - 1);
    }

    setLikeCount((prev) => prev + 1);
    setSelected("like");
  };

  const handleDislike = () => {
    if (selected === "dislike") return;

    if (selected === "like") {
      setLikeCount((prev) => prev - 1);
    }

    setDislikeCount((prev) => prev + 1);
    setSelected("dislike");
  };

  return (
    <Wrapper>
      <Button
        onClick={handleLike}
        $active={selected === "like"}
        data-active={selected === "like"}
      >
        <Icon>
          <ThumbUp />
        </Icon>
        좋아요 {likeCount}
      </Button>

      <DislikeButton
        onClick={handleDislike}
        $active={selected === "dislike"}
        data-active={selected === "dislike"}
      >
        <Icon>
          <ThumbDown />
        </Icon>
        싫어요 {dislikeCount}
      </DislikeButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  gap: 11px;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;

  background: white;
  cursor: pointer;
  color: var(--grayScale-40);

  svg {
    width: 16px;
    height: 16px;
  }
  
  ${({ $active }) =>
    $active &&
    `
      color: var(--blue-50);
      svg {
        color: var(--blue-50);
      }
    `}

  &:hover {
    ${({ $active }) =>
      !$active &&
      `
        color: var(--grayScale-60);
        svg {
          color: var(--grayScale-60);
        }
      `}
  }
`;

const DislikeButton = styled(Button)`
  ${({ $active }) =>
    $active &&
    `
      color: var(--blue-50);
      svg {
        color: var(--blue-50);
      }
    `}

  &:hover {
    ${({ $active }) =>
      !$active &&
      `
        color: var(--grayScale-60);
        svg {
          color: var(--grayScale-60);
        }
      `}
  }
`;

const Icon = styled.span`
  display: flex;

  svg path {
    fill: currentColor;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;