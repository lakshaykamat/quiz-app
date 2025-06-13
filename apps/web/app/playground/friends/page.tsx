import PlayWithFriend from "./PlayWithFriend";
import { Suspense } from "react";

export default function FriendsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PlayWithFriend />
    </Suspense>
  );
}
