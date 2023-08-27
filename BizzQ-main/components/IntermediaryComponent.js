import React from 'react'
import { Text } from 'react-native';
import BusinessCardDesign1 from './BusinessCardDesign1';
import BusinessCardDesign2 from './BusinessCardDesign2';
import BusinessCardDesign4 from './BusinessCardDesign4';
import BusinessCardDesign5 from './BusinessCardDesign5';
import BusinessCardDesign6 from './BusinessCardDesign6';
import BusinessCardDesign7 from './BusinessCardDesign7';

const IntermediaryComponent = (props) => {
    function DesignRenderer() {
  
        switch (props.designType) {
        case 'design1':
            designComponent = <BusinessCardDesign1
                name = {props.name }
                occupation = {props.occupation}
                email= {props.email}
                phone = {props.phone} 
                address = {props.address} 
                website = {props.website}
            />;
            break;
        case 'design2':
          designComponent = <BusinessCardDesign2
                name = {props.name }
                occupation = {props.occupation}
                email= {props.email}
                phone = {props.phone} 
                address = {props.address} 
                website = {props.website}
            />;  
            break;
        case 'design4':
            designComponent = <BusinessCardDesign4 
            name = {props.name }
                occupation = {props.occupation}
                email= {props.email}
                phone = {props.phone} 
                address = {props.address} 
                website = {props.website}/>;
            break;
        case 'design5':
            designComponent = <BusinessCardDesign5 
            name = {props.name }
                occupation = {props.occupation}
                email= {props.email}
                phone = {props.phone} 
                address = {props.address} 
                website = {props.website}/>;
            break;
        case 'design6':
            designComponent = <BusinessCardDesign6
            name = {props.name }
                occupation = {props.occupation}
                email= {props.email}
                phone = {props.phone} 
                address = {props.address} 
                website = {props.website} />;
            break;
        case 'design7':
          designComponent = <BusinessCardDesign7
          name = {props.name }
              occupation = {props.occupation}
              email= {props.email}
              phone = {props.phone} 
              address = {props.address} 
              website = {props.website} />;
          break;
        default:
          <Text>card is invalid</Text>
        }
        return designComponent
    }

  return (
    DesignRenderer()
  )
}

export default IntermediaryComponent