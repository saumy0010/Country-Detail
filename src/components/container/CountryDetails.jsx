import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Button, Grid } from '@mui/material';
import { useParams } from 'react-router-dom';
import { getCountryByCode } from '../../api/getCountryByCode';
import { Box, Typography } from '@mui/material'
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

      setCountry(data[0]);
    });
  }, [params.code]);


  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1, m: 5, pb: 10}}>

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
             <span style={{ fontWeight: 'bold'}}>Native Name: </span> {country.nativeName && country.nativeName[0].common}
            </Typography>
            <Typography variant="h6" component="h2">
             <span style={{ fontWeight: 'bold'}}>Population: </span>{country.population}
            </Typography>
            <Typography variant="h6" component="h2">
            <span style={{ fontWeight: 'bold'}}>Region:</span> {country.region}
            </Typography>
            <Typography variant="h6" component="h2">
            <span style={{ fontWeight: 'bold'}}>Sub Region:</span> {country.subRegion}
            </Typography>
            <Typography variant="h6" component="h2">
            <span style={{ fontWeight: 'bold'}}>Capital:</span> {country.capital}
            </Typography>
            <Typography variant="h6" component="h2">
            <span style={{ fontWeight: 'bold'}}>Borders:</span>
                {country.borders && country.borders.map((border) => {
                  return (
                    <Button sx={{
                      color: 'black',
                      border: '2px solid #4CAF50',
                      borderRadius: '4px',
                      padding: '4px 24px',
                      textAlign: 'center',
                      textDecoration: 'none',
                      cursor: 'pointer',
                      m: 1,
                    }} onClick={() => navigate(`/country/${border}`)}>{border}</Button>
                  )
                })
                }
              
            </Typography>
          </Grid>

          <Grid item xs={12} sm={10} md={5} lg={3} sx={{ mt: 18 }}>
            <Typography variant="h6" component="h2">

            <span style={{ fontWeight: 'bold'}}>Top Level Domain:</span> {country.tld && country.tld[0]}
            </Typography>
            <Typography variant="h6" component="h2">
            <span style={{ fontWeight: 'bold'}}> Currencies: </span>{country.currencies && country.currencies.map((currency) => currency.name).join(', ')}
            </Typography>
            <Typography variant="h6" component="h2">
            <span style={{ fontWeight: 'bold'}}> Languages: </span> {country.languages &&
                country.languages.map((language) => language).join(', ')}
            </Typography>

          </Grid>
        </Grid>



      </Box>


    </>
  );
};
