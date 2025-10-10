import styles from '../../styles/TabButtons.module.css'

type TabButtonsProps = {
  activeTab: string;
  onTabChange: (tab: string) => void;
  tabs: string[];
};

export const TabButtons = ({ activeTab, onTabChange, tabs }: TabButtonsProps) => {
  return (
    <div className={styles.container}>
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`${styles.tab} ${activeTab === tab ? styles.active : styles.inactive}`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};
