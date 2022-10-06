import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import classNames from "classnames";
import {
  Paper,
  FormControl,
  InputBase,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  Typography,
  InputLabel,
  MenuItem,
  Container,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { getRegions, getCountryList } from "../../services/home";
import { groupBy } from "../../utils/utils";

import styles from "./Home.module.css";

interface CountryItem {
  region: string;
  name: any;
  flags: any;
  population: number;
  capital: any;
  cioc: string;
}

// FIXME: countriesList 的定义

function Home() {
  const [countriesList, setCountriesList] = useState([]); // 全部国家
  const [searchList, setSearchList] = useState([]); // 搜索list
  const [region, setRegion] = useState<string>(""); // region
  const [inputValue, setInputValue] = useState<string>(""); // 输入框值
  const [regionList, setRegionList] = useState<any>({}); // 按照 region 分类
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPageData = async () => {
      let countriesList = await getCountryList({
        fields: ["name", "flags", "population", "region", "capital", "cioc"],
      });
      setCountriesList(countriesList.data);
      setSearchList(countriesList.data);
      let regionList = groupBy(countriesList.data, "region");
      setRegionList(regionList);
    };
    fetchPageData();
  }, []);

  function goToDetailPage(countryId: string) {
    let path = `/detail/${countryId}`;
    navigate(path);
  }

  function hadnleInputChange(event: any) {
    setInputValue(event.target.value);
    let value = event.target.value;
    console.log("object", inputValue);
    let reg = new RegExp(value + "\\w*", "ig");
    let searchList = countriesList.filter((item: CountryItem) =>
      reg.test(item.name.common)
    );
    setInputValue(inputValue);
    setSearchList(searchList);
  }

  const handleChangeSelect = (event: SelectChangeEvent) => {
    setRegion(event.target.value as string);
    let key = event.target.value;
    setSearchList(regionList[key]);
  };

  return (
    <div>
      <div className={styles.topBar}>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "90%",
          maxWidth: "500px",
          m: 2,
          bgcolor: "background.default",
          margin: "0px"
        }}
      >
        <IconButton type="button" sx={{ p: 1 }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search for a country"
          inputProps={{ "aria-label": "search for a country" }}
          onChange={_.debounce(hadnleInputChange, 500)}
        />
      </Paper>
      <FormControl sx={{ width: "35%", ml: 2, maxWidth: 250, minWidth: 200 }}>
        <InputLabel id="demo-simple-select-label">Region</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={region}
          label="Region"
          onChange={handleChangeSelect}
        >
          {Object.keys(regionList).map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      </div>

      <Container
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >

      {searchList && searchList.length>0?
        searchList.map((country, index) => (
          <Card
            sx={{ width: 350, mt: 2, mb: 2, borderRadius: 2, mr: 2 }}
            key={index}
            variant="outlined"
            onClick={() => goToDetailPage((country as CountryItem).cioc)}
          >
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              image={(country as CountryItem)?.flags?.svg}
            />
            <CardContent
              sx={{
                textAlign: "left",
                p: [3],
                bgcolor: "background.default",
              }}
            >
              <Typography gutterBottom variant="h5" component="div" className={styles.countryName}>
                {(country as CountryItem).name.common}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  pb: 1,
                  fontSize: 16,
                }}
              >
                Population: {(country as CountryItem).population}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  pb: 1,
                  fontSize: 16,
                }}
              >
                Region: {(country as CountryItem).region}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  pb: 1,
                  fontSize: 16,
                }}
              >
                Capital: {(country as CountryItem).capital[0]}
              </Typography>
            </CardContent>
          </Card>
        )):
        <div className={styles.loadCont}>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
        </div>}
      </Container>
    </div>
  );
}

export default Home;
