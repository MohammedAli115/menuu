
import { useTranslation } from "react-i18next";
import { useEffect, useState, useRef } from "react";
import Navbar from "./Navbar";
import { motion } from "framer-motion";

function Menu({ searchTerm }) {
  const { t, ready } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("specialty");
  const sectionRefs = useRef({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [likedProducts, setLikedProducts] = useState({});

  const menuCategories = t("menu", { returnObjects: true });
  const products = t("products", { returnObjects: true });

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY - 120;
      let current = "specialty";
      Object.keys(sectionRefs.current).forEach((key) => {
        const section = sectionRefs.current[key];
        if (section && section.offsetTop <= scrollY) {
          current = key;
        }
      });
      setActiveCategory(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (category) => {
    const el = sectionRefs.current[category];
    if (el) {
      const yOffset = -120;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const toggleLike = (id) => {
    setLikedProducts((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (!ready) return <div>Loading...</div>;

  return (
    <div className="position-relative">
      <Navbar activeCategory={activeCategory} onCategoryClick={handleNavClick} />
      <div className="container">
        {Object.entries(menuCategories).map(([key, name]) => {
          let filtered = products.filter((p) => p.category === name);

          if (searchTerm) {
            filtered = filtered.filter((p) =>
              p.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
          }

          if (filtered.length === 0) return null;

          return (
            <div
              key={key}
              id={`category-${key}`}
              ref={(el) => (sectionRefs.current[key] = el)}
              className="pt-2"
            >
              <p
                className="bg-black mt-2 p-1 px-3 rounded-3 shadow text-warning"
                style={{ width: "fit-content", border: "1px solid #d2a70c" }}
              >
                {name}
              </p>
              <div className="row">
                {filtered.map((p) => (
                  <motion.div
                    key={p.id}
                    className="col-md-6 col-12 mb-3"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ duration: 0.5 }}
                    onClick={() => setSelectedProduct(p)}
                    style={{ cursor: "pointer" }}
                  >
                    <div
                      className="text-warning  rounded bg-black d-flex justify-content-between align-items-center"
                      style={{ backgroundColor: "dark", boxShadow: "0 0 3px #ccc", overflow: "hidden" }}
                    >
                      <div className="p-3">
                        <h4>{p.name}</h4>
                        <p>{p.description}</p>
                        <strong>{p.price}</strong>
                      </div>
                      <img src={p.image} alt={p.name} style={{ maxWidth: 100 }} />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal for selected product */}
      {selectedProduct && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center"
          style={{
            backgroundColor: "rgba(0,0,0,0.8)",
            zIndex: 1000000,
            padding: "20px",
          }}
          onClick={() => setSelectedProduct(null)}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            className="bg-dark rounded shadow text-warning d-flex flex-column"
            style={{
              maxWidth: "400px",
              width: "100%",
              boxShadow: "0 0 20px #d2a70c",
              position: "relative",
              overflow: "hidden",
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={() => setSelectedProduct(null)}
              style={{
                position: "absolute",
                top: "10px",
                right: "15px",
                background: "none",
                border: "none",
                color: "#000",
                fontSize: "30px",
                cursor: "pointer",
                zIndex: 10,
              }}
              aria-label="Close"
            >
              &times;
            </button>

            {/* الصورة تغطي العرض بالكامل */}
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              style={{
                width: "100%",
                height: "auto",
                objectFit: "cover",
                borderTopLeftRadius: "8px",
                borderTopRightRadius: "8px",
              }}
            />

            {/* محتوى النص واللايك تحت الصورة */}
            <div className="p-3" style={{ position: "relative" }}>
              <h2>{selectedProduct.name}</h2>
              <p>{selectedProduct.description}</p>
              <strong style={{ fontSize: "20px" }}>{selectedProduct.price}</strong>

              <button
                onClick={() => toggleLike(selectedProduct.id)}
                style={{
                  background: "none",
                  border: "none",
                  color: likedProducts[selectedProduct.id] ? "#d2a70c" : "#555",
                  fontSize: "32px",
                  cursor: "pointer",
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  userSelect: "none",
                }}
              >
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default Menu;
