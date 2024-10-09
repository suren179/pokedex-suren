import { useMemo, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export type PokemonI = {
  id: string;
  name: string;
  number: string;
  types: [string];
  image: string;
};

export type PokemonOption = {
  value: PokemonI['id'];
  label: PokemonI['name'];
};

export const GET_POKEMONS = gql`
  query pokemons($first: Int!) {
    pokemons(first: $first) {
      id
      name
      number
      types
      image
    }
  }
`;

export const useGetPokemons = () => {
  const { data, ...queryRes } = useQuery(GET_POKEMONS, {
    variables: {
      first: 151, // Keep hard coded
    },
  });

  const [searchText, setSearchText] = useState<string>('');

  const filterPokemons = (pokemon: PokemonI) => {
    const nameMatch = pokemon.name
      .toLowerCase()
      .includes(searchText.toLowerCase());
    const typesMatch = pokemon.types.some((type: string) =>
      type.toLowerCase().includes(searchText.toLowerCase()),
    );
    return nameMatch || typesMatch;
  };

  const pokemons: PokemonI[] = useMemo(() => {
    if (!data?.pokemons) return [];
    return data.pokemons.filter(filterPokemons);
  }, [data, filterPokemons, searchText]);

  const pokemonOptions: PokemonOption[] = useMemo(
    () => pokemons.map((p: PokemonI) => ({ value: p.id, label: p.name })),
    [pokemons],
  );

  return {
    pokemons,
    pokemonOptions,
    searchText,
    setSearchText,
    ...queryRes,
  };
};
