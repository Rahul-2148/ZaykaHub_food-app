import { ThumbsUp, MessageCircle, Share2, Send, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const SocialMedia = () => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([
    {
      id: 1,
      user: "Sujay Sahis",
      avatar: "https://randomuser.me/api/portraits/men/10.jpg",
      text: "The food here is amazing! 😍",
      liked: false,
      replies: [
        {
          id: 101,
          user: "Restaurant Owner",
          avatar: "https://randomuser.me/api/portraits/men/20.jpg",
          text: "Thank you! Hope to see you again! 😊",
          liked: false,
        },
      ],
    },
    {
      id: 2,
      user: "Suman Shit",
      avatar: "https://randomuser.me/api/portraits/men/30.jpg",
      text: "Best biryani I’ve had in a while! 🔥",
      liked: false,
      replies: [],
    },
  ]);
  const [replyText, setReplyText] = useState(""); // Reply ke text ke liye state
  const [replyingTo, setReplyingTo] = useState<number | null>(null); // Track karne ke liye kis comment pe reply ho rha hai

  // Function to toggle like for comments & replies
  const toggleLike = (commentId: number, replyId: number | null = null) => {
    setComments((prevComments) =>
      prevComments.map((comment) => {
        if (comment.id === commentId) {
          if (replyId !== null) {
            return {
              ...comment,
              replies: comment.replies.map((reply) =>
                reply.id === replyId ? { ...reply, liked: !reply.liked } : reply
              ),
            };
          }
          return { ...comment, liked: !comment.liked };
        }
        return comment;
      })
    );
  };

  // Reply Submit Function
  interface Reply {
    id: number;
    user: string;
    avatar: string;
    text: string;
    liked: boolean;
  }

  interface Comment {
    id: number;
    user: string;
    avatar: string;
    text: string;
    liked: boolean;
    replies: Reply[];
  }

  const submitReply = (commentId: number): void => {
    if (!replyText.trim()) return;

    setComments((prevComments: Comment[]) =>
      prevComments.map((comment) => {
        if (comment.id === commentId) {
          return {
            ...comment,
            replies: [
              ...comment.replies,
              {
                id: Date.now(), // Unique ID
                user: "You", // User jo reply kar raha hai
                avatar: "https://randomuser.me/api/portraits/men/50.jpg", // Temporary avatar
                text: replyText,
                liked: false,
              },
            ],
          };
        }
        return comment;
      })
    );

    setReplyText(""); // Clear input field
    setReplyingTo(null); // Hide reply input
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-5 rounded-lg shadow-md mt-6">
      {/* Like, Comment & Share Buttons */}
      <div className="flex justify-between items-center border-b pb-3 mb-3">
        <div className="flex gap-4">
          <Button
            variant="ghost"
            className="flex items-center gap-2 text-gray-700 dark:text-gray-300"
          >
            <ThumbsUp size={18} className="text-orange-500" />
            <span>120 Likes</span>
          </Button>
          <Button
            variant="ghost"
            className="flex items-center gap-2 text-gray-700 dark:text-gray-300"
          >
            <MessageCircle size={18} />
            <span>{comments.length} Comments</span>
          </Button>
        </div>
        <Button
          variant="ghost"
          className="flex items-center gap-2 text-gray-700 dark:text-gray-300"
        >
          <Share2 size={18} />
          <span>Share</span>
        </Button>
      </div>

      {/* Comment Input Field */}
      <div className="flex items-center gap-3 mt-4">
        <Avatar className="w-8 h-8 bg-gray-500" />
        <Input
          type="text"
          placeholder="Write a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="flex-1 bg-gray-100 dark:bg-gray-800 p-2 rounded-lg"
        />
        <Button size="icon" className="bg-orange-500 text-white">
          <Send size={18} />
        </Button>
      </div>

      {/* Comments Section */}
      <div className="mt-4">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="border p-3 rounded-lg mb-2 dark:border-gray-700"
          >
            <div className="flex items-center gap-2">
              <Avatar className="w-6 h-6">
                <AvatarImage src={comment.avatar} alt={comment.user} />
                <AvatarFallback>{comment.user.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="font-medium">{comment.user}</span>
            </div>
            <p className="ml-8 mt-1 text-gray-700 dark:text-gray-300">
              {comment.text}
            </p>

            {/* Like & Reply Button */}
            <div className="flex gap-3 ml-8 mt-2">
              <button
                onClick={() => toggleLike(comment.id)}
                className="text-gray-600 dark:text-gray-400 flex items-center gap-1"
              >
                <Heart
                  size={16}
                  className={comment.liked ? "text-red-500" : "text-gray-400"}
                />
                <span>Like</span>
              </button>
              <button
                onClick={() =>
                  setReplyingTo(replyingTo === comment.id ? null : comment.id)
                }
                className="text-gray-600 dark:text-gray-400 flex items-center gap-1"
              >
                <MessageCircle size={16} />
                <span>Reply</span>
              </button>
            </div>

            {/* Reply Input Field (Only visible when Reply button is clicked) */}
            {replyingTo === comment.id && (
              <div className="flex items-center gap-3 ml-10 mt-3">
                <Avatar className="w-6 h-6 bg-gray-500" />
                <Input
                  type="text"
                  placeholder="Write a reply..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="flex-1 bg-gray-100 dark:bg-gray-800 p-2 rounded-lg"
                />
                <Button
                  onClick={() => submitReply(comment.id)}
                  size="icon"
                  className="bg-blue-500 text-white"
                >
                  <Send size={18} />
                </Button>
              </div>
            )}

            {/* Replies Section */}
            {comment.replies.map((reply) => (
              <div
                key={reply.id}
                className="ml-10 mt-2 p-2 bg-gray-100 dark:bg-gray-800 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <Avatar className="w-5 h-5">
                    <AvatarImage src={reply.avatar} alt={reply.user} />
                    <AvatarFallback>{reply.user.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{reply.user}</span>
                </div>
                <p className="ml-8 mt-1 text-gray-600 dark:text-gray-300">
                  {reply.text}
                </p>

                {/* Like Button for Replies */}
                <button
                  onClick={() => toggleLike(comment.id, reply.id)}
                  className="text-gray-600 dark:text-gray-400 flex items-center gap-1 ml-8 mt-1"
                >
                  <Heart
                    size={14}
                    className={reply.liked ? "text-red-500" : "text-gray-400"}
                  />
                  <span>Like</span>
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialMedia;

// ----------- rating section --------------------

const ratingMessages = [
  "😡 Very Bad! We’ll improve!",
  "😞 Could be better!",
  "😐 Average experience!",
  "😊 Good! Thanks for your support!",
  "😍 Excellent! We’re glad you loved it!",
];

export const RatingSection = () => {
  const [rating, setRating] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState(false);

  // ⭐ Load rating from localStorage when page refreshes
  useEffect(() => {
    const savedRating = localStorage.getItem("restaurantRating");
    if (savedRating) {
      setRating(Number(savedRating));
      setSubmitted(true);
    }
  }, []);

  // ⭐ Save rating to localStorage when user selects a rating
  const handleRating = (selectedRating: number) => {
    setRating(selectedRating);
    setSubmitted(true);
    localStorage.setItem("restaurantRating", String(selectedRating));
  };

  // ⭐ Remove rating from localStorage
  const handleDeleteRating = () => {
    setRating(null);
    setSubmitted(false);
    localStorage.removeItem("restaurantRating");
  };

  return (
    <div className="mt-20 text-center bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg max-w-md mx-auto">
      <h2 className="text-3xl font-bold text-orange-600">
        ⭐ Rate Our Restaurant
      </h2>
      <p className="text-gray-700 dark:text-gray-400 mt-2">
        Your feedback helps us improve!
      </p>

      {/* Star Rating */}
      <div className="flex justify-center mt-4">
        {[...Array(5)].map((_, index) => {
          const currentRating = index + 1;
          return (
            <motion.button
              key={index}
              onClick={() => handleRating(currentRating)}
              onMouseEnter={() => setHover(currentRating)}
              onMouseLeave={() => setHover(null)}
              whileHover={{ scale: 1.2 }}
              className="focus:outline-none"
            >
              <span
                className={`text-4xl cursor-pointer transition-colors ${
                  ((hover ?? 0) || (rating ?? 0)) >= currentRating
                    ? "text-yellow-500"
                    : "text-gray-400"
                }`}
              >
                ★
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Message Based on Rating */}
      {submitted && rating !== null && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 text-lg text-gray-900 dark:text-white font-semibold"
        >
          {ratingMessages[rating - 1]}
        </motion.p>
      )}

      {/* Action Buttons */}
      <div className="mt-4 flex justify-center gap-4">
        {submitted && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={() => setSubmitted(false)}
            className="px-6 py-2 bg-blue-500 text-white rounded-md"
          >
            Update Rating
          </motion.button>
        )}

        {rating !== null && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={handleDeleteRating}
            className="px-6 py-2 bg-red-500 text-white rounded-md"
          >
            Delete Rating
          </motion.button>
        )}
      </div>
    </div>
  );
};
