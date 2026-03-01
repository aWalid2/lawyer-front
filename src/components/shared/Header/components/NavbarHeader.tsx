import { SearchIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { AlertIcon } from "../../icons/Alert";
import { ChatBotIcon } from "../../icons/ChatBot";
import { CheveronDownIcon } from "../../icons/CheveronDown";
import { LangIcon } from "../../icons/Lang";
import { MessagesIcon } from "../../icons/Messages";

export default function NavbarHeader() {
  return (
    <header className="w-full bg-white rounded-0  md:rounded-[12px] px-6 shadow-[0_0_24px_0_rgba(21,58,77,0.16)]   ">
      <div className="h-20 flex justify-between   ">
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
              to={"chat-bot"}
              className="text-secondary h-6 w-6 sm:h-12 sm:w-12 bg-secondary/8 flex justify-center items-center rounded-full hover:bg-secondary  hover:text-white transition"
            >
              <ChatBotIcon className="h-3 w-3 sm:h-5 sm:w-5" />
            </Link>
            <Link
              to={"#"}
              className="text-secondary h-6 w-6 sm:h-12 sm:w-12 bg-secondary/8 flex justify-center items-center rounded-full hover:bg-secondary  hover:text-white transition"
            >
              <LangIcon className="h-3 w-3 sm:h-5 sm:w-5" />
            </Link>
            <Link
              to={"messages"}
              className="text-secondary h-6 w-6 sm:h-12 sm:w-12 bg-secondary/8 flex justify-center items-center rounded-full hover:bg-secondary  hover:text-white transition"
            >
              <MessagesIcon className="h-3 w-3 sm:h-5 sm:w-5" />
            </Link>
            <Link
              to={"legislation-rulings"}
              className="text-secondary h-6 w-6 sm:h-12 sm:w-12 bg-secondary/8 flex justify-center items-center rounded-full hover:bg-secondary  hover:text-white transition"
            >
              <SearchIcon className="h-3 w-3 sm:h-5 sm:w-5" />
            </Link>

            <Link to={"profile"} className="flex items-center gap-2 ">
              <div
                className="text-secondary h-6 w-6 sm:h-12 sm:w-12 
                bg-secondary/8 flex justify-center items-center 
                rounded-full overflow-hidden border border-secondary"
              >
                <img
                  src="/images/user-placeholder.jpg"
                  alt="User avatar"
                  className="block w-full h-full object-contain "
                />
              </div>
              <p> علاء</p>

              <CheveronDownIcon className={`h-3 w-3 sm:h-5 sm:w-5`} />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
