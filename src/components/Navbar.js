import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const categories = ["specialty", "hot", "frappuccino", "cold", "dessert"];

function Navbar({ activeCategory, onCategoryClick }) {
    const { t } = useTranslation();
    const containerRef = useRef(null);

    // states لدعم السحب بالماوس
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);

    const navLinkClass = (key) =>
        `nav-link px-3 py-2 ${activeCategory === key ? "active-nav text-black bg-warning rounded-3" : "text-warning"}`;

    useEffect(() => {
        const el = document.getElementById(`nav-${activeCategory}`);
        const container = containerRef.current;
        if (el && container) {
            const elLeft = el.offsetLeft;
            container.scrollTo({ left: elLeft - 16, behavior: "smooth" });
        }
    }, [activeCategory]);

    // handlers للسحب بالماوس
    const onMouseDown = (e) => {
        setIsDragging(true);
        setStartX(e.pageX - containerRef.current.offsetLeft);
        setScrollLeft(containerRef.current.scrollLeft);
    };

    const onMouseLeave = () => setIsDragging(false);
    const onMouseUp = () => setIsDragging(false);

    const onMouseMove = (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - containerRef.current.offsetLeft;
        const walk = (x - startX) * 1;
        containerRef.current.scrollLeft = scrollLeft - walk;
    };

    return (
        <div className=" px-0 sticky-top bg-black" style={{ top: "50px", zIndex: 1000 ,borderBottom: "solid 1px rgba(210, 167, 12, 0.63)"}}>
            <nav 
                className="container navbar py-0 bg-black py-2"
                style={{ backdropFilter: "blur(5px)"}}
            >
                <div
                    ref={containerRef}
                    className="d-flex gap-2 pt-3 px-3 overflow-auto hide-scrollbar"
                    style={{
                        cursor: isDragging ? "grabbing" : "grab",
                    }}
                    onMouseDown={onMouseDown}
                    onMouseLeave={onMouseLeave}
                    onMouseUp={onMouseUp}
                    onMouseMove={onMouseMove}
                >
                    {categories.map((key) => (
                        <a
                            key={key}
                            id={`nav-${key}`}
                            className={navLinkClass(key)}
                            href={`#${key}`}
                            onClick={(e) => {
                                e.preventDefault();
                                onCategoryClick(key);
                            }}
                            style={{ minWidth: "fit-content" }}
                        >
                            {t(`menu.${key}`)}
                        </a>
                    ))}
                </div>
            </nav>
        </div>
    );
}

export default Navbar;