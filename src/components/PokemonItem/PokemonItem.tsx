import { createUseStyles } from 'react-jss';
import { PokemonI } from '../../hooks/useGetPokemons';

interface PokemonItemProps {
  pkmnData: PokemonI;
  onClick?: Function;
}

export const PokemonItem = ({ pkmnData, onClick }: PokemonItemProps) => {
  const classes = useStyles();

  const handleClick = () => {
    onClick?.(pkmnData?.id);
  };
  return (
    <button className={classes.root} onClick={handleClick} tabIndex={0}>
      <span className={classes.pokemonInfo}>
        <span className={classes.number}>{pkmnData?.number}</span>
        <span className={classes.name}>{pkmnData?.name}</span>
        <span className={classes.types}>{pkmnData?.types.join(', ')}</span>
      </span>

      <img
        className={classes.avatar}
        src={pkmnData?.image}
        alt={`${pkmnData?.name} image`}
        loading="lazy"
      />
    </button>
  );
};

const useStyles = createUseStyles(
  {
    root: {
      background: 'none',
      width: '100%',
      padding: '.5em 1em',
      textAlign: 'left',
      display: 'flex',
      alignItems: 'center',
      gap: '1em',
      justifyContent: 'space-between',
      borderRadius: '.5em',
      cursor: 'pointer',
      border: '1px solid #303848',
      // margin: '1em 0',
      boxSizing: 'border-box',
      overflow: 'auto',
      transition: 'transform 0.3s ease',
      boxShadow:
        '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
      '&:hover': {
        backgroundColor: '#1f7862',
        transition: 'background-color 0.3s ease',
      },
    },
    pokemonInfo: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      gap: '1em',
      justifyContent: 'space-between',
    },
    avatar: {
      width: 56,
      height: 56,
      flex: 'none',
      borderRadius: '50%',
      border: '4px solid #FFFFFF',
    },
    number: {
      width: '5ch',
    },
    name: {
      flex: 1,
      fontWeight: 'bold',
      fontSize: '1.2em',
      wordBreak: 'auto-phrase',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      maxWidth: '25ch',
    },
    types: {
      flex: 1,
      wordBreak: 'auto-phrase',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      maxWidth: '30ch',
    },
    '@media (max-width: 768px)': {
      root: {
        overflow: 'hidden',
      },
      pokemonInfo: {
        flexDirection: 'column',
        overflow: 'unset',
        wordBreak: 'break-word',
        textAlign: 'center',
        gap: '2px',
        alignItems: 'flex-start',
      },
      number: {
        width: 'auto',
      },
      name: {
        maxWidth: '20ch',
      },
      types: {
        maxWidth: '20ch',
      },
    },
    '@media (max-width: 425px)': {
      name: {
        maxWidth: '16ch',
      },
      types: {
        maxWidth: '16ch',
      },
    },
    '@media (max-width: 375px)': {
      name: {
        maxWidth: '12ch',
      },
      types: {
        maxWidth: '12ch',
      },
    },
    '@media (max-width: 320px)': {
      name: {
        maxWidth: '8ch',
      },
      types: {
        maxWidth: '8ch',
      },
    },
  },
  { name: 'PokemonItem' },
);
