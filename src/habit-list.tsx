import { FormEvent, useCallback, useMemo, useState } from 'react';

type Habit = {
  id: string;
  isCompleted: boolean;
  name: string;
};

const createNewHabit = (): Habit => ({
  id: crypto.randomUUID(),
  isCompleted: false,
  name: '',
});

export const HabitList = () => {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isAddNewHabit, setIsAddNewHabit] = useState(false);

  const [newHabit, setNewHabit] = useState<Habit>(createNewHabit());

  const setNewHabitName = useCallback((name: string) => {
    setNewHabit((currentNewHabit) => ({ ...currentNewHabit, name }));
  }, []);

  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHabits((currentHabits) => [...currentHabits, newHabit]);
    setIsAddNewHabit(false);

    setNewHabit(createNewHabit());
  }, [createNewHabit, newHabit]);

  const habitTags = useMemo(() => (
    habits.map(({ id, isCompleted, name }) => (
      <li key={id}>
        <input
          type="checkbox"
          id={id}
          name={name}
          checked={isCompleted}
          onChange={(e) => setHabits((currentHabits) => {
            const newHabits = [...currentHabits];
            const habitToModify = newHabits.find(
              ({ id: habitId }) => id === habitId
            )!;

            habitToModify.isCompleted = e.target.checked;

            return newHabits;
          })}
        />
        {isCompleted ? (
          <del><label htmlFor={id}>{name}</label></del>
        ) : (
          <label htmlFor={id}>{name}</label>
        )}
      </li>
    ))
  ), [habits]);

  return (
    <>
      <h1>Habits</h1>
      {isAddNewHabit ? (
        <>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="habit"
              required
              maxLength={50}
              value={newHabit.name}
              onChange={(e) => setNewHabitName(e.target.value)}
              autoFocus
            />
            <button type="submit">Submit</button>
          </form>

          <button
            type="button"
            onClick={() => setIsAddNewHabit(false)}
          >
            Cancel
          </button>
        </>
      ) : (
        <button onClick={() => setIsAddNewHabit(true)}>Add habit</button>
      )}
      <ul>{habitTags}</ul>
    </>
  );
}
