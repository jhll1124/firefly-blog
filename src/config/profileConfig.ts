import type { ProfileConfig } from "../types/config";

export const profileConfig: ProfileConfig = {
	// 头像
	avatar: "/assets/images/avatar.jpg",
	// 名字
	name: "洛璃",
	// 个人签名
	bio: "The departure of early spring that means the curtain call of elannesiana.",

	// 链接配置
	// 已经预装的图标集：fa6-brands，fa6-regular，fa6-solid，material-symbols，simple-icons
	// 访问https://icones.js.org/ 获取图标代码，
	// 如果想使用尚未包含相应的图标集，则需要安装它
	// `pnpm add @iconify-json/<icon-set-name>`
	// showName: true 时显示图标和名称，false 时只显示图标
	links: [
		{
			name: "Bilibli",
			icon: "fa6-brands:bilibili",
			url: "https://space.bilibili.com/477982361",
		},
		{
			name: "GitHub",
			icon: "fa6-brands:github",
			url: "https://github.com/jhll1124",
		},
		{
			name: "Discord",
			icon: "fa6-brands:discord",
			url: "https://discord.com/users/1000050069019578568",
		},
		{
			name: "Email",
			icon: "fa6-solid:envelope",
			url: "mailto:loliri1124@gmail.com",
			showName: false,
		},
		{
			name: "Steam",
			icon: "fa6-brands:steam",
			url: "https://steamcommunity.com/id/jhll1124/",
		},
		// {
		// 	name: "Zhihu",
		// 	icon: "fa6-brands:zhihu",
		// 	url: "https://www.zhihu.com/people/25-64-54-38-62",
		// },
		// {
		// 	name: "Pixiv",
		// 	icon: "fa6-brands:pixiv",
		// 	url: "https://www.pixiv.net/users/70434848/bookmarks/artworks",
		// },
		// {
		// 	name: "bsky",
		// 	icon: "fa6-brands:bluesky",
		// 	url: "https://jhll1124.vtubers.social/",
		// },
		// {
		// 	name: "Twitter",
		// 	icon: "fa6-brands:twitter", // Visit https://icones.js.org/ for icon codes
		// 	// You will need to install the corresponding icon set if it's not already included
		// 	// `pnpm add @iconify-json/<icon-set-name>`
		// 	url: "https://x.com/jhll1124",
		// },
		// {
		// 	name: "YouTube",
		// 	icon: "fa6-brands:youtube",
		// 	url: "https://www.youtube.com/@jhll1124",
		// },
	],
};
