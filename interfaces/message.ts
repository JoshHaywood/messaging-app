export default interface Message {
  recipient: string;

  content: {
    message: string;
    time: string;
  };
};