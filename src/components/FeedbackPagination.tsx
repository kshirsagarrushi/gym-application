import React, { useState } from "react";

interface PaginationProps {
  totalFeedbacks: number;
  feedbacksPerPage: number;
  setCurrentPage: (page: number) => void;
  currentPage: number;
}

const FeedbackPagination: React.FC<PaginationProps> = ({
  totalFeedbacks,
  feedbacksPerPage,
  setCurrentPage,
  currentPage,
}) => {
  const totalPages = Math.ceil(totalFeedbacks / feedbacksPerPage); // Total number of pages

  // Handle "next" button click
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle "prev" button click
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Generate the page buttons based on the total pages and current page
  const generatePages = () => {
    const pages: number[] = [];
    
    if (totalFeedbacks === 0) {
      return pages; // No pages to show
    }

    if (totalFeedbacks === 1) {
      pages.push(1); // Only one feedback
    } else if (totalFeedbacks <= 3) {
      for (let i = 1; i <= Math.min(totalPages, 2); i++) {
        pages.push(i); // Show up to 2 pages
      }
    } else if (totalFeedbacks <= 9) {
      for (let i = 1; i <= Math.min(totalPages, 3); i++) {
        pages.push(i); // Show up to 3 pages
      }
    } else {
      // More than 9 feedbacks, show 3 pages with arrows
      let startPage = Math.max(1, currentPage - 1);
      let endPage = Math.min(totalPages, startPage + 2);

      // Adjust startPage if endPage exceeds totalPages
      if (endPage - startPage < 2) {
        startPage = Math.max(1, endPage - 2);
      }

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }

    return pages;
  };

  const pages = generatePages();

  // Render the pagination
  if (totalFeedbacks === 0) {
    return (
      <div className="flex justify-center w-full font-lexend">
        <span className="text-gray-500">Feedbacks are not available !!</span>
      </div>
    );
  }

  return (
    <div className="flex gap-5 w-fit">
      <button onClick={prevPage} disabled={currentPage === 1}>
        {"<"}
      </button>
      {pages.map((page) => (
        <div key={page} className="flex flex-col items-center">
          <button
            onClick={() => setCurrentPage(page)} // Clicking page number changes the current page
            className={`p-1 ${page === currentPage ? "font-bold" : ""}`}
          >
            {page}
          </button>
          {page === currentPage && (
            <div className="w-full h-1 bg-blue-500" /> // Underline for active page
          )}
        </div>
      ))}
      <button onClick={nextPage} disabled={currentPage === totalPages}>
        {">"}
      </button>
    </div>
  );
};

export default FeedbackPagination;