export interface Job {
  names: string[];
  url: string;
  emails: string[];
  description: string;
  _id: string;
  isScrappingPaused: boolean;
  isMailPaused: boolean;
  createdAt: string;
  userKey: string;
  isScrappingPaused: boolean;
  isMattermostPaused: boolean;
  isHourlyJob: boolean;
  hourlyJobMinRate: number | null;
  hourlyJobMaxRate: number | null;
  isFirstRun: boolean;
  updatedAt: string;
  createdBy: string;
  proposals: number;
}
