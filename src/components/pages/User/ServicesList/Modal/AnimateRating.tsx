import { useState } from "react";

export default function AnimateRating({
  onEmojiSelect,
}: {
  onEmojiSelect: any;
}) {
  const [selectedEmoji, setSelectedEmoji] = useState(null);

  const emojis = [
    {
      rating: 1,
      webp: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f620/512.webp",
      gif: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f620/512.gif",
      alt: "😠",
    },
    {
      rating: 2,
      webp: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f62e_200d_1f4a8/512.webp",
      gif: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f62e_200d_1f4a8/512.gif",
      alt: "😮",
    },
    {
      rating: 3,
      webp: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f610/512.webp",
      gif: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f610/512.gif",
      alt: "😐",
    },
    {
      rating: 4,
      webp: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f600/512.webp",
      gif: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f600/512.gif",
      alt: "😀",
    },
    {
      rating: 5,
      webp: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f60d/512.webp",
      gif: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f60d/512.gif",
      alt: "😍",
    },
  ];

  const handleEmojiClick = (rating: any) => {
    setSelectedEmoji(rating);
    onEmojiSelect(rating);
  };

  return (
    <div className="mx-auto flex space-x-2">
      {emojis.map((emoji) => (
        <div
          key={emoji.rating}
          onClick={() => handleEmojiClick(emoji.rating)}
          className={`cursor-pointer p-1 ${
            selectedEmoji === emoji.rating
              ? "rounded-full border-2 border-blue-500"
              : ""
          }`}
        >
          <picture>
            <source srcSet={emoji.webp} type="image/webp" />
            <img
              src={selectedEmoji === emoji.rating ? emoji.gif : emoji.webp}
              alt={emoji.alt}
              width="32"
              height="32"
            />
          </picture>
        </div>
      ))}
    </div>
  );
}
