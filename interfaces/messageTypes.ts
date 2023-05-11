export default interface MessageTypes {
  sender: string;
  recipient: string;
  message: string | null;
  image: string | null;
  time: string;
  date: string;
}
