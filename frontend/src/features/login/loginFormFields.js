export const loginFormFields = [
  {
    label: "Email",
    name: "email",
    type: "email",
    placeholder: "abc@example.com",
    required: true,
  },
  {
    label: "Password",
    name: "password",
    type: "password",
    placeholder: "********",
    required: true,
  },
  {
    label: "Role",
    name: "role",
    type: "select",
    options: [
      { value: "student", label: "Student" },
      { value: "alumni", label: "Alumni" },
    ],
    required: true,
  },
]
