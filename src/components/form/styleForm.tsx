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
  background-color: rgba(40, 40, 245, 0.89);
  padding: 10px 40px;
  color: #fff;
`;

export const StyleFormButtonShow = styled.button`
  position: absolute;
  right: 10px;
  top: 15px;
  background: none;
  border: none;
  cursor: pointer;
`;
