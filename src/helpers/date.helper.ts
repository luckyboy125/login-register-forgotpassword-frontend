import moment from "moment";

export const formatDate = (datetime: string) => {
  return moment(datetime).format("YYYY-MM-DD HH:mm:ss");
};
