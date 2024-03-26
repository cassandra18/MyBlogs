import React from 'react';
import { Link } from 'react-router-dom';
interface Post {
    title: string;
    content: string;
    _id: number;
    authorName: string;
    createdAt: Date;
    imageUrl: string;
    comments: string;
    ratings: number;
    category: string; 
  }

interface PaginationProps {
    onPageChange: (pageNumber: number) => void;
    currentPage: number;
    posts: Post[] | null;
    pageSize: number;
}

const Pagination: React.FC<PaginationProps> = ({onPageChange, currentPage, posts, pageSize}) => {
   const totalPages =  posts ? Math.ceil(posts.length / pageSize) : 0;
   //console.log(totalPages);

   const renderPaginationLinks = () => {
        return Array.from({length: totalPages}, (_, i) => i + 1).map(
            (pageNumber) => (
                <li className={pageNumber === currentPage ? "activePagination" : "pagination"} key={pageNumber}>
                    <a href="#" className='paginationLink' onClick={() => onPageChange(pageNumber)}>{pageNumber}</a>
                </li>
            )
        )
   }
   
   return (
    <>
        <ul className='pagination my-8 flex-wrap gap-4 '>
            <li>
                <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
            </li>
            
            <div className='flex gap-1'> {renderPaginationLinks()}</div>
            
            <li>
                <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>Next</button>
            </li>
        </ul>
    </>
   );
};

export default Pagination;