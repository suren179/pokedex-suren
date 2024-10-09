import { useMemo, useState, useCallback } from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

export type PokemonDetailedI = {
	id: string;
	name: string;
	number: string;
	types: [string];
	image: string;
	weight: {
		minimum: string;
		maximum: string;
	};
	height: {
		minimum: string;
		maximum: string;
	};
	classification: string;
	resistant: string;
	weaknesses: string;
	fleeRate: string;
	maxCP: string;
	maxHP: string;
};

export type PokemonFields = {
	key: string;
	label: string;
};

const pokemonFieldsToShow: PokemonFields[] = [
	// {
	// 	key: 'name',
	// 	label: 'Name',
	// },
	{
		key: 'types',
		label: 'Types',
	},
	{
		key: 'classification',
		label: 'Classification',
	},
	{
		key: 'height.minimum',
		label: 'Min Height',
	},
	{
		key: 'height.maximum',
		label: 'Max Height',
	},
	{
		key: 'weight.maximum',
		label: 'Max Weight',
	},
	{
		key: 'weight.minimum',
		label: 'Minimum Weight',
	},
	{
		key: 'maxCP',
		label: 'Max CP',
	},
	{
		key: 'maxHP',
		label: 'Max HP',
	},
	{
		key: 'weaknesses',
		label: 'Weaknesses',
	},
	{
		key: 'fleeRate',
		label: 'Flee Rate',
	},
	{
		key: 'resistant',
		label: 'Resistant To',
	},
];

export const GET_POKEMON = gql`
	query pokemon($id: String, $name: String) {
		pokemon(id: $id, name: $name) {
			id
			number
			name
			weight {
				minimum
				maximum
			}
			height {
				minimum
				maximum
			}
			classification
			types
			resistant
			weaknesses
			fleeRate
			maxCP
			maxHP
			image
		}
	}
`;

export const useGetPokemon = (id: string | undefined) => {
	const { data, ...queryRes } = useQuery(GET_POKEMON, {
		variables: {
			id,
		},
	});

	const pokemon: PokemonDetailedI = useMemo(() => {
		if (!data?.pokemon) return null;
		return data.pokemon;
	}, [data]);

	return {
		pokemon,
		pokemonFieldsToShow,
		...queryRes,
	};
};
