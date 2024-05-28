export type VehiclePropertiesModel = {
  title: string;
  image: string;
};

export type VehicleModel = {
  type: string;
  title: string;
  image: string;
  persons: VehiclePropertiesModel;
  luggage: VehiclePropertiesModel;
  bags: VehiclePropertiesModel;
  active: boolean;
};
