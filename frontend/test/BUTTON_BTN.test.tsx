import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { signIn } from "next-auth/react";

import BUTTON_BTN from "../src/app/components/googleBtn"; // ajusta la ruta según tu estructura

// Mock de next-auth/react
jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
}));

describe("BUTTON_BTN component", () => {
  it("debe renderizar el botón de Google correctamente", () => {
    render(<BUTTON_BTN />);
    const button = screen.getByRole("button", { name: /Google/i });
    expect(button).toBeInTheDocument();
  });

  it("debe mostrar el texto 'Google'", () => {
    render(<BUTTON_BTN />);
    expect(screen.getByText("Google")).toBeInTheDocument();
  });

  it("debe llamar a signIn con los argumentos correctos al hacer clic", async () => {
    render(<BUTTON_BTN />);
    const button = screen.getByRole("button", { name: /Google/i });

    fireEvent.click(button);

    expect(signIn).toHaveBeenCalledWith("google", {
      callbackUrl: "/user/home",
    });
  });
});
