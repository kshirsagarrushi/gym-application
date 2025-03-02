const targetArr = [
  "Lose weight",
  "Gain weight",
  "Improve flexibility",
  "General fitness",
  "Build Muscle",
  "Rehabilitation/Recovery",
];
const activityArr = [
  "Yoga",
  "Climbing",
  "Strength Training",
  "Cross-fit",
  "Cardio Training",
  "Rehabilitation",
];

const timeArray = [
  "09:00-10:00",
  "10:00-11:00",
  "11:00-12:00",
  "12:00-13:00",
  "13:00-14:00",
  "14:00-15:00",
  "15:00-16:00",
  "16:00-17:00",
  "17:00-18:00",
  "18:00-19:00",
];

const coachArray = [
  { firstName: "All", lastName: "" },
  {
    coachId: 1,
    firstName: "John",
    lastName: "Coach",
    email: "john.coach@example.com",
  },
  {
    coachId: 2,
    firstName: "Sarah",
    lastName: "Coach",
    email: "sarah.coach@example.com",
  },
  {
    coachId: 3,
    firstName: "Michael",
    lastName: "Coach",
    email: "michael.coach@example.com",
  },
  {
    coachId: 4,
    firstName: "Emma",
    lastName: "Coach",
    email: "emma.coach@example.com",
  },
  {
    coachId: 5,
    firstName: "David",
    lastName: "Coach",
    email: "david.coach@example.com",
  },
  {
    coachId: 6,
    firstName: "Olivia",
    lastName: "Coach",
    email: "olivia.coach@example.com",
  },
  {
    coachId: 7,
    firstName: "James",
    lastName: "Coach",
    email: "james.coach@example.com",
  },
  {
    coachId: 8,
    firstName: "Ava",
    lastName: "Coach",
    email: "ava.coach@example.com",
  },
  {
    coachId: 9,
    firstName: "Daniel",
    lastName: "Coach",
    email: "daniel.coach@example.com",
  },
  {
    coachId: 10,
    firstName: "Sophia",
    lastName: "Coach",
    email: "sophia.coach@example.com",
  },
  {
    coachId: 11,
    firstName: "William",
    lastName: "Coach",
    email: "william.coach@example.com",
  },
  {
    coachId: 12,
    firstName: "Isabella",
    lastName: "Coach",
    email: "isabella.coach@example.com",
  },
  {
    coachId: 13,
    firstName: "Benjamin",
    lastName: "Coach",
    email: "benjamin.coach@example.com",
  },
];

const timeArr2 = ["10:30 - 11:30 AM", "11:30 - 12:30 AM", "04:30 - 05:30 AM"];

const coachData = [
  {
    email: "kristin_watson@nomail.com",
    firstName: "Kristin",
    lastName: "Watson",
    title: "Certified Personal Yoga Trainer",
    ratings: 4.96, // Changed to number
    summary:
      "A Yoga Expert dedicated to crafting personalized workout plans that align with your goals.",
    specialization: "Yoga", // Changed from type to specialization
    duration: "1h", // Changed from time to duration
    date: "2026-11-15T10:00:00Z",
    timeArray: ["10:00 AM", "11:00 AM", "12:00 PM"],
    coachId: "1",
  },
  {
    firstName: "Jacob",
    lastName: "Cooper",
    title: "Strength and Conditioning Specialist",
    ratings: 4.88, // Changed to number
    summary:
      "Focused on helping you build strength and endurance through proven techniques and strategies.",
    specialization: "Strength Training", // Changed from type to specialization
    duration: "1.5h", // Changed from time to duration
    date: "2026-11-16T08:00:00Z",
    timeArray: ["8:00 AM", "9:30 AM", "11:00 AM"],
    coachId: "2",
  },
  {
    firstName: "Sophia",
    lastName: "Smith",
    title: "Certified Pilates Instructor",
    ratings: 4.92, // Changed to number
    summary:
      "Specializing in Pilates to improve your flexibility, balance, and core strength.",
    specialization: "Pilates", // Changed from type to specialization
    duration: "45m", // Changed from time to duration
    date: "2026-06-17T07:30:00Z",
    timeArray: ["7:30 AM", "8:15 AM", "9:00 AM"],
    coachId: "3",
  },
];

export { targetArr, activityArr, timeArray, coachArray, timeArr2, coachData };

export interface CoachInterface {
  firstName: string;
  lastName: string;
  title: string;
  ratings: string;
  summary: string;
  specialization: string;
  duration: string;
  date: string;
  timeArray: string[];
  email: string;
  coachId: string;
  profilePicture: string;
}
