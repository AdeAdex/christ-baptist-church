// /sanity/services/pastorService.ts

import { client } from "../lib/client";
import { Pastor } from "@/app/types/pastors"; 

// Fetch data from Sanity
export const fetchPastors = async (): Promise<Pastor[]> => {
  const query = `*[_type == "pastor"]{
    name,
    role,
    bio[] {
      ...,
    },
    "image": image.asset->url,
    socials[] {
      platform,
      url
    },
    contactNumber,
     email,
     dateJoined,
     specialty,
     sermonLinks,
     churchAffiliation
  }`;
  return await client.fetch(query);
};