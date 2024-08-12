import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";

type ApiKeyInputProps = {
  onSave: (apiKey: string) => void;
};

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ onSave }) => {
  const [apiKey, setApiKey] = useState("");

  const handleSave = () => {
    if (apiKey) {
      onSave(apiKey);
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <TextField
        label="Enter OpenRouter API Key"
        variant="outlined"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)}
        fullWidth
      />
      <Button variant="contained" onClick={handleSave}>
        Save
      </Button>
    </Box>
  );
};

export default ApiKeyInput;
