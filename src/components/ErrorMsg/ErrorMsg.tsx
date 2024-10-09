import { createUseStyles } from 'react-jss';
import Typography from '@material-ui/core/Typography';

interface ErrorMsgProps {
	message?: string;
}

export const ErrorMsg = ({ message }: ErrorMsgProps) => {
	const classes = useStyles();
	return (
		<Typography variant="h4" component="h4" className={classes.root}>
			{'Error! '} {message}
		</Typography>
	);
};

const useStyles = createUseStyles(
	{
		root: {
			padding: '2em',
			color: 'red',
			textAlign: 'center',
		},
	},
	{ name: 'ErrorMsg' },
);
