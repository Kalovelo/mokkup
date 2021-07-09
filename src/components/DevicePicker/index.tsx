import { Flex, FormLabel, Grid, Icon, Input, Switch } from "@chakra-ui/react";
import ColorPicker from "components/ColorPicker";
import StackRadioGroup from "containers/StackRadioGroup";
import { DeviceContext } from "contexts/Device";
import { BEZEL, BROWSER, NONE } from "contexts/Device/constants";
import { BezelOptions, BrowserOptions } from "contexts/Device/types";
import React from "react";
import { ColorResult } from "react-color";
import { AiOutlineMobile } from "react-icons/ai";
import { FiCircle } from "react-icons/fi";
import { GoBrowser } from "react-icons/go";
import { formatRGBA } from "utils/colors";
import { BEZEL_COLOR_LABEL, DARK_MODE, HIDDEN_BAR, HIDDEN_TOGGLE, PLACEHOLDER, STEALTH_BUTTONS, URL_LABEL } from "./constants";

type BrowserOptionSwitch = {
  title: typeof DARK_MODE | typeof HIDDEN_BAR | typeof HIDDEN_TOGGLE | typeof STEALTH_BUTTONS;
  callback: (status: boolean) => void;
};
type BrowserOptionHandler = {
  input: {
    title: string;
    callback: (el: React.ChangeEvent<HTMLInputElement>) => void;
  };
  switches: BrowserOptionSwitch[];
};

type Option_Type = { value: string; label: JSX.Element };

const options: Option_Type[] = [
  {
    value: NONE,
    label: <Icon as={FiCircle} />,
  },
  {
    value: BROWSER,
    label: <Icon as={GoBrowser} />,
  },
  {
    value: BEZEL,
    label: <Icon as={AiOutlineMobile} />,
  },
];

const DevicePicker: React.FC = () => {
  const context = React.useContext(DeviceContext)!;

  const handleChange = (nextValue: string) => {
    switch (nextValue) {
      case BROWSER:
        return context.setDevice({
          title: BROWSER,
          options: {
            isDark: false,
            isStealth: false,
            isToggleHidden: false,
            isBarHidden: false,
          },
        });
      case BEZEL:
        return context.setDevice({
          title: BEZEL,
          options: { color: "#000000" },
        });
      case NONE:
        return context.setDevice({ title: NONE });
    }
  };

  const browserOptions: BrowserOptionHandler = {
    input: {
      title: URL_LABEL,
      callback: (e: React.ChangeEvent<HTMLInputElement>) => {
        const newDevice = { ...context.device };
        (newDevice.options as BrowserOptions).url = e.target!.value;
        context.setDevice(newDevice);
      },
    },
    switches: [
      {
        title: DARK_MODE,
        callback: (status: boolean) => {
          const newDevice = { ...context.device };
          (newDevice.options as BrowserOptions).isDark = status;
          context.setDevice(newDevice);
        },
      },
      {
        title: STEALTH_BUTTONS,
        callback: (status: boolean) => {
          const newDevice = { ...context.device };
          (newDevice.options as BrowserOptions).isStealth = status;
          context.setDevice(newDevice);
        },
      },
      {
        title: HIDDEN_TOGGLE,
        callback: (status: boolean) => {
          const newDevice = { ...context.device };
          (newDevice.options as BrowserOptions).isToggleHidden = status;
          context.setDevice(newDevice);
        },
      },
      {
        title: HIDDEN_BAR,
        callback: (status: boolean) => {
          const newDevice = { ...context.device };
          (newDevice.options as BrowserOptions).isBarHidden = status;
          context.setDevice(newDevice);
        },
      },
    ],
  };

  const changeBezelColor = (color: ColorResult): void => {
    const formattedColor = formatRGBA(color);
    const newDevice = { ...context.device };
    (newDevice.options as BezelOptions).color = formattedColor;
    context.setDevice(newDevice);
  };

  return (
    <Grid gridGap="30">
      <StackRadioGroup defaultValue={NONE} name="device type" options={options} callback={handleChange} />
      <Grid gridTemplateColumns="1fr 1fr" justifyContent="space-evenly" gridGap="8" alignItems="center">
        {context.device.title === BROWSER && (
          <>
            {browserOptions.switches.map((browserOption, index) => (
              <Grid key={index} gridTemplateColumns="90px 40px" alignItems="center">
                <FormLabel htmlFor={browserOption.title}>{browserOption.title}</FormLabel>
                <Switch onChange={(e) => browserOption.callback(e.target.checked)} id={browserOption.title} />
              </Grid>
            ))}
            <Flex gridGap="2" alignItems="center" gridColumn="1/-1">
              <FormLabel m="0" textAlign="center" htmlFor={browserOptions.input.title}>
                {browserOptions.input.title}
              </FormLabel>
              <Input w="100%" placeholder={PLACEHOLDER} id={browserOptions.input.title} onChange={browserOptions.input.callback} />
            </Flex>
          </>
        )}

        {context.device.title === BEZEL && (
          <>
            <label style={{ fontSize: ".9rem" }}>{BEZEL_COLOR_LABEL}</label>
            <ColorPicker color={(context.device.options as BezelOptions).color} callback={(color: ColorResult) => changeBezelColor(color)} />
          </>
        )}
      </Grid>
    </Grid>
  );
};

export default DevicePicker;
