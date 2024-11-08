import DashboardNavbar from "@/components/global/dashboard-navbar";
import { db } from "@/db/drizzle";
import { Users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

type Props = { children: React.ReactNode };

const Layout = async (props: Props) => {
  const { userId } = await auth();
  let userDetails = null;

  try {
    const result =
      userId &&
      (await db
        .select()
        .from(Users)
        .where(eq(Users.ClerkID, userId))
        .execute());

    userDetails = result && result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("Error fetching user details:", error);
  }

  return (
    <div className="h-screen overflow-scroll w-full bg-black bg-dot-white/[0.5]  relative flex-col flex p-5 text-white items-center ">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_85%,black)]"></div>
      <DashboardNavbar credits={userDetails && userDetails.Credits} />
      <div className="w-full mt-20 h-full items-center flex">
        {props.children}
      </div>
    </div>
  );
};

export default Layout;
