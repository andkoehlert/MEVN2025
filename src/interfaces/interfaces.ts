export type ProDuck = {
  
  _id: string;
  name: string;
  agent: string;
  description: string;
  imageURL: string;
  age: number;
  wanted: boolean;
  notWanted: boolean;
  species: string;
  friendly: boolean;
  hostile: boolean;
  ducksAssassinated: number;
  isHidden: boolean;
  _createdBy: string,
}

export type newProDuck = Omit<ProDuck, '_id'> & {
_createdBy?: string
}

export type User = {
  
    id: string
    name: string
    email: string
    password: string
    registerDate: string
  
}