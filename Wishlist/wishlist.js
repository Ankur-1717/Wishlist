import React, {useContext } from "react";
import Wish from "./Wish";
import DUMMY_DATA from "../DUMMY_DATA";
import "./renderItem.css";
import { AuthContext } from "../context/auth";
import { Fade } from "reactstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Wishes = (props) => {
  const {wishlist} = useContext(AuthContext);
  return (
    <React.Fragment>
        <Fade in={true}>
          <div>
            <ul>
              {DUMMY_DATA.map((item) => {
                //const wish = wishlist.find(i => i === item.id )?true:false;
                const wish = true;
                if(wish === true){
                  return (
                    <Wish
                      wishlist={wish}
                      key={item.id}
                      id={item.id}
                      image={item.img}
                      name={item.name}
                      lprice={item.lprice}
                      hprice={item.hprice}
                    />
                  );
                }
                
              })}
            </ul>
          </div>
        </Fade>
    </React.Fragment>
  );
};

export default Wishes;