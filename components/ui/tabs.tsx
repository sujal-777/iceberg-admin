import React, { ReactNode, useState, createContext, useContext } from "react";

interface TabsContextType {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

interface TabsProps {
  defaultValue: string;
  children: ReactNode;
}

export function Tabs({ defaultValue, children }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div>{children}</div>
    </TabsContext.Provider>
  );
}

interface TabsListProps {
  children: ReactNode;
  className?: string;
}

export function TabsList({ children, className = "" }: TabsListProps) {
  return <div className={`flex space-x-4 border-b ${className}`}>{children}</div>;
}

interface TabsTriggerProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export function TabsTrigger({ value, children, className = "" }: TabsTriggerProps) {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("TabsTrigger must be used within a Tabs component");
  }

  const { activeTab, setActiveTab } = context;

  const isActive = activeTab === value;

  return (
    <button
      className={`py-2 px-4 -mb-px border-b-2 ${
        isActive ? "border-blue-600 text-blue-600 font-semibold" : "border-transparent text-gray-600"
      } ${className}`}
      onClick={() => setActiveTab(value)}
      type="button"
    >
      {children}
    </button>
  );
}
