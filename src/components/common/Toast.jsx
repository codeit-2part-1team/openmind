import styled from "styled-components";

function Toast({ visible, children }) {
  return (
    <ToastBox $visible={visible}>
      {children}
    </ToastBox>
  );
}

export default Toast;

const ToastBox = styled.div`
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  background: black;
  color: white;
  padding: 10px 18px;
  border-radius: 6px;
  font-size: 14px;
  max-width: 90vw;
  text-align: center;
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  transition: opacity 0.5s ease;
  pointer-events: none;

  @media (max-width: 768px) {
    bottom: 80px;
    font-size: 13px;
    padding: 9px 16px;
  }
`;