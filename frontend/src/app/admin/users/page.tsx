"use client";
import {
  MdOutlineMail,
  MdOutlineAdminPanelSettings,
  MdOutlinePersonSearch,
} from "react-icons/md";
import { useEffect, useState } from "react";

import DropdownMenu from "@/app/components/DropdownMenu";
import Navbar from "@/app/components/Navbar";
import { GET_USERS } from "@/app/api/apiAdmin";

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};
/* eslint-disable max-lines-per-function*/
const USERS = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [token, setToken] = useState("");
  const [openMenuUserId, setOpenMenuUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    if (!token) return;
    const fetchUsers = async () => {
      try {
        const data = await GET_USERS(token);
        setUsers(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          data.map((u: any) => ({
            id: u.uuid_user,
            name: `${u.name} ${u.lastname}`,
            email: u.email,
            role: u.user_role?.[0]?.role?.name,
          })),
        );
      } catch (error) {
        console.error("Error al cargar usuarios:", error);
      }
    };
    fetchUsers();
  }, [token]);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleRoleUpdated = (userId: string, newRole: string) => {
    setUsers((prevUsers) =>
      prevUsers.map((user) =>
        user.id === userId ? { ...user, role: newRole } : user,
      ),
    );
  };

  return (
    <div>
      <Navbar />
      <div className="mx-10 my-4">
        <h1 className="font-bold text-3xl">Gestión de Usuarios</h1>
        <p className="text-[#737373]">
          Administra los usuarios y sus roles en la plataforma
        </p>
      </div>
      {/* buscador */}
      <div className="my-6 mx-10">
        <div className="relative">
          <MdOutlinePersonSearch className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2" />
          <input
            className="w-full rounded-lg bg-[#f3f7f8] border py-3 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-[#0099ae]"
            placeholder="Buscar por nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      {/* tabla de usuarios */}
      <div className="mx-10 rounded-xl border bg-[#ffffff] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-[#f3f7f8]">
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  {" "}
                  Usuarios{" "}
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Contacto
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold">
                  Rol
                </th>
                <th className="px-6 py-4 text-right text-sm font-semibold">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  className="border-b last:border-0 hover:bg-[#f3f7f8] transition-colors"
                  key={user.id}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center font-semibold text-white h-10 w-10 rounded-full bg-gradient-to-br from-[#17A2B8] to-[#007BFF]">
                        {" "}
                        {user.name.charAt(0).toUpperCase()}{" "}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {user.name}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MdOutlineMail className="h-4 w-4" />
                        <span className="truncate max-w-[200px]">
                          {user.email}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium bg-[#bedeed] text-[#017fb8] border-[#e6f3f8]">
                      <MdOutlineAdminPanelSettings className="h-3 w-3" />
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <DropdownMenu
                      currentRole={user.role}
                      isOpen={openMenuUserId === user.id}
                      token={token}
                      userId={user.id}
                      onRoleUpdated={handleRoleUpdated}
                      onToggle={() =>
                        setOpenMenuUserId(
                          openMenuUserId === user.id ? null : user.id,
                        )
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default USERS;
