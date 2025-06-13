import mongoose from "mongoose";
import UserModel from "../models/User.model";

export async function addSubmittedQuiz(submissionID: string, userID: string) {
    try {
        const submissionObjectId = new mongoose.Types.ObjectId(submissionID);
        
        const updatedUser = await UserModel.findByIdAndUpdate(
            userID,
            { $addToSet: { quizzesTaken: submissionObjectId } },
            { new: true }
        );

        if (!updatedUser) {
            console.warn(`User with ID ${userID} not found.`);
            return null;
        }

        console.log(`Quiz ${submissionID} successfully added to user ${userID}.`);
        return updatedUser;
    } catch (error) {
        console.error(`Failed to add quiz ${submissionID} to user ${userID}:`, error);
        throw error;
    }
}
