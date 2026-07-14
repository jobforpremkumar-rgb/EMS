import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Button from "./Button/Button";

interface paginationProps {
  currentPage: number;
  getPageNumber: any;
  totalPage: number;
}
export default function Pagination({
  currentPage,
  getPageNumber,
  totalPage,
}:paginationProps) {
  return (
    <div className="flex items-center mt-6 w-full justify-between">
      {/* Showing Records */}
      <p className="text-sm text-gray-600">
        Showing <span className="font-semibold">1</span> to{" "}
        <span className="font-semibold">10</span> of{" "}
        <span className="font-semibold">150</span> entries
      </p>

      {/* Pagination */}
      <div className="flex items-center gap-2">
        <Button
          className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center "
          disabled ={currentPage <= 1 }
            onClick={() =>  getPageNumber( currentPage - 1)}
        >
          <FaAngleLeft />
        </Button>


        {Array.from({ length: totalPage }, (_, index) => {
          const page = index + 1;

          return (
            <Button
              key={page}
              className={`w-10 h-10 rounded-lg ${
                page === currentPage
                  ? "bg-blue-600 text-white "
                  : "!text-black border border-gray-300 bg-white "
              }`}
              onClick={() => getPageNumber(page)}
            >
              {index + 1}
            </Button>
          );
        })}

        <Button
          className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center "
             disabled ={currentPage >= totalPage}
          onClick={() => getPageNumber(currentPage + 1)}
        >
          <FaAngleRight />
        </Button>
      </div>
    </div>
  );
}
