import React, {useState, useEffect} from 'react'

function BackToTopButton() {
    const [showButton, setShowButton] = useState(false);

    useEffect(() => {
      window.addEventListener("scroll", () => {
        if (window.pageYOffset > 300) {
          setShowButton(true);
        } else {
          setShowButton(false);
        }
      });
    }, []);
  
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth' 
      });
    };

  return (
    <>
    {showButton && (
        <button onClick={scrollToTop} className="button">
          &#8679;
        </button>
      )}
    </>
  )
}

export default BackToTopButton