"use client";
import { createContext, useContext, ReactNode } from "react";
import { IChurchMember } from "@/app/types/user";
import { useAppSelector } from "@/app/redux/hooks";

// 1️⃣ Define Context Type
interface MemberContextType {
  member: IChurchMember | null;
}

// 2️⃣ Create Context
const MemberContext = createContext<MemberContextType | undefined>(undefined);

// 3️⃣ Create Provider
export function MemberProvider({ children }: { children: ReactNode }) {
  const member = useAppSelector((state) => state.auth.member);

  return (
    <MemberContext.Provider value={{ member }}>
      {children}
    </MemberContext.Provider>
  );
}

// 4️⃣ Create Hook to Use Context
export function useMember() {
  const context = useContext(MemberContext);
  if (!context) throw new Error("useMember must be used within a MemberProvider");
  return context;
}
