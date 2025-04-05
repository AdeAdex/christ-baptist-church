// components/admin/ContributionForm.tsx
import { TextInput, Select } from "@mantine/core";
import { DateInput } from "@mantine/dates";

export const ContributionForm = ({
  amount,
  setAmount,
  week,
  setWeek,
  monthYear,
  setMonthYear,
  type,
  setType,
  status,
  setStatus,
  paymentMethod,
  setPaymentMethod,
  description,
  setDescription,
}) => {
  return (
    <div>
      <TextInput
        label="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
      />
      <TextInput
        label="Week"
        value={week}
        onChange={(e) => setWeek(e.target.value)}
        placeholder="Week"
      />
      <DateInput
        label="Month/Year"
        value={monthYear ? new Date(`${monthYear} 1, 2025`) : null}
        onChange={(date: Date | null) =>
          setMonthYear(
            date ? `${date.toLocaleString("default", { month: "long" })} ${date.getFullYear()}` : ""
          )
        }
        valueFormat="MMMM YYYY"
        placeholder="Enter contribution month/year"
        clearable
        allowDeselect
      />
      <Select
        label="Type"
        value={type}
        onChange={(value) => setType(value || "")}
        placeholder="Select Contribution Type"
        data={[
          { value: "Regular", label: "Regular" },
          { value: "Special", label: "Special" },
          { value: "Tithe", label: "Tithe" },
        ]}
      />
      <Select
        label="Status"
        value={status}
        onChange={(value) => setStatus(value || "")}
        placeholder="Select Status"
        data={[
          { value: "Pending", label: "Pending" },
          { value: "Completed", label: "Completed" },
          { value: "Failed", label: "Failed" },
        ]}
      />
      <Select
        label="Payment Method"
        value={paymentMethod}
        onChange={(value) => setPaymentMethod(value || "")}
        placeholder="Select Payment Method"
        data={[
          { value: "Cash", label: "Cash" },
          { value: "Bank Transfer", label: "Bank Transfer" },
          { value: "Mobile Payment", label: "Mobile Payment" },
          { value: "Cheque", label: "Cheque" },
        ]}
      />
      <TextInput
        label="Description (Optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
    </div>
  );
};
