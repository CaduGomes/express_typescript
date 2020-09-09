import IList from "./list";

export default interface IBoard {
  _id: any;
  name: string;
  lists?: IList[];
  users?: Array<any>;
  owner: any;
}
