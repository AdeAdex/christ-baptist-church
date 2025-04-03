"use client";

import { IChurchMember } from "@/app/types/user";
import { FiEdit } from "react-icons/fi";
import { Button } from "@mantine/core";

interface MembersListProps {
  users: IChurchMember[];
  onEditUser: (user: IChurchMember) => void;
}

export default function MembersList({ users, onEditUser }: MembersListProps) {
  return (
    <>
      {users.length > 0 ? (
        <ul className="divide-y divide-gray-300">
          {users.map((user) => (
            <li key={user._id} className="py-3 flex justify-between items-center">
              <div>
                <p className="font-semibold">{user.firstName} {user.lastName}</p>
                <p className="text-gray-500 text-sm">{user.email}</p>
              </div>
              <Button variant="outline" leftSection={<FiEdit />} onClick={() => onEditUser(user)}>
                Edit
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500">No members found.</p>
      )}
    </>
  );
}
