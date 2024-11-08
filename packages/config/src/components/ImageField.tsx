import Box from "@mui/material/Box"
import FormControl from "@mui/material/FormControl"
import FormHelperText from "@mui/material/FormHelperText"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"
import Stack from "@mui/material/Stack"

import type { SelectChangeEvent } from "@mui/material/Select"

export type ImageFieldProps = {
  required?: boolean
  fullWidth?: boolean
  label?: string
  helperText?: string
  value?: string
  defaultValue?: string
  onChange?: (event: SelectChangeEvent) => void
  images: string[]
}

export default function ImageField({
  required,
  fullWidth,
  label,
  helperText,
  value,
  defaultValue,
  onChange,
  images,
}: ImageFieldProps) {
  const size = 36

  return (
    <FormControl required={required} fullWidth={fullWidth}>
      {label && <InputLabel>{label}</InputLabel>}
      <Select
        label={label}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
      >
        {images.map((image) => (
          <MenuItem key={image} value={image}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Box width={size} height={size}>
                <img
                  src={`${import.meta.env.BASE_URL}/images/${image}`}
                  alt=""
                  style={{ width: size, height: size, objectFit: "cover" }}
                />
              </Box>
              <Box>
                <span>{image}</span>
              </Box>
            </Stack>
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  )
}
