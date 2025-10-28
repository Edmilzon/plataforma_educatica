import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { SessionProvider } from "next-auth/react";

import LOGIN_PAGE from "../src/app/user/login/page";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) =>
    React.createElement("img", { ...props, alt: props.alt || "mocked image" }),
}));

describe("LOGIN_PAGE component", () => {
  it("renderiza los campos del formulario y botón de login", () => {
    render(
      <SessionProvider session={null}>
        <LOGIN_PAGE />
      </SessionProvider>,
    );

    expect(screen.getByText("Bienvenido de nuevo")).toBeInTheDocument();
    expect(screen.getByLabelText(/Correo/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Contraseña/i, { selector: "input" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Iniciar sesión/i }),
    ).toBeInTheDocument();
  });

  it("permite mostrar y ocultar la contraseña", () => {
    render(
      <SessionProvider session={null}>
        <LOGIN_PAGE />
      </SessionProvider>,
    );

    const passwordInput = screen.getByLabelText(/Contraseña/i, {
      selector: "input",
    });
    const toggleButton = screen.getByRole("button", {
      name: /mostrar contraseña/i,
    });

    expect(passwordInput).toHaveAttribute("type", "password");

    fireEvent.click(toggleButton);

    expect(passwordInput).toHaveAttribute("type", "text");
  });
});
