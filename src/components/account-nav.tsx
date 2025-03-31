"use client";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";


export default function AccountNavDropdown({firstName}: {firstName: string}){
    const router = useRouter();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
            <Avatar>
                <AvatarFallback className="bg-card border">
                {firstName.slice(0, 2)}
                </AvatarFallback>
            </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex flex-col gap-2">
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                    <Button variant="ghost" size="sm" onClick={() => router.push("/profile")}>Profile</Button>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Button variant="ghost" size="sm" onClick={() => router.push("/my_bookings")}>My Bookings</Button>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                    <Button variant="ghost" size="sm" onClick={() => router.push("/logout")}>Logout</Button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}