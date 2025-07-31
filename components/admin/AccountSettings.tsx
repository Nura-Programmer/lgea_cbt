// "use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  ChevronsUpDownIcon,
  UserCircle2,
  LogOutIcon,
  LoaderIcon,
} from "lucide-react";
import SetProfileDialog from "./SetProfileDialog";
import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function AccountSettings({
  adminUsername,
  onUsernameUpdated,
}: {
  adminUsername: string;
  onUsernameUpdated: (username: string) => void;
}) {
  const [logingOut, setLoggingOut] = useState(false);
  const router = useRouter();

  const handleLogOut = async () => {
    try {
      setLoggingOut(true);
      const res = await axios.post("/api/admin/logout");

      if (res.status === 200) {
        toast.success("Logged out successfully");
        router.push("/admin/login");
      } else {
        toast.error("Logout failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Unexpected error");
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="min-h-12">
        <Button
          variant="outline"
          className="h-fit p-4 border-t mt-auto flex items-center gap-3"
        >
          <UserCircle2 className="h-6 w-6 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">
            {adminUsername}
          </span>
          <ChevronsUpDownIcon className="ml-auto" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent id="account" className="w-56" side="right">
        <DropdownMenuLabel>
          <div className="flex items-center gap-2">
            <UserCircle2 className="h-6 w-6 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">
              {adminUsername}
            </span>
          </div>
        </DropdownMenuLabel>
        {/* <DropdownMenuGroup>
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Keyboard shortcuts
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Email</DropdownMenuItem>
                <DropdownMenuItem>Message</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>More...</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>
            New Team
            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup> */}
        <DropdownMenuSeparator />

        {/* Custom Triggers outside DropdownMenuItem */}
        <div className="px-2 py-1 space-y-2">
          <SetProfileDialog
            onUsernameUpdated={onUsernameUpdated}
            type="username"
          />
          <SetProfileDialog type="password" />
        </div>

        <DropdownMenuSeparator />

        <Button
          onClick={handleLogOut}
          disabled={logingOut}
          variant="ghost"
          className="w-full justify-start px-2 py-1"
        >
          <LogOutIcon className="h-4 w-4 mr-2" />
          Log Out
          {logingOut && <LoaderIcon className="animate-spin h-4 w-4 ml-auto" />}
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
