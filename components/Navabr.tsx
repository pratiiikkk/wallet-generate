import { CubeIcon } from "@radix-ui/react-icons";
import { ModeToggle } from "./DarkMode";

function Navabr() {
  return (
    <div className="w-3/4 flex items-center justify-between p-4   mx-auto">
      <div className="flex items-center gap-3">
        <CubeIcon className="w-8 h-8" />
        <span
        className="text-2xl font-bold"
        >POSH</span>
      </div>
      <div>
        <ModeToggle />
      </div>
    </div>
  );
}

export default Navabr;
