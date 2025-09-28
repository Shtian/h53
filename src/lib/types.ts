import type { Id } from "@/../convex/_generated/dataModel";

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
  id: Id<"guestbookEntries">;
  authorClerkId: string;
  authorName?: string;
  authorImageUrl?: string;
  title: string;
  description?: string;
  photoStorageId: string;
  photoUrl: string;
  photoAltText?: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
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
