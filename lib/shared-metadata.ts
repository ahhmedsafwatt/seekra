import type { Metadata } from "next";

export const title = "Seekra";
export const description =
  "Seekra is a helpful tool designed to assist you in discovering the perfect AI tools for your job, saving you time and effort in your search.";

export const defaultMetadata: Metadata = {
  title: { template: `${title} | %s`, default: title },
  description: description,
  keywords: ["ai", "alternative", "ai alternative", "seekra", "seekra ai"],
  authors: [{ name: "ahmed safwat", url: "https://github.com/ahhmedsafwatt" }],
  creator: "ahmed safwat",
};

export const openGraph: Metadata["openGraph"] = {
  type: "website",
  url: "https://seekra.vercel.app/",
  title: title,
  description: description,
  siteName: title,
  images: [
    {
      url: "/og-image.png",
      width: 1200,
      height: 630,
      alt: title,
    },
  ],
};

export const twitter: Metadata["twitter"] = {
  card: "summary_large_image",
  title: title,
  description: description,
  images: ["/og-image.png"],
};
