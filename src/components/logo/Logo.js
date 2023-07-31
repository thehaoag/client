import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Link } from '@mui/material';

// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {

  // OR using local (public folder)
  // -------------------------------------------------------
  // const logo = (
  //   <Box
  //     component="img"
  //     src="/logo/logo_single.svg" => your path
  //     sx={{ width: 40, height: 40, cursor: 'pointer', ...sx }}
  //   />
  // );

  const StyledProductImg = styled('img')({
    top: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  });

  const logo = (
    <Box
      ref={ref}
      component="div"
      sx={{
        width: 150,
        height: 90,
        display: 'inline-flex',
        ...sx,
      }}
      {...other}
    >
      <StyledProductImg src={`/assets/images/Logo.png`} title='logo'/>
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return (
    <Link to="/" component={RouterLink} sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});

Logo.propTypes = {
  sx: PropTypes.object,
  disabledLink: PropTypes.bool,
};

export default Logo;
