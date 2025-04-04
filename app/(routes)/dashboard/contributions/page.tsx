// /app/(routes)/dashboard/contributions/page.tsx

// "use client";

// import { useState } from "react";
// import { useSnackbar } from "notistack";
// import { IChurchMember } from "@/app/types/user";
// import MembersDirectoryWithSearch from "@/app/components/admin/MembersDirectoryWithSearch";
// import { TextInput, Button } from "@mantine/core"; // Import DateInput
// import { DateInput } from "@mantine/dates";
// import { FiSearch } from "react-icons/fi";
// import { useUserDirectory } from "@/app/hooks/admin/useUserDirectory"; // Import the hook
// import { useAddContribution } from "@/app/hooks/admin/useAddContribution"; // Import the custom hook for adding contribution

// export default function AddContributionPage() {
//   const { enqueueSnackbar } = useSnackbar();
//   const { addContribution } = useAddContribution(); // Use the custom hook
//   const {
//     searchTerm,
//     setSearchTerm,
//     selectedMinistry,
//     setSelectedMinistry,
//     ministryOptions,
//     filteredUsers,
//   } = useUserDirectory(); // Use the custom hook

//   const [selectedMember, setSelectedMember] = useState<IChurchMember | null>(
//     null
//   );
//   const [amount, setAmount] = useState<number | string>(""); // Keep this as a string until validated
//   const [week, setWeek] = useState<string>("");
//   const [monthYear, setMonthYear] = useState<string>("");

//   // Handle the contribution submission
//   const handleAddContribution = async () => {
//     if (!selectedMember || !amount || !week || !monthYear) {
//       enqueueSnackbar("Please fill all fields", { variant: "error" });
//       return;
//     }

//     const parsedAmount = parseFloat(amount as string);
//     const parsedWeek = parseInt(week, 10);
//     if (
//       isNaN(parsedAmount) ||
//       isNaN(parsedWeek) ||
//       parsedWeek < 1 ||
//       parsedWeek > 5
//     ) {
//       enqueueSnackbar("Please enter a valid amount and week (1-5)", {
//         variant: "error",
//       });
//       return;
//     }

//     // Call the function to add the contribution here
//     try {
//       if (!selectedMember || !selectedMember._id) {
//         enqueueSnackbar("Please select a member", { variant: "error" });
//         return;
//       }

//       await addContribution({
//         memberId: selectedMember._id,
//         amount: parsedAmount,
//         week: parsedWeek,
//         month: monthYear.split(" ")[0], // Extract the month
//         year: parseInt(monthYear.split(" ")[1], 10), // Extract the year
//       });

//     } catch {
//     }
//   };

//   const handleMemberSelect = (user: IChurchMember) => {
//     setSelectedMember(user); // Set the selected member when clicking the button
//   console.log("Selected Member ID:", user?._id)

//   };

//   // Format the month and year as "Month Year" (e.g., "April 2025")
//   const handleMonthYearChange = (date: Date | null) => {
//     if (date) {
//       setMonthYear(
//         `${date.toLocaleString("default", { month: "long" })} ${date.getFullYear()}`
//       );
//     } else {
//       setMonthYear(""); // Reset when no date is selected
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-4">Add Weekly Contribution</h2>

//       {/* Use MembersDirectoryWithSearch for searching and selecting a member */}
//       <MembersDirectoryWithSearch
//         users={filteredUsers}
//         searchTerm={searchTerm}
//         setSearchTerm={setSearchTerm}
//         selectedMinistry={selectedMinistry}
//         setSelectedMinistry={setSelectedMinistry}
//         ministryOptions={ministryOptions}
//         onButtonClick={handleMemberSelect}
//         buttonLabel="Select Member"
//         buttonIcon={<FiSearch />}
//       />

//       {/* Contribution Form */}
//       <div className="mb-4">
//         <TextInput
//           label="Amount"
//           type="number"
//           value={amount}
//           onChange={(e) => setAmount(e.target.value)}
//           placeholder="Enter contribution amount"
//         />
//       </div>
//       <div className="mb-4">
//         <TextInput
//           label="Week"
//           value={week}
//           onChange={(e) => setWeek(e.target.value)}
//           placeholder="Enter contribution week"
//         />
//       </div>
//       <div className="mb-4">
//         <DateInput
//           label="Month/Year"
//           value={monthYear ? new Date(`${monthYear} 1, 2025`) : null} // Set the default value
//           onChange={handleMonthYearChange}
//           valueFormat="MMMM YYYY"
//           placeholder="Enter contribution month/year"
//           clearable
//           allowDeselect
//         />
//       </div>

//       <Button onClick={handleAddContribution} color="teal" fullWidth>
//         Add Contribution
//       </Button>
//     </div>
//   );
// }




"use client";

import { useState } from "react";
import { useSnackbar } from "notistack";
import { IChurchMember } from "@/app/types/user";
import MembersDirectoryWithSearch from "@/app/components/admin/MembersDirectoryWithSearch";
import { TextInput, Button, Modal, Group } from "@mantine/core"; // Import Modal
import { DateInput } from "@mantine/dates";
import { FiSearch } from "react-icons/fi";
import { useUserDirectory } from "@/app/hooks/admin/useUserDirectory"; // Import the hook
import { useAddContribution } from "@/app/hooks/admin/useAddContribution"; // Import the custom hook for adding contribution
import { useIsMobile } from "@/app/hooks/useIsMobile";

export default function AddContributionPage() {
  const { enqueueSnackbar } = useSnackbar();
  const { addContribution } = useAddContribution(); // Use the custom hook
  const {
    searchTerm,
    setSearchTerm,
    selectedMinistry,
    setSelectedMinistry,
    ministryOptions,
    filteredUsers,
  } = useUserDirectory(); // Use the custom hook

  const [selectedMember, setSelectedMember] = useState<IChurchMember | null>(
    null
  );
  const [amount, setAmount] = useState<number | string>(""); // Keep this as a string until validated
  const [week, setWeek] = useState<string>("");
  const [monthYear, setMonthYear] = useState<string>("");

  // Modal state
  const [opened, setOpened] = useState(false);
  const isMobile = useIsMobile();
  const [showDirectory, setShowDirectory] = useState(true);


  // Handle the contribution submission
  const handleAddContribution = async () => {
    if (!selectedMember || !amount || !week || !monthYear) {
      enqueueSnackbar("Please fill all fields", { variant: "error" });
      return;
    }

    const parsedAmount = parseFloat(amount as string);
    const parsedWeek = parseInt(week, 10);
    if (
      isNaN(parsedAmount) ||
      isNaN(parsedWeek) ||
      parsedWeek < 1 ||
      parsedWeek > 5
    ) {
      enqueueSnackbar("Please enter a valid amount and week (1-5)", {
        variant: "error",
      });
      return;
    }

    // Call the function to add the contribution here
    try {
      if (!selectedMember || !selectedMember._id) {
        enqueueSnackbar("Please select a member", { variant: "error" });
        return;
      }

      await addContribution({
        memberId: selectedMember._id,
        amount: parsedAmount,
        week: parsedWeek,
        month: monthYear.split(" ")[0], // Extract the month
        year: parseInt(monthYear.split(" ")[1], 10), // Extract the year
      });

      // Close the modal after successful submission
      setOpened(false);
    } catch (error) {
      console.error("Error adding contribution:", error);
    }
  };

  const handleMemberSelect = (user: IChurchMember) => {
  setSelectedMember(user);
  setShowDirectory(false); // Hide directory on select
  console.log("Selected Member ID:", user?._id);
};


  // Format the month and year as "Month Year" (e.g., "April 2025")
  const handleMonthYearChange = (date: Date | null) => {
    if (date) {
      setMonthYear(
        `${date.toLocaleString("default", { month: "long" })} ${date.getFullYear()}`
      );
    } else {
      setMonthYear(""); // Reset when no date is selected
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Add Weekly Contribution</h2>

      {/* Button to open the modal */}
      <Button onClick={() => setOpened(true)} color="teal" fullWidth>
        Add Contribution
      </Button>

      {/* Contribution Modal */}
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Add Contribution"
        centered
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        transitionProps={{ transition: "rotate-left" }}
        size={isMobile ? "95%" : "55rem"}
      >
        {/* Use MembersDirectoryWithSearch for searching and selecting a member */}
        {showDirectory && (
  <MembersDirectoryWithSearch
    users={filteredUsers}
    searchTerm={searchTerm}
    setSearchTerm={setSearchTerm}
    selectedMinistry={selectedMinistry}
    setSelectedMinistry={setSelectedMinistry}
    ministryOptions={ministryOptions}
    onButtonClick={handleMemberSelect}
    buttonLabel="Select Member"
    buttonIcon={<FiSearch />}
    selectedMember={selectedMember}
  />
)}

{selectedMember && (
  <div className="mb-4 border p-4 rounded bg-gray-100">
    <p><strong>Name:</strong> {selectedMember.firstName} {selectedMember.lastName}</p>
    <p><strong>Email:</strong> {selectedMember.email}</p>
    <p><strong>Phone:</strong> {selectedMember.phoneNumber}</p>
    <Button
      size="xs"
      color="gray"
      variant="outline"
      onClick={() => {
        setSelectedMember(null);
        setShowDirectory(true); // Allow re-selection
      }}
      className="mt-2"
    >
      Change Member
    </Button>
  </div>
)}

        
        {/* Contribution Form inside the Modal */}
        <div className="mb-4">
          <TextInput
            label="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter contribution amount"
          />
        </div>
        <div className="mb-4">
          <TextInput
            label="Week"
            value={week}
            onChange={(e) => setWeek(e.target.value)}
            placeholder="Enter contribution week"
          />
        </div>
        <div className="mb-4">
          <DateInput
            label="Month/Year"
            value={monthYear ? new Date(`${monthYear} 1, 2025`) : null} // Set the default value
            onChange={handleMonthYearChange}
            valueFormat="MMMM YYYY"
            placeholder="Enter contribution month/year"
            clearable
            allowDeselect
          />
        </div>

        <Group align="right">
          <Button onClick={handleAddContribution} color="teal">
            Submit Contribution
          </Button>
        </Group>
      </Modal>
    </div>
  );
}
