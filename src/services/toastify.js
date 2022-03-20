import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure();

export function notify(type = 'success', message){
    if(type === 'success'){
        toast.success(message, {
            position: toast.POSITION.TOP_CENTER, 
        })
    }
    if(type === 'error'){
        toast.error(message, {
            position: toast.POSITION.TOP_CENTER,
        })
    }
}