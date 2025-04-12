// components/ContributionHistory.tsx
import { Contribution } from "@/app/types/contribution";
import { IChurchMember } from "@/app/types/user";
import React from "react";
import Loader from "../Loader";

interface Props {
  contributions: Contribution[];
  member: IChurchMember | null;
  isLoading: boolean;
}

const ContributionHistory: React.FC<Props> = ({
  contributions,
  member,
  isLoading,
}) => {
  return (
    <div className="mt-6">
      {/* Show loader when data is loading */}
      {isLoading ? (
        <div className="flex justify-center items-center mt-6">
          <Loader />
        </div>
      ) : (
        // Contribution History
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-3">
            Contributions for {member?.firstName} {member?.lastName}
          </h3>

          {contributions.length === 0 ? (
            <p className="">No contributions found.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse">
                <thead>
                  <tr className="bg-gray-200 dark:bg-gray-500 text-sm">
                    <th className="px-3 py-2 text-left">Month</th>
                    <th className="px-3 py-2 text-left">Week</th>
                    <th className="px-3 py-2 text-left">Amount</th>
                    <th className="px-3 py-2 text-left">Type</th>
                    <th className="px-3 py-2 text-left">Status</th>
                    <th className="px-3 py-2 text-left">Payment</th>
                    <th className="px-3 py-2 text-left">Description</th>
                    <th className="px-3 py-2 text-left">Created By</th>
                  </tr>
                </thead>
                <tbody>
                  {contributions.map((contribution, index) => (
                    <tr key={index} className="border-b text-sm">
                      <td className="px-3 py-2">
                        {contribution.month} {contribution.year}
                      </td>
                      <td className="px-3 py-2">Week {contribution.week}</td>
                      <td className="px-3 py-2">
                        ₦{contribution.amount.toFixed(2)}
                      </td>
                      <td className="px-3 py-2">{contribution.type}</td>
                      <td className="px-3 py-2">{contribution.status}</td>
                      <td className="px-3 py-2">
                        {contribution.paymentMethod}
                      </td>
                      <td className="px-3 py-2">{contribution.description}</td>
                      <td className="px-3 py-2">{`${contribution.createdBy.firstName} ${contribution.createdBy.lastName}`}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ContributionHistory;
