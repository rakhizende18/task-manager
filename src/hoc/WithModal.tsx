import { ComponentType, useEffect, useState } from "react";
import ReactModal from "react-modal";
import styled from "styled-components";
import { BUTTON_LABELS } from "@/constants";

type OriginalComponentProps = {};

const WithModal = <P extends OriginalComponentProps>(
  WrappedComponent: ComponentType<P>
) => {
  const WithStateComponent = (props: any) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const { CLOSE } = BUTTON_LABELS;

    useEffect(() => {
      setIsModalOpen(props.isModalOpen);
    }, [props.isModalOpen]);

    const handleClose = () => {
      setIsModalOpen(false);
      props.handleCloseModal();
    };

    return (
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={handleClose}
        ariaHideApp={false}
      >
        <Button onClick={handleClose}>{CLOSE}</Button>
        <WrappedComponent {...props} />
      </ReactModal>
    );
  };
  return WithStateComponent;
};

export default WithModal;

const Button = styled.button`
  padding: 8px 16px;
  margin-right: 8px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  width: 116px;
  margin-top: 10px;
  position: relative;
  float: right;

  &:hover {
    background-color: #0056b3;
  }
`;
