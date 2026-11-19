import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route, Link } from "react-router-dom";
import { vi, test, expect, beforeEach } from "vitest";
import CaseStudies from "../CaseStudies";
import { CASE_STUDIES, CONCEPTS } from "../../data/collections";

const prismic = vi.hoisted(() => ({
  docs: {
    case_study: [{ id: "c1", uid: "basement-approved", data: { title: "Basement Approved", subtitle: "Culture", tags: [] } }],
    concept: [{ id: "k1", uid: "harbour-light", data: { title: "Harbour Light", subtitle: "Psychology", location: "Mount Hawthorn, Perth", tags: [] } }],
  },
}));

vi.mock("../../prismicio", () => ({
  client: {
    getSingle: vi.fn(() => Promise.reject(new Error("no singleton"))),
    getAllByType: vi.fn((type) => Promise.resolve(prismic.docs[type] || [])),
  },
}));

import { client } from "../../prismicio";

beforeEach(() => vi.clearAllMocks());

const hrefs = () => screen.getAllByRole("link").map((a) => a.getAttribute("href"));

test("case studies list queries case_study and links to /case-studies/<uid>", async () => {
  render(<MemoryRouter><CaseStudies /></MemoryRouter>);
  await screen.findAllByText("Basement Approved");
  expect(client.getAllByType).toHaveBeenCalledWith("case_study", expect.anything());
  expect(hrefs()).toContain("/case-studies/basement-approved");
});

test("concepts list queries concept, links to /concepts/<uid>, shows the Prismic location", async () => {
  render(<MemoryRouter><CaseStudies collection={CONCEPTS} /></MemoryRouter>);
  await screen.findAllByText("Harbour Light");
  expect(hrefs()).toContain("/concepts/harbour-light");
  expect(screen.getAllByText("Mount Hawthorn, Perth").length).toBeGreaterThan(0);
});

test("concepts list never shows a case study", async () => {
  render(<MemoryRouter><CaseStudies collection={CONCEPTS} /></MemoryRouter>);
  await screen.findAllByText("Harbour Light");
  expect(client.getAllByType.mock.calls.map((c) => c[0])).toEqual(["concept"]);
  expect(screen.queryByText("Basement Approved")).toBeNull();
});

test("concepts intro falls back when concepts_page is missing", async () => {
  render(<MemoryRouter><CaseStudies collection={CONCEPTS} /></MemoryRouter>);
  expect(await screen.findByRole("heading", { name: "Concepts" })).toBeInTheDocument();
  expect(client.getSingle).toHaveBeenCalledWith("concepts_page");
});

test("switching from case studies to concepts refetches", async () => {
  render(
    <MemoryRouter initialEntries={["/case-studies"]}>
      <Link to="/concepts">go</Link>
      <Routes>
        <Route path="/case-studies" element={<CaseStudies key="case-studies" collection={CASE_STUDIES} />} />
        <Route path="/concepts" element={<CaseStudies key="concepts" collection={CONCEPTS} />} />
      </Routes>
    </MemoryRouter>
  );
  await screen.findAllByText("Basement Approved");
  fireEvent.click(screen.getByText("go"));
  await screen.findAllByText("Harbour Light");
  await waitFor(() => expect(client.getAllByType).toHaveBeenLastCalledWith("concept", expect.anything()));
  expect(screen.queryByText("Basement Approved")).toBeNull();
});
