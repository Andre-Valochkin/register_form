import styled from "styled-components";

export const StyleFormWrapper = styled.div`
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px 5px #00000067;
  width: 500px;
  margin: 50px auto;
`;

export const StyleFormTitle = styled.h2`
  text-transform: uppercase;
  text-align: center;
`;

export const StyleFormForm = styled.form``;

export const StyleFormFormList = styled.ul`
  display: flex;
  flex-direction: column;
  padding-left: 0;
  gap: 30px;
`;

export const StyleFormFormElement = styled.li`
  list-style-type: none;
`;

export const StyleFormLabel = styled.label``;

export const StyleFormSpanName = styled.span`
  margin-left: 20px;
`;

export const StyleFormSpanStar = styled.span`
  font-size: 20px;
  color: brown;
`;

export const StyleFormInput = styled.input`
  width: 100%;
  height: 30px;
  border-radius: 5px;
  margin: 5px 0;
  border: 1px solid #00000034;
`;

export const StyleFormCheckboxContainer = styled.li`
  list-style-type: none;
  display: flex;
  justify-content: space-between;
`;

export const StyleFormLabelCheckbox = styled.label``;

export const StyleFormInputCheckbox = styled.input``;

export const StyleFormButton = styled.button`
  padding: 10px 20px;
  background-color: #4a90e2;
  color: white;
  font-size: 16px;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover:not(:disabled) {
    background-color: rgba(40, 40, 245, 0.89);
  }

  &:disabled {
    background-color: #a0aec0;
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const StyleFormButtonShow = styled.button`
  position: absolute;
  right: 10px;
  top: 15px;
  background: none;
  border: none;
  cursor: pointer;
`;

export const StyleDropzoneContainer = styled.div`
  border: 2px dashed #888;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    border-color: #555;
    background: #f9f9f9;
  }
`;

export const StyleDropzonePreviewImage = styled.img`
  width: 80px;
  height: 80px;
  margin-top: 10px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #888;
`;

export const StyleDropzoneRemoveButton = styled.button`
  margin-top: 10px;
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #cc0000;
  }
`;
