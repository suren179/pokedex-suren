import { lazy, Suspense } from 'react';
import { createUseStyles } from 'react-jss';
import { useGetPokemons } from '../../hooks/useGetPokemons';
import { PokemonItem } from '../PokemonItem';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { ErrorMsg } from '../ErrorMsg';
import { Loader } from '../Loader';
import { ROUTES } from '../../constants';
import AutoSizer from 'react-virtualized-auto-sizer';
//@ts-ignore
import { FixedSizeList as List } from 'react-window';

const PokemonInfoDialog = lazy(() =>
  import('../PokemonInfoDialog').then((module) => ({
    default: module.PokemonInfoDialog,
  })),
);

export const PokemonList = () => {
  const { id } = useParams();
  const classes = useStyles();
  const { pokemons, loading, searchText, setSearchText, error } =
    useGetPokemons();

  const navigate = useNavigate();

  const onClick = (id: string) => {
    navigate(`${ROUTES.POKEMON_LIST}/${id}`);
  };
  return (
    <div className={classes.root}>
      <Typography variant="h3" component="h3">
        Pokemons
      </Typography>
      {loading ? (
        <Loader />
      ) : error ? (
        <ErrorMsg message={error?.message} />
      ) : (
        <>
          <div className={classes.filters}>
            <TextField
              id="search"
              variant="outlined"
              color="primary"
              label="Search Pokemon"
              fullWidth
              value={searchText}
              type="search"
              autoFocus
              onChange={(event) => {
                setSearchText(event.target.value);
              }}
            />
          </div>
          <div className={classes.total}>
            {searchText ? <>{'Search Count:'}</> : <>{'Total:'}</>}{' '}
            {pokemons?.length}
          </div>
          {pokemons?.length === 0 ? (
            <div className={classes.notFound}>
              <Typography variant="h4" component="h4">
                No Pokemon matched your search.
                <br></br>
                Try refining your search criteria.
              </Typography>
            </div>
          ) : (
            <div className={classes.listWrapper}>
              <AutoSizer>
                {({ height, width }: any) => {
                  return (
                    <List
                      innerElementType="ul"
                      itemCount={pokemons.length}
                      itemSize={80}
                      height={height}
                      width={width}
                      itemData={pokemons}
                      className={classes.list}
                    >
                      {({ data, index, style }: any) => {
                        return (
                          <li style={style} className={style.listItem}>
                            <PokemonItem
                              pkmnData={data[index]}
                              onClick={onClick}
                            />
                          </li>
                        );
                      }}
                    </List>
                  );
                }}
              </AutoSizer>
            </div>
          )}
        </>
      )}
      {id && (
        <>
          <Suspense fallback={<Loader />}>
            <PokemonInfoDialog />
          </Suspense>
        </>
      )}
    </div>
  );
};

const useStyles = createUseStyles(
  {
    root: {
      width: '100%',
      textAlign: 'center',
      padding: '32px',
      boxSizing: 'border-box',
      minHeight: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    filters: {
      marginTop: '2em',
    },
    total: {
      marginTop: '1em',
      textAlign: 'right',
      fontSize: '1.2em',
      marginBottom: '1em',
    },
    listWrapper: {
      flex: 1,
    },
    list: {
      flex: 1,
      listStyleType: 'none',
      padding: '0px',
    },
    listItem: {},
    error: {
      padding: '2em',
      marginTop: '5em',
      fontSize: '1.5em',
      color: 'red',
    },
    notFound: {
      marginTop: '5em',
    },
  },
  { name: 'PokemonList' },
);
