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

export const clapValidation = {
  type: "object",
  properties: {
    userClaps: { type: "integer" },
  },
  required: ["userClaps"],
};

export const usernameValidity = {
  type: "object",
  properties: {
    username: {
      type: "string",
      pattern: "^(?![_.])[a-zA-Z0-9_.]+$",
      minLength: 3,
    },
  },
  required: ["username"],
};
