export interface TeamMember {
  _id:    string;
  name:   string;
  initial:string;
  role:   string;
  quote:  string;
  bio:    string;
  image?: string;
  linkedin?: string;
  email?:    string;
  order:  number;
}
