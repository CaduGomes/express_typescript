import ICard from "./card";

export default interface IList {
  name: string;
  cards?: ICard[];
}
