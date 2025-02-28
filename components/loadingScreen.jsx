"use client"; // Ensure this is a Client Component

import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const LoadingScreen = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <CircularProgress size={40} color="inherit" />
      <Typography
        variant="h6"
        sx={{ color: "black", fontWeight: "bold", pl: 2 }}
      >
        Loading
      </Typography>
    </Box>
  );
};

export default LoadingScreen;
