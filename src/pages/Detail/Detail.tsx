import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import KeyboardBackspaceOutlinedIcon from "@mui/icons-material/KeyboardBackspaceOutlined";

import { getCountryDetail } from "../../services/detail";

import { Typography, Container } from "@mui/material";

import styles from "./Detail.module.css"

interface DetailProps {
    theme: string;
}
interface CountryDetail {
    name: any;
    nativeName: any;
}
function Detail() {
    const navigate = useNavigate();
    let { countryId } = useParams();
    const [countryDetail, setCountryDetail] = useState<CountryDetail | any>({});
    useEffect(() => {
        const fetchPageData = async () => {
            let countryDetail: any = await getCountryDetail({
                alpha: countryId || "",
            });
            console.log(countryDetail);
            setCountryDetail(countryDetail.data[0]);
        };
        fetchPageData();
    }, [countryId]);

    function goBack() {
        navigate(-1);
    }

    function goToDetailPage(countryId: string) {
        let path = `/detail/${countryId}`;
        navigate(path);
    }

    return (
        <Container
            sx={{
                pl: 4,
                pr: 4,
            }}
        >
            <Button
                startIcon={<KeyboardBackspaceOutlinedIcon />}
                variant="contained"
                onClick={goBack}
                sx={{
                    bgcolor: "background.default",
                    color: "text.primary",
                    width: 130,
                    height: 40,
                    mb: 2,
                    mt: 5,
                }}
            >
                Back
            </Button>
            <Container
                classes={{
                    root: styles.detailContainer
                }}
                sx={{
                    display: "flex",
                    p: 0
                }}
            >
                <img
                    src={countryDetail?.flags?.svg}
                    alt=""
                    className={styles.flagImg}
                    style={{ width: "100%", marginTop: 30, maxWidth: 400, display: "block" }}
                />
                <Container classes={{
                    root: styles.detailContent
                }}
                    sx={{
                        p: 0
                    }}
                >
                    <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        color="text.primary"
                        sx={{
                            pb: 4,
                            pt: 4,
                        }}
                    >
                        {countryDetail?.name?.common}
                    </Typography>

                    <Container 
                         sx={{
                            p: 0
                        }}
                    classes={{
                        root: styles.subContent
                    }}>
                        <Container
                             sx={{
                                p: 0
                            }}
                        classes={{
                            root: styles.left
                        }}
                        >
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    pb: 2,
                                    fontSize: 16,
                                }}
                            >
                                Native Name:{" "}
                                {
                                    (Object.values(countryDetail?.name?.nativeName || [])[0] as any)
                                        ?.common
                                }
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    pb: 2,
                                    fontSize: 16,
                                }}
                            >
                                Population: {countryDetail?.population}
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    pb: 2,
                                    fontSize: 16,
                                }}
                            >
                                Region: {countryDetail?.region}
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    pb: 2,
                                    fontSize: 16,
                                }}
                            >
                                Sub Region: {countryDetail?.subregion}
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    pb: 2,
                                    fontSize: 16,
                                    mb: 4,
                                }}
                            >
                                Capital: {countryDetail?.capital?.length && countryDetail?.capital[0]}
                            </Typography>
                        </Container >

                        <Container classes={{
                            root: styles.right
                        }}
                            sx={{
                                // display: "flex",
                                p:0
                            }}>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    pb: 2,
                                    fontSize: 16,
                                }}
                            >
                                Top Level Domain: {countryDetail?.tld?.join(",")}
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    pb: 2,
                                    fontSize: 16,
                                }}
                            >
                                Currencies: {Object.keys(countryDetail?.currencies || {})?.join(",")}
                            </Typography>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{
                                    pb: 2,
                                    fontSize: 16,
                                    mb: 4,
                                }}
                            >
                                Languages: {Object.values(countryDetail?.languages || {})?.join(",")}
                            </Typography>
                        </Container>

                    </Container>

                    {countryDetail?.borders?.length && (
                        <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{
                                pb: 2,
                                fontSize: 16,
                            }}
                        >
                            Border Countries:
                        </Typography>
                    )}
                    <Stack direction="row" flexWrap="wrap" justifyContent="space-between">
                        {countryDetail?.borders?.map((item: string) => (
                            <Button
                                variant="contained"
                                key={item}
                                sx={{
                                    bgcolor: "background.default",
                                    color: "text.primary",
                                    width: 100,
                                    height: 40,
                                    mb: 2,
                                }}
                                onClick={() => goToDetailPage(item)}
                            >
                                {item}
                            </Button>
                        ))}
                    </Stack>
                </Container>
            </Container>
        </Container>
    );
}

export default React.memo(Detail);
