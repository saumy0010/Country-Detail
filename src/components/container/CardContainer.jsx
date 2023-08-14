import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

const CardContainer = (props) => {
    const imgUrl = props.imgUrl;
    const title = props.title;
    const population = props.population;
    const region = props.region;
    const capital = props.capital;
    const code = props.code;
    

  return (
    <Card sx={{maxHeight: 400, maxWidth: 400, minHeight: 230, minWidth: 230}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="160"
          image={imgUrl}
        />
        <CardContent>
          <Typography gutterBottom sx={{fontSize:{sm:"14px", xs: '12px', md: "16px", lg: "18px" }}} component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
           <Typography variant="body2" color="text.secondary">
            Population: {population}
            </Typography>
            <Typography variant="body2" color="text.secondary">
            Region: {region}
            </Typography>
            <Typography variant="body2" color="text.secondary">
            Capital: {capital}
            </Typography>

          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default CardContainer;