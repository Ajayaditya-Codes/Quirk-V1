import { SignUp } from "@clerk/nextjs";
import { CircleCheck } from "lucide-react";

export default function Page() {
  return (
    <div className="h-screen w-full bg-black  bg-dot-white/[0.5] relative flex flex-row justify-around items-center ">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="flex basis-1/2 justify-center">
        <SignUp />
      </div>
      <div className=" flex-col h-full justify-center items-start flex basis-1/2">
        <h1 className="text-6xl mb-7">
          Join Millions Worldwide <br />
          Who Automate GitHub <br />
          Workflow using Quirk.
        </h1>
        <div className="flex flex-col items-start space-y-5">
          <div className="flex flex-row items-center justify-center space-x-2 text-2xl">
            <CircleCheck color="#26a269" />
            <p>Easy setup, no coding required</p>
          </div>
          <div className="flex flex-row items-center justify-center space-x-2 text-2xl">
            <CircleCheck color="#26a269" />
            <p>Free forever for core features</p>
          </div>
          <div className="flex flex-row items-center justify-center space-x-2 text-2xl">
            <CircleCheck color="#26a269" />
            <p>No Credit Card Details Required</p>
          </div>
        </div>
      </div>
    </div>
  );
}
