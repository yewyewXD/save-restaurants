export interface ISiteContextState {
  header: object;
  hero: object;
  about: object;
  menu: object;
  contact: object;
  footer: object;

  updateSection: Function;
}

export interface IReducerAction {
  type: "UPDATE_SECTION";
  payload: {
    name: string;
    data: object;
  };
}
