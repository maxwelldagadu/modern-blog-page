import { MessageSquare } from "lucide-react";
import { Card, CardHeader } from "../ui/card";



export default function CommentSection(){
  return(
   <Card>
    <CardHeader className="flex space-x-1.5">
      <MessageSquare className="size-4"/>
      <span className="text-sm sm:text-l font-bold">10 comments</span>
    </CardHeader>
   </Card>
  )
}