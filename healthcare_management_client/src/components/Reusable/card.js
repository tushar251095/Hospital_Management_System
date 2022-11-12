/* eslint-disable react-hooks/rules-of-hooks */
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import '../../assets/CSS/card.css'
import * as IconsB from '@fortawesome/free-brands-svg-icons'
import * as IconsR from '@fortawesome/free-regular-svg-icons';
import * as IconsS from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
export const card = (props) => {
 
  return (
    <Link to={props.link}>
        <div className={props.color} style={{borderRadius:"30px"}}>
        <div className="customcard  text-light">
            {
                props.type==='IconsR' && <FontAwesomeIcon icon={IconsR[props.icon]} size="7x" className="iconpos" />
            }
            {
                props.type==='IconsB' && <FontAwesomeIcon icon={IconsB[props.icon]} size="7x" className="iconpos" />
            }
             {
                props.type==='IconsS' && <FontAwesomeIcon icon={IconsS[props.icon]} size="7x" className="iconpos" />
            }
            <h3 className="pt-4 ps-3">{props.title}</h3>
        </div>
    </div>
    </Link>
    
  )
}

export default card

