export interface Project {
    _id: string;
    name: string;
    description: string;
    owner: {
    _id: string;
    name: string;
    avatar?: string;
  };
  members: {
    user: {
      _id: string;
      name: string;
      avatar?: string;
    };
    role: string
  }[];
}