import { FormEvent, useState } from 'react';

export const HabitList = () => {
  const [habits, setHabits] = useState<string[]>([]);
  const [isAddNewHabit, setIsAddNewHabit] = useState(false);

  const [newHabit, setNewHabit] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHabits((currentHabits) => [...currentHabits, newHabit]);
    setIsAddNewHabit(false);

    setNewHabit('');
  };

  const habitTags = habits.map((habit) => (
    <li>
      <label htmlFor={habit}>{habit}</label>
    </li>
  ));

  return (
    <>
      <h1>Habits</h1>
      <ul>{habitTags}</ul>
      {isAddNewHabit ? (
        <>
          <form onSubmit={handleSubmit}>
            <input type="text" id="habit" required maxLength={50} value={newHabit} onChange={(e) => setNewHabit(e.target.value)} />
            <button type="submit">Submit</button>
          </form>

          <button type="button" onClick={() => setIsAddNewHabit(false)}>Cancel</button>
        </>
      ) : (
        <button onClick={() => setIsAddNewHabit(true)}>Add habit</button>
      )}
    </>
  );
}
