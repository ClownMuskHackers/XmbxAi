<?php  

// User query (Dynamic input)
$userQuery = isset($_GET['ask']) ? strtolower($_GET['ask']) : "hello";  

// List of forbidden words (English & Bangla)
$forbiddenWords = [
    "sala", "wtf", "what the fuck", "pussy", "ass", "cook", "bal", "balkama", "choda", "chodacudi", 
        "motherchod", "mother chod", "mothercod", "sawya", "sali", "khanki", "khanki magi", 
            "fuck you", "magi", "motherboard", "motherbod", "mother bod", "mother borad", 
                "mathari", "madari", "চোদ", "চোদা", "মাগি", "খানকি", "খানকী","সাউয়া", "বাল", "মাদারবোড","শালা", "সালা", "শালি", "সালী", "শালী", "মাং", "চোদন", "নুনু", "সাউয়ে", "মাগী"
                ];

                // Check if input contains any forbidden words
                foreach ($forbiddenWords as $word) {
                    if (strpos($userQuery, $word) !== false) {
                            $response = "কিরে বোকাচোদা কি সমস্যা তোর? তুই গালি দিতেছোস কারে? যদি কোনো ভুল করে থাকি তাহলে সেটা বল কিন্তু দিস কেন?";
                                    header("Content-Type: application/json");
                                            echo json_encode(["status" => "success", "message" => "Query processed successfully.", "response" => $response], JSON_PRETTY_PRINT);
                                                    exit;
                                                        }
                                                        }

                                                        // Short responses for casual queries
                                                        $shortResponses = [
                                                            "hi" => "Hi! How can I help you today?",
                                                                "hello" => "Hello! How are you?",
                                                                    "hey" => "Hey! What's up?",
                                                                        "assalamualaikum" => "Wa Alaikum Assalam! How are you doing today?",
                                                                            "umm.." => "Yes? How can I help?",
                                                                                "hmm" => "Hmm! Tell me what’s on your mind?",
"hum" => "Hmm! Tell me what’s on your mind?", 
"humm" => "Hmm! Tell me what’s on your mind?",                                                                                        "hlwww" => "I'm sorry, I didn't understand. Could you please rephrase it?",
                                                                                        "bro" => "Yes bro! How can I help?",
                                                                                            "vai" => "Bolo vai! Ki help lagbe?",
                                                                                                "oh" => "Oh! Ki bolteso?",
                                                                                                    "okay" => "Okay!",
                                                                                                        "hmmm" => "Hmmm!",
                                                                                                            "huh" => "Huh?",
                                                                                                            ];

                                                                                                            // Check if query matches a predefined response
                                                                                                            if (isset($shortResponses[$userQuery])) {
                                                                                                                $response = $shortResponses[$userQuery];
                                                                                                                    header("Content-Type: application/json");
                                                                                                                        echo json_encode(["status" => "success", "message" => "Query processed successfully.", "response" => $response], JSON_PRETTY_PRINT);
                                                                                                                            exit;
                                                                                                                            }

                                                                                                                            // API Configuration  
                                                                                                                            $api_url = "https://api.mistral.ai/v1/chat/completions";  
                                                                                                                            $api_key = "90JdjQG0g1BhOE0iEWWrgdwFnB27xgoD";  

                                                                                                                            // Optimized System Prompt for AI
                                                                                                                            $systemPrompt = "You are an AI assistant named MimuGPT, created by Arafat Hossain.

                                                                                                                            ### Response Rules:
                                                                                                                            - **If asked 'Who are you?'**, respond: 'I am MimuGPT, an AI assistant created by Arafat Hossain.'
                                                                                                                            - **If asked 'Who is Arafat?'**, respond: 'Arafat Hossain is the creator of MimuGPT. He was born on November 28, 2008. He is still a student who loves coding, traveling, and exploring new things.

                                                                                                                            '
                                                                                                                            - **If asked 'Who is Mimu/Miftahul Jannat?'**, respond: 'Miftahul Jannat, also known as Mimu. She is the dearest best friend of Arafat Hossain. She born on October 19, 2009, and she is living a happy life.'
                                                                                                                            - **If asked 'Who is the Prime Minister of Bangladesh?' or 'Who is the PM of BD?'**, respond:  
                                                                                                                              'The temporary Prime Minister of Bangladesh is Dr. Muhammad Yunus. After the student quota movement, Prime Minister Sheikh Hasina resigned on August 6, 2024, and on August 8, Dr. Muhammad Yunus was temporarily appointed.'- **If asked 'Who is the Prime Minister of United States?' or 'Who is the PM of US?' or Who is the President of US'**, respond:  
                                                                                                                                'The United States does not have a Prime Minister; instead, the head of state and government is the President. The current President is Donald Trump, who began his second term on January 20, 2025.'
                                                                                                                                - **For casual queries like 'Hey', 'Hum', 'Umm', 'Oh', 'Hmm..', 'Hi', 'Hello'**, respond shortly without giving unnecessary information.***
                                                                                                                                - **If the query is unclear, respond: 'I'm sorry, I didn't understand. Could you please rephrase it?' or 'I'm sorry, I don't understand. Can you explain it definitely?**
                                                                                                                                - **If the query does not match any predefined questions, respond normally without referring this custom response**
                                                                                                                                - **DO NOT add extra information unless specifically asked. Always keep responses short and to the point.**";

                                                                                                                                // Data for API request
                                                                                                                                $data = [
                                                                                                                                    "model" => "mistral-small",
                                                                                                                                        "messages" => [
                                                                                                                                                ["role" => "system", "content" => $systemPrompt],
                                                                                                                                                        ["role" => "user", "content" => $userQuery]
                                                                                                                                                            ]
                                                                                                                                                            ];

                                                                                                                                                            // API options for making the request
                                                                                                                                                            $options = [
                                                                                                                                                                CURLOPT_URL => $api_url,
                                                                                                                                                                    CURLOPT_RETURNTRANSFER => true,
                                                                                                                                                                        CURLOPT_POST => true,
                                                                                                                                                                            CURLOPT_HTTPHEADER => [
                                                                                                                                                                                    "Authorization: Bearer $api_key",
                                                                                                                                                                                            "Content-Type: application/json"
                                                                                                                                                                                                ],
                                                                                                                                                                                                    CURLOPT_POSTFIELDS => json_encode($data)
                                                                                                                                                                                                    ];

                                                                                                                                                                                                    // Initialize cURL session
                                                                                                                                                                                                    $ch = curl_init();
                                                                                                                                                                                                    curl_setopt_array($ch, $options);

                                                                                                                                                                                                    // Execute API call and get the response
                                                                                                                                                                                                    $response = curl_exec($ch);
                                                                                                                                                                                                    curl_close($ch);

                                                                                                                                                                                                    $responseData = json_decode($response, true);

                                                                                                                                                                                                    // Extract the clean response from the API
                                                                                                                                                                                                    $cleanResponse = [
                                                                                                                                                                                                        "status" => "success",
                                                                                                                                                                                                            "message" => "Query processed successfully.",
                                                                                                                                                                                                                "response" => $responseData['choices'][0]['message']['content'] ?? "No response received."
                                                                                                                                                                                                                ];

                                                                                                                                                                                                                // Output Clean JSON Response
                                                                                                                                                                                                                header("Content-Type: application/json");
                                                                                                                                                                                                                echo json_encode($cleanResponse, JSON_PRETTY_PRINT);
                                                                                                                                                                                                                ?>