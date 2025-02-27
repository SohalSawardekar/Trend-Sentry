import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const NavBar = () => {
  return (
    <main className="h-[5rem] bg-slate-300">
      <div className="flex flex-row justify-around items-center h-full">
        <div className="hover:cursor-default" id="logo">
          Trend Sentry
        </div>
        <div>
          <Button className="bg-slate-800 hover:bg-slate-600 hover:text-slate-50">
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </div>
    </main>
  );
};

const LandingPage = () => {
  return (
    <div>
      <NavBar />
      <div>landingPage</div>
    </div>
  );
};

export default LandingPage;
