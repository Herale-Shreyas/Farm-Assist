import Illustration from "./Illustration";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex items-center justify-center h-screen relative">
      <div className="flex justify-center top-20 absolute w-[100%]">
        <Illustration className="w-[70%]" />
      </div>
      <div className="flex flex-col items-center justify-center relative top-20 gap-5 p-10">
        <h1 className="font-extrabold text-4xl">Nothing to see here</h1>
        <p className="max-w-[500px]">
          Page you are trying to open does not exist. You may have mistyped the
          address, or the page has been moved to another URL. If you think this
          is an error contact support.
        </p>
        <Button className="bg-[#208ce9] hover:bg-[#167ad2]">
          <Link to={"/"}>Take me back to home page</Link>
        </Button>
      </div>
    </div>
  );
};

export default ErrorPage;
