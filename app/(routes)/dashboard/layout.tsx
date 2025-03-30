import { MemberProvider } from "@/app/context/MemberContext";
import DashboardLayout from "./DashboardLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <MemberProvider>
      <DashboardLayout>{children}</DashboardLayout>
    </MemberProvider>
  );
}
