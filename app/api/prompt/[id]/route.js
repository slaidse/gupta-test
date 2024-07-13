import { connectToDB } from "@utils/database";
import Prompt from '@models/prompt';

export const GET = async (req, {params}) => {
    try {
        await connectToDB();
        const prompt = await Prompt.findById(params.id).populate('creator');

        if (!prompt) return new Response ("Prompt not found", {status : 404})

        return new Response(JSON.stringify(prompt), { status: 200 }); // Fixed parentheses
    } catch (error) {
        console.error(error); // Log the error for debugging
        return new Response("Failed to fetch particular prompt", { status: 500 }); // Fixed string formatting
    }
}

export const PATCH = async (request, {params}) => {
    const {prompt, tag} = await request.json();
    
    try {
        await connectToDB()
        console.log(params.id)
        const existingPrompt = await Prompt.findById(params.id)
        if (!prompt) return new Response ("Prompt not found", {status : 404})

        existingPrompt.prompt = prompt
        existingPrompt.tag = tag

        await existingPrompt.save()

        return new Response(JSON.stringify(existingPrompt), { status: 200 }); // Fixed parentheses
    } catch (error) {
        console.error(error); // Log the error for debugging
        return new Response("Failed to update prompt", { status: 500 }); // Fixed string formatting
    }
 }

 export const DELETE = async (req, {params}) => {
    try {
        await connectToDB()
        const {id} = params
        console.log(id)
         await Prompt.findByIdAndDelete(params.id)
       

        return new Response("Prompt deleted successfully", { status: 200 }); // Fixed parentheses
    } catch (error) {
        console.error(error); // Log the error for debugging
        return new Response("Fail to delete prompt", { status: 500 }); // Fixed string formatting
    }
 }