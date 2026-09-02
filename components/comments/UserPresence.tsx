'use client';

import { api } from "@/convex/_generated/api";
import usePresence from "@convex-dev/presence/react";
import FacePile from "@convex-dev/presence/facepile";
import { Id } from "@/convex/_generated/dataModel";


interface userPresenceProps {
  roomId: Id<'blogs'>;
  userId:  string;
}
 
export default function UserPresence({ roomId, userId }: userPresenceProps): React.ReactElement {


  const presenceState = usePresence(api.presence, roomId, userId);

  if(!presenceState) return <div></div>; // return an empty div if presenceState is undefined

  return (
    <div className="flex items-center gap-2">
      <h2 className='text-l sm:text-xl tracking-wide font-bold text-muted-foreground'>Reading Now</h2>
      <FacePile presenceState={presenceState} />
    </div>
  );
}