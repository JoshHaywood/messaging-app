// Users table interface
export default interface User {
  user_name: string;
  first_name: string;
  last_name: string;
  email: string;
  profile_picture: string;
  about: string;
  password: string;
  salt: string;
};