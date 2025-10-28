import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { SessionProvider } from "next-auth/react";
import REGISTER from "../src/app/user/register/page";

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

describe("REGISTER component", () => {
  it("renderiza los campos del formulario", () => {
    render(
      <SessionProvider session={null}>
        {" "}
        {/* <- Aquí */}
        <REGISTER />
      </SessionProvider>,
    );

    expect(screen.getByText("Crea tu cuenta para empezar")).toBeInTheDocument();
    expect(screen.getByLabelText(/Nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Apellidos/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByTestId("password")).toBeInTheDocument();
    expect(screen.getByTestId("confirm_password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Crear cuenta/i }),
    ).toBeInTheDocument();
  });
});
