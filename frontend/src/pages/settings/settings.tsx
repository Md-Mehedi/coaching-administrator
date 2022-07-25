import React from "react";
import { TabLayoutContent } from "../../layouts/tab-layout";

import TabLayout from "./../../layouts/tab-layout";
import AdminInfoInput from "./admin-info-input";
import CoachingInfoInput from "./coaching-info-input";
import CoachingInfoOutput from "./coaching-info-output";
import AdminInfoOutput from "./admin-info-output";
import AdminList from "./admin-list";
import PasswordChange from "./password-change";

const tabs: TabLayoutContent[] = [
  { title: "Admin List", element: <AdminList /> },
  { title: "Coaching Information Input", element: <CoachingInfoInput /> },
  { title: "Coaching Information Output", element: <CoachingInfoOutput /> },
  { title: "Admin Information Input", element: <AdminInfoInput /> },
  { title: "Admin Information Output", element: <AdminInfoOutput /> },
  { title: "Password Change", element: <PasswordChange /> },
];
// const tabs: TabLayoutContent[] = [
//   { title: "Coaching Information", element: <CoachingInformationOutput /> },
//   { title: "Coaching Information", element: <CoachingInformationInput /> },
//   { title: "Admin Information", element: <AdminInformationInput /> },
// ];

export default function Settings() {
  return <TabLayout tabs={tabs} />;
}
