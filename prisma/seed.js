/* eslint no-console: 0 */
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const showData = true;

// datas
// const school = require("./data/school");

async function printData() {
  // TODO: complete console log querys
}

async function createSchool() {
  // TODO: complete createSchool
}

async function createAdmin() {
  // TODO: complete createAdmin
}

async function createSubject() {
  // TODO: complete createSubject
}

async function createCourse() {
  // TODO: complete createCourse
}

async function createStudent() {
  // TODO: complete createStudent
}

async function createParents() {
  // TODO: complete createParents
}

async function createTeacher() {
  // TODO: complete createTeacher
}

async function main() {
  console.log("\n> 🌱 Start seeding 🌱");

  console.log("\n> 🏫 Create School 🏫");
  await createSchool();

  console.log("\n> 🤓 Create Admin 🤓");
  await createAdmin();

  console.log("\n> 📚 Create Course 📚");
  await createCourse();

  console.log(
    "\n> 📙 Create Subject (with forum, content, files and hours) 📙"
  );
  await createSubject();

  console.log(
    "\n> 🧑‍🎓 Create Student (with greades, asistances and relation with course)"
  );
  await createStudent();

  console.log("\n> 👨‍👩‍👦 Create Parents (with relation with student) 👨‍👩‍👦");
  await createParents();

  console.log("\n> 🧑‍🏫 Create Teacher (with relation with subject) 🧑‍🏫");
  await createTeacher();

  console.log("\n> 🌳 End seeding 🌳");

  if (showData) {
    console.log("\n\n______________________________________________________");
    await printData();
    console.log("\n\n______________________________________________________");
  }
}

main()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
