import RouteManager from "../routes/RouteManager";
import SideBar from "./SideBar";
import { SidebarProvider, SidebarTrigger } from "./components/ui/sidebar";
import { Menu, MessageCircle } from "lucide-react";
import AiBox from "./pages/AiBox/AiBox";
import { Sheet, SheetTrigger } from "./components/ui/sheet";

function App() {
  return (
    <div>
      <div className="flex h-screen">
        <SidebarProvider className="w-auto">
          <SideBar />
          <SidebarTrigger className="h-[45px]">
            <Menu />
          </SidebarTrigger>
        </SidebarProvider>

        <div className="flex-2">
          <RouteManager />
        </div>
        <div className="fixed right-15">
          <Sheet>
            <AiBox />
            <SheetTrigger className="m-[11px]">
              <div className="rounded-sm text-[10px] bg-black text-white font-medium" style={{ padding:4}}>Open Ai</div>
            </SheetTrigger>
          </Sheet>
        </div>
      </div>
    </div>
  );
}

export default App;
