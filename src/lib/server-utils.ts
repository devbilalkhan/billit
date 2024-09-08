import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";



export const serverSideAuth = async () => {
  const { isAuthenticated, getUser } = await getKindeServerSession();
  const accessGranted = await isAuthenticated();

  const user = await getUser();
  return [accessGranted, user] as const;
};
