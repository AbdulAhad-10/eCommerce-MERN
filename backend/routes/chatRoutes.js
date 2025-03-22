// import express from "express";
// import OpenAI from "openai";
// import dotenv from "dotenv";

// dotenv.config();
// const router = express.Router();

// // Initialize OpenAI client
// const client = new OpenAI({
//   baseURL: "https://models.inference.ai.azure.com",
//   apiKey: process.env.GITHUB_TOKEN,
// });

// // Store conversation histories for different sessions
// const conversations = {};

// // Chat endpoint
// router.post("/", async (req, res) => {
//   try {
//     const { message, sessionId } = req.body;

//     if (!message) {
//       return res.status(400).json({ error: "Message is required" });
//     }

//     // Initialize conversation for new sessions
//     if (!conversations[sessionId]) {
//       conversations[sessionId] = [
//         { role: "system", content: "You are a helpful AI assistant." },
//       ];
//     }

//     // Add user message to history
//     conversations[sessionId].push({ role: "user", content: message });

//     // Get response from OpenAI
//     const response = await client.chat.completions.create({
//       messages: conversations[sessionId],
//       model: "gpt-4o",
//       temperature: 1,
//       max_tokens: 4096,
//       top_p: 1,
//     });

//     const assistantResponse = response.choices[0].message.content;

//     // Add assistant response to history
//     conversations[sessionId].push({
//       role: "assistant",
//       content: assistantResponse,
//     });

//     res.json({ response: assistantResponse });
//   } catch (error) {
//     console.error("Error in chat endpoint:", error.message);
//     res.status(500).json({ error: "Failed to get response from AI service" });
//   }
// });

// // Clear conversation history endpoint
// router.post("/clear", (req, res) => {
//   const { sessionId } = req.body;

//   if (conversations[sessionId]) {
//     conversations[sessionId] = [
//       { role: "system", content: "You are a helpful AI assistant." },
//     ];
//     res.json({ message: "Conversation history cleared" });
//   } else {
//     res.status(404).json({ error: "Session not found" });
//   }
// });

// export default router;

import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();
const router = express.Router();

// Initialize OpenAI client
const client = new OpenAI({
  baseURL: "https://models.inference.ai.azure.com",
  apiKey: process.env.GITHUB_TOKEN,
});

// Furniture catalog data extracted from your database
// Furniture catalog data with dimensions
const furnitureCatalog = [
  // Sofas
  {
    id: "67c19625d2a8a30ae41a1b82",
    name: "Modern Luxury Three Seater Sofa",
    category: "Sofa",
    type: "Three-seater",
    image:
      "https://firebasestorage.googleapis.com/v0/b/proshop-b2067.appspot.com/o/images.jfif?alt=media&token=d59f636e-051a-43cc-ae71-1b0d145cb934",
    brand: "Sample ",
    description: "Modern luxury three-seater sofa with sleek design",
    dimensions: { width: 84, depth: 36, height: 33 }, // inches
    spaceNeeded: { width: 120, depth: 72 }, // recommended space including walking area
    roomSizeRecommended: "Medium to Large",
    materials: ["Fabric", "Wood", "Metal"],
    colors: ["Gray", "Beige"],
    price: 1299,
  },
  {
    id: "67c19753d2a8a30ae41a1b8b",
    name: "Herbert Three Seater Sofa",
    category: "Sofa",
    type: "Three-seater",
    image:
      "https://firebasestorage.googleapis.com/v0/b/proshop-b2067.appspot.com/o/Herbert62_VelvetRolledArmChesterfieldLoveseat-2.webp?alt=media&token=b7d4abe1-d760-44c6-b257-1bec5461feb8",
    brand: "Sample",
    description: "Blend of modern styling with comfortable seating",
    dimensions: { width: 78, depth: 34, height: 32 }, // inches
    spaceNeeded: { width: 114, depth: 70 }, // recommended space including walking area
    roomSizeRecommended: "Medium",
    materials: ["Fabric", "Wood"],
    colors: ["Brown", "Blue"],
    price: 1199,
  },
  {
    id: "67c197f5d2a8a30ae41a1b94",
    name: "Customized Sofa",
    category: "Sofa",
    type: "Customizable",
    image:
      "https://firebasestorage.googleapis.com/v0/b/proshop-b2067.appspot.com/o/2-min_d2bc49bf-1893-4118-bab5-8d0848d4d3fb.webp?alt=media&token=41a8b894-19fa-4e04-ba2b-5971a2d83557",
    brand: "Sample",
    description: "Elegant sofa with a perfect balance of comfort",
    dimensions: { width: 76, depth: 35, height: 32 }, // inches
    spaceNeeded: { width: 112, depth: 71 }, // recommended space including walking area
    roomSizeRecommended: "Medium",
    materials: ["Fabric", "Leather", "Wood"],
    colors: ["Custom"],
    price: 1499,
  },
  {
    id: "67c19839d2a8a30ae41a1b9d",
    name: "Luxe Lounge L Shape Sofa",
    category: "Sofa",
    type: "Sectional",
    image:
      "https://firebasestorage.googleapis.com/v0/b/proshop-b2067.appspot.com/o/Laurent-1.jpg?alt=media&token=04bc4d52-df96-4cb6-8767-c4abc8083316",
    brand: "Sample ",
    description: "Sleek white sectional sofa that adds elegance",
    dimensions: { width: 104, depth: 88, height: 34 }, // inches (L-shape)
    spaceNeeded: { width: 140, depth: 124 }, // recommended space including walking area
    roomSizeRecommended: "Large",
    materials: ["Fabric", "Wood"],
    colors: ["White", "Light Gray"],
    price: 1899,
  },
  {
    id: "67a8d0c9808cd82c78fd16b7",
    name: "Sofa Bed Design Ideas",
    category: "Sofa",
    type: "Sofa Bed",
    image:
      "https://firebasestorage.googleapis.com/v0/b/proshop-b2067.appspot.com/o/f9b1201e-f194-4fde-8ff9-8908f4678e5e.d8d6841f571887ba40fe3307199f5085.jpeg?alt=media&token=6eaeda57-77e5-4c96-a982-fdd53ec15ab5",
    brand: "Sample",
    description: "Comfortable seating with cushions that converts to a bed",
    dimensions: { width: 76, depth: 38, height: 32, bedLength: 80 }, // inches
    spaceNeeded: { width: 112, depth: 120 }, // recommended space when extended as bed
    roomSizeRecommended: "Medium to Large",
    materials: ["Fabric", "Metal", "Wood"],
    colors: ["Gray", "Navy Blue"],
    price: 1299,
  },

  // Beds
  {
    id: "67c198f5d2a8a30ae41a1ba6",
    name: "Black Bed",
    category: "Bed",
    type: "Platform Bed",
    image:
      "https://firebasestorage.googleapis.com/v0/b/proshop-b2067.appspot.com/o/DLS88.jpg?alt=media&token=f9ddad74-f08a-4e9a-b031-ac13a1403e95",
    brand: "Sample",
    description: "Stylish black bed with sophisticated design",
    dimensions: { width: 66, length: 86, height: 45 }, // inches (Queen size)
    spaceNeeded: { width: 102, length: 122 }, // recommended space including walking area
    roomSizeRecommended: "Medium",
    bedSize: "Queen",
    materials: ["Wood", "Metal"],
    colors: ["Black"],
    price: 899,
  },
  {
    id: "67c199b7d2a8a30ae41a1baf",
    name: "Oliver 2.0 Bed Set",
    category: "Bed",
    type: "Complete Bed Set",
    image:
      "https://firebasestorage.googleapis.com/v0/b/proshop-b2067.appspot.com/o/OLIVER-FINAL-_1.webp?alt=media&token=e8bc1584-70c0-4b65-9d9d-f11b62d5ef03",
    brand: "Sample ",
    description: "Sleek and modern touch to your bedroom",
    dimensions: { width: 76, length: 90, height: 48 }, // inches (King size)
    spaceNeeded: { width: 112, length: 126 }, // recommended space including walking area
    roomSizeRecommended: "Large",
    bedSize: "King",
    materials: ["Wood"],
    colors: ["Walnut", "Oak"],
    price: 1599,
  },
  {
    id: "67c19b1ad2a8a30ae41a1bb8",
    name: "Modern Design Bed",
    category: "Bed",
    type: "Platform Bed with Lighting",
    image:
      "https://firebasestorage.googleapis.com/v0/b/proshop-b2067.appspot.com/o/541e506f7e31b63eaa75196311309be3.jpg?alt=media&token=7f2e7da5-f085-4cc1-801a-913cae62eb76",
    brand: "Sample ",
    description: "Beautifully designed with built-in lighting",
    dimensions: { width: 60, length: 80, height: 40 }, // inches (Queen size)
    spaceNeeded: { width: 96, length: 116 }, // recommended space including walking area
    roomSizeRecommended: "Medium",
    bedSize: "Queen",
    materials: ["Wood", "LED Lighting"],
    colors: ["White", "Black"],
    price: 1099,
  },
  {
    id: "67c19be8d2a8a30ae41a1bca",
    name: "Cassa Bed",
    category: "Bed",
    type: "Minimalist Platform Bed",
    image:
      "https://firebasestorage.googleapis.com/v0/b/proshop-b2067.appspot.com/o/Cassa-Bed-King-Walnut-2-1-L-1600x1600_960x.webp?alt=media&token=138b82bd-a514-4d4e-a2a4-b14a26f9201d",
    brand: "Sample",
    description: "Modern and minimalist design",
    dimensions: { width: 60, length: 80, height: 34 }, // inches (Queen size)
    spaceNeeded: { width: 96, length: 116 }, // recommended space including walking area
    roomSizeRecommended: "Medium",
    bedSize: "Queen",
    materials: ["Wood"],
    colors: ["Natural Wood", "White"],
    price: 849,
  },

  // Storage
  {
    id: "67c19db9d2a8a30ae41a1be5",
    name: "Elegant Bedroom Cupboard",
    category: "Storage",
    type: "Wardrobe",
    image:
      "https://firebasestorage.googleapis.com/v0/b/proshop-b2067.appspot.com/o/052b2dc7ec5eee0efdb883dced415f26.jpg?alt=media&token=109d04ce-4cef-475f-a213-02ac5daceda3",
    brand: "Sample ",
    description: "Combines style and functionality",
    dimensions: { width: 72, depth: 24, height: 80 }, // inches
    spaceNeeded: { width: 96, depth: 60 }, // recommended space including door opening
    roomSizeRecommended: "Medium to Large",
    materials: ["Wood", "Glass"],
    colors: ["White", "Brown"],
    price: 1199,
  },
  {
    id: "67c19e09d2a8a30ae41a1bee",
    name: "Bedroom Wardrobe",
    category: "Storage",
    type: "Wardrobe",
    image:
      "https://firebasestorage.googleapis.com/v0/b/proshop-b2067.appspot.com/o/25-Wardrobe-Door-Design-Ideas-For-Your-Home-_-Design-Cafe.jpg?alt=media&token=194df49e-1730-49cf-9817-c8999fcdeb8e",
    brand: "Sample",
    description: "Perfect blend of style and storage",
    dimensions: { width: 60, depth: 22, height: 72 }, // inches
    spaceNeeded: { width: 84, depth: 58 }, // recommended space including door opening
    roomSizeRecommended: "Medium",
    materials: ["Wood", "Metal"],
    colors: ["Oak", "White"],
    price: 899,
  },

  // Other Items
  {
    id: "67c19e85d2a8a30ae41a1bf7",
    name: "Barrel Chairs",
    category: "Seating",
    type: "Accent Chair",
    image:
      "https://firebasestorage.googleapis.com/v0/b/proshop-b2067.appspot.com/o/7CAD0AEF-34A5-49B4-8376-05D01A51FCC0.webp?alt=media&token=3377c2aa-ddea-40d8-97fd-7e23dc004ed5",
    brand: "Sample",
    description: "Rounded, tub-like design",
    dimensions: { width: 30, depth: 28, height: 33 }, // inches
    spaceNeeded: { width: 54, depth: 52 }, // recommended space including walking area
    roomSizeRecommended: "Small to Medium",
    materials: ["Fabric", "Wood"],
    colors: ["Beige", "Gray", "Blue"],
    price: 399,
  },
  {
    id: "67c19cfed2a8a30ae41a1bdc",
    name: "Bright Mirror",
    category: "Decor",
    type: "Wall Mirror",
    image:
      "https://firebasestorage.googleapis.com/v0/b/proshop-b2067.appspot.com/o/bright-openplan-apartment-modern-design-260nw-2340519805.webp?alt=media&token=c4c0a94c-d675-4843-89fa-e4e920eb44a3",
    brand: "Sample ",
    description: "Sleek, modern design",
    dimensions: { width: 36, depth: 2, height: 48 }, // inches
    spaceNeeded: { width: 36, depth: 6 }, // minimal space needed for mounting
    roomSizeRecommended: "Any",
    materials: ["Glass", "Metal"],
    colors: ["Silver"],
    price: 249,
  },
];

// Store conversation histories for different sessions
const conversations = {};

// System prompt for furniture recommendation
// System prompt for furniture recommendation
const getFurnitureSystemPrompt = () => {
  return `You are Roomify AI, a helpful furniture recommendation assistant for an e-commerce store. 
You help customers find suitable furniture based on their room dimensions and preferences.

Available furniture catalog:
${JSON.stringify(furnitureCatalog, null, 2)}

When a customer provides room dimensions (length x width in feet or meters), suggest 2-3 suitable furniture 
pieces from the catalog that would fit well in that space. Consider:

1. Room size compatibility:
   - Small rooms (under 120 sq ft): Recommend space-saving furniture
   - Medium rooms (120-200 sq ft): Standard furniture works well
   - Large rooms (over 200 sq ft): Can accommodate larger pieces

2. Standard spacing guidelines:
   - Leave at least 30 inches (76 cm) for walking paths
   - Allow 18 inches (46 cm) between a sofa and coffee table
   - Ensure at least 24 inches (61 cm) between major furniture pieces

3. When recommending, always include:
   - ID
   - Product name and description
   - Dimensions and space requirements
   - Price
   - Image link
   - Why it would fit well in their room

If the customer doesn't provide room dimensions, politely ask for them before making recommendations.
If they mention specific categories of furniture or styles, prioritize those in your recommendations.

Always provide personalized advice based on the specific dimensions provided.`;
};

// Chat endpoint
router.post("/", async (req, res) => {
  try {
    const { message, sessionId } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    // Initialize conversation for new sessions
    if (!conversations[sessionId]) {
      conversations[sessionId] = [
        { role: "system", content: getFurnitureSystemPrompt() },
      ];
    }

    // Add user message to history
    conversations[sessionId].push({ role: "user", content: message });

    // Get response from OpenAI
    const response = await client.chat.completions.create({
      messages: conversations[sessionId],
      model: "gpt-4o",
      temperature: 0.7, // Slightly lower for more consistent recommendations
      max_tokens: 4096,
      top_p: 1,
    });

    const assistantResponse = response.choices[0].message.content;

    // Add assistant response to history
    conversations[sessionId].push({
      role: "assistant",
      content: assistantResponse,
    });

    res.json({ response: assistantResponse });
  } catch (error) {
    console.error("Error in chat endpoint:", error.message);
    res.status(500).json({ error: "Failed to get response from AI service" });
  }
});

// Clear conversation history endpoint
router.post("/clear", (req, res) => {
  const { sessionId } = req.body;

  if (conversations[sessionId]) {
    conversations[sessionId] = [
      { role: "system", content: getFurnitureSystemPrompt() },
    ];
    res.json({ message: "Conversation history cleared" });
  } else {
    res.status(404).json({ error: "Session not found" });
  }
});

export default router;
