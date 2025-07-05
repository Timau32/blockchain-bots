const getCookie = (name: string) => {
	const matches = document.cookie.match(
		new RegExp(
			'(?:^|; )' +
				name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
				'=([^;]*)',
		),
	);
	return matches ? decodeURIComponent(matches[1]) : '';
};

const setCookie = (name: string, val: string, expires: any) => {
    const expiresOnMiliseconds = expires * 1000;
	const date = new Date();
	date.setDate(date.getTime() + expiresOnMiliseconds);
	document.cookie = `${name}=${val}; path=/; expires=${date.toUTCString()}`;
};

const deleteCookie = (name: string) => {
	document.cookie = `${name}=; max-age=-1; path=/`;
};

export { getCookie, setCookie, deleteCookie };
