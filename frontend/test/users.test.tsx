import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import { SessionProvider } from "next-auth/react";

import USERS from "../src/app/admin/users/page";
import * as api from "../src/app/api/api";

// Mock de la API GET_USERS
jest.mock("../src/app/api/api", () => ({
  GET_USERS: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    prefetch: jest.fn(),
  }),
}));

// Mock de componentes internos
/* eslint-disable react/display-name */
jest.mock("../src/app/components/Navbar", () => () => <div>Navbar Mock</div>);

jest.mock("../src/app/components/DropdownMenu", () => (props: any) => (
  <div data-testid={`dropdown-${props.userId}`}>Dropdown Mock</div>
));

describe("USERS component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Storage.prototype.getItem = jest.fn(() => "mocked-token");
  });

  it("renderiza la tabla y el buscador con datos de usuarios", async () => {
    // Mockear respuesta de GET_USERS
    (api.GET_USERS as jest.Mock).mockResolvedValue([
      {
        uuid_user: "1",
        name: "Juan",
        lastname: "Perez",
        email: "juan@example.com",
        user_role: [{ role: { name: "alumno" } }],
      },
      {
        uuid_user: "2",
        name: "Maria",
        lastname: "Lopez",
        email: "maria@example.com",
        user_role: [{ role: { name: "profesor" } }],
      },
    ]);

    // Mock de sesión activa
    const mockSession = {
      user: { name: "Admin Test", email: "admin@test.com" },
      accessToken: "mock-token",
      userData: {
        user_role: [{ role: { name: "administrador" } }],
      },
    };

    render(
      <SessionProvider session={mockSession}>
        <USERS />
      </SessionProvider>,
    );

    // Verificar que el buscador se renderiza
    expect(
      screen.getByPlaceholderText("Buscar por nombre..."),
    ).toBeInTheDocument();

    // Esperar a que los datos de usuarios se muestren
    await waitFor(() => {
      expect(screen.getByText("Juan Perez")).toBeInTheDocument();
      expect(screen.getByText("Maria Lopez")).toBeInTheDocument();
      expect(screen.getByText("juan@example.com")).toBeInTheDocument();
      expect(screen.getByText("maria@example.com")).toBeInTheDocument();
    });

    // Verificar que los Dropdowns aparezcan
    expect(screen.getByTestId("dropdown-1")).toBeInTheDocument();
    expect(screen.getByTestId("dropdown-2")).toBeInTheDocument();
  });
});
