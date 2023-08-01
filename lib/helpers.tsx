export type TTable = { id: number; name: string; desc: string; link: string,isActive:boolean };
export const generateTableInfos = (tableCount:number): Array<TTable> => {
  let tables: Array<TTable> = [];
  for (let index = 0; index < tableCount; index++) {
      const tableInfo: TTable = {
        id: index + 1,
        name: `Masa ${index + 1}`,
        desc: "Masa açıklaması",
        link: `https://jsonplaceholder.typicode.com/users/${index + 1}`,
        isActive:index == 3 || index === 4
      };

    tables.push(tableInfo);
  }
  return tables;
};
