import { TownModel } from './town';

export type AdditionalModel = {
  id: number;
  additional_address_lg: number;
  additional_address_md: number;
  additional_address_sm: number;
  meet_and_greet: number;
};

export type AdditionalaAndTownsModel = {
  additionals: AdditionalModel;
  towns: TownModel;
};
