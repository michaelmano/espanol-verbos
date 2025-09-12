import { fireEvent, render, screen } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import Counter from "./Counter.vue";

describe("Counter.vue", () => {
  it("renders initial count", () => {
    render(Counter);
    expect(screen.getByText(/Count: 0/)).toBeInTheDocument();
  });

  it("increments count when button clicked", async () => {
    render(Counter);

    const button = screen.getByRole("button", { name: /Increment/ });
    await fireEvent.click(button);

    expect(screen.getByText(/Count: 1/)).toBeInTheDocument();
  });
});
