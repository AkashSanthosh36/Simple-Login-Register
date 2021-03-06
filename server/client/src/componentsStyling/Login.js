import { makeStyles } from '@material-ui/core'

export default makeStyles({
    container: {
      padding: '30px 10% 0 10%',
      width: '100%',
      margin: 0,
      justifyContent: 'center',
    },
    card: {
      width: '100%',
      textAlign: 'center',
      borderLeft: '10px solid black',
      borderRight: '10px solid black',
    },
    title: {
      fontSize: 50,
      fontFamily: 'Grand Hotel, cursive',
      flexGrow: 1,
    },
    textfield: {
      '& label.Mui-focused': {
          color: 'black',
        },
      '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: '#00000',
          },
          '&:hover fieldset': {
            borderColor: 'black',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'black',
            borderLeftWidth: 6,
          },
        },
        marginBottom: 30,
     }, 
    button: {
      background: 'linear-gradient(45deg, #2193b0 30%, #6dd5ed 90%)',
      color: 'white',
    },
  });