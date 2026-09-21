import { type UserDetailsResponse } from "@/lib/objects";

import { staticUserDetails } from "@/data/static/user-details";

export async function GetUserDetails(): Promise<UserDetailsResponse> {
  return staticUserDetails;
}
