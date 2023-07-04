import { Club } from '../models/Club';
import { Api, ApiClient } from "./api-client";

export interface ClubsService extends Api<Club> {}

export const ClubsClientService = new ApiClient<Club>('clubs');