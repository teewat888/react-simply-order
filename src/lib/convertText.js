import { formatDate } from "../utils/timeFormat";

export const convertToHtml = (data) => {
  const res = ``;
  return res;
};

export const convertToPlainText = (data) => {
  const order_details = data.order_details;
  const details = order_details.map((detail) => {
    if (detail.qty !== "0") {
      if (detail.brand) {
        return `${detail.name}[${detail.brand}]\t${detail.qty} ${detail.unit}\n`;
      } else {
        return `${detail.name}\t${detail.qty} ${detail.unit}\n`;
      }
    }
  });
  const cleanDetails = details.filter((el) => el !== undefined); // only display the one without zero qty
  console.log("clean details: ", cleanDetails);
  const deliveryDate = formatDate(data.delivery_date);

  const res = `FROM:\t${
    data.customer
  }\nDelivery date:\t${deliveryDate}\n\nComment:\t${
    data.comment
  }\n\n${cleanDetails.join("")}`;
  return res;
};
