import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { vi, test, expect, beforeEach } from "vitest";
import PostCaseStudy from "../PostCaseStudy";
import { CASE_STUDIES, CONCEPTS } from "../../data/collections";

const docs = vi.hoisted(() => ({
  "case_study/basement-approved": { uid: "basement-approved", data: { title: "Basement Approved", hero_type: "image", body: [] } },
  "concept/harbour-light": { uid: "harbour-light", data: { title: "Harbour Light", hero_type: "image", body: [] } },
}));

vi.mock("../../prismicio", () => ({
  client: {
    getByUID: vi.fn((type, uid) => (docs[`${type}/${uid}`] ? Promise.resolve(docs[`${type}/${uid}`]) : Promise.reject(new Error("not found")))),
    getSingle: vi.fn(() => Promise.reject(new Error("no singleton"))),
  },
}));

import { client } from "../../prismicio";

beforeEach(() => vi.clearAllMocks());

const renderAt = (path) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/case-studies/:id" element={<PostCaseStudy key="case-study" collection={CASE_STUDIES} />} />
        <Route path="/concepts/:id" element={<PostCaseStudy key="concept" collection={CONCEPTS} />} />
      </Routes>
    </MemoryRouter>
  );

test("concept page loads a concept", async () => {
  renderAt("/concepts/harbour-light");
  await screen.findByText("No hero image");
  expect(client.getByUID).toHaveBeenCalledWith("concept", "harbour-light");
  expect(screen.queryByRole("heading", { name: /Not Found/ })).toBeNull();
});

test("concept uid under /case-studies is not found", async () => {
  renderAt("/case-studies/harbour-light");
  expect(await screen.findByRole("heading", { name: "Case Study Not Found" })).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /Back to Case Studies/ })).toHaveAttribute("href", "/case-studies");
});

test("case study uid under /concepts is not found", async () => {
  renderAt("/concepts/basement-approved");
  expect(await screen.findByRole("heading", { name: "Concept Not Found" })).toBeInTheDocument();
  expect(screen.getByText(/The concept you're looking for doesn't exist/)).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /Back to Concepts/ })).toHaveAttribute("href", "/concepts");
});

test("concept CTA says See more concepts and goes to /concepts", async () => {
  renderAt("/concepts/harbour-light");
  const link = await screen.findByRole("link", { name: /See more concepts/ });
  expect(link).toHaveAttribute("href", "/concepts");
  expect(screen.queryByRole("link", { name: /See more work/ })).toBeNull();
});

test("case study CTA is unchanged", async () => {
  renderAt("/case-studies/basement-approved");
  const link = await screen.findByRole("link", { name: /See more work/ });
  expect(link).toHaveAttribute("href", "/case-studies");
});
