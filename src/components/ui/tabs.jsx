import React from "react";

// Tabs principal
export function Tabs({ value, onValueChange, children }) {
  return (
    <div className="tabs" data-value={value}>
      {React.Children.map(children, child => {
        if (!React.isValidElement(child)) return child;
        return React.cloneElement(child, {
          selectedValue: value,
          onSelect: onValueChange, // Corrigido aqui
        });
      })}
    </div>
  );
}

// Lista de abas
export function TabsList({ children }) {
  return <div className="tabs-list flex space-x-2">{children}</div>;
}

// Botão da aba
export function TabsTrigger({ value, selectedValue, onSelect, children }) {
  const isActive = value === selectedValue;

  return (
    <button
      onClick={() => onSelect(value)} // Corrigido aqui
      className={`tabs-trigger px-4 py-2 rounded-t-md border-b-2 transition ${
        isActive
          ? "border-red-600 text-red-600 font-semibold"
          : "border-transparent text-gray-500 hover:text-gray-700"
      }`}
    >
      {children}
    </button>
  );
}

// Conteúdo da aba
export function TabsContent({ value, selectedValue, children }) {
  return value === selectedValue ? (
    <div className="tabs-content mt-4">{children}</div>
  ) : null;
}
