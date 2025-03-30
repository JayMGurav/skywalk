import { getCurrentUserProfile, getCurrentUserRecentSearches } from "@/data/server/user";
import { Separator } from "@/components/ui/separator";
import { UpdateProfile } from "./update-profile";

export default async function ProfilePage() {
  const data = await getCurrentUserProfile();
  // const recentSearches = await getCurrentUserRecentSearches();

  if (!data) return null;

  return (
    <div className="w-full py-10">
      <div className="flex items-center gap-4">
        <div className="h-30 w-30 rounded-full bg-card flex text-xl font-semibold items-center justify-center border shadow-lg">
          {data?.first_name?.slice(0, 1)}
          {data?.last_name?.slice(0, 1)}
        </div>
        <div className="text-3xl">Welcome {data?.first_name}!</div>
      </div>
      <Separator className="mt-10" />
      <ul className="text-lg p-4 flex flex-col gap-4">
        <li>First Name: {data?.first_name}</li>
        <li>Last Name: {data?.last_name}</li>
        <li>Email: {data?.email}</li>
        <li>Gender: {data?.gender}</li>
      </ul>
      <UpdateProfile
        phone={data?.phone}
        // email={data?.email as string}
      />
    </div>
  );
}
