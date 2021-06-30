import { Button } from "@chakra-ui/react";
import { SetupContext } from "components/Context";
import React from "react";

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
    const url = URL.createObjectURL(files![0]);
    context?.setImage(url);
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
