// export const validateEmail = (email) => {
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return emailRegex.test(email);
// };

// export const validatePassword = (password) => {
//   return typeof password === "string" && password.length >= 6;
// };

// export const validateRegistration = (data) => {
//   const errors = {};

//   console.log("📩 Validating Data:", data);

//   // if (!data.name) {
//   //   errors.name = "Name must be at least 2 characters long";
//   // }

//   if (!data.email || !validateEmail(data.email)) {
//     errors.email = "Please provide a valid email address";
//   }

//   if (!data.password || !validatePassword(data.password)) {
//     errors.password = "Password must be at least 6 characters long";
//   }

//   console.log("✅ Validation Result:", {
//     isValid: Object.keys(errors).length === 0,
//     errors,
//   });

//   return {
//     isValid: Object.keys(errors).length === 0,
//     errors,
//   };
// };
