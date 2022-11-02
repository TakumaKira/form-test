import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import classNames from 'classnames';

import cls from './Frame.module.scss';

const Frame = (props: {title: string, children: React.ReactNode}): JSX.Element => {
  const {title, children} = props;

  return (
    <Container className={classNames(cls.container)}>
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