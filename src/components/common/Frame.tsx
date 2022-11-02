import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const Frame = (props: {title: string, children: React.ReactNode}): JSX.Element => {
  const {title, children} = props;

  return (
    <Container>
      <Typography variant="h6" component="h2">
        {title}
      </Typography>
      <Box>
        {children}
      </Box>
    </Container>
  );
}

export default Frame;