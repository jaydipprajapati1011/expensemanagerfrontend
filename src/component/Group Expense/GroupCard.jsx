import { Button } from '@mui/material';
import React from 'react';




const GroupCard = ({ group }) => {

    // const classes = useStyles();


  return (


    <div className="card" style={{ width: '20rem', height: '13rem' }}>
      <div className="card-body">
        <h4 className="card-title mb-1" style={{ fontWeight: 500 }}>
          {group.name}
        </h4>
        <p className="card-text">{group.description}</p>

        <Button variant="contained">Add</Button>
      </div>
    </div>




  );
};

export default GroupCard;