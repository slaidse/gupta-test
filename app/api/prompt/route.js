import { connectToDB } from "@utils/database";
import Prompt from '@models/prompt';

export const GET = async (req) => {
    try {
        await connectToDB();
        const prompts = await Prompt.find({}).populate('creator');

        return new Response(JSON.stringify(prompts), { status: 200 }); // Fixed parentheses
    } catch (error) {
        console.error(error); // Log the error for debugging
        return new Response("Failed to fetch all prompts", { status: 500 }); // Fixed string formatting
    }
}