import { ReactNode, useMemo, useState } from 'react';

import styles from './tabs.module.css';

type TabsProps = {
  tabs: { component: ReactNode, title: string,  }[];
};

export const Tabs = ({ tabs }: TabsProps) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const currentComponent = useMemo(
    () => tabs[activeIndex].component,
    [tabs, activeIndex]
  );

  // The list does not change
  // So, index is an acceptable key
  const navigationList = useMemo(() => (
    tabs.map(({ title }, index) => (
      <li key={index}>
        <button onClick={() => setActiveIndex(index)}>{title}</button>
      </li>
    ))
  ), [tabs]);

  return (
    <>
      <nav>
        <ol className={styles.tabList}>{navigationList}</ol>
      </nav>
      {currentComponent}
    </>
  );
}
