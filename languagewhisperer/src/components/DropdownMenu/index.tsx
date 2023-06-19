import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { supportedLanguages } from "@/constants";
import { styled } from "@mui/styles";
import { setLanguage, useWhispererDispatch, useWhispererState } from "@/providers/WhispererProvider";

export default function SelectVariants() {
  const { language } = useWhispererState();
  const dispatch = useWhispererDispatch();
  const handleChange = (event: SelectChangeEvent<unknown>) => {
    setLanguage(dispatch, event.target.value as string);
  };

  return (
    <div>
      <FormControl variant="filled" sx={{ m: 1, width: "400px", margin: "auto" }} size="small">
        <InputLabel id="demo-simple-select-filled-label">Select Language</InputLabel>
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={language}
          onChange={(e) => handleChange(e)}>
          {/* <div style={{ maxHeight: "200px", backgroundColor: "darkgrey" }}> */}
          {supportedLanguages.map((lang, index) => (
            <MenuItem value={lang} key={index}>
              {lang}
            </MenuItem>
          ))}
          {/* </div> */}
        </Select>
      </FormControl>
    </div>
  );
}
