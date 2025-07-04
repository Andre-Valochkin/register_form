import { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "./App.css";

const schema = z
  .object({
    mail: z.string().email({ message: "Не верный формат email" }),
    password: z.string().min(6, { message: "минимум 6 символов" }),
    repeatPassword: z.string(),
    nic: z
      .string()
      .min(3, { message: "Минимум 3 символа" })
      .or(z.literal(""))
      .optional(),
    check: z.boolean().optional(),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Пароли не совпадают",
    path: ["repeatPassword"],
  });

type MyForm = z.infer<typeof schema>;

const Wrapper = styled.div`
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px 5px #00000067;
  width: 500px;
  margin: 50px auto;
`;

const Title = styled.h2`
  text-transform: uppercase;
  text-align: center;
`;

const Form = styled.form``;

const FormList = styled.ul`
  display: flex;
  flex-direction: column;
  padding-left: 0;
  gap: 30px;
`;

const FormElement = styled.li`
  list-style-type: none;
`;

const Label = styled.label``;

const Span = styled.span`
  margin-left: 20px;
`;

const SpanStar = styled.span`
  font-size: 20px;
  color: brown;
`;

const Input = styled.input`
  width: 100%;
  height: 30px;
  border-radius: 5px;
  margin: 5px 0;
  border: 1px solid #00000034;
`;

const CheckboxContainer = styled.li`
  list-style-type: none;
  display: flex;
  justify-content: space-between;
`;

const LabelCheckbox = styled.label``;

const InputCheckbox = styled.input``;

const Button = styled.button`
  background-color: rgba(40, 40, 245, 0.89);
  padding: 10px 40px;
  color: #fff;
`;

function App() {
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<MyForm>({
    resolver: zodResolver(schema),
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const onSubmit = (data: MyForm) => {
    console.log("Данные формы: ", data);
    alert("Форма успешно отправлена!");
  };

  const onInvalid = (errors: any) => {
    const firstError = Object.keys(errors)[0];
    if (firstError) {
      setFocus(firstError as keyof MyForm);
    }
  };

  return (
    <>
      <Wrapper>
        <Title>Форма регистрации</Title>
        <Form onSubmit={handleSubmit(onSubmit, onInvalid)} noValidate>
          <FormList>
            <FormElement>
              <Label>
                <Span>Email:</Span>
                <Input
                  {...register("mail")}
                  type="email"
                  placeholder="Введите email"
                />
                <Span>
                  <SpanStar>*</SpanStar> Обязательное поле
                </Span>
              </Label>
              {errors.mail && (
                <p style={{ color: "red", marginTop: 5 }}>
                  {errors.mail.message}
                </p>
              )}
            </FormElement>
            <FormElement>
              <Label>
                <Span>Пароль:</Span>
                <div style={{ position: "relative" }}>
                  <Input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    placeholder="Введите пароль"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "5px",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    {showPassword ? "Скрыть" : "Показать"}
                  </button>
                </div>
                <Span>
                  <SpanStar>*</SpanStar> Обязательное поле
                </Span>
              </Label>
              {errors.password && (
                <p style={{ color: "red", marginTop: 5 }}>
                  {errors.password.message}
                </p>
              )}
            </FormElement>
            <FormElement>
              <Label>
                <Span>Повторите пароль:</Span>
                <div style={{ position: "relative" }}>
                  <Input
                    {...register("repeatPassword")}
                    type={showPassword ? "text" : "password"}
                    placeholder="Введите пароль еще раз"
                  />
                  <button
                    type="button"
                    onClick={() => setShowRepeatPassword((prev) => !prev)}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "5px",
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                  >
                    {showRepeatPassword ? "Скрыть" : "Показать"}
                  </button>
                </div>
                <Span>
                  <SpanStar>*</SpanStar> Обязательное поле
                </Span>
              </Label>
              {errors.repeatPassword && (
                <p style={{ color: "red", marginTop: 5 }}>
                  {errors.repeatPassword.message}
                </p>
              )}
            </FormElement>
            <FormElement>
              <Label>
                <Span>Ник:</Span>
                <Input
                  {...register("nic")}
                  type="text"
                  placeholder="Придумайте себе псевдоним"
                />
              </Label>
              {errors.nic && (
                <p style={{ color: "red", marginTop: 5 }}>
                  {errors.nic.message}
                </p>
              )}
            </FormElement>
            <CheckboxContainer>
              <LabelCheckbox>
                <InputCheckbox {...register("check")} type="checkbox" />
                <Span>Запомнить меня</Span>
              </LabelCheckbox>
              <Button type="submit">Зарегистрироваться</Button>
            </CheckboxContainer>
          </FormList>
        </Form>
      </Wrapper>
    </>
  );
}

export default App;
