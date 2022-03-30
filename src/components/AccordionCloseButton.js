import { useAccordionButton } from 'react-bootstrap/AccordionButton';

function AccordionCloseButton({ children, eventKey, action }) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
      console.log('close accordion')
    );

    function handleClick(){
        action();
        decoratedOnClick();
    }
  
    return (
      <button
        className="btn large-btn"
        type="button"
        onClick={handleClick}
      >
        {children}
      </button>
    );
  }


export default AccordionCloseButton;