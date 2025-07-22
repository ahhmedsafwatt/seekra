import { Analytics } from "@vercel/analytics/next";

export const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <Analytics />
    </>
  );
};
