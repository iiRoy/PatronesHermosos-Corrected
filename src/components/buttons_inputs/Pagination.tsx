'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface PaginationProps {
  currentPage?: number; // índice basado en cero
  pageLinks: string[]; // arreglo de hrefs para cada página
  variant?: 'primary' | 'secondary-shade' | 'accent';
  maxButtons?: number; // máximo de botones intermedios visibles
  onPageChange?: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage = 0,
  pageLinks,
  variant = 'primary',
  maxButtons = pageLinks.length,
  onPageChange,
}) => {
  const [activeIndex, setActiveIndex] = useState(currentPage);

  useEffect(() => {
    setActiveIndex(currentPage);
  }, [currentPage]);

  const total = pageLinks.length;

  // Genera rango de páginas con ellipsis basado en maxButtons
  const buildPages = () => {
    const pages: (number | 'ellipsis')[] = [];
    const half = Math.floor(maxButtons / 2);
    let start = Math.max(0, activeIndex - half);
    let end = Math.min(total - 1, activeIndex + half);
    if (activeIndex <= half) {
      start = 0;
      end = Math.min(total - 1, maxButtons - 1);
    }
    if (activeIndex + half >= total) {
      end = total - 1;
      start = Math.max(0, total - maxButtons);
    }
    if (start > 0) pages.push(0, 'ellipsis');
    for (let i = start; i <= end; i++) pages.push(i);
    if (end < total - 1) pages.push('ellipsis', total - 1);
    return pages;
  };

  const pagesToShow = buildPages();

  const getPageClass = (index: number) => {
    const isActive = index === activeIndex;
    return `page ${isActive ? `active active-${variant}` : ``}`.trim();
  };

  const handlePageClick = (index: number) => {
    if (index < 0 || index >= total || index === activeIndex) return;
    setActiveIndex(index);
    onPageChange?.(index);
  };

  return (
    <div className='pagination' role='navigation'>
      {/* Primera página */}
      <Link
        href={pageLinks[0] ?? '#'}
        scroll={false}
        className='page'
        onClick={(e) => {
          e.preventDefault();
          handlePageClick(0);
        }}
      >
        «
      </Link>
      {/* Página anterior */}
      <Link
        href={pageLinks[Math.max(0, activeIndex - 1)] ?? '#'}
        scroll={false}
        className='page'
        onClick={(e) => {
          e.preventDefault();
          handlePageClick(activeIndex - 1);
        }}
      >
        ‹
      </Link>

      {pagesToShow.map((p, idx) =>
        p === 'ellipsis' ? (
          <span key={`e${idx}`} className='page ellipsis'>
            …
          </span>
        ) : (
          <Link
            key={p}
            href={pageLinks[p] ?? '#'}
            scroll={false}
            className={getPageClass(p)}
            onClick={(e) => {
              e.preventDefault();
              handlePageClick(p as number);
            }}
          >
            {p + 1}
          </Link>
        ),
      )}

      {/* Página siguiente */}
      <Link
        href={pageLinks[Math.min(total - 1, activeIndex + 1)] ?? '#'}
        scroll={false}
        className='page'
        onClick={(e) => {
          e.preventDefault();
          handlePageClick(activeIndex + 1);
        }}
      >
        ›
      </Link>
      {/* Última página */}
      <Link
        href={pageLinks[total - 1] ?? '#'}
        scroll={false}
        className='page'
        onClick={(e) => {
          e.preventDefault();
          handlePageClick(total - 1);
        }}
      >
        »
      </Link>
    </div>
  );
};

export default Pagination;
