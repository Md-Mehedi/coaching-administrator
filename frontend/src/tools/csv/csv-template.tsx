/********************************************************/
/*         Don't change these templates!!!              */
/********************************************************/

export const csvTemplate = {
  student: [
    "Full name",
    "Nickname",
    "Gender",
    "Email",
    "Date of birth(dd-mm-yyyy)",
    "Blood group",
    "Nationality",
    "Religion",
    "Father's name",
    "Father's Occupation",
    "Mother's name",
    "Mother's Occupation",
    "Present Address (Upazila)",
    "Present Address (House no/Road no)",
    "Permanent Address (Upazila)",
    "Permanent Address (House no/Road no)",
    "Currently studying (Exam name)",
    "Currently studying (Institution name)",
    "Currently studying (Group/Department name)",
    "JSC Institution name",
    "JSC Group name",
    "JSC Passing year",
    "JSC Result",
    "SSC Institution name",
    "SSC Group name",
    "SSC Passing year",
    "SSC Result",
    "HSC Institution name",
    "HSC Group name",
    "HSC Passing year",
    "HSC Result",
    "Personal number",
    "Father number",
    "Mother number",
  ],
};

/**
 * It takes a template and a data array and returns an array of objects with the template as the keys
 * and the data as the values
 * @param {string[]} template - ["name", "age", "gender"]
 * @param {string[][]} data -
 * @returns An array of objects.
 */
export function parseCSV(template: string[], data: string[][]) {
  console.log(data);
  return data.map((row) => {
    if (row.length !== template.length) {
      console.log("error");
      return null;
    }
    let object = Object.create(null);
    for (let i = 0; i < template.length; i++) {
      object[template[i]] = row[i];
    }
    return object;
  });
}
