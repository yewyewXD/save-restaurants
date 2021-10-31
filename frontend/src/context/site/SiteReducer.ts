import { IReducerAction, IActionTypes } from "./types";

const SiteReducer = (state: any, { type, payload }: IReducerAction) => {
  switch (type) {
    case IActionTypes.UPDATE:
      return {
        ...state,
        [payload.field]: payload.data,
      };

    default:
      return state;
  }
};

export default SiteReducer;
