// SearchBar handles user input and triggers the weather fetch function.

import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

function SearchBar({ onSearch }) {
  const [input, setInput] = useState("");

  // Trim input and trigger parent search handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input.trim());
      setInput("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-center items-center gap-2 my-6 flex-wrap"
    >
      <motion.input
      required="true"
        type="text"
        placeholder="Enter city..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="p-3 rounded-lg w-72 sm:w-96 text-black shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        whileFocus={{ scale: 1.02 }}
      />
      <motion.button
        type="submit"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-4 py-2 rounded-lg shadow hover:brightness-110 transition"
      >
        <Search size={18} /> Search
      </motion.button>
    </form>
  );
}

export default SearchBar;
