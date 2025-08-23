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




