export default {
  en: {
    messages: {
      min: (field, len) => `${field} must be at least ${len} characters.`,
      email: () => `You have to enter a valid email address.`,
      numeric: () => `You have to enter a valid phone number.`,
      required: () => `This field is required.`,
      alpha_spaces: () => `Only alphabetic characters and spaces are allowed.`,
      confirmed: (field, targetField) => `${field} should match ${targetField}.`
    }
  }
}
