import { IChurchMember } from "@/app/types/user";
import { Button } from "@mantine/core";
import { FiCheckCircle, FiDollarSign } from "react-icons/fi"; // Import the check mark icon

interface MembersListProps {
  users: IChurchMember[];
  onEditUser: (user: IChurchMember) => void;
  buttonLabel: string;
  buttonIcon: React.ReactNode;
  selectedMember?: IChurchMember | null; // Add selectedMember prop
}

export default function MembersList({
  users,
  onEditUser,
  buttonLabel,
  buttonIcon,
  selectedMember,
}: MembersListProps) {
  
  
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
              {/* Show a mark icon if this user is selected */}
              {selectedMember && selectedMember._id === user._id && (
                <FiCheckCircle className="text-green-500 mr-2" />
              )}


             {/* Show a dollar sign icon if this user made a contribution today */}
             { user.hasMadeContributionToday && (
                <FiDollarSign className="text-teal-500 mr-2" />
              )}

              <Button variant="outline" leftSection={buttonIcon} onClick={() => onEditUser(user)}>
                {buttonLabel}
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
