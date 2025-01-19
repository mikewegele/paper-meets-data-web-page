import React from "react";
import {Box, Grid2, Typography} from "@mui/material";
import CityCard from "./CityCard";

interface Props {

}

const BrowseBuildingView: React.FC<Props> = () => {

    return (
        <Box sx={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', p: 2}}>
            <Box sx={{flex: 1, mr: 2}}>
                <Typography variant="h6" gutterBottom>City Building Blocks</Typography>
                <Grid2 container spacing={2}>
                    <Grid2><CityCard viewType="browse" type="familyHouse" imageUrl="image1.jpg"
                                     title="Building Block 1" price={1000}
                                     energyRequired={50}/></Grid2>
                    <Grid2><CityCard viewType="browse" type="skyscraper" imageUrl="image2.jpg"
                                     title="Building Block 2" price={2000}
                                     energyRequired={100}/></Grid2>
                </Grid2>
            </Box>
            <Box sx={{flex: 1}}>
                <Typography variant="h6" gutterBottom>Energy Providers</Typography>
                <Grid2 container spacing={2}>
                    <Grid2><CityCard viewType="browse" type="coalPowerPlant" imageUrl="provider1.jpg"
                                     title="Energy Provider 1"
                                     price={500}
                                     energyRequired={30}/></Grid2>
                    <Grid2><CityCard viewType="browse" type="nuclearEnergy" imageUrl="provider2.jpg"
                                     title="Energy Provider 2"
                                     price={1500}
                                     energyRequired={60}/></Grid2>
                    <Grid2><CityCard viewType="browse" type="windmill" imageUrl="provider3.jpg"
                                     title="Energy Provider 3"
                                     price={1200}
                                     energyRequired={45}/></Grid2>
                    <Grid2><CityCard viewType="browse" type="solarPanel" imageUrl="provider4.jpg"
                                     title="Energy Provider 4"
                                     price={800}
                                     energyRequired={35}/></Grid2>
                </Grid2>
                <Typography variant="h6" gutterBottom>Energy Storage</Typography>
                <Grid2 container spacing={2}>
                    <Grid2><CityCard viewType="browse" type="battery" imageUrl="storage.jpg"
                                     title="Energy Storage" price={3000}
                                     energyRequired={200}/></Grid2>
                </Grid2>
            </Box>
        </Box>
    );
}

export default BrowseBuildingView;