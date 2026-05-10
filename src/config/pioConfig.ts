import type { Live2DModelConfig, SpineModelConfig } from "../types/config";

// Spine 看板娘配置
export const spineModelConfig: SpineModelConfig = {
	// Spine 看板娘开关
	enable: true,

	// Spine模型配置
	model: {
		// Spine模型文件路径
		path: "/pio/models/spine/firefly/1310.json",
		// 模型缩放比例
		scale: 1.0,
		// X轴偏移
		x: 0,
		// Y轴偏移
		y: 0,
	},

	// 位置配置
	position: {
		// 显示位置 bottom-left，bottom-right，top-left，top-right，注意：在右下角可能会挡住返回顶部按钮
		corner: "bottom-left",
		// 距离边缘0px
		offsetX: 0,
		// 距离下边缘0px
		offsetY: 0,
	},

	// 尺寸配置
	size: {
		// 容器宽度
		width: 135,
		// 容器高度
		height: 165,
	},

	// 交互配置
	interactive: {
		// 交互功能开关
		enabled: true,
		// 点击时随机播放的动画列表
		clickAnimations: [
			"emoji_0",
			"emoji_1",
			"emoji_2",
			"emoji_3",
			"emoji_4",
			"emoji_5",
		],
		// 点击时随机显示的文字消息
		clickMessages: [
			"你好呀！我是流萤~",
			"今天也要加油哦！✨",
			"想要一起去看星空吗？🌟",
			"记得要好好休息呢~",
			"有什么想对我说的吗？💫",
			"让我们一起探索未知的世界吧！🚀",
			"每一颗星星都有自己的故事~⭐",
			"希望能带给你温暖和快乐！💖",
			"欲穷千里目，更上一ciallo～(∠・ω< )⌒☆",
			"我欲乘风归去，又恐Ciallo～(∠・ω< )⌒★玉宇",
			"昔人已cia黄鹤去，此地空余黄鹤llo～(∠・ω< )⌒☆",
			"黄沙百战cia金甲，不破llo～(∠・ω< )⌒☆兰终不还",
			"桃花潭水深cia尺，不及汪llo～(∠・ω< )⌒☆送我情",
			"天生我 cia 必有用，千金散尽还复 llo～(∠・ω< )⌒☆",
			"问君能有几多愁，cia似一江春水向东llo~(∠・ω< )⌒☆",
			"飞流直下三 cia 尺，疑是银河 llo 九天～(∠・ω< )⌒☆",
			"而我Cia出如llo～(∠・ω< )⌒☆乾坤撼动",
			"ꀀꀖꀸꁖꁶꂑꂮꃍꃢꄀꄚꄶꅑꅨꅽꆗꆷꇚꇸꈔꉆꉮꊍꊮꋐꋭꌉꌪꏠꏼꐘꐱꑊꑝꑱ",
			"GET不到笑点怎么办?可以POST",
			// ꀂꀘꀺꁘꁸꂓꂰꃏꃤꄂꄜꄸꅓꅪꅿꆙꆹꇜꇺꈖꉈꊏꊰꋒꋯꌋꌬꏢꏾꐚꐳꑌꑟꑳ
			// ꀃꀙꀻꁙꁹꂔꂱꃐꃥꄃꄝꄹꅔꅫꆀꆚꆺꇝꇻꉉꊐꊱꋓꋰꌌꌭꏣꏿꐛꐴꑍꑠꑴ
			// ꀆꀜꀽꁜꁻꂖꂳꃨꄅꄟꄻꅖꅮꆂꆜꆽꇠꇽꈘꈱꉌꉞꉰꊒꊴꋖꋲꌎꌯꏦꐂꐞꐷꑐꑣꑷ
			// ꀇꀝꀾꁝꁼꂗꂴꃩꄆꄠꄼꅯꆃꆝꆾꇡꇾꈙꉍꉟꊓꊵꋗꋳꌏꌰꏧꐃꐟꐸꑑꑤꑸ
			// ꀈꀞꀿꁞꁽꂘꂵꃑꃪꄇꄡꄽꅗꅰꆞꆿꇢꇿꈚꈲꉎꉠꉱꊀꊔꊶꋘꋴꌐꌱꍆꍤꎗꎮꏉ
			// ꀊꀠꁁꁠꁿꂚꂷꃓꃬꄉꄣꄿꅙꅲꆅꆠꇁꇤꈁꈜꈴꉐꉢꉳꊂꊖꊸꋚꋶꌒꌳꍈꍣꍽꎖꎭꏈ
			// ꀋꀡꁂꁡꂀꂛꂸꃔꃭꄊꄤꅀꅚꅳꆆꆡꇂꇥꈂꈝꈵꉑꉣꉴꊃꊗꊹꋛꋷꌓꌴꍉꍤꎗꎮꏉ
			// ꀍꀣꁄꁣꂝꂻꄌꄧꅂꅵꆈꆣꇅꇨꈄꈠꈷꉔꉦꉷꊅꊙꊻꋹꌕꍋꍧꍿꎰꏋꏪꐆꐡꐺꑓꑦꑻ
			// ꀎꀤꁅꁤꂞꂼꄨꅃꆉꆤꇆꇩꈅꈡꈸꉕꉸꊆꊚꊼꌖꍌꍨꎱꏌꏫꐇꐢꑔꑼ
			// ꀏꀥꁆꁥꂁꂟꂽꃮꄍꄩꅄꅛꅶꆊꇇꇪꈆꈢꈹꉖꉧꉹꊛꊽꌗꌵꍐꍬꎃꎵꏐꏬꐈꐣꐻꑕꑧꑽ
		], // 点击时随机显示的文字消息
		messageDisplayTime: 3000, // 文字显示时间（毫秒）
		idleAnimations: ["idle", "emoji_0", "emoji_1", "emoji_3", "emoji_4"], // 待机动画列表
		idleInterval: 8000, // 待机动画切换间隔（8秒）
	},

	// 响应式配置
	responsive: {
		// 在移动端隐藏
		hideOnMobile: true,
		// 移动端断点
		mobileBreakpoint: 768,
	},

	// 层级
	zIndex: 1000, // 层级

	// 透明度
	opacity: 1.0,
};

// Live2D 看板娘配置
export const live2dModelConfig: Live2DModelConfig = {
	// Live2D 看板娘开关
	enable: false,
	// Live2D模型配置
	model: {
		// Live2D模型文件路径
		path: "/pio/models/live2d/snow_miku/model.json",
		// path: "/pio/models/live2d/illyasviel/illyasviel.model.json",
	},

	// 位置配置
	position: {
		// 显示位置 bottom-left，bottom-right，top-left，top-right，注意：在右下角可能会挡住返回顶部按钮
		corner: "bottom-left",
		// 距离边缘0px
		offsetX: 0,
		// 距离下边缘0px
		offsetY: 0,
	},

	// 尺寸配置
	size: {
		// 容器宽度
		width: 135,
		// 容器高度
		height: 165,
	},

	// 交互配置
	interactive: {
		// 交互功能开关
		enabled: true,
		// 点击时随机显示的文字消息，motions 和 expressions 将从模型 JSON 文件中自动读取
		clickMessages: [
			"你好！我是Miku~",
			"有什么需要帮助的吗？",
			"今天天气真不错呢！",
			"要不要一起玩游戏？",
			"记得按时休息哦！",
		],
		// 随机显示的文字消息显示时间（毫秒）
		messageDisplayTime: 3000,
	},

	// 响应式配置
	responsive: {
		// 在移动端隐藏
		hideOnMobile: true,
		// 移动端断点
		mobileBreakpoint: 768,
	},
};
