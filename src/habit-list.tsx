import { FormEvent, useCallback, useMemo, useState } from 'react';

import styles from './habit-list.module.css';

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

  const setHabitIsCompleted = useCallback(
    (habitId: string, isCompleted: boolean) => {
      setHabits((currentHabits) => {
        const newHabits = [...currentHabits];
        const habitToModify = newHabits.find(
          ({ id }) => id === habitId
        )!;

        habitToModify.isCompleted = isCompleted;

        return newHabits;
      });
    },
    []
  );

  const setNewHabitName = useCallback((name: string) => {
    setNewHabit((currentNewHabit) => ({ ...currentNewHabit, name }));
  }, []);

  const handleSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHabits((currentHabits) => [...currentHabits, newHabit]);
    setIsAddNewHabit(false);

    setNewHabit(createNewHabit());
  }, [newHabit]);

  const habitTags = useMemo(() => (
    habits.map(({ id, isCompleted, name }) => (
      <li key={id}>
        <label className={styles.habit}>
          <input
            checked={isCompleted}
            className={styles.habitCheckbox}
            id={id}
            name={name}
            onChange={(e) => setHabitIsCompleted(id, e.target.checked)}
            type="checkbox"
          />
          {name}
        </label>
      </li>
    ))
  ), [habits, setHabitIsCompleted]);

  return (
    <>
      <ul className={styles.habitList}>{habitTags}</ul>
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
    </>
  );
}
