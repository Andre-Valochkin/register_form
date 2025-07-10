import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import type { FileRejection } from "react-dropzone";
import {
  StyleDropzoneContainer,
  StyleDropzonePreviewImage,
  StyleDropzoneRemoveButton,
} from "../styleForm";

type FileDropzoneProps = {
  preview: string | null;
  onFileAccepted: (file: File) => void;
  onRemove: () => void;
  setPhotoError: (msg: string) => void;
  error?: string;
};

function FileDropzone({
  preview,
  onFileAccepted,
  onRemove,
  setPhotoError,
  error,
}: FileDropzoneProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileAccepted(acceptedFiles[0]);
      }
    },
    [onFileAccepted]
  );

  const onDropRejected = useCallback(
    (fileRejections: FileRejection[]) => {
      onRemove();
      if (fileRejections?.[0]?.errors?.[0]?.code === "file-invalid-type") {
        setPhotoError("Допустимы только файлы JPG или PNG");
      } else {
        setPhotoError("Ошибка загрузки файла");
      }
    },
    [onRemove, setPhotoError]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDropRejected,
    multiple: false,
    accept: { "image/jpeg": [], "image/png": [] },
    disabled: !!preview,
  });

  return (
    <div>
      {!preview ? (
        <StyleDropzoneContainer {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Отпустите файл для загрузки</p>
          ) : (
            <p>Перетащите фото сюда или кликните для выбора файла</p>
          )}
        </StyleDropzoneContainer>
      ) : (
        <>
          <StyleDropzonePreviewImage src={preview} alt="preview" />
          <StyleDropzoneRemoveButton type="button" onClick={onRemove}>
            Удалить фото
          </StyleDropzoneRemoveButton>
        </>
      )}
      {error && <p style={{ color: "red", marginTop: 5 }}>{error}</p>}
    </div>
  );
}

export default FileDropzone;
