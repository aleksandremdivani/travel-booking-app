// src/components/NavItem.simple.test.jsx
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { NavItem } from "./NavItem";

describe("NavItem super simple tests", () => {
  it("renders the label text", () => {
    render(
      <MemoryRouter>
        <NavItem label="Home" link="/" />
      </MemoryRouter>
    );

    const label = screen.getByText("Home");
    expect(label).toBeTruthy();
  });

  it("calls setIsOpen(false) when clicked if menu is open", () => {
    const setIsOpen = vi.fn();

    render(
      <MemoryRouter>
        <NavItem label="Menu" link="/" isOpen={true} setIsOpen={setIsOpen} />
      </MemoryRouter>
    );

    const link = screen.getByText("Menu");
    fireEvent.click(link);

    expect(setIsOpen.mock.calls[0][0]).toBe(false);
  });
});