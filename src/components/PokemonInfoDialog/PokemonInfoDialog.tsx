import { createUseStyles } from 'react-jss';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import useTheme from '@material-ui/core/styles/useTheme';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useGetPokemon } from '../../hooks/useGetPokemon';
import { ErrorMsg } from '../ErrorMsg';
import { Loader } from '../Loader';
import { ROUTES } from '../../constants';
import { PokemonInfoCard } from './';

export const PokemonInfoDialog = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const theme = useTheme();
	const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

	const { pokemon, pokemonFieldsToShow, loading, error } = useGetPokemon(id);
	const classes = useStyles();

	const handleClose = () => {
		navigate(ROUTES.POKEMON_LIST);
	};

	return (
		<>
			{loading ? (
				<Loader />
			) : (
				<Dialog
					open={true}
					onClose={handleClose}
					fullScreen={fullScreen}
					maxWidth={'sm'}
					fullWidth={true}
					aria-labelledby="pokemon-info-dialog"
				>
					<DialogTitle
						id="pokemon-info-dialog"
						className={classes.dialogTitle}
					>
						<span>{pokemon?.name && pokemon?.name}</span>
					</DialogTitle>
					<DialogContent className={classes.dialogContent}>
						{error || !pokemon ? (
							<ErrorMsg
								message={error?.message || 'Pokemon Not Found'}
							/>
						) : (
							<>
								<PokemonInfoCard
									data={pokemon}
									pokemonFieldsToShow={pokemonFieldsToShow}
								/>
							</>
						)}
					</DialogContent>
					<DialogActions className={classes.dialogActions}>
						{!loading && (
							<Button
								id="closeBtn"
								onClick={handleClose}
								color="primary"
								variant="contained"
							>
								Close
							</Button>
						)}
					</DialogActions>
				</Dialog>
			)}
		</>
	);
};

const useStyles = createUseStyles(
	{
		dialogTitle: {
			textAlign: 'center',
			padding: '8px 24px !important',
			'& span': {
				fontWeight: 'bold',
				fontSize: '2em',
			},
		},
		dialogContent: {
			marginBottom: '1em',
		},
		dialogActions: {
			marginBottom: '1em',
			paddingRight: '1.6em !important',
		},
	},
	{ name: 'PokemonInfoDialog' },
);
