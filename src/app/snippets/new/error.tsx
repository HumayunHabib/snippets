"use client";
import React from "react";

interface ErroPageProps {
  error: Error;
  reset: () => void;
}

const ErrorPage = async ({ error }: ErroPageProps) => {
  return <div>{error.message}</div>;
};

export default ErrorPage;
