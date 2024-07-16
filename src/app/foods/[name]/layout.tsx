import type { Metadata } from "next";

export function generateMetadata({params}:{params:{name:string}}): Metadata {
  return {
    title: `Nutrispark Discover ${params.name}`,
  };
}

export default function FoodLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <>
    {children}
   </>
  );
}
