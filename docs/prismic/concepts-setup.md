# Prismic setup for Concepts

The site code for Concepts is ready. These steps create the content types in Prismic. Do them in this order.
Until they're done, `/concepts` shows "Concepts" and "No concepts yet", and nothing else on the site changes.

All edits happen in Prismic: **Custom types → (type) → JSON editor**, then **Save**.

## 1. Add the Note field to Case Study

1. Open **Case Study** → JSON editor.
2. Search for `"title_with_description"`. Inside it, find `"non-repeat": {`.
3. On a new line right after `"non-repeat": {`, paste the block from `note_field.json` followed by a comma.
4. Save.

The Note shows under the intro text in small grey type. Leave it empty and nothing shows.

## 2. Create the Concept type

1. Still in **Case Study** → JSON editor, select everything and copy it.
2. Go back to Custom types → **Create** → **Repeatable type**. Name: `Concept`, ID: `concept`.
3. Open its JSON editor, select everything, and paste the Case Study JSON over it.
4. Search for `"subtitle"`. Right after the closing `}` of the subtitle field, type a comma and paste the block
   from `location_field.json`.
5. Save.

Concept now has every Case Study field and slice (including the Note and the images-right gallery) plus
**Location**.

## 3. Create the Concepts Page type

1. Open **Portfolio Page** → JSON editor, select everything and copy it.
2. Custom types → **Create** → **Single type**. Name: `Concepts Page`, ID: `concepts_page`.
3. Open its JSON editor, select everything, paste, Save.

## 4. Fill in the Concepts Page

1. Documents → **Create new** → **Concepts Page**.
2. Fill in the heading, intro text, buttons, page title and meta description for `/concepts`.
3. Publish.

## 5. Move Harbour Light to a Concept

Prismic can't change a document's type, so Harbour Light is re-entered:

1. Documents → **Create new** → **Concept**. UID: `harbour-light`.
2. Copy the content across from the Harbour Light case study, and fill in **Location** (e.g. "Mount Hawthorn,
   Perth") and the **Note** ("This is a concept project. Harbourlight is not a real practice and does not offer
   appointments.").
3. Save, then click **Preview** to check it at `/concepts/harbour-light`.
4. Publish when ready, then archive the old Harbour Light **Case Study** so it can't be published by mistake.

Concepts are ordered on `/concepts` by their **Display order** field (lower first), like case studies.
