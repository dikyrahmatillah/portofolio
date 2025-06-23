import LiveClock from "@/components/LiveClock";
import Spline from "@splinetool/react-spline";
import { JSX } from "react";
import { GiDeadHead } from "react-icons/gi";

export default function Welcome() {
  return (
    <section className="z-10">
      {/* <div className="skill none"></div> */}
      <div className="spline-container h-screen w-screen flex justify-center items-center">
        {/* <Spline scene="https://prod.spline.design/BNaurVSeS57NeyWI/scene.splinecode" /> */}
      </div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white">
        <h1>Artistry & Engineering</h1>
        <p>By Diky</p>
      </div>
      <div className="absolute top-8 left-10 -translate-x-1/2 -translate-y-1/2 text-center text-white">
        <GiDeadHead className="text-4xl" />
      </div>{" "}
      <div className="absolute top-8 right-10 -translate-x-1/2 -translate-y-1/2 text-center text-white">
        <LiveClock />
      </div>
    </section>
  );
}
