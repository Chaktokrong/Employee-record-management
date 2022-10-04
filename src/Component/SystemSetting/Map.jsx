import React from "react";
import { Box, Stack } from "@mui/material";
import GoogleMapReact from "google-map-react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import "./map.scss";

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export default function Map({ rows }) {
  console.log(rows);

  const defaultProps = {
    center: {
      lat: !isNaN(parseFloat(rows?.latitude))
        ? parseFloat(rows?.latitude)
        : 13.347996279852236,
      lng: !isNaN(parseFloat(rows?.longitude))
        ? parseFloat(rows?.longitude)
        : 103.8440313555189,
    },
    zoom: 18,
  };

  return (
    <div className="map-container">
      <div className="map-item">
        <Box sx={{ width: "100%", height: "300px" }}>
          <GoogleMapReact
            bootstrapURLKeys={{
              key: "AIzaSyBKeDRfxrskhcJ7Rgi4Efg4zSmRqzYAZjk",
            }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
          >
            <AnyReactComponent
              lat={defaultProps.center.lat}
              lng={defaultProps.center.lng}
              text={
                <Box className="location">
                  <Stack direction="row" justifyContent="center">
                    <LocationOnIcon className="icon-location" />
                  </Stack>
                </Box>
              }
            />
          </GoogleMapReact>
        </Box>
      </div>
    </div>
  );
}
