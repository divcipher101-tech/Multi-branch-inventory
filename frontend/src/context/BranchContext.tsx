import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface Branch {
  id: string;
  name: string;
}

interface BranchContextType {
  branches: Branch[];
  activeBranchId: string | null;
  setActiveBranchId: (id: string | null) => void;
  isLoading: boolean;
  refreshBranches: () => Promise<void>;
}

const BranchContext = createContext<BranchContextType | undefined>(undefined);

export function BranchProvider({ children }: { children: ReactNode }) {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [activeBranchId, setActiveBranchId] = useState<string | null>(() => {
    return localStorage.getItem('activeBranchId');
  });
  const [isLoading, setIsLoading] = useState(true);

  const fetchBranches = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/operations/branches');
      if (res.ok) {
        const data = await res.json();
        setBranches(data);
        // If there are branches but no active branch selected, select the first one
        if (data.length > 0 && !activeBranchId) {
          setActiveBranchId(data[0].id);
        }
      }
    } catch (err) {
      console.error('Failed to fetch branches', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  useEffect(() => {
    if (activeBranchId) {
      localStorage.setItem('activeBranchId', activeBranchId);
    } else {
      localStorage.removeItem('activeBranchId');
    }
  }, [activeBranchId]);

  return (
    <BranchContext.Provider value={{ branches, activeBranchId, setActiveBranchId, isLoading, refreshBranches: fetchBranches }}>
      {children}
    </BranchContext.Provider>
  );
}

export function useBranch() {
  const context = useContext(BranchContext);
  if (context === undefined) {
    throw new Error('useBranch must be used within a BranchProvider');
  }
  return context;
}
