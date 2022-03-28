import { useAccordionButton } from 'react-bootstrap/AccordionButton';

function AccordionCloseButton({ children, eventKey, action }) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
      console.log('totally custom!'),
    );

    function handleClick(){
        decoratedOnClick();
        action();
    }
  
    return (
      <button
        className="btn"
        type="button"
        onClick={handleClick}
      >
        {children}
      </button>
    );
  }


export default AccordionCloseButton;