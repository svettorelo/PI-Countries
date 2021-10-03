import {Link} from "react-router-dom";
import {useEffect} from "react";
import {connect} from "react-redux";
import {getCountries, getCountryList} from "../actions";
import "./LandingPage.css";

export function LandingPage(props){
  useEffect(()=> {
    props.getCountries(0);
    props.getCountryList()
    },[]);

  return (
    <div className="landing">
      <Link to='/home'>
        <button>
        <strong>LET'S GO!</strong>
        </button>
      </Link><br/>
      <img height={700} src="https://cdn.dribbble.com/users/1003234/screenshots/3931448/globe_animation.gif" alt="loading..."/>
    </div>
      )
}
function mapDispatchToProps(dispatch){
  return {
    getCountries: (page)=>dispatch(getCountries(page)),
    getCountryList: ()=>dispatch(getCountryList())
  };
}
export default connect(null,mapDispatchToProps)(LandingPage);
//https://i.pinimg.com/originals/42/3e/75/423e752b884436e49d645763f6d784dc.jpg
//https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/v660-mon-35-travelbadge_1.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=488bb7bfaa372ea0c3758621f739347b
// https://cdn.dribbble.com/users/2178578/screenshots/7154873/media/effabc632f4322acde3d501a29e82dde.gif
//https://i.pinimg.com/originals/f5/1b/32/f51b32d7580d266e620e3580c2b274d8.gif