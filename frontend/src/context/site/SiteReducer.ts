import { IReducerAction } from "./types";

const SiteReducer = (state: any, { type, payload }: IReducerAction) => {
  switch (type) {
    case "UPDATE_SECTION":
      return {
        ...state,
        [payload.name]: payload.data,
      };

    default:
      return state;
  }
};

export default SiteReducer;
