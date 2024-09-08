"use client";

import { LoginLink, RegisterLink } from "@kinde-oss/kinde-auth-nextjs";
import { Button } from "./ui/button";

export default function AuthButton() {
  return (
    <>
      <LoginLink>
        <Button>Sign In</Button>
      </LoginLink>
      <RegisterLink>
        <Button variant="secondary">Sign Up</Button>
      </RegisterLink>
    </>
  );
}
