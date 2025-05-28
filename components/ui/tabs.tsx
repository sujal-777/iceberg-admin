import React, { ReactNode, useState, createContext, useContext } from "react";

// Context type and provider
interface TabsContextType {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

// Tabs root component
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

// TabsList
interface TabsListProps {
  children: ReactNode;
  className?: string;
}

export function TabsList({ children, className = "" }: TabsListProps) {
  return <div className={`flex space-x-4 border-b ${className}`}>{children}</div>;
}

// TabsTrigger
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

// ✅ TabsContent component
interface TabsContentProps {
  value: string;
  children: ReactNode;
  className?: string;
}

export function TabsContent({ value, children, className = "" }: TabsContentProps) {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error("TabsContent must be used within a Tabs component");
  }

  const { activeTab } = context;

  if (activeTab !== value) return null;

  return <div className={`mt-4 ${className}`}>{children}</div>;
}
