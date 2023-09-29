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
          <div className={styles.habitName}>{name}</div>
        </label>
      </li>
    ))
  ), [habits, setHabitIsCompleted]);

  return (
    <>
      <ul className={styles.habitList}>{habitTags}</ul>
      {habitTags.length > 0 && <hr className={styles.horizontalRule} />}
      {isAddNewHabit ? (
        <>
          <form className={styles.newHabitForm} onSubmit={handleSubmit}>
            <input
              autoFocus
              className={styles.newHabitTextInput}
              id="habit"
              maxLength={100}
              onChange={(e) => setNewHabitName(e.target.value)}
              placeholder="Habit name"
              type="text"
              value={newHabit.name}
              required
            />

            <div className={styles.newHabitButtons}>
              <button
                type="button"
                onClick={() => setIsAddNewHabit(false)}
              >
                Cancel
              </button>

              <button type="submit">Submit</button>
            </div>
          </form>
        </>
      ) : (
        <button
          className={styles.addHabitButton}
          onClick={() => setIsAddNewHabit(true)}
        >
          Add habit
        </button>
      )}
    </>
  );
}
