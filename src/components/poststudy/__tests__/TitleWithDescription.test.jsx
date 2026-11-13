import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, test, expect, beforeEach } from "vitest";
import TitleWithDescription from "../TitleWithDescription";

// Fake Vimeo player: records mute/play calls instead of talking to a real iframe
const player = vi.hoisted(() => ({
  paused: true,
  muted: false,
  calls: [],
}));

vi.mock("../vimeo-player", () => ({
  default: class {
    setVolume() { return Promise.resolve(); }
    setMuted(m) { player.muted = m; player.calls.push(`muted:${m}`); return Promise.resolve(); }
    getPaused() { return Promise.resolve(player.paused); }
    play() { player.calls.push(`play(muted:${player.muted})`); player.paused = false; return Promise.resolve(); }
    pause() { player.paused = true; return Promise.resolve(); }
    on() {}
    off() {}
    unload() { return Promise.resolve(); }
  },
}));

beforeEach(() => {
  player.paused = true;
  player.muted = false;
  player.calls = [];
});

test("clicking play starts the video with sound", async () => {
  render(<TitleWithDescription title="Basement" mediaType="video" mediaSrc="https://player.vimeo.com/video/1" />);
  fireEvent.click(screen.getByTitle("Vimeo Video").parentElement);
  await waitFor(() => expect(player.calls.some((c) => c.startsWith("play"))).toBe(true));
  expect(player.calls.filter((c) => c.startsWith("play")).at(-1)).toBe("play(muted:false)");
});

test("if the browser blocks sound, the video still plays muted", async () => {
  render(<TitleWithDescription title="Basement" mediaType="video" mediaSrc="https://player.vimeo.com/video/1" />);
  // The first (unmuted) play is refused by the browser's autoplay rules
  let first = true;
  const Player = (await import("../vimeo-player")).default;
  const origPlay = Player.prototype.play;
  Player.prototype.play = function () {
    if (first && !player.muted) { first = false; player.calls.push("play-refused"); return Promise.reject(new Error("NotAllowedError")); }
    return origPlay.call(this);
  };
  fireEvent.click(screen.getByTitle("Vimeo Video").parentElement);
  await waitFor(() => expect(player.calls.at(-1)).toBe("play(muted:true)"));
  Player.prototype.play = origPlay;
});
