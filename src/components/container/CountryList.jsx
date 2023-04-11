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
import CountryDetails from './CountryDetails';
import { useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';



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

  const handleChange = (event) => {
    setRegion(event.target.value);
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
    else {
      getAllCountry().then((res) => {
        const data = res.map((item) => {
          console.log(item.name.common);
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
  }, []);

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


    <Box sx={{ m: 6 }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 1, sm: 20, md: 100 }}
        sx={{ mb: 6 }}
      >

        <TextField sx={{ maxWidth: 300, }} label="Search for country..." id="search" onChange={(e) => {
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
              onChange={(e) => { handleChange(e) }}
            >
              <MenuItem value={'Africa'}>Africa</MenuItem>
              <MenuItem value={'Asia'}>Asia</MenuItem>
              <MenuItem value={'The Caribbean'}>The Caribbean</MenuItem>
              <MenuItem value={'Central America'}>Central America</MenuItem>
              <MenuItem value={'Europe'}>Europe</MenuItem>
              <MenuItem value={'North America'}>North America</MenuItem>
              <MenuItem value={'Oceania'}>Oceania</MenuItem>
              <MenuItem value={'South America'}>South America</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Stack>

      <Grid container spacing={2}>
        <Grid item xs={12}>

          <Box sx={{ display: 'flex' }}>
            <Grid container spacing={2} >
              {country.slice(0, 8).map((item) => (
                <Grid item xs={12} md={6} lg={3} key={item.code} sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  mb: 4
                }}>
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
        </Grid>
      </Grid>
    </Box>
  )
}

export default CountryList;