import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="h-screen w-full bg-black  bg-dot-white/[0.5] relative flex flex-row justify-around items-center ">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="flex basis-1/2 justify-center">
        <SignIn />
      </div>
      <div className=" flex-col h-full justify-center items-start flex basis-1/2">
        <h1 className="text-6xl mb-7">
          Automate Your GitHub <br />
          Workflow using Quirk.
        </h1>
        <p className="text-2xl">
          Get instant access to powerful automation tools that <br /> streamline
          your GitHub workflows. Quirk helps you <br /> save time, improve
          collaboration, and keep your projects <br /> on track—all in one
          place.
        </p>
      </div>
    </div>
  );
}
