function getCookie(name) {
    const nameEquals = name + '=';
    const cookieArray = document.cookie.split(';');
    for (let cookie of cookieArray) {
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.slice(1, cookie.length);
        }
        if (cookie.indexOf(nameEquals) === 0)
            return decodeURIComponent(
                cookie.slice(nameEquals.length, cookie.length),
            );
    }
    return null;
}

export default getCookie;