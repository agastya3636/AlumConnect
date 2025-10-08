export const registerFormFields = {
  1: [ // Step 1: Basic Info
    {
      label: "Name",
      name: "fullName",
      type: "text",
      placeholder: "John Doe",
      required: true,
    },
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
      label: "Batch",
      name: "batch",
      type: "text",
      placeholder: "2025",
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
  ],
  2: [ // Step 2: Profile Info
    {
      label: "Profile Picture URL",
      name: "profilePicture",
      type: "text",
      placeholder: "https://example.com/profile.jpg",
      required: false,
    },
    {
      label: "Education",
      name: "education",
      type: "text",
      placeholder: "XYZ University",
      required: true,
    },
    {
      label: "Bio",
      name: "bio",
      type: "text",
      placeholder: "Short bio about yourself",
      required: false,
    },
    {
      label: "LinkedIn",
      name: "linkedin",
      type: "text",
      placeholder: "https://linkedin.com/in/username",
      required: true,
    },
    {
      label: "GitHub",
      name: "github",
      type: "text",
      placeholder: "https://github.com/username",
      required: true,
    },
    {
      label: "Twitter",
      name: "twitter",
      type: "text",
      placeholder: "https://twitter.com/username",
      required: false,
    },
  ],
  3: [ // Step 3: Skills & Interests
    {
      label: "Skills",
      name: "skills",
      type: "multiselect",
      options: [
        { value: "javascript", label: "JavaScript" },
        { value: "react", label: "React" },
        { value: "nodejs", label: "Node.js" },
        { value: "python", label: "Python" },
        { value: "machineLearning", label: "Machine Learning" },
        { value: "deepLearning", label: "Deep Learning" },
        { value: "webDevelopment", label: "Web Development" },
        // more can be added
      ],
      required: true,
    },
    {
      label: "Interests",
      name: "interests",
      type: "multiselect",
      options: [
        { value: "ai", label: "AI" },
        { value: "webDev", label: "Web Development" },
        { value: "gaming", label: "Gaming" },
        { value: "reading", label: "Reading" },
        // more can be added
      ],
      required: true,
    },
  ],
};