import React from "react";
interface PageLayoutProps {
  children: React.ReactNode;
}

export const PageLayout = ({ children }: PageLayoutProps) => {
  return <div className="app-container">{children}</div>;
};
