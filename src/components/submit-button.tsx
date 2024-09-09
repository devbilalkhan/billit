"use client";
import React from "react";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";

type LoadingButtonProps = {
  // Define your props here
  children: React.ReactNode;
  [key: string]: unknown;
  loading?: true | false;
  className?: string;
};

export function LoadingButton({
  children,
  className,
  ...props
}: LoadingButtonProps) {
  const { pending } = useFormStatus();
  return (
    <>
      <Button
        type="submit"
        className={cn("group mt-2 w-fit", className)}
        disabled={pending}
        {...props}
      >
        {pending ? <>{<LoadingSpinner />}Please wait</> : children}
      </Button>
    </>
  );
}

export function CustomButton({ children, ...props }: LoadingButtonProps) {
  return (
    <>
      <Button className="group mt-2" {...props}>
        {children}
      </Button>
    </>
  );
}

const LoadingSpinner = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("animate-spin mr-2", className)}
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
};
