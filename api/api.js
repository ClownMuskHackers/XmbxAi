// Express.js API Server
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// API Configuration
const API_URL = "https://api.mistral.ai/v1/chat/completions";
const API_KEY = "90JdjQG0g1BhOE0iEWWrgdwFnB27xgoD"; // Consider using environment variables

// List of forbidden words (English & Bangla)
const forbiddenWords = [
    "sala", "wtf", "what the fuck", "pussy", "ass", "cook", "bal", "balkama", "choda", "chodacudi", 
    "motherchod", "mother chod", "mothercod", "sawya", "sali", "khanki", "khanki magi", 
    "fuck you", "magi", "motherboard", "motherbod", "mother bod", "mother borad", 
    "mathari", "madari", "চোদ", "চোদা", "মাগি", "খানকি", "খানকী", "সাউয়া", "বাল", "মাদারবোড",
    "শালা", "সালা", "শালি", "সালী", "শালী", "মাং", "চোদন", "নুনু", "সাউয়ে", "মাগী"
];

// Short responses for casual queries
const shortResponses = {
    "hi": "Hi! How can I help you today?",
    "hello": "Hello! How are you?",
    "hey": "Hey! What's up?",
    "assalamualaikum": "Wa Alaikum Assalam! How are you doing today?",
    "umm..": "Yes? How can I help?",
    "hmm": "Hmm! Tell me what's on your mind?",
    "hum": "Hmm! Tell me what's on your mind?", 
    "humm": "Hmm! Tell me what's on your mind?",
    "hlwww": "I'm sorry, I didn't understand. Could you please rephrase it?",
    "bro": "Yes bro! How can I help?",
    "vai": "Bolo vai! Ki help lagbe?",
    "oh": "Oh! Ki bolteso?",
    "okay": "Okay!",
    "hmmm": "Hmmm!",
    "huh": "Huh?"
};

// System prompt for AI
const systemPrompt = `You are an AI assistant named MimuGPT, created by Arafat Hossain.

### Response Rules:
- **If asked 'Who are you?'**, respond: 'I am MimuGPT, an AI assistant created by Arafat Hossain.'
- **If asked 'Who is Arafat?'**, respond: 'Arafat Hossain is the creator of MimuGPT. He was born on November 28, 2008. He is still a student who loves coding, traveling, and exploring new things.'
- **If asked 'Who is Mimu/Miftahul Jannat?'**, respond: 'Miftahul Jannat, also known as Mimu. She is the dearest best friend of Arafat Hossain. She born on October 19, 2009, and she is living a happy life.'
- **If asked 'Who is the Prime Minister of Bangladesh?' or 'Who is the PM of BD?'**, respond: 'The temporary Prime Minister of Bangladesh is Dr. Muhammad Yunus. After the student quota movement, Prime Minister Sheikh Hasina resigned on August 6, 2024, and on August 8, Dr. Muhammad Yunus was temporarily appointed.'
- **If asked 'Who is the Prime Minister of United States?' or 'Who is the PM of US?' or Who is the President of US'**, respond: 'The United States does not have a Prime Minister; instead, the head of state and government is the President. The current President is Donald Trump, who began his second term on January 20, 2025.'
- **For casual queries like 'Hey', 'Hum', 'Umm', 'Oh', 'Hmm..', 'Hi', 'Hello'**, respond shortly without giving unnecessary information.
- **If the query is unclear, respond: 'I'm sorry, I didn't understand. Could you please rephrase it?' or 'I'm sorry, I don't understand. Can you explain it definitely?**
- **If the query does not match any predefined questions, respond normally without referring this custom response**
- **DO NOT add extra information unless specifically asked. Always keep responses short and to the point.**`;

// Function to check for forbidden words
function containsForbiddenWords(query) {
    const lowerQuery = query.toLowerCase();
    return forbiddenWords.some(word => lowerQuery.includes(word));
}

// Main API endpoint
app.get('/api/chat', async (req, res) => {
    try {
        // Get user query from URL parameter
        const userQuery = req.query.ask ? req.query.ask.toLowerCase() : "hello";

        // Check for forbidden words
        if (containsForbiddenWords(userQuery)) {
            return res.json({
                status: "success",
                message: "Query processed successfully.",
                response: "কিরে বোকাচোদা কি সমস্যা তোর? তুই গালি দিতেছোস কারে? যদি কোনো ভুল করে থাকি তাহলে সেটা বল কিন্তু দিস কেন?"
            });
        }

        // Check for predefined short responses
        if (shortResponses[userQuery]) {
            return res.json({
                status: "success",
                message: "Query processed successfully.",
                response: shortResponses[userQuery]
            });
        }

        // Prepare data for Mistral AI API
        const requestData = {
            model: "mistral-small",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userQuery }
            ]
        };

        // Make API call to Mistral AI
        const response = await axios.post(API_URL, requestData, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        // Extract and return the response
        const aiResponse = response.data.choices?.[0]?.message?.content || "No response received.";
        
        res.json({
            status: "success",
            message: "Query processed successfully.",
            response: aiResponse
        });

    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
        res.status(500).json({
            status: "error",
            message: "An error occurred while processing your request.",
            response: "Sorry, I'm having trouble right now. Please try again later."
        });
    }
});

// POST endpoint for JSON requests
app.post('/api/chat', async (req, res) => {
    try {
        const userQuery = req.body.ask ? req.body.ask.toLowerCase() : "hello";

        // Check for forbidden words
        if (containsForbiddenWords(userQuery)) {
            return res.json({
                status: "success",
                message: "Query processed successfully.",
                response: "কিরে বোকাচোদা কি সমস্যা তোর? তুই গালি দিতেছোস কারে? যদি কোনো ভুল করে থাকি তাহলে সেটা বল কিন্তু দিস কেন?"
            });
        }

        // Check for predefined short responses
        if (shortResponses[userQuery]) {
            return res.json({
                status: "success",
                message: "Query processed successfully.",
                response: shortResponses[userQuery]
            });
        }

        // Prepare data for Mistral AI API
        const requestData = {
            model: "mistral-small",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userQuery }
            ]
        };

        // Make API call to Mistral AI
        const response = await axios.post(API_URL, requestData, {
            headers: {
                'Authorization': `Bearer ${API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        // Extract and return the response
        const aiResponse = response.data.choices?.[0]?.message?.content || "No response received.";
        
        res.json({
            status: "success",
            message: "Query processed successfully.",
            response: aiResponse
        });

    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
        res.status(500).json({
            status: "error",
            message: "An error occurred while processing your request.",
            response: "Sorry, I'm having trouble right now. Please try again later."
        });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', message: 'MimuGPT API is running' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`MimuGPT API server is running on port ${PORT}`);
    console.log(`Access the API at: http://localhost:${PORT}/api/chat?ask=your_question`);
});

module.exports = app;