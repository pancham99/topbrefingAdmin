export const adminUserFields = [
  {
    name: "firstName",
    label: "First Name",
    type: "text",
    placeholder: "Enter first name",
  },
  {
    name: "lastName",
    label: "Last Name",
    type: "text",
    placeholder: "Enter last name",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    disabled: true, // ❗ admin cannot change email
  },
  {
    name: "phone",
    label: "Phone",
    type: "text",
  },
  {
    name: "role",
    label: "Role",
    type: "select",
    options: [
      { label: "User", value: "user" },
      { label: "Admin", value: "admin" },
      { label: "Super Admin", value: "super_admin" },
    ],
  },
  {
    name: "isActive",
    label: "Active",
    type: "switch",
  },
  {
    name: "isSuspended",
    label: "Suspended",
    type: "switch",
  },
];
