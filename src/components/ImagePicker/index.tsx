import { Button } from "@chakra-ui/react";
import { SetupContext } from "components/Context";
import React from "react";

const ALLOWED_FILE_TYPES = ["image/png", "image/jpeg", "image/gif"];

const ImagePicker = () => {
  const context = React.useContext(SetupContext);
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
      context?.setImage(url);
    } else alert("That's not an Image 😠 Try again!");
  };

  return (
    <>
      <Button onClick={triggerUploadFile} variant="outline" colorScheme={hasImage ? "gray" : "purple"}>
        <label ref={inputRef} htmlFor="upload">
          Set Image
        </label>
      </Button>
      <input type="file" id="upload" onChange={uploadFile} hidden />
    </>
  );
};

export default ImagePicker;
