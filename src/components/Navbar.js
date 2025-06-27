import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

const Navbar = ({ activeCategory, onCategoryClick }) => {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const menuCategories = t('menu', { returnObjects: true });

  // التمرير السلس للعنصر النشط
  useEffect(() => {
    const el = document.getElementById(`nav-${activeCategory}`);
    const container = containerRef.current;
    if (el && container) {
      const containerWidth = container.offsetWidth;
      const elLeft = el.offsetLeft;
      const elWidth = el.offsetWidth;
      const scrollPosition = elLeft - (containerWidth / 2) + (elWidth / 2);
      
      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  }, [activeCategory]);

  const navLinkClass = (key) => 
    `nav-link px-3 py-2 ${activeCategory === key ? 'active-nav text-black bg-warning rounded-3' : 'text-warning'}`;

  // دوال السحب بالماوس
  const startDrag = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const endDrag = () => setIsDragging(false);

  const whileDrag = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // زيادة السرعة
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  return (
    <div className="px-0 sticky-top bg-black" style={{ 
      top: '50px', 
      zIndex: 1000, 
      borderBottom: 'solid 1px rgba(210, 167, 12, 0.63)'
    }}>
      <nav className="container navbar py-0 bg-black py-2">
        <div
          ref={containerRef}
          className="d-flex gap-2 pt-3 px-3 overflow-auto hide-scrollbar"
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
          onMouseDown={startDrag}
          onMouseLeave={endDrag}
          onMouseUp={endDrag}
          onMouseMove={whileDrag}
        >
          {Object.keys(menuCategories).map((key) => (
            <a
              key={key}
              id={`nav-${key}`}
              className={navLinkClass(key)}
              href={`#${key}`}
              onClick={(e) => {
                e.preventDefault();
                onCategoryClick(key);
              }}
              style={{ 
                minWidth: 'fit-content',
                whiteSpace: 'nowrap'
              }}
            >
              {menuCategories[key]}
            </a>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;