import React from "react";
import { Tabs } from "antd";
import AmountRanking from "./AmountRanking";
import ActivitiesRanking from "./ActivitiesRanking";
const onChange = (key) => {
  console.log(key);
};
const items = [
  {
    key: "1",
    label: "Bảng vàng tài trợ",
    children: <AmountRanking />,
  },
  {
    key: "2",
    label: "Bảng vàng hoạt động",
    children: <ActivitiesRanking />,
  },
];
export default function Ranking() {
  return (
    <Tabs defaultActiveKey="1" items={items} onChange={onChange} centered />
  );
}
