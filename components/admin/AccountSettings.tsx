import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import {
  CheckCircle2Icon,
  ChevronsUpDownIcon,
  LoaderIcon,
  LogOutIcon,
  UserCircle2,
  XCircleIcon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface AccountSettingsProps {
  adminUsername: string;
}

export default function AccountSettings({
  adminUsername,
}: AccountSettingsProps) {
  const router = useRouter();
  const [logingOut, setLoggingOut] = useState(false);

  const handleLogOut = async () => {
    try {
      // Perform logout logic here, e.g., clear session or redirect
      setLoggingOut(true);
      const res = await axios.post("/api/admin/logout");
      if (res.status === 200) {
        toast(res.data.message || "successful", {
          dismissible: true,
          duration: 10000,
          position: "top-right",
          // style: {
          //   backgroundColor: "#f0fff4",
          //   color: "#065f46",
          //   border: "1px solid #bbf7d0",
          // },
          description: "You have successfully logged out.",
          icon: <CheckCircle2Icon className="h-4 w-4 text-green-500" />,
          richColors: true,
          action: {
            label: <XCircleIcon className="h-4 w-4" />,
            onClick: () => toast.dismiss(),
          },
        });
        router.push("/admin/login");
      } else {
        console.error("Logout failed:", res.data);
      }
      // Redirect to login page or perform other actions
    } catch (error) {
      console.error("Logout error:", error);
      // Handle error, e.g., show notification
    }

    setLoggingOut(false);
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
      <DropdownMenuContent className="w-56" side="right">
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
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Change Username
            <DropdownMenuShortcut>⇧+Ctrl+U</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Change Password
            <DropdownMenuShortcut>⇧+Ctrl+P</DropdownMenuShortcut>
          </DropdownMenuItem>
          {/* <DropdownMenuItem disabled>API</DropdownMenuItem> */}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogOut} disabled={logingOut}>
          <LogOutIcon className="mr-2 h-4 w-4" />
          Log out
          {logingOut && <LoaderIcon className="ml-auto h-4 w-4 animate-spin" />}
          <DropdownMenuShortcut>Ctr+Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
