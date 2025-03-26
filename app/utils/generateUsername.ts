import ChurchUser from "@/app/models/churchMember.model";

export const generateUsername = async (firstName: string, lastName: string) => {
  if (!firstName || !lastName) {
    throw new Error("First name and last name are required to generate a username.");
  }

  // Convert names to lowercase once and remove non-alphanumeric characters
  const cleanFirstName = firstName.toLowerCase().replace(/[^a-z0-9]/g, "");
  const cleanLastName = lastName.toLowerCase().replace(/[^a-z0-9]/g, "");

  const baseUsername = `${cleanFirstName}${cleanLastName}`.slice(0, 15); // Limit length for better readability
  let uniqueUsername = baseUsername;
  let counter = 1;

  // Prevent infinite loop by limiting attempts (e.g., max 100 tries)
  while (counter < 100) {
    const existingUser = await ChurchUser.findOne({ userName: uniqueUsername });
    if (!existingUser) break; // Found a unique username, exit loop

    uniqueUsername = `${baseUsername}${counter}`;
    counter++;
  }

  if (counter === 100) {
    throw new Error("Failed to generate a unique username after multiple attempts.");
  }

  return uniqueUsername;
};
