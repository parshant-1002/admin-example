// hooks/useAuctionData.ts
import { useState, useCallback } from 'react';
import { useGetAuctionDetailsQuery } from '../../../Services/Api/module/auction';
// import {
//   useGetAuctionDetailsQuery,
//   useUpdateAuctionMutation,
// } from '../../Services/Api/module/auction'; // Adjust imports based on your API setup

export type Item = {
  title: string;
  value: string | number | boolean | Date | any;
  editable?: boolean;
  type: 'string' | 'number' | 'boolean' | 'date' | 'range' | 'dropdown';
  options?: string[]; // For dropdown type
};

export const useAuctionData = (id: string) => {
  const {
    data: auctionDetail,
    isLoading,
    isError,
  } = useGetAuctionDetailsQuery({
    params: { auctionId: id },
  });

//   const [updateAuction] = useUpdateAuctionMutation(); // Hook to handle updating auction data
  const [data, setData] = useState<Item[]>([]);

  // Transform data into Item[] format
  const processData = useCallback(() => {

    if (!auctionDetail || !auctionDetail.data) return [];
    return auctionDetail.data;
    return Object.entries(auctionDetail.data).map(([key, value]) => {
      const type = typeof value;
      let itemType:
        | 'string'
        | 'number'
        | 'boolean'
        | 'date'
        | 'range'
        | 'dropdown' = 'string';
      let options: string[] | undefined;

      // Determine the type of the item
      if (type === 'object' && value instanceof Date) {
        itemType = 'date';
      } else if (type === 'object' && value !== null && !Array.isArray(value)) {
        itemType = 'dropdown';
        // options = Object.keys(value); // Assuming the object keys are the options
      } else if (type === 'object' && Array.isArray(value)) {
        itemType = 'range'; // Example handling for array data (could be adapted)
      } else {
        itemType = type as 'string' | 'number' | 'boolean'; // Default to string, number, or boolean
      }

      return {
        title: key,
        value: value ?? '',
        editable: true, // Default to editable, adjust based on your needs
        type: itemType,
        options, // Add options if applicable
      };
    });
  }, [auctionDetail]);

  const handleValueChange = (
    index: number,
    newValue: string | number | boolean | Date
  ) => {
    const updatedData = [...data];
    updatedData[index].value = newValue;
    setData(updatedData);
  };

  const saveChanges = async () => {
    // Prepare data to be saved
    // const updatedData = data.reduce(
    //   (acc, item) => {
    //     acc[item.title] = item.value;
    //     return acc;
    //   },
    //   {} as Record<string, any>
    // );

    // try {
    // //   await updateAuction({ auctionId: id, data: updatedData });
    //   // Optionally handle success state
    // } catch (error) {
    //   // Optionally handle error state
    //   console.error('Failed to update auction data', error);
    // }
  };

  return {
    isLoading,
    isError,
    data: processData(),
    handleValueChange,
    saveChanges,
  };
};
