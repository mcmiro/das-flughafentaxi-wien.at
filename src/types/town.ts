export type TownModelProps = {
  id: number;
  district: string;
  postal_code: string;
  town: string;
  sm: number;
  md: number;
  lg: number;
};

export type TownModel = {
  [key: string]: TownModelProps[];
};
