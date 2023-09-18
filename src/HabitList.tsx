import { useState } from 'react';

export const HabitList = () => {
  const [habits] = useState([]);

  const habitTags = habits.map(({ name }) => (
    <li>
      <input type="checkbox" id={name} />
      <label htmlFor={name}>{name}</label>
    </li>
  ));

  return (
    <>
      <h1>Habits</h1>
      <ul>{habitTags}</ul>
    </>
  );
}
