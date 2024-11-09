import Box from "@mui/material/Box"
import FormControl from "@mui/material/FormControl"
import FormHelperText from "@mui/material/FormHelperText"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Select from "@mui/material/Select"
import Stack from "@mui/material/Stack"
import { forwardRef } from "react"

import type { SelectChangeEvent } from "@mui/material/Select"
import type { FocusEvent, ForwardedRef, SyntheticEvent } from "react"

export type ImageFieldProps = {
  name?: string
  required?: boolean
  fullWidth?: boolean
  label?: string
  helperText?: string
  value?: string
  defaultValue?: string
  error?: boolean
  disabled?: boolean
  onChange?: (event: SelectChangeEvent) => void
  onBlur?: (event: FocusEvent) => void
  onOpen?: (event: SyntheticEvent) => void
  images: string[]
}

export default forwardRef(function ImageField(
  {
    name,
    required,
    fullWidth,
    label,
    helperText,
    value,
    error,
    disabled,
    onChange,
    onBlur,
    onOpen,
    images,
  }: ImageFieldProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const size = 36

  return (
    <FormControl required={required} fullWidth={fullWidth}>
      {label && <InputLabel>{label}</InputLabel>}
      <Select
        name={name}
        label={label}
        value={value}
        error={error}
        disabled={disabled}
        ref={ref}
        onChange={onChange}
        onBlur={onBlur}
        onOpen={onOpen}
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
})
