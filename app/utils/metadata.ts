// metadataConfig.ts


import type { Metadata } from "next";

const baseMetadata = {
  metadataBase: new URL("https://www.christbaptistchurch.com"),
  authors: [{ name: "Adeolu", url: "https://www.christbaptistchurch.com" }],
  openGraph: {
    siteName: "Christ Baptist Church",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Christ Baptist Church Banner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/twitter-image.jpg"],
  },
};

export const metadataConfig: Record<string, Metadata> = {
  home: {
    ...baseMetadata,
    title: "Home | Christ Baptist Church",
    description:
      "Christ Baptist Church - A place to worship, connect, and grow in faith. Led by Rev J.I Oyelekan.",
    keywords: [
      "Christ Baptist Church",
      "Church",
      "Faith",
      "Worship",
      "Christian Community",
    ],
    openGraph: {
      ...baseMetadata.openGraph,
      title: "Christ Baptist Church",
      description: "A place to worship, connect, and grow in faith.",
    },
    twitter: {
      ...baseMetadata.twitter,
      title: "Christ Baptist Church",
      description: "A place to worship, connect, and grow in faith.",
    },
  },
  leadership: {
    ...baseMetadata,
    title: "Leadership | Christ Baptist Church",
    description:
      "Meet the dedicated leadership team of Christ Baptist Church, led by Rev J.I Oyelekan.",
    openGraph: {
      ...baseMetadata.openGraph,
      title: "Leadership | Christ Baptist Church",
      description:
        "Meet the dedicated leadership team of Christ Baptist Church, led by Rev J.I Oyelekan.",
    },
    twitter: {
      ...baseMetadata.twitter,
      title: "Leadership | Christ Baptist Church",
      description:
        "Meet the dedicated leadership team of Christ Baptist Church, led by Rev J.I Oyelekan.",
    },
  },
  aboutUs: {
    ...baseMetadata,
    title: "About Us | Christ Baptist Church",
    description:
      "Discover more about Christ Baptist Church, our mission, vision, and values. A community united in faith and service.",
    openGraph: {
      ...baseMetadata.openGraph,
      title: "About Us | Christ Baptist Church",
      description:
        "Discover more about Christ Baptist Church, our mission, vision, and values. A community united in faith and service.",
    },
    twitter: {
      ...baseMetadata.twitter,
      title: "About Us | Christ Baptist Church",
      description:
        "Discover more about Christ Baptist Church, our mission, vision, and values. A community united in faith and service.",
    },
  },
  contactUs: {
    ...baseMetadata,
    title: "Contact Us | Christ Baptist Church",
    description:
      "Get in touch with Christ Baptist Church for inquiries, support, and prayer requests. We're here to help.",
    keywords: [
      "Contact Christ Baptist Church",
      "Church Support",
      "Prayer Requests",
      "Christian Community Contact",
    ],
    openGraph: {
      ...baseMetadata.openGraph,
      title: "Contact Us | Christ Baptist Church",
      description:
        "Get in touch with Christ Baptist Church for inquiries, support, and prayer requests. We're here to help.",
    },
    twitter: {
      ...baseMetadata.twitter,
      title: "Contact Us | Christ Baptist Church",
      description:
        "Get in touch with Christ Baptist Church for inquiries, support, and prayer requests. We're here to help.",
    },
  },
  ministries: {
    ...baseMetadata,
    title: "Ministries | Christ Baptist Church",
    description:
      "Explore the ministries at Christ Baptist Church. Join us in serving the Lord through various outreach and community programs.",
    keywords: [
      "Christ Baptist Church Ministries",
      "Community Outreach",
      "Church Programs",
      "Serve the Lord",
    ],
    openGraph: {
      ...baseMetadata.openGraph,
      title: "Ministries | Christ Baptist Church",
      description:
        "Explore the ministries at Christ Baptist Church. Join us in serving the Lord through various outreach and community programs.",
    },
    twitter: {
      ...baseMetadata.twitter,
      title: "Ministries | Christ Baptist Church",
      description:
        "Explore the ministries at Christ Baptist Church. Join us in serving the Lord through various outreach and community programs.",
    },
  },
};
