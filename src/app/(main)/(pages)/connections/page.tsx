import ConnectionCard from "@/components/global/connection-card";
import {
  IconBrandAsana,
  IconBrandGithub,
  IconBrandSlack,
} from "@tabler/icons-react";

export default function Page() {
  return (
    <div className="flex flex-col w-full overflow-scroll p-7">
      <header>
        <h1 className="text-4xl font-bold w-full mb-10">Connections</h1>
      </header>
      <div className="flex flex-col space-y-5">
        <ConnectionCard
          title="GitHub"
          description="Connect your GitHub account"
          icon={<IconBrandGithub className="h-5 w-5 text-white" />}
          connected={true}
        />
        <ConnectionCard
          title="Slack"
          description="Connect your Slack account"
          icon={<IconBrandSlack className="h-5 w-5 text-white" />}
          connected={false}
        />
        <ConnectionCard
          title="Asana"
          description="Connect your Asana account"
          icon={<IconBrandAsana className="h-5 w-5 text-white" />}
          connected={false}
        />
      </div>
    </div>
    // <div className="relative flex flex-col gap-4">
    //   <h1 className="sticky top-0 z-[10] flex items-center justify-between border-b bg-background/50 p-6 text-4xl backdrop-blur-lg">
    //     Connections
    //   </h1>
    //   <div className="relative flex flex-col gap-4">
    //     <section className="flex flex-col gap-4 p-6 text-muted-foreground">
    //       Connect all your apps directly from here. You may need to connect
    //       these apps regularly to refresh verification
    //       {/* {CONNECTIONS.map((connection) => (
    //             <ConnectionCard
    //               key={connection.title}
    //               description={connection.description}
    //               title={connection.title}
    //               icon={connection.image}
    //               type={connection.title}
    //               connected={connections}
    //             />
    //           ))} */}
    //     </section>
    //   </div>
    // </div>
  );
}
