export interface FamilyMember {
  id: string;
  clerkUserId: string;
  email?: string;
  displayName?: string;
  photoUrl?: string;
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GuestbookEntry {
  id: string;
  familyMemberId: string;
  title: string;
  caption: string;
  photoStorageId: string;
  photoUrl: string;
  photoAltText?: string;
  tags?: string[];
  visibility: "public" | "hidden";
  createdAt: string;
  updatedAt: string;
}

export type ArticleCategory = "usage" | "maintenance" | "safety" | "history";

export interface Article {
  id: string;
  familyMemberId: string;
  title: string;
  summary: string;
  contentMarkdown: string;
  category: ArticleCategory;
  coverImageStorageId?: string;
  coverImageUrl?: string;
  publishedAt?: string;
  updatedAt: string;
}

export interface WeatherSnapshot {
  locationCode: string;
  temperatureC: number;
  condition: string;
  windSpeed: number;
  precipitation: number;
  capturedAt: string;
  expiresAt: string;
  source: string;
  rawPayload: unknown;
}
