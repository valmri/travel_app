export interface ITravel {
  id: number;
  name: string;
  city: string;
  country: string;
  image: string;
  description: string;
}

export interface ITravelDTO {
  name: string;
  city?: string;
  country?: string;
  image?: string;
  description?: string;
}
