// import { useTranslation } from 'react-i18next';
// import { useEffect, useState, useRef } from 'react';
// import Navbar from './Navbar';
// import { motion } from 'framer-motion';

// const Menu = ({ searchTerm }) => {
//   const { t } = useTranslation();
//   const [activeCategory, setActiveCategory] = useState('specialty');
//   const sectionRefs = useRef({});
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [isScrolling, setIsScrolling] = useState(false);

//   const menuCategories = t('menu', { returnObjects: true });
//   const products = t('products', { returnObjects: true });

//   // تحديد القسم النشط أثناء التمرير
//   useEffect(() => {
//     const handleScroll = () => {
//       if (isScrolling) return;

//       const scrollPosition = window.scrollY + 150;
//       let newActiveCategory = activeCategory;

//       Object.keys(sectionRefs.current).forEach((key) => {
//         const section = sectionRefs.current[key];
//         if (section && scrollPosition >= section.offsetTop) {
//           newActiveCategory = key;
//         }
//       });

//       if (newActiveCategory !== activeCategory) {
//         setActiveCategory(newActiveCategory);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [activeCategory, isScrolling]);

//   // النقر على عنصر القائمة
//   const handleNavClick = (category) => {
//     setIsScrolling(true);
//     setActiveCategory(category);

//     const element = sectionRefs.current[category];
//     if (element) {
//       const yOffset = -120;
//       const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

//       window.scrollTo({
//         top: y,
//         behavior: 'smooth'
//       });

//       setTimeout(() => setIsScrolling(false), 1000);
//     }
//   };

//   // تصفية المنتجات حسب البحث
//   const filterProducts = (categoryName) => {
//     let filtered = products.filter(p =>
//       p.category.toLowerCase().startsWith(categoryName.toLowerCase())
//     );

//     if (searchTerm) {
//       filtered = filtered.filter(p => (
//         p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         (p.description && p.description.toLowerCase().includes(searchTerm.toLowerCase()))
//       ));
//     }

//     return filtered;
//   };

//   // تجميع المنتجات حسب الوصف
//   const groupProducts = (products) => {
//     return products.reduce((acc, product) => {
//       const group = product.description_category || 'other';
//       if (!acc[group]) acc[group] = [];
//       acc[group].push(product);
//       return acc;
//     }, {});
//   };

//   return (
//     <div className="position-relative">
//       <Navbar
//         activeCategory={activeCategory}
//         onCategoryClick={handleNavClick}
//       />

//       <div className="container">
//         {Object.entries(menuCategories).map(([key, name]) => {
//           const categoryProducts = filterProducts(name);
//           if (categoryProducts.length === 0) return null;

//           const groupedProducts = groupProducts(categoryProducts);

//           return (
//             <section
//               key={key}
//               id={key}
//               ref={el => (sectionRefs.current[key] = el)}
//               className="pt-3 mb-5"
//             >
//               <h2 className="text-warning rounded-3 mb-4" style={{
//                 padding: '4px 20px',
//                 background: '#000',
//                 border: '1px solid #d2a70c',
//                 display: 'inline-block'
//               }}>
//                 {name}
//               </h2>

//               {Object.entries(groupedProducts).map(([groupName, products]) => (
//                 <div key={groupName} className="mb-4">
//                   {groupName !== 'other' && (
//                     <h3 className="text-light mb-3 px-2 py-1" style={{
//                       background: '#111',
//                       borderLeft: '3px solid #ffe600',
//                       borderRight: '3px solid #ffe600',
//                       display: 'inline-block',
//                       borderRadius: '5px'
//                     }}>
//                       {groupName}
//                     </h3>
//                   )}

//                   <div className="row g-3">
//                     {products.map(product => (
//                       <motion.div
//                         key={product.id}
//                         className="col-md-6"
//                         initial={{ opacity: 0, y: 20 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         viewport={{ once: true, margin: "0px 0px -100px 0px" }}
//                         transition={{ duration: 0.5 }}
//                       >
//                         <div
//                           className="h-100 p-3 rounded-3 bg-black border border-warning d-flex flex-column flex-md-row"
//                           onClick={() => setSelectedProduct(product)}
//                           style={{ cursor: 'pointer' }}
//                         >
//                           <div className="flex-grow-1">
//                             <h4 className="text-warning">{product.name}</h4>
//                             <p className="text-warning mb-2">{product.description}</p>
//                             <div className="d-flex align-items-center">
//                               <span className="text-warning fw-bold fs-5">
//                                 {product.price}
//                               </span>
//                               {product.doublePrice && (
//                                 <span className="text-white-50 ms-3">
//                                   <span className="mx-1">|</span>
//                                   2x {product.doublePrice}
//                                 </span>
//                               )}
//                             </div>
//                           </div>
//                           {product.image && (
//                             <div className="ms-md-3 mt-3 mt-md-0">
//                               <img
//                                 src={product.image}
//                                 alt={product.name}
//                                 className="rounded-3"
//                                 style={{
//                                   width: '100px',
//                                   height: '100px',
//                                   objectFit: 'cover'
//                                 }}
//                               />
//                             </div>
//                           )}
//                         </div>
//                       </motion.div>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </section>
//           );
//         })}
//       </div>

//       {/* نافذة المنتج المحدد */}
//       {selectedProduct && (
// <div className="modal-backdrop" onClick={() => setSelectedProduct(null)}>
//   <motion.div
//     className="modal-content"
//     onClick={(e) => e.stopPropagation()}
//     initial={{ scale: 0.9, opacity: 0 }}
//     animate={{ scale: 1, opacity: 1 }}
//     exit={{ scale: 0.9, opacity: 0 }}
//   >
//     <button
//       className="close-btn"
//       onClick={() => setSelectedProduct(null)}
//     >
//       &times;
//     </button>

//     <img
//       src={selectedProduct.image}
//       alt={selectedProduct.name}
//       className="modal-image"
//     />

//     <div className="modal-body">
//       <h3>{selectedProduct.name}</h3>
//       <p>{selectedProduct.description}</p>

//       <div className="price-section">
//         <span className="main-price">{selectedProduct.price}</span>
//         {selectedProduct.doublePrice && (
//           <span className="double-price">
//             | 2x {selectedProduct.doublePrice}
//           </span>
//         )}
//       </div>
//     </div>
//   </motion.div>
// </div>
//       )}
//     </div>
//   );
// };

// export default Menu;
import { useTranslation } from "react-i18next";
import { useEffect, useState, useRef } from "react";
import Navbar from "./Navbar";
import { motion } from "framer-motion";

const Menu = ({ searchTerm }) => {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("specialty");
  const sectionRefs = useRef({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isScrolling, setIsScrolling] = useState(false);

  const menuCategories = t("menu", { returnObjects: true });
  const products = t("products", { returnObjects: true });

  // تحديد القسم النشط أثناء التمرير
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

  // النقر على عنصر القائمة
  const handleNavClick = (category) => {
    setIsScrolling(true);
    setActiveCategory(category);

    const element = sectionRefs.current[category];
    if (element) {
      const yOffset = -120;
      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });

      setTimeout(() => setIsScrolling(false), 1000);
    }
  };

  // تصفية المنتجات حسب البحث والفئة
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

  // تجميع المنتجات حسب الوصف
  const groupProducts = (products) => {
    return products.reduce((acc, product) => {
      const group = product.description_category || "other";
      if (!acc[group]) acc[group] = [];
      acc[group].push(product);
      return acc;
    }, {});
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
                className="text-warning rounded-3 mb-4"
                style={{
                  padding: "5px 16px",
                  background: "#000",
                  border: "1px solid #d2a70c",
                  display: "inline-block",
                }}
              >
                {name}
              </h5>

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
                                  <span className="mx-3">| </span>2 x{" "}
                                  {product.doublePrice}
                                </span>
                              )}
                            </div>
                          </div>
                          {product.image && (
                            <div className="">
                              <img
                                src={product.image}
                                alt={product.name}
                                className="rounded-3"
                                style={{
                                  width: "100px",
                                  objectFit: "cover",
                                }}
                              />
                            </div>
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

      {/* نافذة المنتج المحدد */}
      {selectedProduct && (
        <div
          className="modal-backdrop py-5"
          onClick={() => setSelectedProduct(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.86)",
            zIndex: 1050,
          }}
        >
          <motion.div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{
              background: " #000",
              padding: "50px 20px",
              borderRadius: "12px",
              maxWidth: "90%",
              overflowY: "auto",
              border: "1px solid ",
            }}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
          >
            <button
              className="close-btn"
              onClick={() => setSelectedProduct(null)}
              style={{
                position: "absolute",
                top: "-10px",
                right: "30px",
                fontSize: "2.5rem",
                background: "transparent",
                border: "none",
                color: "#ffff",
                cursor: "pointer",
              }}
            >
              &times;
            </button>

            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="modal-image"
              style={{
                maxWidth: "100%",
                borderRadius: "8px",
                marginBottom: "15px",
              }}
            />

            <div className="modal-body">
              <h3 className="text-warning">{selectedProduct.name}</h3>
              <p>{selectedProduct.description}</p>

              <div className="price-section" style={{ marginTop: "10px" }}>
                <span
                  className="main-price"
                  style={{ color: "#ffe600", fontSize: "1.2rem" }}
                >
                  {selectedProduct.price}
                </span>
                {selectedProduct.doublePrice && (
                  <span className="double-price">
                    | 2x {selectedProduct.doublePrice}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Menu;
