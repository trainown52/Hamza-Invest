export function Table({ children }: { children: React.ReactNode }) {
    return (
      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-y-2">
          {children}
        </table>
      </div>
    );
  }
  
  export function THead({ children }: { children: React.ReactNode }) {
    return (
      <thead className="text-xs uppercase text-gray-500">{children}</thead>
    );
  }
  
  export function TBody({ children }: { children: React.ReactNode }) {
    return <tbody>{children}</tbody>;
  }
  
  export function TR({ children }: { children: React.ReactNode }) {
    return <tr className="bg-white rounded-xl shadow-sm">{children}</tr>;
  }
  
  export function TH({ children }: { children: React.ReactNode }) {
    return <th className="text-left px-4 py-3">{children}</th>;
  }
  
  export function TD({ children }: { children: React.ReactNode }) {
    return <td className="px-4 py-3 text-sm text-gray-700">{children}</td>;
  }