import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import { getCountryByCode } from '../../api/getCountryByCode';
import { Box, Typography } from '@mui/material'
import Paper from '@mui/material/Paper';
import ButtonBase from '@mui/material/ButtonBase';



export const CountryDetails = () => {
  const [country, setCountry] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    getCountryByCode(params.code).then((res) => {
      const data = res.map((item) => {
        return {
          name: item.name.common,
          population: item.population,
          region: item.region,
          capital: item.capital,
          flag: item.flags.png,
          code: item.cca2,
          nativeName: Object.values(item.name.nativeName),
          subRegion: item.subregion,
          tld: item.tld,
          currencies: Object.values(item.currencies),
          languages: Object.values(item.languages),
          borders: item.borders,
        };
      });
      console.log(data);

      setCountry(data[0]);
    });
  }, [params.code]);


  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, m: 5, }}>

        <Grid container spacing={2} sx={{ display: 'inline-flex', columnGap: 3 }}>

          <Grid item xs={12} md={7} lg={5}>
            <Box sx={{ mb: 5 }}>
              <Button sx={{
                color: 'black',
                border: '2px solid #4CAF50',
                borderRadius: '4px',
                padding: '4px 24px',
                textAlign: 'center',
                textDecoration: 'none',
                cursor: 'pointer',


              }} onClick={() => navigate(-1)}>
                Back</Button>
            </Box>
            <ButtonBase sx={{

              width: '80%',
              height: '80%',
              minHeight: '300px',
              minWidth: '300px',

            }}>
              <img
                src={country.flag}
                alt={country.name}
                onLoad={handleImageLoad}
                style={{
                  display: imageLoaded ? 'block' : 'none',
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
              />

              {!imageLoaded && (
                <div
                  style={{
                    width: '100%',
                    height: '100%',

                  }}
                />
              )}

            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm={6} md={5} lg={3} sx={{ mt: 10 }}>
            <Typography variant="h4" component="h2" sx={{ mb: 3 }}>
              {country.name}
            </Typography>
            <Typography variant="h6" component="h2">
              Native Name: {country.nativeName && country.nativeName[0].common}
            </Typography>
            <Typography variant="h6" component="h2">
              Population: {country.population}
            </Typography>
            <Typography variant="h6" component="h2">
              Region: {country.region}
            </Typography>
            <Typography variant="h6" component="h2">
              Sub Region: {country.subRegion}
            </Typography>
            <Typography variant="h6" component="h2">
              Capital: {country.capital}
            </Typography>
            <Typography variant="h6" component="h2">
              Borders: {country.borders && country.borders.join(', ')}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={10} md={5} lg={3} sx={{ mt: 18 }}>
            <Typography variant="h6" component="h2">

              Top Level Domain: {country.tld && country.tld[0]}
            </Typography>
            <Typography variant="h6" component="h2">
              Currencies: {country.currencies && country.currencies.map((currency) => currency.name).join(', ')}
            </Typography>
            <Typography variant="h6" component="h2">
              Languages: {country.languages &&
                country.languages.map((language) => language).join(', ')}
            </Typography>

          </Grid>
        </Grid>



      </Box>


    </>
  );
};
