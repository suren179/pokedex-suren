import { useCallback } from 'react';
import { createUseStyles } from 'react-jss';
import { PokemonDetailedI, PokemonFields } from '../../hooks/useGetPokemon';
import { getNestedItemValue } from '../../utils';

interface PokemonInfoCardProps {
	data: PokemonDetailedI;
	pokemonFieldsToShow: PokemonFields[];
}
export const PokemonInfoCard = ({
	data,
	pokemonFieldsToShow,
}: PokemonInfoCardProps) => {
	const classes = useStyles();
	const getValue = useCallback(getNestedItemValue, []);

	return (
		<>
			<div className={classes.root}>
				<div className={classes.avatar}>
					<img
						src={data?.image}
						alt={`${data?.name} image`}
						loading="lazy"
					/>
				</div>
				<div className={classes.pokemonInfo}>
					{pokemonFieldsToShow?.map((field: any) => {
						const value = getValue(data, field?.key);
						return (
							<span key={field.key} className={classes.field}>
								<label>{field.label}</label>
								<span>
									{Array.isArray(value) ? (
										<>{value?.join(', ')}</>
									) : (
										<>{value}</>
									)}
								</span>
							</span>
						);
					})}
				</div>
			</div>
		</>
	);
};

const useStyles = createUseStyles(
	{
		root: {
			borderRadius: '6px',
			boxShadow:
				'1px -3px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
		},
		avatar: {
			display: 'flex',
			textAlign: 'center',
			alignItems: 'center',
			justifyContent: 'center',
			paddingTop: '1em',
			paddingBottom: '1em',
			'& img': {
				boxShadow:
					'1px 5px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
				borderRadius: '50%',
				border: '4px solid #4ef4cb',
				width: 150,
				height: 150,
				transition: 'transform 0.3s ease',
				'&:hover': {
					transform: 'scale(1.25)',
				},
			},
		},
		pokemonInfo: {
			borderTop: '1px solid #cccccc3d',
			padding: '.5em 1em',
			display: 'flex',
			flexDirection: 'column',
			textAlign: 'center',
			justifyContent: 'center',
		},
		field: {
			display: 'flex',
			flexDirection: 'row',
			textAlign: 'left',
			alignItems: 'center',
			justifyContent: 'space-between',
			gap: '1em',
			padding: '0.5em .5em .5em .5em',
			transition: 'background-color 0.3s ease, transform 0.3s ease',
			'&:hover': {
				borderRadius: '.2em',
				backgroundColor: '#1f786242',
				transform: 'scale(1.02)',
			},
			'& label': {
				flex: '1',
				minWidth: '20ch',
			},
			'& span': {
				fontSize: '1.2em',
				fontWeight: '500',
				textAlign: 'right',
			},
		},
	},
	{ name: 'PokemonInfoCard' },
);
