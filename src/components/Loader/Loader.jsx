import {RotatingLines } from "react-loader-spinner";
import css from "./Loader.module.css";
export default function Loader() {
  return (

    <div className={css.loader}>    
        <RotatingLines
        visible={true}
        height="50"
        width="50"
        color="grey"
        strokeWidth="5"
        strokeColor="grey"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=""
        
        />
    </div>
    
  );
}