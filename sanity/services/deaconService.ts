import { client } from "../lib/client";
import { Deacon } from "@/app/types/deacons"; 

// Fetch data from Sanity
export const fetchDeacons = async (): Promise<Deacon[]> => {
  const query = `*[_type == "deacon"]{
    name,
    role,
    bio[] {
      _key,
      _type,
      children {
        _key,
        _type,
        text
      }
    },
    "image": image.asset->url,
    socials[] {
      platform,
      url
    },
    contactNumber,
    email,
    dateJoined,
    serviceArea,
    activeSince,
    isCurrentlyActive,
    churchAffiliation
    }`;
    return await client.fetch(query);
  };
  