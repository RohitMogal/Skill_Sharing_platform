const executeQuery = require("../config/db_config");

const createInterest = async (Interest) => {
  try {
    const interests = [
      "Programming",
      "Angular",
      "Web Development",
      "Mobile App Development",
      "Data Science",
      "DevOps",
      "Python",
      "JavaScript",
      "Java",
      "C++",
      "C#",
      "Ruby",
      "PHP",
      "Swift",
      "Go",
      "Kotlin",
      "Rust",
      "TypeScript",
      "Artificial Intelligence",
      "Machine Learning",
      "Cybersecurity",
      "Cloud Computing",
      "Blockchain",
      "Game Development",
      "R",
      "Drawing",
      "Painting",
      "Sculpting",
      "Pottery",
      "Knitting",
      "Sewing",
      "Calligraphy",
      "Woodworking",
      "Jewelry Making",
      "Photography",
      "Singing",
      "Guitar",
      "Piano",
      "Drumming",
      "Music Production",
      "Acting",
      "Dance",
      "Voice Acting",
      "DJing",
      "Composing",
      "Entrepreneurship",
      "Marketing",
      "Sales",
      "Project Management",
      "Public Speaking",
      "Accounting",
      "Investing",
      "Financial Planning",
      "Leadership",
      "Negotiation",
      "Yoga",
      "Meditation",
      "Personal Training",
      "Nutrition",
      "Weightlifting",
      "Running",
      "Pilates",
      "Martial Arts",
      "Sports Coaching",
      "Mental Health",
      "Creative Writing",
      "Blogging",
      "Journalism",
      "Translation",
      "Copywriting",
      "Speech Writing",
      "Language Learning (e.g., Spanish, French, Mandarin, etc.)",
      "Poetry",
      "Screenwriting",
      "Baking",
      "Culinary Arts",
      "Vegan Cooking",
      "Food Photography",
      "Mixology",
      "International Cuisine",
      "Pastry Making",
      "Nutrition",
      "Meal Prep",
      "Cake Decorating",
      "Gardening",
      "Interior Design",
      "Home Renovation",
      "Carpentry",
      "Electrical Work",
      "Plumbing",
      "Landscaping",
      "Furniture Making",
      "Sustainable Living",
      "Smart Home Technology",
      "Study Skills",
      "Time Management",
      "Memory Improvement",
      "Speed Reading",
      "Career Coaching",
      "Mindfulness",
      "Emotional Intelligence",
      "Productivity Hacks",
      "Goal Setting",
      "Life Coaching",
      "Biology",
      "Chemistry",
      "Physics",
      "Environmental Science",
      "Astronomy",
      "Medical Research",
      "Psychology",
      "Archaeology",
      "Robotics",
      "React",
      "Genetics",
      "Travel Planning",
      "Event Planning",
      "Fashion Design",
      "Makeup Artistry",
      "Pet Training",
      "Gardening",
      "Astrology",
      "Chess",
      "Board Games",
      "Magic Tricks",
    ];

    interests.map(async (res) => {
      const query = `INSERT INTO Interest (Interest,CreatedAt) VALUES (?,NOW());`;
      const result = await executeQuery(query, [res]);
    });
    // const query = `INSERT INTO Interest (Interest,CreatedAt) VALUES (?,NOW());`;
    // const result = await executeQuery(query, [Interest]);
    return result;
  } catch (err) {
    throw new Error("Error creating interest: " + err.message);
  }
};

const getInterest = async () => {
  try {
    const query = `SELECT id,Interest FROM Interest`;
    const result = await executeQuery(query, []);
    return result;
  } catch (err) {
    throw new Error("Error retrieving interest: " + err.message);
  }
};

const getInterestById = async (id) => {
  try {
    const query = `SELECT id,Interest FROM Interest WHERE Id = ?;`;
    const result = await executeQuery(query, [id, false]);
    return result;
  } catch (err) {
    throw new Error("Error retrieving interest: " + err.message);
  }
};

const updateInterest = async (id, Interest) => {
  try {
    const query = `UPDATE Interest SET Interest = ? WHERE Id = ? ;`;
    const result = await executeQuery(query, [Interest, id, false]);
    console.log(result);
    return result;
  } catch (err) {
    throw new Error("Error updating interest: " + err.message);
  }
};

const deleteInterest = async (id) => {
  try {
    const query = `UPDATE Interest SET WHERE Id = ?;`;
    const result = await executeQuery(query, [true, id]);
    return result;
  } catch (err) {
    throw new Error("Error deleting interest: " + err.message);
  }
};

module.exports = {
  createInterest,
  getInterestById,
  updateInterest,
  deleteInterest,
  getInterest,
};
