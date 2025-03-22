// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import "./chat.css";

// const ChatPage = () => {
//   const [message, setMessage] = useState("");
//   const [chatHistory, setChatHistory] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [sessionId, setSessionId] = useState("");
//   const [error, setError] = useState(null);

//   const chatEndRef = useRef(null);

//   useEffect(() => {
//     setSessionId(`session-${Math.random().toString(36).substring(2, 10)}`);
//   }, []);

//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [chatHistory]);

//   const handleSendMessage = async (e) => {
//     e.preventDefault();

//     if (!message.trim()) return;

//     setChatHistory((prev) => [...prev, { role: "user", content: message }]);
//     setMessage("");
//     setIsLoading(true);
//     setError(null);

//     try {
//       const { data } = await axios.post("/api/chat", {
//         message: message,
//         sessionId: sessionId,
//       });

//       setChatHistory((prev) => [
//         ...prev,
//         { role: "assistant", content: data.response },
//       ]);
//     } catch (err) {
//       console.error("Error sending message:", err);
//       setError("Failed to get a response. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleClearChat = async () => {
//     try {
//       await axios.post("/api/chat/clear", { sessionId });
//       setChatHistory([]);
//       setError(null);
//     } catch (err) {
//       console.error("Error clearing chat:", err);
//       setError("Failed to clear chat history");
//     }
//   };

//   return (
//     <div className="minimal-chat-container">
//       <h2 className="chat-title">AI Assistant</h2>

//       {error && <div className="error-message">{error}</div>}

//       <div className="chat-box">
//         <div className="chat-header">
//           <span>Chat Session</span>
//           <button className="clear-button" onClick={handleClearChat}>
//             Clear Chat
//           </button>
//         </div>

//         <div className="chat-messages">
//           {chatHistory.length === 0 ? (
//             <div className="empty-chat">
//               <p>Send a message to start chatting with the AI assistant</p>
//             </div>
//           ) : (
//             chatHistory.map((msg, index) => (
//               <div
//                 key={index}
//                 className={`message ${
//                   msg.role === "user" ? "user-message" : "assistant-message"
//                 }`}
//               >
//                 <div className="message-content">{msg.content}</div>
//               </div>
//             ))
//           )}

//           {isLoading && (
//             <div className="message assistant-message">
//               <div className="message-content loading">
//                 <div className="loading-dots">
//                   <span></span>
//                   <span></span>
//                   <span></span>
//                 </div>
//                 Thinking...
//               </div>
//             </div>
//           )}

//           <div ref={chatEndRef} />
//         </div>

//         <form className="chat-input-form" onSubmit={handleSendMessage}>
//           <input
//             type="text"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             placeholder="Type your message..."
//             disabled={isLoading}
//           />
//           <button type="submit" disabled={isLoading || !message.trim()}>
//             Send
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ChatPage;

// import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
// import "./chat.css";

// const ChatPage = () => {
//   const [message, setMessage] = useState("");
//   const [chatHistory, setChatHistory] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [sessionId, setSessionId] = useState("");
//   const [error, setError] = useState(null);
//   const [roomLength, setRoomLength] = useState("");
//   const [roomWidth, setRoomWidth] = useState("");
//   const [showRoomForm, setShowRoomForm] = useState(false);
//   const [productDetails, setProductDetails] = useState({});
//   const chatEndRef = useRef(null);

//   useEffect(() => {
//     setSessionId(`session-${Math.random().toString(36).substring(2, 10)}`);
//   }, []);

//   useEffect(() => {
//     chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [chatHistory]);

//   const handleSendMessage = async (e) => {
//     e.preventDefault();
//     if (!message.trim()) return;

//     setChatHistory((prev) => [...prev, { role: "user", content: message }]);
//     setMessage("");
//     setIsLoading(true);
//     setError(null);

//     try {
//       const { data } = await axios.post("/api/chat", {
//         message: message,
//         sessionId: sessionId,
//       });

//       // Process the response and identify product recommendations
//       const processedResponse = processAIResponse(data.response);

//       setChatHistory((prev) => [
//         ...prev,
//         {
//           role: "assistant",
//           content: processedResponse.text,
//           productIds: processedResponse.productIds,
//         },
//       ]);

//       // Fetch product details for any new IDs
//       fetchProductDetails(processedResponse.productIds);
//     } catch (err) {
//       console.error("Error sending message:", err);
//       setError("Failed to get a response. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Process the AI response to extract product IDs and enhance display
//   const processAIResponse = (response) => {
//     // Extract product IDs using regex
//     const productIds = [];
//     const idRegex = /\*\*ID:\*\*\s*([a-f0-9]+)/gi;

//     let match;
//     while ((match = idRegex.exec(response)) !== null) {
//       productIds.push(match[1]);
//     }

//     // You could enhance this function to format the response further if needed
//     return {
//       text: response,
//       productIds: productIds,
//     };
//   };

//   // Fetch product details from the backend
//   const fetchProductDetails = async (ids) => {
//     // In a real app, this would be an API call
//     // For this demo, we'll simulate with the product catalog from your backend

//     // Mock function to simulate API call - in a real app, this would be a fetch/axios call
//     const mockFetchProductDetails = (ids) => {
//       const mockCatalog = [
//         {
//           id: "67c19625d2a8a30ae41a1b82",
//           name: "Modern Luxury Three Seater Sofa",
//           category: "Sofa",
//           type: "Three-seater",
//           image:
//             "https://firebasestorage.googleapis.com/v0/b/proshop-b2067.appspot.com/o/images.jfif?alt=media&token=d59f636e-051a-43cc-ae71-1b0d145cb934",
//           description: "Modern luxury three-seater sofa with sleek design",
//           price: 1299,
//         },
//         {
//           id: "67c19753d2a8a30ae41a1b8b",
//           name: "Herbert Three Seater Sofa",
//           category: "Sofa",
//           type: "Three-seater",
//           image:
//             "https://firebasestorage.googleapis.com/v0/b/proshop-b2067.appspot.com/o/Herbert62_VelvetRolledArmChesterfieldLoveseat-2.webp?alt=media&token=b7d4abe1-d760-44c6-b257-1bec5461feb8",
//           description: "Blend of modern styling with comfortable seating",
//           price: 1199,
//         },
//         {
//           id: "67c19b1ad2a8a30ae41a1bb8",
//           name: "Modern Design Bed",
//           category: "Bed",
//           type: "Platform Bed with Lighting",
//           image:
//             "https://firebasestorage.googleapis.com/v0/b/proshop-b2067.appspot.com/o/541e506f7e31b63eaa75196311309be3.jpg?alt=media&token=7f2e7da5-f085-4cc1-801a-913cae62eb76",
//           description: "Beautifully designed with built-in lighting",
//           price: 1099,
//         },
//       ];

//       return ids.reduce((acc, id) => {
//         const product = mockCatalog.find((item) => item.id === id);
//         if (product) {
//           acc[id] = product;
//         }
//         return acc;
//       }, {});
//     };

//     // Get product details
//     const newProducts = mockFetchProductDetails(ids);

//     // Update state with new product details
//     setProductDetails((prev) => ({
//       ...prev,
//       ...newProducts,
//     }));
//   };

//   const handleSubmitRoomDimensions = (e) => {
//     e.preventDefault();
//     const dimensionsMessage = `My room dimensions are ${roomLength} feet long and ${roomWidth} feet wide. Can you recommend furniture that would fit well in this space?`;
//     setMessage(dimensionsMessage);
//     setShowRoomForm(false);
//     handleSendMessage(e);
//   };

//   const handleClearChat = async () => {
//     try {
//       await axios.post("/api/chat/clear", { sessionId });
//       setChatHistory([]);
//       setError(null);
//       setProductDetails({});
//     } catch (err) {
//       console.error("Error clearing chat:", err);
//       setError("Failed to clear chat history");
//     }
//   };

//   // Render message content with enhanced product display
//   const renderMessageContent = (message) => {
//     // Simple regex to detect image URLs specific to your Firebase storage
//     const imageUrlRegex =
//       /https:\/\/firebasestorage\.googleapis\.com\/v0\/b\/proshop-b2067\.appspot\.com\/[^\s"]+/g;

//     // Find all image URLs in the content
//     const imageUrls = message.content.match(imageUrlRegex) || [];

//     // Replace image URLs with placeholders to avoid displaying them in text
//     let processedContent = message.content;
//     imageUrls.forEach((url, index) => {
//       processedContent = processedContent.replace(url, `[IMAGE_${index}]`);
//     });

//     return (
//       <div>
//         {/* Display the text content */}
//         <div
//           dangerouslySetInnerHTML={{
//             __html: processedContent.replace(/\n/g, "<br/>"),
//           }}
//         />

//         {/* Display any images found in the content */}
//         {imageUrls.length > 0 && (
//           <div className="product-images-container">
//             {imageUrls.map((url, index) => (
//               <div key={index} className="product-image-card">
//                 <img
//                   src={url}
//                   alt={`Product ${index + 1}`}
//                   className="product-image"
//                 />
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Display product cards if product IDs are available */}
//         {message.productIds && message.productIds.length > 0 && (
//           <div className="product-cards-container">
//             <h4>Recommended Products:</h4>
//             <div className="product-cards">
//               {message.productIds.map((id) =>
//                 productDetails[id] ? (
//                   <div key={id} className="product-card">
//                     <div className="product-card-image">
//                       <img
//                         src={productDetails[id].image}
//                         alt={productDetails[id].name}
//                       />
//                     </div>
//                     <div className="product-card-content">
//                       <h3 className="product-name">
//                         {productDetails[id].name}
//                       </h3>
//                       <p className="product-description">
//                         {productDetails[id].description}
//                       </p>
//                       <p className="product-price">
//                         ${productDetails[id].price}
//                       </p>
//                       <button
//                         className="view-details-button"
//                         onClick={() => window.open(`/product/${id}`)}
//                       >
//                         View Details
//                       </button>
//                     </div>
//                   </div>
//                 ) : (
//                   <div key={id} className="product-card-loading">
//                     <div className="loading-dots">
//                       <span></span>
//                       <span></span>
//                       <span></span>
//                     </div>
//                     Loading product...
//                   </div>
//                 )
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div className="minimal-chat-container">
//       <h2 className="chat-title">Furniture Recommendation Assistant</h2>
//       {error && <div className="error-message">{error}</div>}

//       <div className="room-dimensions-section">
//         <button
//           className="room-dimensions-button"
//           onClick={() => setShowRoomForm(!showRoomForm)}
//         >
//           {showRoomForm ? "Hide Room Form" : "Enter Room Dimensions"}
//         </button>

//         {showRoomForm && (
//           <form
//             className="room-dimensions-form"
//             onSubmit={handleSubmitRoomDimensions}
//           >
//             <div className="form-group">
//               <label htmlFor="roomLength">Room Length (feet):</label>
//               <input
//                 type="number"
//                 id="roomLength"
//                 min="1"
//                 max="100"
//                 value={roomLength}
//                 onChange={(e) => setRoomLength(e.target.value)}
//                 required
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="roomWidth">Room Width (feet):</label>
//               <input
//                 type="number"
//                 id="roomWidth"
//                 min="1"
//                 max="100"
//                 value={roomWidth}
//                 onChange={(e) => setRoomWidth(e.target.value)}
//                 required
//               />
//             </div>

//             <button type="submit" className="submit-dimensions">
//               Get Recommendations
//             </button>
//           </form>
//         )}
//       </div>

//       <div className="chat-box">
//         <div className="chat-header">
//           <span>Chat Session</span>
//           <button className="clear-button" onClick={handleClearChat}>
//             Clear Chat
//           </button>
//         </div>

//         <div className="chat-messages">
//           {chatHistory.length === 0 ? (
//             <div className="empty-chat">
//               <p>
//                 Send a message or enter your room dimensions to get furniture
//                 recommendations
//               </p>
//             </div>
//           ) : (
//             chatHistory.map((msg, index) => (
//               <div
//                 key={index}
//                 className={`message ${
//                   msg.role === "user" ? "user-message" : "assistant-message"
//                 }`}
//               >
//                 <div className="message-content">
//                   {msg.role === "assistant"
//                     ? renderMessageContent(msg)
//                     : msg.content}
//                 </div>
//               </div>
//             ))
//           )}

//           {isLoading && (
//             <div className="message assistant-message">
//               <div className="message-content loading">
//                 <div className="loading-dots">
//                   <span></span>
//                   <span></span>
//                   <span></span>
//                 </div>
//                 Thinking...
//               </div>
//             </div>
//           )}

//           <div ref={chatEndRef} />
//         </div>

//         <form className="chat-input-form" onSubmit={handleSendMessage}>
//           <input
//             type="text"
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             placeholder="Ask about furniture recommendations..."
//             disabled={isLoading}
//           />
//           <button type="submit" disabled={isLoading || !message.trim()}>
//             Send
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ChatPage;

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "./chat.css";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../../actions/productActions";

const ChatPage = () => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [error, setError] = useState(null);
  const [roomLength, setRoomLength] = useState("");
  const [roomWidth, setRoomWidth] = useState("");
  const [showRoomForm, setShowRoomForm] = useState(false);
  const chatEndRef = useRef(null);

  // Redux setup
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { products } = productList;

  useEffect(() => {
    dispatch(listProducts("", 1));
    setSessionId(`session-${Math.random().toString(36).substring(2, 10)}`);
  }, [dispatch]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setChatHistory((prev) => [...prev, { role: "user", content: message }]);
    setMessage("");
    setIsLoading(true);
    setError(null);

    try {
      const { data } = await axios.post("/api/chat", {
        message: message,
        sessionId: sessionId,
      });

      // Process the response and extract the recommendations
      const processedResponse = processAIResponse(data.response);

      setChatHistory((prev) => [
        ...prev,
        {
          role: "assistant",
          recommendations: processedResponse.recommendations,
          generalAdvice: processedResponse.generalAdvice,
        },
      ]);
    } catch (err) {
      console.error("Error sending message:", err);
      setError("Failed to get a response. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Process the AI response to extract recommendations and general advice
  const processAIResponse = (response) => {
    // Extract product IDs, names, and descriptions using regex
    const recommendations = [];
    const idRegex = /\*\*ID:\*\*\s*([a-f0-9]+)/g;
    const nameRegex = /\*\*\d+\.\s+([^*]+)\*\*/g;
    const descriptionRegex = /\*\*Description:\*\*\s*([^\n]+)/g;
    const dimensionsRegex = /\*\*Dimensions:\*\*\s*([^\n]+)/g;

    // Extract IDs
    let idMatch;
    const ids = [];
    while ((idMatch = idRegex.exec(response)) !== null) {
      ids.push(idMatch[1]);
    }

    // Extract names
    let nameMatch;
    const names = [];
    while ((nameMatch = nameRegex.exec(response)) !== null) {
      names.push(nameMatch[1].trim());
    }

    // Extract descriptions
    let descMatch;
    const descriptions = [];
    while ((descMatch = descriptionRegex.exec(response)) !== null) {
      descriptions.push(descMatch[1].trim());
    }

    // Extract dimensions
    let dimMatch;
    const dimensions = [];
    while ((dimMatch = dimensionsRegex.exec(response)) !== null) {
      dimensions.push(dimMatch[1].trim());
    }

    // Create recommendation objects
    for (let i = 0; i < ids.length; i++) {
      recommendations.push({
        id: ids[i],
        name: names[i] || `Product ${i + 1}`,
        description: descriptions[i] || "No description available",
        dimensions: dimensions[i] || "Dimensions not specified",
      });
    }

    // Extract general advice (text after the last recommendation)
    let generalAdvice = "";
    const additionalNotesMatch = response.match(
      /### Additional Notes:([\s\S]+)/
    );
    if (additionalNotesMatch) {
      generalAdvice = additionalNotesMatch[1].trim();
    }

    return {
      recommendations: recommendations,
      generalAdvice: generalAdvice,
    };
  };

  // Get product images from our catalog
  const getProductImageById = (id) => {
    if (!products || products.length === 0) return null;

    const product = products.find((p) => p._id === id);
    return product ? product.image : null;
  };

  const handleSubmitRoomDimensions = (e) => {
    e.preventDefault();
    const dimensionsMessage = `My room dimensions are ${roomLength} feet long and ${roomWidth} feet wide. Can you recommend furniture that would fit well in this space?`;
    setMessage(dimensionsMessage);
    setShowRoomForm(false);
    handleSendMessage(e);
  };

  const handleClearChat = async () => {
    try {
      await axios.post("/api/chat/clear", { sessionId });
      setChatHistory([]);
      setError(null);
    } catch (err) {
      console.error("Error clearing chat:", err);
      setError("Failed to clear chat history");
    }
  };

  // Render message content with product recommendations
  const renderMessageContent = (message) => {
    if (message.role === "user") {
      return <div>{message.content}</div>;
    }

    // For assistant messages
    return (
      <div>
        {message.recommendations && message.recommendations.length > 0 ? (
          <div className="product-cards-container">
            <h4>Recommended Products:</h4>
            <div className="product-cards">
              {message.recommendations.map((rec) => (
                <div key={rec.id} className="product-card">
                  <div className="product-card-image">
                    {getProductImageById(rec.id) ? (
                      <img src={getProductImageById(rec.id)} alt={rec.name} />
                    ) : (
                      <div className="no-image">No Image Available</div>
                    )}
                  </div>
                  <div className="product-card-content">
                    <h3 className="product-name">{rec.name}</h3>
                    <p className="product-description">{rec.description}</p>
                    <p className="product-dimensions">{rec.dimensions}</p>
                    <button
                      className="view-details-button"
                      onClick={() => window.open(`/product/${rec.id}`)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {message.generalAdvice && (
          <div className="general-advice">
            <h4>Additional Notes:</h4>
            <div
              dangerouslySetInnerHTML={{
                __html: message.generalAdvice.replace(/\n/g, "<br/>"),
              }}
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="minimal-chat-container">
      <h2 className="chat-title">Furniture Recommendation Assistant</h2>
      {error && <div className="error-message">{error}</div>}

      <div className="room-dimensions-section">
        <button
          className="room-dimensions-button"
          onClick={() => setShowRoomForm(!showRoomForm)}
        >
          {showRoomForm ? "Hide Room Form" : "Enter Room Dimensions"}
        </button>

        {showRoomForm && (
          <form
            className="room-dimensions-form"
            onSubmit={handleSubmitRoomDimensions}
          >
            <div className="form-group">
              <label htmlFor="roomLength">Room Length (feet):</label>
              <input
                type="number"
                id="roomLength"
                min="1"
                max="100"
                value={roomLength}
                onChange={(e) => setRoomLength(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="roomWidth">Room Width (feet):</label>
              <input
                type="number"
                id="roomWidth"
                min="1"
                max="100"
                value={roomWidth}
                onChange={(e) => setRoomWidth(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="submit-dimensions">
              Get Recommendations
            </button>
          </form>
        )}
      </div>

      <div className="chat-box">
        <div className="chat-header">
          <span>Chat Session</span>
          <button className="clear-button" onClick={handleClearChat}>
            Clear Chat
          </button>
        </div>

        <div className="chat-messages">
          {chatHistory.length === 0 ? (
            <div className="empty-chat">
              <p>
                Send a message or enter your room dimensions to get furniture
                recommendations
              </p>
            </div>
          ) : (
            chatHistory.map((msg, index) => (
              <div
                key={index}
                className={`message ${
                  msg.role === "user" ? "user-message" : "assistant-message"
                }`}
              >
                <div className="message-content">
                  {renderMessageContent(msg)}
                </div>
              </div>
            ))
          )}

          {isLoading && (
            <div className="message assistant-message">
              <div className="message-content loading">
                <div className="loading-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                Thinking...
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        <form className="chat-input-form" onSubmit={handleSendMessage}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Ask about furniture recommendations..."
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading || !message.trim()}>
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
