// TabButtons.tsx
type TabButtonsProps = {
  activeTab: string;
  onTabChange: (tab: string) => void;
  tabs: string[];
};

export const TabButtons = ({ activeTab, onTabChange, tabs }: TabButtonsProps) => {
  return (
    <div style={{ display: "flex", gap: "4px" }}>
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          style={{
            all: "unset", // 🔥 모든 기본 버튼 스타일 초기화
            cursor: "pointer",
            padding: "2px 8px",
            borderRadius: 6,
            backgroundColor: "transparent",
            color: activeTab === tab ? "black" : "#8c8c8c",
            fontWeight: activeTab === tab ? "700" : "500",
            textAlign: "center",
            fontSize: 16,
          }}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};
