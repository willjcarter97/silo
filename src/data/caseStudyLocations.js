// Fallback locations for case-study cards.
//
// The Prismic `case_study` custom type has no `location` field yet. Card components read
// `study.data.location` first and only fall back to this map, so once the field is added in
// Prismic and filled in, this file can be deleted.
export const CASE_STUDY_LOCATIONS = {
  "basement-approved": "London, UK",
  "tomoka-fine-and-rare": "London, UK",
  "electrolytes-with-joly": "London, UK",
  "flowery": "London, UK",
  "acorn-property-group": "London, UK",
  "cluberly": "London, UK",
  "knightsgate-partners": "London, UK",
};

export const getCaseStudyLocation = (uid) => CASE_STUDY_LOCATIONS[uid] || null;
