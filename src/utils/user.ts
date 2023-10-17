import Taro from "@tarojs/taro";

function checkSession() {
	return new Promise((resolve) => {
		Taro.checkSession({
			success: () => {
				resolve(true);
			},
			fail: () => {
				resolve(false);
			}
		})
	});
}

export function getAuthorizationCode() {
	return new Promise((resolve, reject) => {
		Taro.login({
			success: (res) => {
				if (res.code) resolve(res.code);
				else reject(res);
			},
			fail: (err) => {
				reject(err);
			}
		});
	});
}

export function checkLogin() {
	return new Promise((resolve) => {
		if (Taro.getStorageSync('token')) {
			resolve(true);
			checkSession().then(() => {
				resolve(true);
			}).catch(() => {
				resolve(false);
			});
		} else {
			resolve(false);
		}
	});
}
