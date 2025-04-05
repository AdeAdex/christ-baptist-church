import React from "react";
import { IChurchMember } from "@/app/types/user";
import { Button } from "@mantine/core";
import Image from "next/image";

interface MemberSelectionProps {
  selectedMember: IChurchMember | null;
  setSelectedMember: (member: IChurchMember | null) => void;
  setShowDirectory: (show: boolean) => void;
}

const MemberSelection: React.FC<MemberSelectionProps> = ({
  selectedMember,
  setSelectedMember,
  setShowDirectory,
}) => {

  return (
    <>
      {selectedMember && (
        <div className="mb-4 border p-4 rounded bg-gray-100 flex flex-col sm:flex-row items-center sm:items-start gap-4">
          <div className="relative w-24 h-24 sm:w-16 sm:h-16 rounded-full overflow-hidden">
            <Image
              src={selectedMember.profilePicture || "/default-profile.png"}
              alt={`${selectedMember.firstName} ${selectedMember.lastName}`}
              fill
              className="object-cover"
            />
          </div>

          <div className="text-center sm:text-left flex-1">
            <p className="text-sm sm:text-base">
              <strong>Name:</strong> {selectedMember.firstName}{" "}
              {selectedMember.lastName}
            </p>
            <p className="text-sm sm:text-base">
              <strong>Email:</strong> {selectedMember.email}
            </p>
            <p className="text-sm sm:text-base">
              <strong>Phone:</strong> {selectedMember.phoneNumber}
            </p>
            <div className="mt-3 sm:mt-2">
              <Button
                size="xs"
                color="gray"
                variant="outline"
                onClick={() => {
                  setSelectedMember(null);
                  setShowDirectory(true);
                }}
              >
                Change Member
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MemberSelection;
