import Box from "@mui/material/Box"
import Header from "./Header"
import Main from "./Main"
import Nav from "./Nav"

export default function Layout() {
  return (
    <Box sx={{ display: "flex" }}>
      <Header />
      <Nav />
      <Main />
    </Box>
  )
}
