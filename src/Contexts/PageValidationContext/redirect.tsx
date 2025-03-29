import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';
//import { useEffect, useContext, useRef } from 'react';
// import { useLocation, useNavigate } from 'react-router';
// import { PageValidationContext } from '@contexts/PageValidationContext';

const useBlockedNavigation = () => {
  //const navigate = useNavigate();
  //const { pageStatus } = useContext(PageValidationContext);
  const location = useLocation();
  const [path] = useState(location.pathname)

  const page = useRef(location.pathname);

  useEffect(() => {
    console.log('previous page', page.current);

    page.current = path;
    //console.log('current page', page.current);
  }, [location.pathname, path]);

};

export { useBlockedNavigation };