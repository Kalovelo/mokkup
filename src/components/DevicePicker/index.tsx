import { Icon } from "@chakra-ui/react";
import { BROWSER, BROWSER_TYPE, MOBILE, MOBILE_TYPE, NONE, NONE_TYPE } from "containers/DeviceWrapper/constants";
import StackRadioGroup from "containers/StackRadioGroup";
import { DeviceContext } from "contexts/Device";
import React from "react";
import { AiOutlineMobile } from "react-icons/ai";
import { FiCircle } from "react-icons/fi";
import { GoBrowser } from "react-icons/go";

const DevicePicker: React.FC = () => {
  const context = React.useContext(DeviceContext)!;

  type Option_Type = { value: string; label: JSX.Element };

  const options: Option_Type[] = [
    {
      value: BROWSER,
      label: <Icon as={GoBrowser} />,
    },
    {
      value: MOBILE,
      label: <Icon as={AiOutlineMobile} />,
    },
    {
      value: NONE,
      label: <Icon as={FiCircle} />,
    },
  ];

  const handleChange = (nextValue: BROWSER_TYPE | MOBILE_TYPE | NONE_TYPE) => context.setDevice(nextValue);

  return <StackRadioGroup defaultValue={NONE} name="device type" options={options} callback={handleChange} />;
};

export default DevicePicker;
