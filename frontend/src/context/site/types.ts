export interface ISiteContextState {
  header: object;
  hero: object;
  about: object;
  menu: object;
  contact: object;
  footer: object;

  updateSection: Function;
}

export enum IActionTypes {
  UPDATE = "UPDATE_SECTION",
}

export interface IReducerAction {
  type: IActionTypes.UPDATE;
  payload: {
    name: string;
    data: object;
  };
}
