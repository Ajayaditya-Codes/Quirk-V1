import ConnectionCard from "@/components/global/connection-card";
import {
  IconBrandAsana,
  IconBrandGithub,
  IconBrandSlack,
} from "@tabler/icons-react";
import { db } from "@/db/drizzle";
import { Users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

export default async function Page() {
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
    <div className="flex flex-col w-full overflow-scroll p-7">
      <header>
        <h1 className="text-4xl font-bold w-full mb-10">Connections</h1>
      </header>

      {userDetails ? (
        <div className="flex flex-col space-y-5">
          <ConnectionCard
            title="GitHub"
            description="Connect your GitHub account"
            icon={<IconBrandGithub className="h-5 w-5 text-white" />}
            connected={true}
            allowDisconnect={false}
            disconnectUrl="/"
          />
          <ConnectionCard
            title="Slack"
            description="Connect your Slack account"
            icon={<IconBrandSlack className="h-5 w-5 text-white" />}
            connected={userDetails.SlackAccessToken !== null}
            allowDisconnect={true}
            connectionLink={process.env.SLACK_AUTH_URL}
            disconnectUrl="/api/slack/disconnect"
          />
          <ConnectionCard
            title="Asana"
            description="Connect your Asana account"
            icon={<IconBrandAsana className="h-5 w-5 text-white" />}
            allowDisconnect={true}
            connected={userDetails.AsanaRefreshToken !== null}
            connectionLink={process.env.ASANA_AUTH_URL}
            disconnectUrl="/api/asana/disconnect"
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
