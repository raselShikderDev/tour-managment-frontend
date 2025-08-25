export interface ICreateTourType{
    name: string;
}

export interface ICreateTourTypeResponse {
  name: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}


export interface IGetAllTourTypeResponse {
  meta: {
      total: number;
  }
  data: ICreateTourTypeResponse[]
}

export interface ISingelTourResponse {
  _id: string;
  title: string;
  location: string;
  description: string;
  costForm: number;
  images: string[];
  departureLocation: string;
  arrivalLocation: string;
  included: string[];
  excluded: string[];
  amenities: string[];
  tourPlan: string[];
  maxGuest: number;
  minAge: number;
  division: string;
  tourType: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  slug: string;
  __v: number;
}





