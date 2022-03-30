import { useAccordionButton } from 'react-bootstrap/AccordionButton';

function AccordionCloseButton({ children, eventKey, action }) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
      console.log('close accordion')
    );

    function handleClick(){
        decoratedOnClick();
        action();
    }
  
    return (
      <button
        className="btn main-btn"
        type="button"
        onClick={handleClick}
      >
        {children}
      </button>
    );
  }


export default AccordionCloseButton;