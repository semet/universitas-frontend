export const clearForm = <T extends Object>(data: T) => {
    Object.getOwnPropertyNames(data).forEach((value) => {
        delete data[value as keyof T];
    });
};

export const randomPassword = (
    length = 20,
    wishlist = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz~!@-#$"
) => {
    return Array.from(crypto.getRandomValues(new Uint32Array(length)))
        .map((x) => wishlist[x % wishlist.length])
        .join("");
};
