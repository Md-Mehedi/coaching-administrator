import React from "react";
import { TabLayoutContent } from "../../layouts/tab-layout";

import TabLayout from "./../../layouts/tab-layout";
import AdminInformationInput from "./admin-information-input";
import CoachingInformationInput from "./coaching-information-input";
import CoachingInformationOutput from "./coaching-information-output";
import AdminInformationOutput from "./admin-information-output";

const tabs: TabLayoutContent[] = [
  { title: "CIO", element: <CoachingInformationOutput /> },
  { title: "CII", element: <CoachingInformationInput /> },
  { title: "AII", element: <AdminInformationInput /> },
  { title: "AIO", element: <AdminInformationOutput /> },
];
// const tabs: TabLayoutContent[] = [
//   { title: "Coaching Information", element: <CoachingInformationOutput /> },
//   { title: "Coaching Information", element: <CoachingInformationInput /> },
//   { title: "Admin Information", element: <AdminInformationInput /> },
// ];

export default function Settings() {
  return <TabLayout tabs={tabs} />;
}
