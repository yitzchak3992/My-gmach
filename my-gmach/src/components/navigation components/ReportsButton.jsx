// import IconButton from '@mui/material/IconButton';
// import Badge from '@mui/material/Badge';
// import MailIcon from '@mui/icons-material/Mail';
// import React from 'react'

// function ReportsButton() {
//   return (
// <IconButton aria-label={13} > 
//   <Badge badgeContent={2} color="error">
//     <MailIcon color="secondary"     
//     //   sx={{
//     //     "&:hover": {
//     //       backgroundColor: "rgba(255, 255, 255, 0.2)", // set hover color
//     //     },
//     //   }}
//       />
//   </Badge>
// </IconButton>  )
// }

// export default ReportsButton

import React from 'react';
import { IconButton, Badge } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import { useNavigate } from 'react-router-dom';

export default function HoverIconButton() {
    const navigate = useNavigate();

  return (
    <IconButton
    onClick={()=>{
        navigate("/AdminReportsPage")
    }}
      aria-label={13}
      sx={{
        width: 80, 
        height: 80,
        borderRadius: '50%',
        position: 'relative',
        '&:hover': {
          backgroundColor: 'rgba(255, 255, 255, 0.2)', // set hover color
        },
      }}
    >
      <Badge
        badgeContent={2}
        color="error"
        sx={{
          '& .hover-circle': {
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.2)', 
            transition: 'background-color 0.3s ease', 
          },
        }}
      >
        <span className="hover-circle" />
        <MailIcon color="secondary" sx={{ fontSize: 35 }} />
      </Badge>
    </IconButton>
  );
}
