"use client";

import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs";
import { Button } from "./ui/button";

type AuthButtonsProps = {
  isLoggedIn: boolean;
};

function AuthButton({ isLoggedIn }: AuthButtonsProps) {
  return (
    <>
      {isLoggedIn ? (
        <>
          <Button asChild>
            <LogoutLink>Log out</LogoutLink>
          </Button>
        </>
      ) : (
        <>
          <Button asChild>
            <LoginLink>Sign In</LoginLink>
          </Button>
          <Button asChild variant="secondary">
            <RegisterLink>Sign Up</RegisterLink>
          </Button>
        </>
      )}
    </>
  );
}

export default AuthButton;
