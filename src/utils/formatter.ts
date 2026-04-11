export function formatTaskTitle(title:string):string{
    return title.trim().toUpperCase();
}

export function createSlug(title:string):string{
    return title.trim().toLowerCase().replace(/\s+/g, '-');
}
