import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  previewContainer: {
    display: 'block',
  },
  preview: {
    maxWidth: 300,
    maxHeight: 300,
  },
}));

export default useStyles;
