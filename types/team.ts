/**
 * types/team.ts
 */

export interface TeamMember {
  _id:       string;
  name:      string;
  initial:   string;     // "A" | "C" | "M" — for ACM initials
  role:      string;
  bio:       string;
  image?:    string;     // optional — placeholder shown if missing
  linkedin?: string;
  email?:    string;
  order:     number;     // display order
}
