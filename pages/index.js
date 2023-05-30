import TableRow from "@/components/TableRow";
import React, { useState, useEffect } from 'react';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import Profile from "@/components/Profile";
import FeedbackForm from "@/components/FeedbackForm";




export default function Home() {

    const [selectedProduct, setSelectedProduct] = useState('MinoxidilFoam');
    const handleProductClick = (product) => {
      setSelectedProduct(product);
    };

// Creating a login button component.
    const LoginButton = () => {
      const { loginWithRedirect } = useAuth0();
      
      return <button onClick={loginWithRedirect}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
      >Login</button>
    };
    // Creating a logout button component.
    const LogoutButton = () => {
    const { logout } = useAuth0();
  
  return <button onClick={() => logout({ returnTo: window.location.origin })}
  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  >Logout</button>
};


// Creating a authentication button that switches between login and logout button based on authentication state.
const AuthenticationButton = () => {
  const { isAuthenticated } = useAuth0();
  return !isAuthenticated ? <LoginButton /> : null;
};

// get the first 2 significant digits
function twoDigits(num) {
    const numAsString = num.toString();
    const decimalIndex = numAsString.indexOf('.');
    let result;
  
    if (decimalIndex === -1) {
      // If the number has no decimal point
      result = numAsString.slice(0, 2);
    } else {
      // If the number has a decimal point
      const numBeforeDecimal = numAsString.slice(0, decimalIndex);
      const numAfterDecimal = numAsString.slice(decimalIndex + 1);
  
      if (numBeforeDecimal.length === 2) {
        result = numBeforeDecimal;
      } else {
        result = numAsString.slice(0, decimalIndex + 2);
      }
    }
  
    return parseFloat(result);
  }

  function renderTableRows(selectedProduct) {
    //get category
    const productData = data[selectedProduct];

    return productData.map(([brand, [price, link]]) => {
      // Initialize the props for each TableRow component
      const rowProps = {
        brand,
        imageurl: imageUrls[brand],
        MinoxidilFoamPrice:'',
        MinoxidilSolutionPrice:'',
        FinasteridePrice:'',
      };
  
      // Check if the brand exists categories and set the corresponding props 
      for (const key in data) {
        const categoryData = data[key];
        const foundEntry = categoryData.find((entryBrand) => entryBrand[0] === brand);
        
    // found entry is either [['KirklandCostco', [8.3, 'https://www.costco.com/CatalogSearch?dept=All&keyword=Kirkland+Signature+Hair+Regrowth+Treatment+']], or undefined
        let price = foundEntry? foundEntry[1][0] : ''   
        rowProps[key+'Price'] = foundEntry? twoDigits(price) : ''
        rowProps[key+'Link'] = foundEntry? foundEntry[1][1]: null
        rowProps[key+'Link'] = foundEntry? foundEntry[1][1]: null
      } 
      return <TableRow key={brand} {...rowProps} />;
    });
  }
  

const imageUrls = {
    Keeps: 'https://i.ibb.co/b6yFdww/image-11.png',
    AmazonPharmacy: 'https://i.ibb.co/fCbDhjG/Amazon-Pharmacy-1-1.png',
    HappyHead: 'https://i.ibb.co/hBffkXR/Happy-Head.png',
    Hims: 'https://i.ibb.co/9r9xNZH/hims.png',
    KirklandCostco: 'https://i.ibb.co/RT1QkwL/Kirkland.png',
    Rogain: 'https://i.ibb.co/KwDFtH7/Rogaine.png',
    Roman: 'https://i.ibb.co/fY42KJc/RoLogo.png',
  };


const styles = {
    productType: {
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      width: '240px',
      height: '193px',
      backgroundRepeat: 'no-repeat',
      borderTopLeftRadius: '20px',
      borderTopRightRadius: '20px',
      borderBottomLeftRadius: '20px',
      borderBottomRightRadius: '20px',
    },
    image: {
      borderRadius: '20px',
    },
  };

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  //call the api on render to load prices
  useEffect(() => {
    fetch('https://minoxidilscraperapi.azurewebsites.net/GetPrices')
      .then((response) => response.json())
      .then((data) => {
        setData(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Error: No data retrieved</div>;
  }

  return (
    <>
  
      <Auth0Provider
      domain= {process.env.NEXT_PUBLIC_AUTH0_Domain}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
      redirectUri={window.location.origin}
      >
    
      <div className="absolute top-4 right-4 flex flex-row">
        <AuthenticationButton />
        <Profile />
      </div>
    

      <div className="flex justify-center pt-8">
        <img src="https://i.ibb.co/6HjLbhS/30994969970-2.png" className="w-80 h-40 object-contain "/>
      </div>

  <div class="pt-28 flex flex-col md:flex-row justify-center items-center">

      <button style={{ ...styles.productType }} onClick={() => handleProductClick('MinoxidilFoam')} className="m-4 content-start">
          <div className={` ${selectedProduct === 'MinoxidilFoam' ? 'rounded-[20px] border-4 border-[#465578]' : ''}`}>
            <img src='https://i.ibb.co/SX0smrX/Foam.png' style={styles.image} />
          </div>
        </button>

      <button style={{ ...styles.productType }} onClick={() => handleProductClick('MinoxidilSolution')}  className="m-4">
        <div className={` ${selectedProduct === 'MinoxidilSolution' ? 'rounded-[20px] border-4 border-[#465578]' : ''}`}>
          <img src='https://i.ibb.co/gMdD3QC/Solution.png' style={styles.image} />
        </div>
      </button>

      <button style={{ ...styles.productType }} onClick={() => handleProductClick('Finasteride')}  className="m-4">
        <div className={`${selectedProduct === 'Finasteride' ? 'rounded-[20px] border-4 border-[#465578]' : ''}`}>
          <img src='https://i.ibb.co/KmWMDWb/Finasteride-1.png' style={styles.image} />
        </div>
      </button>

    </div>

  <div className="mt-24 grid justify-center right-8 relative ">
    {renderTableRows(selectedProduct)}
  </div>

  <div className="mt-20">
    <FeedbackForm />
  </div>    

      <div className="pb-24"></div>
</Auth0Provider>

      </>
  );
};



