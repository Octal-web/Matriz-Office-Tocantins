export const getCookie = (name) => {
    const entry = document.cookie.split('; ').find((cookie) => cookie.startsWith(`${name}=`));
    return entry ? decodeURIComponent(entry.slice(name.length + 1)) : '';
};
