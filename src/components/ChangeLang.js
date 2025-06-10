
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

function ChangeLang({ onSearch }) {
    const [showInput, setShowInput] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const ref = useRef(null);

    const openInput = () => {
        setShowInput(true);
        setTimeout(() => {
            if (ref.current) {
                ref.current.focus();
            }
        }, 100);
    };

    const closeInput = () => {
        setShowInput(false);
    };

    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
        document.dir = lng === 'ar' ? 'rtl' : 'ltr';
    };

    const handleInputChange = (e) => {
        const val = e.target.value;
        setSearchTerm(val);
        onSearch(val);
    };

    return (
        <div className='fixed-top w-100' style={{
            backgroundColor: "#000",
            zIndex: "900000",
            boxShadow: "0 0 1px #ffc800",
        }}>
            <div className='container d-flex justify-content-between align-items-center py-1 '>
                <div className="my-2 mx-3" style={{ zIndex: 100000, width: "fit-content", left: "84%" }}>
                    <select
                        onChange={(e) => changeLanguage(e.target.value)}
                        value={i18n.language}
                        style={{
                            backgroundColor: '#000',
                            color: '#d2a70c',
                            border: '1px solid #d2a70c',
                            borderRadius: '5px',
                            padding: '5px 12px',
                            fontSize: '16px',
                            outline: 'none',
                            appearance: 'none',
                            cursor: 'pointer',
                            boxShadow: '0 0 8px rgba(255, 255, 255, 0.05)', // ظل خفيف
                        }}
                    >
                        <option value="en">EN</option>
                        <option value="ar">AR</option>
                        <option value="de">DE</option>
                    </select>
                </div>
                <div className={`${showInput ? 'd-flex' : 'd-none'} align-items-center position-relative flex-grow-1`}>
                    <input
                        ref={ref}
                        type="text"
                        value={searchTerm}
                        onChange={handleInputChange}
                        className="w-100"
                        style={{
                            padding: '8px 35px 8px 12px',
                            fontSize: '16px',
                            borderRadius: '4px',
                            border: '1px solid #d2a70c',
                            backgroundColor: '#000000',
                            color: '#fff',
                            boxSizing: 'border-box',
                            outline: "none"
                        }}
                    />
                    <i
                        onClick={closeInput}
                        className="fa-regular fa-circle-xmark text-warning position-absolute"
                        style={{
                            cursor: 'pointer',
                            right: '12px',
                            top: '50%',
                            transform: 'translateY(-50%)',
                            fontSize: '25px',
                            transition: 'all 0.3s ease',
                        }}
                    ></i>
                </div>
                <div className='icon position-relative mx-3'>
                    <i
                        onClick={openInput}
                        className="fa-solid fa-magnifying-glass fs-3 text-warning"
                        style={{ cursor: "pointer" }}
                    ></i>
                </div>
            </div>
        </div>
    );
}

export default ChangeLang;
