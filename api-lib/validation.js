const validation = {
  user: {
    email: {
      type: "string",
      pattern: "[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$",
    },
    password: {
      type: "string",
      minLength: 6,
      pattern: "(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])",
    },
  },
};

export const signupValidation = {
  type: "object",
  properties: {
    email: validation.user.email,
    password: validation.user.password,
  },
  required: ["email", "password"],
};
