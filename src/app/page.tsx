import { CardBody, CardContainer, CardItem } from "@/components/global/3d-card";
import { MovingCards } from "@/components/global/moving-cards";
import Navbar from "@/components/global/navabar";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { Cover } from "@/components/ui/cover";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { CheckIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen w-full bg-black text-white bg-dot-white/[0.5] relative flex flex-col items-center justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <Navbar />
      <div className="w-screen overflow-hidden flex justify-center flex-col items-center px-4">
        <ContainerScroll
          titleComponent={
            <div className="flex flex-col justify-center items-center">
              <HoverBorderGradient
                containerClassName="rounded-full"
                className="bg-black text-neutral-300 flex items-center space-x-2"
              >
                <h3 className="text-2xl flex-row flex font-bold">
                  Introducing Quirk
                </h3>{" "}
              </HoverBorderGradient>
              <h1 className="text-xl md:text-4xl lg:text-6xl font-semibold mx-auto text-center mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-gray-100 via-gray-200 to-gray-300 leading-loose ">
                Automate Your GitHub Workflow <br /> at{" "}
                <Cover>warp speed</Cover>
              </h1>
            </div>
          }
        >
          <Image
            src={`/temp-banner.png`}
            alt="hero"
            height={720}
            width={1400}
            className="mx-auto rounded-2xl object-cover h-full object-left-top"
            draggable={false}
          />
        </ContainerScroll>
      </div>
      <MovingCards />
      <div className="my-32 flex flex-col justify-center items-center p-10 w-[75%] text-center">
        <h2 className="text-6xl">
          Effortless Workflow Automation <br /> Across GitHub, Slack, and Beyond
        </h2>
        <p className="text-2xl mt-7">
          Streamline your workflows by automating key tasks across your favorite
          tools. Effortlessly connect GitHub with platforms like Slack, Asana,
          and more—creating powerful, custom automations without the need for
          developers. From notifying your team on Slack about updates in GitHub
          to syncing tasks with Asana, our automation builder empowers you to
          turn your ideas into actions. Simplify your processes, reduce manual
          work, and bring your projects to life with automations that adapt to
          your needs.
        </p>
      </div>
      <div className="w-full flex flex-col items-center justify-center p-10">
        <h2 className="text-6xl text-center mb-20">
          Find the Best Plan for <br /> Your Needs and Budget
        </h2>

        <div className="flex flex-wrap items-center justify-center flex-col md:flex-row gap-8">
          <CardContainer className="inter-var ">
            <CardBody className=" relative group/card  hover:shadow-2xl hover:shadow-neutral-500/[0.1] bg-black border-white/[0.2]  w-full md:!w-[350px] h-auto rounded-xl p-6 border">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-white "
              >
                Hobby
                <h2 className="text-6xl ">$0</h2>
              </CardItem>
              <CardItem
                translateZ="60"
                className="text-sm max-w-sm mt-2 text-neutral-300"
              >
                Get a glimpse of what our software is capable of. Just a heads
                up {"you'll"} never leave us after this!
                <ul className="my-4 flex flex-col gap-2">
                  <li className="flex items-center gap-2">
                    <CheckIcon />3 Free automations
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon />
                    20 Free Credits
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon />
                    Two-step Actions
                  </li>
                </ul>
              </CardItem>
              <div className="flex justify-between items-center mt-8">
                <CardItem
                  translateZ={20}
                  className="px-4 py-2 rounded-xl text-xs font-normal text-white"
                >
                  Try now →
                </CardItem>
                <Link href="/workflows">
                  <CardItem
                    translateZ={20}
                    as="button"
                    className="px-4 py-2 rounded-xl bg-white text-black  text-xs font-bold"
                  >
                    Get Started Now
                  </CardItem>
                </Link>
              </div>
            </CardBody>
          </CardContainer>
          <CardContainer className="inter-var ">
            <CardBody className=" relative group/card  hover:shadow-2xl hover:shadow-neutral-500/[0.1] bg-black border-white/[0.2]  w-full md:!w-[350px] h-auto rounded-xl p-6 border">
              <CardItem
                translateZ="50"
                className="text-xl font-bold text-white "
              >
                Unlimited
                <h2 className="text-xl">
                  <span className="text-6xl"> $99</span> per month
                </h2>
              </CardItem>
              <CardItem
                translateZ="60"
                className="text-sm max-w-sm mt-2 text-neutral-300"
              >
                Experience the full power of Quirk with our Unlimited Plan.No
                limits, no restrictions-just endless possiblities.
                <ul className="my-4 flex flex-col gap-2">
                  <li className="flex items-center gap-2">
                    <CheckIcon />
                    Unlimited Workflows
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon />
                    Unlimited Tasks
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckIcon />
                    VIP Support
                  </li>
                </ul>
              </CardItem>
              <div className="flex justify-between items-center mt-8">
                <CardItem
                  translateZ={20}
                  className="px-4 py-2 rounded-xl text-xs font-normal text-white"
                >
                  {""}
                </CardItem>
                <CardItem
                  translateZ={20}
                  as="button"
                  className="px-4 py-2 rounded-xl bg-white text-black  text-xs font-bold"
                >
                  Contact Sales
                </CardItem>
              </div>
            </CardBody>
          </CardContainer>
        </div>
      </div>
      <footer className="w-full flex flex-col items-center justify-center p-10">
        © Quirk, 2024. All rights reserved.
      </footer>
    </div>
  );
}
