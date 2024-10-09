export const getNestedItemValue = (obj: any, path: string) => {
  if (path) {
    const pathParts = path?.split('.');
    const result = pathParts?.reduce((acc: any, part: any) => {
      if (acc && acc?.[part] !== undefined) {
        return acc?.[part];
      } else {
        return 'N/A';
      }
    }, obj);

    return result;
  } else {
    return 'N/A';
  }
};
