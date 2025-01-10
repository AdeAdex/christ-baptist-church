//  /app/types/deacons/index.ts

import { SocialMedia } from "../socialMedia";

export type ChurchAffiliation = {
  _id: string;
  name: string;
};

export type Deacon = {
  name: string;
  role: string;
  image: string;
  socials: SocialMedia[];
  contactNumber?: string; // Added for easier communication
  email?: string; // Added for easier communication
  dateJoined?: string; // Track when the person joined the church or the ministry
  churchAffiliation?: ChurchAffiliation;
  serviceArea?: string; // Specific area of ministry (e.g., community outreach, event coordination)
  activeSince?: string; // When they started serving as a deacon
  isCurrentlyActive?: boolean; // Track whether they are actively serving or not
};
