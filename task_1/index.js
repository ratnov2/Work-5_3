import { encoded, translations } from "./data.js";

const decoded = () => {
  const excludedFields = ["groupId", "service", "formatSize", "ca"];
  const uniqueIds = new Set();
  const decodedList = encoded.map((item) => {
    const decodedItem = { ...item };

    Object.keys(decodedItem).forEach((key) => {
      if (key.endsWith("Id") && !excludedFields.includes(key)) {
        decodedItem[key] = translations[item[key]];
        if (decodedItem[key] === undefined || decodedItem[key] === "")
          delete decodedItem[key];
        else {
          uniqueIds.add(item[key]);
        }
      }
    });

    return decodedItem;
  });

  return { decodedList, uniqueIds: [...uniqueIds] };
};

console.log(JSON.stringify(decoded(), null, 2));
