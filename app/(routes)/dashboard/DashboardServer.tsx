//  /app/dashboard/DashboardServer.tsx

import { cookies } from "next/headers";
import DashboardClient from "./DashboardClient";

export default async function DashboardServer() {
  const cookieStore = await cookies(); 
  const token = cookieStore.get("authToken")?.value || null;

//   console.log("Token from cookies:", token);

  return (
    <div className="w-full">

      <DashboardClient token={token} />
    </div>
  )
}
