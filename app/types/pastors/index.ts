// /app/types/pastors/index.ts

import { SocialMedia } from "../socialMedia";

// Define the type for each paragraph in the bio
export type BioParagraph = {
  _key: string;
  _type: string;
  children: { _key: string; _type: string; text: string }[]; // Structure for the text content in each paragraph
};

export type ChurchAffiliation = {
  _id: string;
  name: string;
};

export type Pastor = {
  name: string;
  role: string;
  image: string;
  socials: SocialMedia[];
  bio: BioParagraph[]; // Add bio as an array of BioParagraph
  contactNumber?: string; // Added for easier communication
  email?: string; // Added for easier communication
  dateJoined?: string; // Track when the person joined the church or the ministry
  specialty?: string; // The area of expertise or focus of the pastor
  sermonLinks?: string[]; // Array of URLs for sermon links
  churchAffiliation?: ChurchAffiliation;
};
