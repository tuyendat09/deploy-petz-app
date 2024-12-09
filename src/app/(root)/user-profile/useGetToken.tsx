import { useSession } from "next-auth/react";

export default function useGetToken() {
  const session = useSession();
  console.log(session);
  return <div>useGetToken</div>;
}
