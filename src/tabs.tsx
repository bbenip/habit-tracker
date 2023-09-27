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
    tabs.map(({ title }, index) => {
      const activeStyle = index === activeIndex ? styles.active : '';
      const listItemStyle = [styles.tab, activeStyle].join(' ');

      return (
        <li className={listItemStyle} key={index}>
          <button onClick={() => setActiveIndex(index)}>{title}</button>
        </li>
      );
    })
  ), [activeIndex, tabs]);

  return (
    <div className={styles.container}>
      <nav className={styles.navigation}>
        <ul className={styles.tabList}>{navigationList}</ul>
      </nav>
      {currentComponent}
    </div>
  );
}
