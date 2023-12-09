export interface IService {
  _id: string;
  name: string;
  address: string;
  phone1: string;
  phone2: string;
  category: ICategory;
  createBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICategory {
  _id: string;
  name: string;
  description: string;
  createBy: string;
  createdAt: Date;
  updatedAt: Date;
}
