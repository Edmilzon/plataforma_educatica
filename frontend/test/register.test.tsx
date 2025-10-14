import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    return React.createElement("img", {
      ...props,
      alt: props.alt || "mocked image",
    });
  },
}));

import REGISTER from "../src/app/user/register/page";

describe("REGISTER component", () => {
  it("renderiza los campos del formulario", () => {
    render(<REGISTER />);
    expect(screen.getByText("Crea tu cuenta")).toBeInTheDocument();
    expect(screen.getByLabelText(/Nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Apellidos/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByTestId("password")).toBeInTheDocument();
    expect(screen.getByTestId("confirm_password")).toBeInTheDocument();

    expect(screen.getByLabelText(/Telefono/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Crear cuenta/i }),
    ).toBeInTheDocument();
  });
});
