export const jwtConstants = {
  secret: process.env.JWT_SECRET || 'madeeonfire', // ใช้ค่า default ถ้าไม่มี environment variable
};