export const GroupBy = (data: any, ky: string) => {
    let res: any = {};
    data.map((item: any) => {
        if (!res[item[ky]]) {
            res[item[ky]] = [];
        }
        res[item[ky]].push(item);
    })
    return res;
}