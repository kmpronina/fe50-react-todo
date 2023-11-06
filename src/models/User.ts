import { Task } from './Task';

export type User = {
  id: number;
  label: string;
  tasks: Task[];
};

export type UserFromPlaceholder = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: AdressType;
  phone: string;
  website: string;
  company: CompanyType;
};

type AdressType = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: GeoType;
};

type GeoType = {
  lat: string;
  lng: string;
};

type CompanyType = {
  name: string;
  catchPhrase: string;
  bs: string;
};
