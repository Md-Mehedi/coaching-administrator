import React from "react";

import { useCSVDownloader } from "react-papaparse";

export default function CSVDownloader({
  data,
  fileName,
  buttonLabel,
}: {
  data: string[][];
  fileName: string;
  buttonLabel: string;
}) {
  const { CSVDownloader, Type } = useCSVDownloader();
  let csvData = "";
  for (let i = 0; i < data.length; i++) {
    csvData += data[i].join(",") + "\n";
  }
  return (
    <CSVDownloader
      type={Type.Link}
      filename={fileName}
      bom={true}
      config={{
        delimiter: ",",
      }}
      data={csvData}
    >
      {buttonLabel}
    </CSVDownloader>
  );
}

// data={[
//   {
//     "Column 1": "1-1",
//     "Column 2": "1-2",
//     "Column 3": "1-3",
//     "Column 4": "1-4",
//   },
//   {
//     "Column 1": "2-1",
//     "Column 2": "2-2",
//     "Column 3": "2-3",
//     "Column 4": "2-4",
//   },
//   {
//     "Column 1": "3-1",
//     "Column 2": "3-2",
//     "Column 3": "3-3",
//     "Column 4": "3-4",
//   },
//   {
//     "Column 1": 4,
//     "Column 2": 5,
//     "Column 3": 6,
//     "Column 4": 7,
//   },
// ]}
