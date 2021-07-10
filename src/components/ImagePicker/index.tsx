import { Button } from "@chakra-ui/react";
import { useImage } from "contexts/Image";
import { SET_IMAGE } from "contexts/Image/constants";
import React from "react";
import { CTA_TEXT, WRONG_FILE_TYPE_ALERT } from "./constants";

const ALLOWED_FILE_TYPES = ["image/png", "image/jpeg", "image/gif"];

const ImagePicker: React.FC = () => {
  const context = useImage()!;
  const inputRef = React.useRef<HTMLLabelElement>(null);
  const [hasImage, sethasImage] = React.useState<boolean>(false);

  React.useEffect(() => {
    sethasImage(!!context?.image);
  }, [context?.image]);

  const triggerUploadFile = () => inputRef.current?.click();

  const uploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    let files = e.target.files;

    if (ALLOWED_FILE_TYPES.includes(files![0].type)) {
      const url = URL.createObjectURL(files![0]);
      context.dispatch({ type: SET_IMAGE, payload: url });
    } else alert(WRONG_FILE_TYPE_ALERT);
  };

  return (
    <>
      <Button w="100%" onClick={triggerUploadFile} variant="outline" colorScheme={hasImage ? "gray" : "purple"}>
        <label ref={inputRef} htmlFor="upload">
          {CTA_TEXT}
        </label>
      </Button>
      <input type="file" id="upload" onChange={uploadFile} hidden />
    </>
  );
};

export default React.memo(ImagePicker);
