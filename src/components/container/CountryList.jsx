import React from 'react'
import { getAllCountry } from "../../api/api-index";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";
import CardContainer from './CardContainer';
import { Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import { getCountryByName } from '../../api/api-index';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { getCountryByRegion } from '../../api/api-index';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';



const CountryList = () => {

  const navigate = useNavigate()
  const [search, setSearch] = useState("");

  const [country, setCountry] = useState([
    {
      name: "",
      population: "",
      region: "",
      capital: "",
      flag: "",
      code: "",
    },
  ]);



  const [region, setRegion] = useState("");
  const [open, setOpen] = useState(false);

  const handleChange = () => {
    if (region) {
      getCountryByRegion(region).then((res) => {

        const data = res.map((item) => {
          return {
            name: item.name.common,
            population: item.population,
            region: item.region,
            capital: item.capital,
            flag: item.flags.png,
            code: item.cca2,
          };
        });
        setCountry(data);
      });

    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };



  useEffect(() => {
    if(region){
      handleChange();
    }
    else{

    getAllCountry().then((res) => {
      const data = res.map((item) => {
        return {
          name: item.name.common,
          population: item.population,
          region: item.region,
          capital: item.capital,
          flag: item.flags.png,
          code: item.cca2,
        };
      });
      setCountry(data);


    });
  }
  }, [region]);

  const onNameChange = (search) => {


    if (search) {
      getCountryByName(search).then((res) => {

        const data = res.map((item) => {
          return {
            name: item.name.common,
            population: item.population,
            region: item.region,
            capital: item.capital,
            flag: item.flags.png,
            code: item.cca2,

          };
        });
        setCountry(data);
      });
    }
    else {
      getAllCountry().then((res) => {
        const data = res.map((item) => {
          return {
            name: item.name.common,
            population: item.population,
            region: item.region,
            capital: item.capital,
            flag: item.flags.png,
            code: item.cca2,
          };
        });
        setCountry(data);

      });
    }
  }

  return (

    <Container maxWidth="xl">
      <Box sx={{ m: 6, pb: 10 }}>
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={{ xs: 2 }}
          sx={{ mb: 6, justifyContent: 'space-between' }}
        >

          <TextField sx={{ minWidth: 250 }} label="Search for country..." id="search" onChange={(e) => {
            setSearch(e.target.value);
            setTimeout(() => {
              onNameChange(e.target.value);
            }, 2000);
          }} />
          <Box >
            <FormControl sx={{ minWidth: 200, }}>
              <InputLabel id="demo-controlled-open-select-label">Region</InputLabel>
              <Select
                open={open}
                onClose={handleClose}
                onOpen={handleOpen}
                value={region}
                label="Region"
                onChange={(e) => setRegion(e.target.value) }
              >
                <MenuItem value={'Africa'}>Africa</MenuItem>
                <MenuItem value={'Asia'}>Asia</MenuItem>
                <MenuItem value={'Caribbean'}>The Caribbean</MenuItem>
                <MenuItem value={'Central America'}>Central America</MenuItem>
                <MenuItem value={'Europe'}>Europe</MenuItem>
                <MenuItem value={'North America'}>North America</MenuItem>
                <MenuItem value={'Oceania'}>Oceania</MenuItem>
                <MenuItem value={'South America'}>South America</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Stack>
        <Grid container spacing={4} >

          {country.slice(0, 8).map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.code}
              sx={{
                // display: 'grid',
                justifyContent: 'center',
                mb: 2,

              }}
            >
              <Box
                onClick={() => {
                  navigate(`/country/${item.code}`);
                }}

              >
                <CardContainer
                  title={item.name}
                  population={item.population}
                  region={item.region}
                  capital={item.capital}
                  imgUrl={item.flag}
                  code={item.code}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  )
}

export default CountryList;