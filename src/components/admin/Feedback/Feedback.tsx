"use client";
import { ReviewProvider } from "./_store/FeedbackContext";
import FeedbackFilter from "./FeedbackFilter";
import FeedbackTable from "./FeedbackTable";

export default function Feedback() {
  return (
    <ReviewProvider>
      <p className="mb-4 w-fit rounded-full bg-black px-8 py-2 text-h4 font-bold text-white shadow-sm shadow-[#3b284e] dark:bg-black dark:text-white">
        Danh sách đánh giá
      </p>
      <FeedbackFilter />
      <FeedbackTable />
    </ReviewProvider>
  );
}
