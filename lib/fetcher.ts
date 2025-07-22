export const fetcher = async (url: string) => {
    const res = await fetch(url);

    if (res.redirected) return window.location.href = res.url;

    return await res.json();
}

