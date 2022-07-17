export default function createQueryParam(object) {
  let i = 0;
  let attributeList = Object.entries(object);
  let query = attributeList.length > 0 ? "?" : "";
  attributeList.map((item, index) => {
    query += item[0] + "=" + object[item[0]];
    if (index + 1 != attributeList.length) query += "&";
  });
  return query;
}
