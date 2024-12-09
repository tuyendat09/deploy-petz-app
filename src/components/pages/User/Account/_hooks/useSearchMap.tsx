"use client";

const useSearchMap = () => {

  const handleAutoComplete = async (keyword: string) => {
    try {
      const result = await fetch(`https://maps.track-asia.com/api/v1/autocomplete?lang=vi&text=${keyword}&key=public_key`)
      const addresses = await result.json()
      const listAddresses = addresses.features.map((item: {
        geometry: any;
        properties: any; id: any; name: any; 
      }) =>{ 
        return {
          id: item.properties.id,
          label: item.properties.label,
          region: item.properties.region,
          county: item.properties.county,
          lat: item.geometry.coordinates[1],
          lon: item.geometry.coordinates[0],
        };
      });
      return listAddresses
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };
  return { handleAutoComplete };
};


export default useSearchMap;
