import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu, SearchIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { AlertIcon } from "../../icons/Alert";
import { ChatBotIcon } from "../../icons/ChatBot";
import { LangIcon } from "../../icons/Lang";
import { MessagesIcon } from "../../icons/Messages";
import { CheveronDownIcon } from "../../icons/CheveronDown";

export default function NavbarHeader() {
  return (
    <header className="w-full bg-white rounded-0  md:rounded-[12px] px-6    ">
      <div className="h-20 flex justify-between   ">
        {/* Desktop Navigation */}

        <div className="flex flex-wrap items-center justify-between w-full  ">
          <h1>الموكلين</h1>
          <div className=" flex gap-3">
            <Link
              to={"notifications"}
              className="text-secondary h-6 w-6 sm:h-12 sm:w-12 bg-secondary/8 flex justify-center items-center rounded-full hover:bg-secondary  hover:text-white transition"
            >
              <AlertIcon className="h-3 w-3 sm:h-5 sm:w-5" />
            </Link>
            <Link
              to={"notifications"}
              className="text-secondary h-6 w-6 sm:h-12 sm:w-12 bg-secondary/8 flex justify-center items-center rounded-full hover:bg-secondary  hover:text-white transition"
            >
              <ChatBotIcon className="h-3 w-3 sm:h-5 sm:w-5" />
            </Link>
            <Link
              to={"notifications"}
              className="text-secondary h-6 w-6 sm:h-12 sm:w-12 bg-secondary/8 flex justify-center items-center rounded-full hover:bg-secondary  hover:text-white transition"
            >
              <LangIcon className="h-3 w-3 sm:h-5 sm:w-5" />
            </Link>
            <Link
              to={"notifications"}
              className="text-secondary h-6 w-6 sm:h-12 sm:w-12 bg-secondary/8 flex justify-center items-center rounded-full hover:bg-secondary  hover:text-white transition"
            >
              <MessagesIcon className="h-3 w-3 sm:h-5 sm:w-5" />
            </Link>
            <Link
              to={"notifications"}
              className="text-secondary h-6 w-6 sm:h-12 sm:w-12 bg-secondary/8 flex justify-center items-center rounded-full hover:bg-secondary  hover:text-white transition"
            >
              <SearchIcon className="h-3 w-3 sm:h-5 sm:w-5" />
            </Link>

            <Link to={"profile"} className="flex items-center gap-2 ">
              <div className="text-secondary h-6 w-6 sm:h-12 sm:w-12 bg-secondary/8 flex justify-center items-center rounded-full  overflow-hidden border border-secondary">
                yes
              </div>
              <p> علاء</p>

              <CheveronDownIcon className="h-3 w-3 sm:h-5 sm:w-5" />
            </Link>
          </div>
        </div>
        {/* Left Section (Login + Mobile Menu) */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu */}
          {/* <Sheet>
            <SheetTrigger asChild>
              <button className="md:hidden">
                <Menu className="w-6 h-6 text-gray-700" />
              </button>
            </SheetTrigger>
            <SheetHeader className="hidden">
              <SheetTitle>القائمة</SheetTitle>
            </SheetHeader>
            <SheetDescription className="hidden">
              قائمة التنقل الخاصة بالموقع
            </SheetDescription>

            <SheetContent side="left" className="w-72 bg-white pt-29 px-4">
              <div className="flex  gap-6 mt-10 text-right flex-wrap">
                <Link
                  to={"notifications"}
                  className="text-secondary h-12 w-12 bg-secondary/8 flex justify-center items-center rounded-full hover:bg-secondary  hover:text-white transition"
                >
                  <AlertIcon />
                </Link>
                <Link
                  to={"notifications"}
                  className="text-secondary h-12 w-12 bg-secondary/8 flex justify-center items-center rounded-full hover:bg-secondary  hover:text-white transition"
                >
                  <ChatBotIcon />
                </Link>
                <Link
                  to={"notifications"}
                  className="text-secondary h-12 w-12 bg-secondary/8 flex justify-center items-center rounded-full hover:bg-secondary  hover:text-white transition"
                >
                  <LangIcon />
                </Link>
                <Link
                  to={"notifications"}
                  className="text-secondary h-12 w-12 bg-secondary/8 flex justify-center items-center rounded-full hover:bg-secondary  hover:text-white transition"
                >
                  <MessagesIcon />
                </Link>
                <Link
                  to={"notifications"}
                  className="text-secondary h-12 w-12 bg-secondary/8 flex justify-center items-center rounded-full hover:bg-secondary  hover:text-white transition"
                >
                  <SearchIcon />
                </Link>

                <Link to={"profile"} className="flex items-center gap-2 ">
                  <div className="text-secondary h-12 w-12 bg-secondary/8 flex justify-center items-center rounded-full  overflow-hidden border border-secondary">
                    yes
                  </div>
                  <p> علاء</p>

                  <CheveronDownIcon />
                </Link>
              </div>
            </SheetContent>
          </Sheet> */}
        </div>
      </div>
    </header>
  );
}
