import { SET_IMAGE } from "./constants";

export type Action = {
  type: typeof SET_IMAGE;
  payload: string;
};
