import { QueryResolvers, Resolvers } from './types/types';
import { cities } from './dataSource';
import { getTheDistanceInKms } from './utils';
/**
 * Read the shortest path based on the origin
 * @returns Array of the shortest path - [{id, name, distance, country}]
 */
const readShortestPathData: QueryResolvers['readShortestPath'] = (parent, args) => {
  let index: any = null;

  const continents: any[] = [];
  const mapCitiesContinent: any[] = [];
  const minimumValuePath: any[] = [];
  const response: any = cities;

  Object.keys(response).map((key) => {
    if (!continents.includes(response?.[key]?.['contId'])) {
      continents.push(response?.[key]?.['contId']);
    }
  });
  // map the names -> cities, distance, id with the countries
  for (let i = 0; i < continents.length; i++) {
    mapCitiesContinent.push({
      id: Object.entries(response)
        .filter(([key]) => continents[i] === response?.[key]?.['contId'])
        ?.map((x: any) => x?.[1]?.['id']),
      countryName: continents[i],
      names: Object.entries(response)
        .filter(([key]) => continents[i] === response?.[key]?.['contId'])
        ?.map((x: any) => x?.[1]?.['name']),
      distance: Object.entries(response)
        .filter(([key]) => continents[i] === response?.[key]?.['contId'])
        ?.map((x: any) =>
          getTheDistanceInKms(
            response?.[args.id]?.['location']?.['lat'],
            response?.[args.id]?.['location']?.['lon'],
            response?.[x?.[1]?.['id']]?.['location']?.['lat'],
            response?.[x?.[1]?.['id']]?.['location']?.['lon'],
          ),
        ),
      axis: Object.entries(response)
        .filter(([key]) => continents[i] === response?.[key]?.['contId'])
        ?.map((x: any) => x?.[1]?.['location']),
    });
  }

  for (let j = 0; j < mapCitiesContinent.length; j++) {
    // Find the minimum path based the group of country and cities distance as per the origin
    const min = Math.min(...mapCitiesContinent?.[j]?.['distance']);

    // Find the index of the min value
    index = mapCitiesContinent?.[j]?.['distance']?.indexOf(min);
    // push the min value with the required details for the shortest path
    minimumValuePath.push({
      id: mapCitiesContinent?.[j]?.['id']?.[index],
      name: mapCitiesContinent?.[j]?.['names']?.[index],
      distance: Math.round(mapCitiesContinent?.[j]?.['distance']?.[index]),
      country: continents[j],
      latitude: mapCitiesContinent?.[j]?.['axis']?.[index]?.['lat'],
      longitude: mapCitiesContinent?.[j]?.['axis']?.[index]?.['lon'],
    });
  }

  // sort and return the path
  return minimumValuePath?.sort((r1, r2) => (r1?.['distance'] > r2?.['distance'] ? 1 : r1?.['distance'] < r2?.['distance'] ? -1 : 0));
};

/**
 * Read country info data
 * @returns Array of countryInfo -> {id, name, country}
 */
const readCountryInfoData: QueryResolvers['readCountryInfo'] = () => {
  const response: any = cities;
  const countryInfo: any[] = [];

  // read the country info data
  Object.keys(response).map((key) => {
    countryInfo.push({ id: response?.[key]?.['id'], name: response?.[key]?.['name'], country: response?.[key]?.['countryName'] });
  });
  return countryInfo;
};

/**
 * Resolvers used in GQL endPoint to read the data
 */
const resolvers: Resolvers = {
  Query: {
    readShortestPath: readShortestPathData,
    readCountryInfo: readCountryInfoData,
  },
};

export { resolvers };
