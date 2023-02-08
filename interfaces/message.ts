export default interface Message {
  sender: string;
  recipient: string;
  content: {
    message: string;
    time: string;
  };
};