// seeders/employeeSeeder.js

import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import Employee from "../model/userModel.js";

const departments = [
  "Engineering",
  "HR",
  "Finance",
  "Marketing",
];

const designations = [
  "Frontend Developer",
  "Backend Developer",
  "QA Engineer",
  "HR Executive",
];

export const seedEmployees = async (count = 50) => {
  const employees = [];

  for (let i = 1; i <= count; i++) {
    const password = await bcrypt.hash("Password@123", 10);

    employees.push({
      empId: `EMP${1000 + i}`,
      firstname: faker.person.firstName(),
      lastname: faker.person.lastName(),
      email: faker.internet.email().toLowerCase(),
      password,
      phone: faker.string.numeric(10),
      gender: faker.helpers.arrayElement(["male", "female"]),
      dob: faker.date.birthdate({
        min: 22,
        max: 40,
        mode: "age",
      }),
      status: "active",

      jd: {
        department: faker.helpers.arrayElement(departments),
        designation: faker.helpers.arrayElement(designations),
        joiningDate: faker.date.past({ years: 3 }),
        salary: faker.number.int({
          min: 30000,
          max: 120000,
        }),
      },

      address: {
        street: faker.location.streetAddress(),
        state: faker.location.state(),
        country: faker.location.country(),
        pincode: faker.location.zipCode(),
      },

      emergency_contact: {
        contactName: faker.person.fullName(),
        relationship: faker.helpers.arrayElement([
          "Father",
          "Mother",
          "Brother",
          "Sister",
        ]),
        phone: faker.string.numeric(10),
      },
    });
  }

  await Employee.insertMany(employees);

  console.log(`${count} employees inserted successfully.`);
};