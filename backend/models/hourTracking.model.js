import { Schema, model } from "mongoose";

// Define the schema for working hours
const WorkingHoursSchema = new Schema({
  loggedInAt: {
    type: Date,
  },
  loggedOutAt: {
    type: Date,
  },
});

// Define the schema for the User model
const hourSchema = new Schema({
  // Add other fields as needed
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  workingHours: [WorkingHoursSchema], // Array of working hours entries
  totalMonthlyHours: {
    type: Number,
    default: 0, // Default value of total monthly hours is set to 0
  },
});

// Define a method to calculate monthly hours for a user
hourSchema.methods.calculateMonthlyHours = function (cutoffDate) {
  let totalHours = 0;
  let durationHours = 0;
  let durationMinutes = 0;

  // Loop through each working hours entry
  for (let i = 0; i < this.workingHours.length - 1; i++) {
    const entry = this.workingHours[i];
    // Calculate the duration between loggedInAt and loggedOutAt in milliseconds
    const durationMs = entry.loggedOutAt - entry.loggedInAt;
    console.log(durationMs);
    // Convert duration from milliseconds to hours
    durationHours = durationMs / (1000 * 60 * 60);

    // Add the duration to the total hours counter
    totalHours += durationHours;

    // Calculate the remaining minutes
    durationMinutes = (durationMs % (1000 * 60 * 60)) / (1000 * 60);

    // Add the minutes to the total hours counter
    totalHours += durationMinutes / 60;
  }

  // Update the totalMonthlyHours field in the schema
  this.totalMonthlyHours = totalHours;

  return {
    hours: Math.round(durationHours),
    minutes: Math.round(durationMinutes)
    };
};

// Create the User model
const HourTracking = model("workHour", hourSchema);

export default HourTracking;