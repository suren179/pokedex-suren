import { createUseStyles } from 'react-jss';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useLayout } from '../../contexts';

interface LoaderProps {
	message?: string;
}

export const Loader = ({ message = 'Fetching...' }: LoaderProps) => {
	const { navCollapsed } = useLayout();
	const classes = useStyles({ navCollapsed });
	return (
		<div className={classes.root}>
			<CircularProgress color="inherit" />
			<span>{message}</span>
		</div>
	);
};

interface StyleProps {
	navCollapsed: boolean;
}

const useStyles = createUseStyles(
	{
		root: {
			textAlign: 'center',
			zIndex: '1 !important',
			flexDirection: 'column',
			gap: '1em',
			transition:
				'opacity 225ms cubic-bezier(0.4, 0, 0.2, 1), margin .2s ease-in-out !important',
			marginLeft: (props: StyleProps) =>
				props.navCollapsed ? '81px' : '320px',
			top: '0',
			left: '0',
			right: '0',
			bottom: '0',
			display: 'flex',
			position: 'fixed',
			alignItems: 'center',
			justifyContent: 'center',
			backgroundColor: 'rgba(0, 0, 0, 0.5)',
		},
	},
	{ name: 'Loader' },
);
