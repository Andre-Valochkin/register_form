import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  StyleFormWrapper,
  StyleFormTitle,
  StyleFormForm,
  StyleFormFormList,
  StyleFormFormElement,
  StyleFormLabel,
  StyleFormSpanName,
  StyleFormSpanStar,
  StyleFormInput,
  StyleFormCheckboxContainer,
  StyleFormLabelCheckbox,
  StyleFormInputCheckbox,
  StyleFormButton,
  StyleFormButtonShow,
} from "./styleForm";

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

function FormRegister() {
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
      <StyleFormWrapper>
        <StyleFormTitle>Форма регистрации</StyleFormTitle>
        <StyleFormForm onSubmit={handleSubmit(onSubmit, onInvalid)} noValidate>
          <StyleFormFormList>
            <StyleFormFormElement>
              <StyleFormLabel>
                <StyleFormSpanName>Email:</StyleFormSpanName>
                <StyleFormInput
                  {...register("mail")}
                  type="email"
                  placeholder="Введите email"
                />
                <StyleFormSpanName>
                  <StyleFormSpanStar>*</StyleFormSpanStar> Обязательное поле
                </StyleFormSpanName>
              </StyleFormLabel>
              {errors.mail && (
                <p style={{ color: "red", marginTop: 5 }}>
                  {errors.mail.message}
                </p>
              )}
            </StyleFormFormElement>
            <StyleFormFormElement>
              <StyleFormLabel>
                <StyleFormSpanName>Пароль:</StyleFormSpanName>
                <div style={{ position: "relative" }}>
                  <StyleFormInput
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    placeholder="Введите пароль"
                  />
                  <StyleFormButtonShow
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? "Скрыть" : "Показать"}
                  </StyleFormButtonShow>
                </div>
                <StyleFormSpanName>
                  <StyleFormSpanStar>*</StyleFormSpanStar> Обязательное поле
                </StyleFormSpanName>
              </StyleFormLabel>
              {errors.password && (
                <p style={{ color: "red", marginTop: 5 }}>
                  {errors.password.message}
                </p>
              )}
            </StyleFormFormElement>
            <StyleFormFormElement>
              <StyleFormLabel>
                <StyleFormSpanName>Повторите пароль:</StyleFormSpanName>
                <div style={{ position: "relative" }}>
                  <StyleFormInput
                    {...register("repeatPassword")}
                    type={showRepeatPassword ? "text" : "password"}
                    placeholder="Введите пароль еще раз"
                  />
                  <StyleFormButtonShow
                    type="button"
                    onClick={() => setShowRepeatPassword((prev) => !prev)}
                  >
                    {showRepeatPassword ? "Скрыть" : "Показать"}
                  </StyleFormButtonShow>
                </div>
                <StyleFormSpanName>
                  <StyleFormSpanStar>*</StyleFormSpanStar> Обязательное поле
                </StyleFormSpanName>
              </StyleFormLabel>
              {errors.repeatPassword && (
                <p style={{ color: "red", marginTop: 5 }}>
                  {errors.repeatPassword.message}
                </p>
              )}
            </StyleFormFormElement>
            <StyleFormFormElement>
              <StyleFormLabel>
                <StyleFormSpanName>Ник:</StyleFormSpanName>
                <StyleFormInput
                  {...register("nic")}
                  type="text"
                  placeholder="Придумайте себе псевдоним"
                />
              </StyleFormLabel>
              {errors.nic && (
                <p style={{ color: "red", marginTop: 5 }}>
                  {errors.nic.message}
                </p>
              )}
            </StyleFormFormElement>
            <StyleFormCheckboxContainer>
              <StyleFormLabelCheckbox>
                <StyleFormInputCheckbox
                  {...register("check")}
                  type="checkbox"
                />
                <StyleFormSpanName>Запомнить меня</StyleFormSpanName>
              </StyleFormLabelCheckbox>
              <StyleFormButton type="submit">
                Зарегистрироваться
              </StyleFormButton>
            </StyleFormCheckboxContainer>
          </StyleFormFormList>
        </StyleFormForm>
      </StyleFormWrapper>
    </>
  );
}

export default FormRegister;
