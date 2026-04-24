// Reviews / testimonials — replace with real client reviews before launch.

export type Review = {
  id:      number;
  name:    string;
  rating:  number;
  date:    string;
  text:    string;
  initial: string;
};

// Replace with real client reviews before launch.
export const REVIEWS: Review[] = [];

/** Reviews shown in the rotating SocialProofStrip banner. */
export const FEATURED_REVIEWS: Review[] = REVIEWS.slice(0, 5);

/** Aggregate rating shown alongside the rotating strip. */
export const AGGREGATE = {
  rating: REVIEWS.length > 0
    ? REVIEWS.reduce((sum, r) => sum + r.rating, 0) / REVIEWS.length
    : 5.0,
  count: REVIEWS.length,
};
