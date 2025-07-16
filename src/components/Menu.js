import { useTranslation } from "react-i18next";
import { useEffect, useState, useRef } from "react";
import Navbar from "./Navbar";
import { motion } from "framer-motion";

const Menu = ({ searchTerm }) => {
  const { t, i18n } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("specialty");
  const sectionRefs = useRef({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isScrolling, setIsScrolling] = useState(false);

  const menuCategories = t("menu", { returnObjects: true });
  const products = t("products", { returnObjects: true });

  useEffect(() => {
    const handleScroll = () => {
      if (isScrolling) return;
      const scrollPosition = window.scrollY + 150;
      let newActiveCategory = activeCategory;

      Object.keys(sectionRefs.current).forEach((key) => {
        const section = sectionRefs.current[key];
        if (section && scrollPosition >= section.offsetTop) {
          newActiveCategory = key;
        }
      });

      if (newActiveCategory !== activeCategory) {
        setActiveCategory(newActiveCategory);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeCategory, isScrolling]);

  const handleNavClick = (category) => {
    setIsScrolling(true);
    setActiveCategory(category);
    const element = sectionRefs.current[category];
    if (element) {
      const yOffset = -120;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setTimeout(() => setIsScrolling(false), 1000);
    }
  };

  const filterProducts = (categoryName) => {
    let filtered = products.filter((p) =>
      p.category.toLowerCase().startsWith(categoryName.toLowerCase())
    );
    if (searchTerm) {
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (p.description &&
            p.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    return filtered;
  };

  const groupProducts = (products) => {
    return products.reduce((acc, product) => {
      const group = product.description_category || "other";
      if (!acc[group]) acc[group] = [];
      acc[group].push(product);
      return acc;
    }, {});
  };

  const dessertNoteText = {
    ar: "الحلويات تتغير يوميًا وقد لا تتوفر جميع العناصر.",
    en: "Desserts change daily and not all items may be available.",
    de: "Desserts ändern sich täglich und sind möglicherweise nicht immer verfügbar.",
  };

  return (
    <div className="position-relative">
      <Navbar
        activeCategory={activeCategory}
        onCategoryClick={handleNavClick}
      />
      <div className="container">
        {Object.entries(menuCategories).map(([key, name]) => {
          const categoryProducts = filterProducts(name);
          if (categoryProducts.length === 0) return null;

          const groupedProducts = groupProducts(categoryProducts);

          return (
            <section
              key={key}
              id={key}
              ref={(el) => (sectionRefs.current[key] = el)}
              className="pt-3 mb-5"
            >
              <h5
                className="text-warning rounded-3 mb-2"
                style={{
                  padding: "5px 16px",
                  background: "#000",
                  border: "1px solid #d2a70c",
                  display: "inline-block",
                }}
              >
                {name}
              </h5>
              {key === "dessert" && (
                <p className="text-white text-center mt-1">
                  {dessertNoteText[i18n.language] || dessertNoteText.en}
                </p>
              )}
              {Object.entries(groupedProducts).map(([groupName, products]) => (
                <div key={groupName} className="mb-4">
                  {groupName !== "other" && (
                    <h3
                      className="text-light mb-3 px-2 py-1"
                      style={{
                        background: "#111",
                        borderLeft: "3px solid #ffe600",
                        borderRight: "3px solid #ffe600",
                        display: "inline-block",
                        borderRadius: "5px",
                      }}
                    >
                      {groupName}
                    </h3>
                  )}
                  <div className="row g-3">
                    {products.map((product) => (
                      <motion.div
                        key={product.id}
                        className="col-md-6"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "0px 0px -100px 0px" }}
                        transition={{ duration: 0.5 }}
                      >
                        <div
                          className="h-100 p-3 rounded-3 bg-black border border-warning d-flex align-items-center flex-md-row"
                          onClick={() => setSelectedProduct(product)}
                          style={{ cursor: "pointer" }}
                        >
                          <div className="flex-grow-1">
                            <h4 className="text-warning">{product.name}</h4>
                            <p className="mb-2">{product.description}</p>
                            <div className="d-flex align-items-center">
                              <span className="text-warning fw-bold fs-5">
                                {product.price}
                              </span>
                              {product.doublePrice && (
                                <span className="text-warning fw-bold fs-5 ms-3">
                                  | 2 x {product.doublePrice}
                                </span>
                              )}
                            </div>
                          </div>
                          {product.image && (
                            <img
                              src={product.image}
                              alt={product.name}
                              className="rounded-3"
                              style={{ width: "100px", objectFit: "cover" }}
                            />
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </section>
          );
        })}
      </div>
    </div>
  );
};

export default Menu;
