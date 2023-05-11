export default interface Message {
  sender: string;
  recipient: string;
  message: string | null;
  image: string | null;
  time: string;
  date: string;
};