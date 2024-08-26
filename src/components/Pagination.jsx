import React from "react";

const Pagination = ({
  totalRecords,
  recordsPerPage,
  onPageChange,
  currentPage,
}) => {
  const totalPages = Math.ceil(totalRecords / recordsPerPage);

  const handleClick = (page) => {
    onPageChange(page);
  };

  return (
    <div className="page-item">
      {Array.from({ length: totalPages }, (_, i) => (
        <button
          key={i}
          onClick={() => handleClick(i + 1)}
          disabled={i + 1 === currentPage}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
