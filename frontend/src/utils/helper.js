export const validateEmail= (email) => {
    if (!email.trim()) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)) return 'Please enter a valid email address';
    return ''
  }

  export const validatePassword = (password) => {
    if(!password) return "password is required";
    if(password.length < 8) return "password must be atleast 8 characters";
    if(!/(?=.*[a-z])/.test(password)) return 'password must contain atleast one lowercase character';
    if(!/(?=.*[A-Z])/.test(password)) return 'password must contain atleast one uppercase character';
    if(!/(?=.*\d)/.test(password)) return 'password must contain atleast one number';
    return '';
  }

  
const d = [
  [0,1,2,3,4,5,6,7,8,9],
  [1,2,3,4,0,6,7,8,9,5],
  [2,3,4,0,1,7,8,9,5,6],
  [3,4,0,1,2,8,9,5,6,7],
  [4,0,1,2,3,9,5,6,7,8],
  [5,9,8,7,6,0,4,3,2,1],
  [6,5,9,8,7,1,0,4,3,2],
  [7,6,5,9,8,2,1,0,4,3],
  [8,7,6,5,9,3,2,1,0,4],
  [9,8,7,6,5,4,3,2,1,0]
];

const p = [
  [0,1,2,3,4,5,6,7,8,9],
  [1,5,7,6,2,8,3,0,9,4],
  [5,8,0,3,7,9,6,1,4,2],
  [8,9,1,6,0,4,3,5,2,7],
  [9,4,5,3,1,2,6,8,7,0],
  [4,2,8,6,5,7,3,9,0,1],
  [2,7,9,3,8,0,6,4,1,5],
  [7,0,4,6,9,1,3,2,5,8]
];

export const validateAadhar = (aadhar) => {
  if (!aadhar) return "Aadhar number is required";
  if (!/^\d{12}$/.test(aadhar)) return "Aadhar must be exactly 12 digits";

  let checksum = 0;
  const reversed = aadhar.split("").reverse();

  for (let i = 0; i < reversed.length; i++) {
    const num = parseInt(reversed[i], 10);
    checksum = d[checksum][p[i % 8][num]];
  }

  if (checksum !== 0) return "Invalid Aadhar number";

  return "";
};

  


