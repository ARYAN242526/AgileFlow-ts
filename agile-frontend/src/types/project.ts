export interface Project {
    _id: string;
    name: string;
    description: string;
    owner: {
    _id: string;
    name: string;
    email: string;
  };
  members: string[];
}