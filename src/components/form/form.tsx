import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FileDropzone from "./dropzone/FileDropzone";
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
    mail: z.string().superRefine((val, ctx) => {
      if (!val.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Поле Email обязательно для заполнения",
        });
      } else if (!/^\S+@\S+\.\S+$/.test(val)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Не верный формат email",
        });
      }
    }),
    password: z.string().superRefine((val, ctx) => {
      if (!val.trim()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Поле Пароль обязательно для заполнения",
        });
        return;
      }

      const passwordErrors: string[] = [];

      if (val.length < 6) {
        passwordErrors.push("Минимум 6 символов");
      }
      if (!/[a-z]/.test(val)) {
        passwordErrors.push("Должна быть хотя бы одна маленькая буква");
      }
      if (!/[A-Z]/.test(val)) {
        passwordErrors.push("Должна быть хотя бы одна большая буква");
      }
      if (!/[^a-zA-Z0-9]/.test(val)) {
        passwordErrors.push("Должен быть хотя бы один спецсимвол");
      }

      if (passwordErrors.length) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: passwordErrors.join("\n"),
        });
      }
    }),
    repeatPassword: z.string(),
    nic: z
      .string()
      .min(3, { message: "Минимум 3 символа" })
      .or(z.literal(""))
      .optional(),
    check: z.boolean().optional(),
    photo: z.any().optional(),
  })
  .superRefine((data, ctx) => {
    if (
      data.password &&
      data.repeatPassword &&
      data.password !== data.repeatPassword
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Пароли не совпадают",
        path: ["repeatPassword"],
      });
    }
  });

type MyForm = z.infer<typeof schema>;

function FormRegister() {
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm<MyForm>({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    reValidateMode: "onChange",
    criteriaMode: "all",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoError, setPhotoError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const mail = watch("mail") ?? "";
  const password = watch("password") ?? "";
  const repeatPassword = watch("repeatPassword") ?? "";

  const isRequiredFieldsFilled =
    mail.trim() !== "" &&
    password.trim() !== "" &&
    repeatPassword.trim() !== "" &&
    preview !== null;

  const onSubmit = async (data: MyForm) => {
    if (!photo) {
      setPhotoError("Загрузите фото");
      return;
    }

    if (data.password !== data.repeatPassword) {
      setError("repeatPassword", {
        type: "manual",
        message: "Пароли не совпадают",
      });
      return;
    }

    console.log("Данные формы: ", data);
    alert("Форма успешно отправлена!");
  };

  const handleFileAccepted = (file: File) => {
    setPhotoError(null);
    setPhoto(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleFileRemove = () => {
    setPhoto(null);
    setPreview(null);
    setPhotoError(null);
  };

  return (
    <>
      <StyleFormWrapper>
        <StyleFormTitle>Форма регистрации</StyleFormTitle>
        <StyleFormForm onSubmit={handleSubmit(onSubmit)} noValidate>
          <StyleFormFormList>
            <StyleFormFormElement>
              <StyleFormLabel>
                <StyleFormSpanName>
                  Email: <StyleFormSpanStar>*</StyleFormSpanStar>
                </StyleFormSpanName>
                <StyleFormInput
                  {...register("mail")}
                  type="email"
                  placeholder="Введите email"
                />
              </StyleFormLabel>
              {errors.mail && (
                <p style={{ color: "red", marginTop: 5 }}>
                  {errors.mail.message}
                </p>
              )}
            </StyleFormFormElement>
            <StyleFormFormElement>
              <StyleFormLabel>
                <StyleFormSpanName>
                  Пароль: <StyleFormSpanStar>*</StyleFormSpanStar>
                </StyleFormSpanName>
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
              </StyleFormLabel>
              {errors.password && (
                <ul style={{ color: "red", marginTop: 5, paddingLeft: 20 }}>
                  {(errors.password.message?.split("\n") ?? []).map(
                    (msg, idx) => (
                      <li key={idx}>{msg}</li>
                    )
                  )}
                </ul>
              )}
            </StyleFormFormElement>
            <StyleFormFormElement>
              <StyleFormLabel>
                <StyleFormSpanName>
                  Повторите пароль: <StyleFormSpanStar>*</StyleFormSpanStar>
                </StyleFormSpanName>
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
            <StyleFormFormElement>
              <StyleFormLabel>
                <StyleFormSpanName>
                  Фото: <StyleFormSpanStar>*</StyleFormSpanStar>
                </StyleFormSpanName>
                <FileDropzone
                  preview={preview}
                  onFileAccepted={handleFileAccepted}
                  onRemove={handleFileRemove}
                  setPhotoError={setPhotoError}
                  error={photoError}
                />
              </StyleFormLabel>
            </StyleFormFormElement>

            <StyleFormCheckboxContainer>
              <StyleFormLabelCheckbox>
                <StyleFormInputCheckbox
                  {...register("check")}
                  type="checkbox"
                />
                <StyleFormSpanName>Запомнить меня</StyleFormSpanName>
              </StyleFormLabelCheckbox>
              <StyleFormButton type="submit" disabled={!isRequiredFieldsFilled}>
                Зарегистрироваться
              </StyleFormButton>
            </StyleFormCheckboxContainer>
          </StyleFormFormList>
        </StyleFormForm>
        <p>
          <StyleFormSpanStar>*</StyleFormSpanStar> - Поля обязательные для
          заполнения!
        </p>
      </StyleFormWrapper>
    </>
  );
}

export default FormRegister;
