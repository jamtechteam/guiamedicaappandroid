import { ICategoryApp } from './ICategoryApp.interface';

export interface IDoctor {
  _id: string;
  picture?: File | null | object;
  name: string;
  lastName: string;
  gender: string;
  state: string;
  city: string;
  categoryApp: string | ICategoryApp;
  phone: string;
  numberOffice: string;
  whatsapp: string;
  email: string;
  website: string;
  socialNetworks: null | [];
  specialties: any[] | null | string[] | string;
  professions: any[] | null | string[] | string;
  services: string[] | string | null;
  package: string;
  offices: [] | null;
  createBy: string;
  description?: string; // se usa en los items de la lista de doctores para mostrar las especialidades por coma
  image?: string; // se usa en los items de la lista de doctores para mostrar la imagen
}

export interface ICity {
  _id: string;
  name: string;
  state: IState | string;
  active: boolean;
  slug: string;
}

export interface IState {
  _id: string;
  name: string;
  active: boolean;
  slug: string;
}

export interface IOffice {
  address: string;
  city: ICity;
  doctor: string;
  medicalCenter: any;
  schedules: any;
  state: string;
}
