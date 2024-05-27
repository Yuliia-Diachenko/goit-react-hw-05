 import { Toaster, toast } from "react-hot-toast";
 
 export default function ErrorMessage() {
   toast('Please enter a valid value!',
  {
    icon: '👏',
    style: {
      borderRadius: '10px',
      background: '#333',
      color: '#fff',
    },
  }
);
    return (
    <div><Toaster 
        position="top-center"
        reverseOrder={false} 
        />
  </div>
    )
}