import { HabitList } from "./habit-list";
import { Tabs } from "./tabs";

const tabs = [
  {
    component: <HabitList />,
    title: 'Habits',
  },
  {
    component: <div>Lorem ipsum</div>,
    title: 'Progress',
  },
];

export const App = () => (
  <Tabs tabs={tabs} />
);
