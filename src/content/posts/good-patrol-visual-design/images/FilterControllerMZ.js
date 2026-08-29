//=============================================================================
// FilterControllerMZ.js
// ----------------------------------------------------------------------------
// Copyright (c) 2020 Tsukimi. All rights reserved.
// 
// This work is licensed under the terms of the MIT license.  
// For a copy, see <https://opensource.org/licenses/MIT>.
// ----------------------------------------------------------------------------
// Version
// 1.1.0 2020/09/05 add new filter-target "ExcludeSpecificChar/Picture"
//                  functionality: variables and random assignment to target-id
// 0.9.1 2020/08/30 Fix some small bugs
// 0.9.0 2020/08/25 FilterController MZ version
//=============================================================================

/*:ja
 * @target MZ
 * 
 * @plugindesc FilterControllerMZ
 * @author Tsukimi
 * 
 * @param decimalVariable
 * @text 変数に小数点が使えるようにする
 * @desc ONにすると、変数に小数点が使えるようになる。
 * 小数点は四桁以下四捨五入。
 * @type boolean
 * @default true
 * 
 * @param displacementImage
 * @text Displacement画像名
 * @desc 画像サイズを 2 のべき乗にして、img/pictures/ に入れてください。(512x512, 1024x1024など)
 * @type file
 * @dir img/pictures/
 * @default DisplacementMap
 * 
 * @param enabledAll-Settings
 * @text 全体非表示ON/OFF設定
 * 
 * @param enabledAll-ShowInOptionMenu
 * @text オプションメニューに表示する
 * @parent enabledAll-Settings
 * @desc 「フィルター全体非表示」のON/OFFを
 * ゲーム内のオプションメニューから設定出来るようにする
 * @type boolean
 * @default false
 * 
 * @param enabledAll-Text
 * @text オプションメニュー文言
 * @parent enabledAll-Settings
 * @desc ゲーム内オプションでのフィルター全体非表示ON/OFFの文言
 * @default フィルター効果
 * 
 * @param enabledAll-DefaultValue
 * @text 全体非表示の初期値
 * @parent enabledAll-Settings
 * @desc フィルター全体非表示の初期値
 * @type boolean
 * @on 全体表示
 * @off 全体非表示
 * @default true
 * 
 * @help
 * 画面エフェクトの詰め合わせ
 * 作者：ツキミ
 * 説明：
 * 　pixi内蔵の画面エフェクトをコントロールしやすくするためのプラグインです。
 * 
 * エフェクト適用対象（コピペ用）
 * ──────────────────
 * 全画面　　　　　　　　　：FullScreen
 * 全画面（ウィンドウ含む）：FullScreenWithWindow
 * タイル＆全キャラ　　　　：TileAndChars
 * タイル＆全キャラ＆背景　：TileAndCharsAndParallax
 * タイル　　　　　　　　　：Tile
 * タイル＆背景　　　　　　：TileAndParallax
 * 背景　　　　　　　　　　：Parallax
 * 全キャラ　　　　　　　　：Chars
 * 特定キャラ（id）　　　　：SepcificChar
 * 特定キャラ以外（id）　　：ExcludeSepcificChar
 * 全ピクチャ　　　　　　　：Pictures
 * 特定ピクチャ（id）　　　：SpecificPicture
 * 特定ピクチャ以外（id）　：ExcludeSpecificPicture
 * 
 * 
 * プラグインコマンド一覧
 * ──────────────────
 * ▶ フィルター作成
 * ▶ フィルター削除
 * ▶ フィルター非表示
 * ▶ フィルターパラメータ設定
 * ▶ フィルターパラメータ移動
 * ▶ フィルターパラメータ連続移動
 * ▶ フィルターパラメータ連続移動クリア
 * ▶ フィルター移動後自動削除
 * ▶ フィルター更新速度設定
 * ▶ 全フィルター削除
 * ▶ フィルター全体非表示設定
 * 
 * 各フィルターパラメータや適用対象設定には数値以外、
 * 変数代入やランダムもできます。
 * 　v1      ：変数１を代入
 * 　r0.5~1.5：0.5と1.5の間にランダム
 * 　r0.5~v1 ：0.5と変数１の間にランダム
 * 　rv1~v2　：変数１と変数２の間にランダム
 * 
 * 
 * マップタグ、イベントタグ
 * ──────────────────
 * マップ進入時に自動的にフィルターを作成するタグ設定。
 * ここで設定されたフィルターはマップを出ると削除される。
 * マップ・イベントのメモ欄に所定の書式で記入してください。
 * 
 *  <Filter:識別名,フィルター名,適用対象(,適用対象id)>
 *    - 基本的にcreateFilterと同じ。
 *       マップのメモ欄に記入すると画面(screen)依存に、
 *       イベントのメモ欄に記入するとイベント依存になる。
 * 　適用対象は上記の英字をコピペして使ってください。
 * 
 *   例: <Filter:日差し,godray,TileAndCharsAndParallax>
 *       <Filter:ねじれ,twist,SpecificChar,-1>
 * 
 * 
 *   <SetFilter:識別名,[該当フィルターのパラメータ...]>
 *    - setFilterと同じ。
 *      上の<Filter>で作ったフィルターを設定する時に使う。
 * 
 *   例: <Filter:日差し,godray,FullScreen>
 *   　  <SetFilter:日差し,-30,0.5,2.5,1>
 * 
 * 
 *   <SetFilterSpeed:識別名,変化スピード>
 *    - setFilterSpeedと同じ。
 *      上の<Filter:...>で作ったフィルターを設定する時に使う。
 * 
 *   例: <Filter:日差し,godray,FullScreen>
 *   　  <SetFilterSpeed:日差し,0.03>
 * 
 * 
 * 
 * 
 * @command createFilter
 * @text フィルター作成
 * @desc フィルターを作成するコマンド
 * 
 * @arg filterId
 * @text フィルター識別名
 * @desc 好きに付ける識別名。作成したフィルターを調整・削除する時に使う
 * 
 * @arg filterType
 * @text エフェクト種類
 * @desc フィルターエフェクトの種類
 * @type select
 * 
 * @option adjustment
 * @option ascii
 * @option bevel
 * @option bloom
 * @option blur
 * @option bulgepinch
 * @option crosshatch
 * @option crt
 * @option displacement
 * @option dot
 * @option emboss
 * @option glitch
 * @option glow
 * @option godray
 * @option godray-np
 * @option motionblur
 * @option noise
 * @option oldfilm
 * @option pixelate
 * @option radialblur
 * @option reflection-m
 * @option reflection-w
 * @option rgbsplit
 * @option shockwave
 * @option tiltshift
 * @option twist
 * @option zoomblur
 * 
 * @arg filterTarget
 * @text 適用対象
 * @desc フィルターの適用対象。
 * @type select
 * 
 * @option 全画面
 * @value FullScreen
 * @option 全画面（ウィンドウ含む）
 * @value FullScreenWithWindow
 * @option タイル＆全キャラ
 * @value TileAndChars
 * @option タイル＆全キャラ＆背景
 * @value TileAndCharsAndParallax
 * @option タイル
 * @value Tile
 * @option タイル＆背景
 * @value TileAndParallax
 * @option 背景
 * @value Parallax
 * @option 全キャラ
 * @value Chars
 * @option 特定キャラ(id)
 * @value SepcificChar
 * @option 特定キャラ以外(id)
 * @value ExcludeSepcificChar
 * @option 全ピクチャ
 * @value Pictures
 * @option 特定ピクチャ(id)
 * @value SpecificPicture
 * @option 特定ピクチャ以外(id)
 * @value ExcludeSpecificPicture
 * 
 * @arg targetIds
 * @text 適用対象id
 * @desc 適用対象が特定のイベント / ピクチャの時のid番号。（複数可）
 * それ以外は空欄のままにしてください
 * @type string[]
 * @default []
 * 
 * @arg positionReferenceTargetId
 * @text 位置参照対象
 * @desc 位置参照（追従）。 空欄=画面。数字=イベント(>0)、このイベント(=0)、自キャラ(<0)。screen=画面（このマップのみ）
 * 
 * 
 * 
 * @command eraseFilter
 * @text フィルター削除
 * @desc フィルターを削除するコマンド
 * 
 * @arg filterId
 * @text フィルター識別名
 * @desc フィルターの名前
 * 
 * 
 * @command enableFilter
 * @text フィルター非表示
 * @desc フィルターを非表示/再度表示するコマンド
 * 
 * @arg filterId
 * @text フィルター識別名
 * @desc 非表示にするフィルターの名前
 * 
 * @arg activeness
 * @text 表示状態
 * @type boolean
 * @on 表示
 * @off 非表示
 * @default false
 * 
 * 
 * @command setFilter
 * @text フィルターパラメータ設定
 * @desc フィルターのパラメータを設定するコマンド
 * 
 * @arg filterId
 * @text フィルター識別名
 * @desc フィルターの名前
 * 
 * @arg filterParameters
 * @text フィルターパラメータ
 * @desc フィルターのパラメータ
 * @type string[]
 * @default []
 * 
 * 
 * @command moveFilter
 * @text フィルターパラメータ移動
 * @desc パラメータのアニメーションを設定する
 * 
 * @arg filterId
 * @text フィルター識別名
 * @desc フィルターの名前
 * 
 * @arg filterParameters
 * @text フィルターパラメータ
 * @desc フィルターのパラメータ
 * @type string[]
 * @default []
 * 
 * @arg duration
 * @text 時間
 * @desc アニメーションの時間
 * @type string
 * @default 1
 * 
 * 
 * @command moveFilterQ
 * @text フィルターパラメータ連続移動
 * @desc パラメータの一連のアニメーションを設定する。Q = キュー
 * 
 * @arg filterId
 * @text フィルター識別名
 * @desc フィルターの名前
 * 
 * @arg filterParameters
 * @text フィルターパラメータ
 * @desc フィルターのパラメータ
 * @type string[]
 * @default []
 * 
 * @arg duration
 * @text 時間
 * @desc アニメーションの時間
 * @type string
 * @default 1
 * 
 * @command clearMoveFilterQ
 * @text フィルターパラメータ連続移動クリア
 * @desc 設定されたパラメータの一連のアニメーションをクリアする
 * 
 * @arg filterId
 * @text フィルター識別名
 * @desc フィルターの名前
 * 
 * 
 * @command eraseFilterAfterMove
 * @text フィルター移動後自動削除
 * @desc アニメーション終了後自動削除する
 * 
 * @arg filterId
 * @text フィルター識別名
 * @desc フィルターの名前
 * 
 * 
 * @command setFilterSpeed
 * @text フィルター更新速度設定
 * @desc 更新速度を設定する（一部アニメーションのあるフィルター向け）
 * 
 * @arg filterId
 * @text フィルター識別名
 * @desc フィルターの名前
 * 
 * @arg filterSpeed
 * @text 速度
 * @desc アニメーションの速度
 * 
 * @command eraseAllFilter
 * @text 全フィルター削除
 * @desc 全部のフィルターを削除するコマンド
 * 
 * @command ----------------
 * @desc -----
 * 
 * @command globalEnableFilter
 * @text フィルター全体非表示
 * @desc フィルター全体を表示/非表示するコマンド。個別の非表示状態とお互い干渉しません。
 * 
 * @arg activeness
 * @text 表示状態
 * @type boolean
 * @on 全体表示
 * @off 全体非表示
 * @default false
 */

/*:
 * @target MZ
 * 
 * @plugindesc FilterControllerMZ
 * @author Tsukimi
 * 
 * @param decimalVariable
 * @text Use Decimal in Variables
 * @desc allow decimal when using game variables or not.
 * precision to 3 decimal digits.(0.001)
 * @type boolean
 * @default true
 * 
 * @param displacementImage
 * @text DisplacementMap image name
 * @desc name of displacement map image. Make the image Power of 2, 
 * and put under img/pictures/ folder.(like 512x512, 1024x1024)
 * 
 * @default DisplacementMap
 * 
 * @param global-enable Settings
 * @text globally enable filter settings
 * 
 * @param enabledAll-ShowInOptionMenu
 * @text Show in Option Menu
 * @parent enabledAll-Settings
 * @desc Show "Filter Effects Enabled" in Option Menu
 * @type boolean
 * @default false
 * 
 * @param enabledAll-Text
 * @text In Option-Menu Text
 * @parent enabledAll-Settings
 * @desc text of global-enableness option in option menu
 * @default Filter Effects Enabled
 * 
 * @param enabledAll-DefaultValue
 * @text default enableness
 * @parent enabledAll-Settings
 * @desc default value of global-enableness
 * @type boolean
 * @on enable
 * @off disable
 * @default true
 * 
 * @help
 * *** pixi-filter Controller
 * Author: Tsukimi
 * This plugin is a controller, to control pixi-filters,
 * making fancy screen effects.
 * 
 * effect targets (for copy&paste when writing tags)
 * ──────────────────
 * FullScreen
 * FullScreenWithWindow
 * TileAndChars
 * TileAndCharsAndParallax
 * Tile
 * TileAndParallax
 * Parallax
 * Chars
 * SepcificChar
 * ExcludeSepcificChar
 * Pictures
 * SpecificPicture
 * ExcludeSpecificPicture
 * 
 * 
 * all plugin commands
 * ──────────────────
 * ▶ createFilter
 * ▶ eraseFilter
 * ▶ enableFilter
 * ▶ setFilter        (setting filter parameters)
 * ▶ moveFilter       (same)
 * ▶ moveFilterQueue
 * ▶ clearMoveFilterQueue
 * ▶ eraseFilterAfterMove
 * ▶ setFilterSpeed
 * ▶ eraseAllFilter
 * ▶ globalEnableFilter
 * 
 * Besides numbers, you can also set parameter/target-id
 * by variable or random between two numbers.
 * 　v1       ：set as variable#1
 * 　r0.5~1.5 ：random between 0.5 and 1.5
 * 　r0.5~v1  ：random between 0.5 and variable#1
 * 　rv1~v2　 ：random between variable #1 and #2
 * 
 * 
 * *** Map Tags/Event Tags:
 * ──────────────────
 * 　<Filter:[id],[filterType],[filter-target-type](,[target-id])>
 * 　　Basically same as createfilter.
 * 　　Creating filter when entering map.
 * 　　<pos-ref id> will be set to the eventID/screen.
 * 
 * 　　example:
 * 　　　<Filter:GODRAY#1,godray,0>
 * 
 * 
 * 　<SetFilter:[id],[filter parameters ...]>
 * 　　Basically same as setfilter.
 * 　　Set the parameter created by <Filter:...>.
 * 
 * 　　example:
 * 　　　<Filter:GODRAY#1,godray,0>
 * 　　　<SetFilter:GODRAY#1,-30,0.5,2.5,1>
 * 
 * 
 * 　<SetFilterSpeed:[id],[speed]>
 * 　　Basically same as setfilterSpeed.
 * 　　Set the parameter created by <Filter:...>.
 * 
 * 　　example:
 * 　　　<Filter:GODRAY#1,godray,0>
 * 　　　<SetFilterSpeed:GODRAY#1,0.03>
 * 
 * 
 * 
 * 
 * @command createFilter
 * @desc command to create filter.
 * 
 * @arg filterId
 * @desc the name when adjusting and erasing filters. choose a good name!
 * 
 * @arg filterType
 * @desc the type of filter.
 * @type select
 * 
 * @option adjustment
 * @option ascii
 * @option bevel
 * @option bloom
 * @option blur
 * @option bulgepinch
 * @option crosshatch
 * @option crt
 * @option displacement
 * @option dot
 * @option emboss
 * @option glitch
 * @option glow
 * @option godray
 * @option godray-np
 * @option motionblur
 * @option noise
 * @option oldfilm
 * @option pixelate
 * @option radialblur
 * @option reflection-m
 * @option reflection-w
 * @option rgbsplit
 * @option shockwave
 * @option tiltshift
 * @option twist
 * @option zoomblur
 * 
 * @arg filterTarget
 * @desc the target(s) the filter is applied to.
 * @type select
 * 
 * @option FullScreen
 * @value FullScreen
 * @option FullScreenWithWindow
 * @value FullScreenWithWindow
 * @option TileAndChars
 * @value TileAndChars
 * @option TileAndCharsAndParallax
 * @value TileAndCharsAndParallax
 * @option Tile
 * @value Tile
 * @option TileAndParallax
 * @value TileAndParallax
 * @option Parallax
 * @value Parallax
 * @option Chars
 * @value Chars
 * @option SepcificChar
 * @value SepcificChar
 * @option ExcludeSepcificChar
 * @value ExcludeSepcificChar
 * @option Pictures
 * @value Pictures
 * @option SpecificPicture
 * @value SpecificPicture
 * @option ExcludeSpecificPicture
 * @value ExcludeSpecificPicture
 * 
 * @arg targetIds
 * @desc when choosed "SpecificChar/Picture", specify the event/picture(s) id here. (multiple OK)
 * @type string[]
 * @default []
 * 
 * @arg positionReferenceTargetId
 * @text Position Reference Target Id
 * @desc position reference. (blank):screen  -1:player  0:this event  1~:event#id  screen:screen (this map only)
 * 
 * 
 * 
 * @command eraseFilter
 * @desc command to erase a filter.
 * 
 * @arg filterId
 * @desc the filter id you choosed.
 * 
 * 
 * @command enableFilter
 * @desc enable/disable filter renderring.
 * 
 * @arg filterId
 * @desc the filter id you choosed.
 * 
 * @arg activeness
 * @type boolean
 * @on enabled
 * @off disabled
 * @default false
 * 
 * 
 * @command setFilter
 * @desc set filter's parameter
 * 
 * @arg filterId
 * @desc the filter id you choosed.
 * 
 * @arg filterParameters
 * @desc the filter parameters.
 * @type string[]
 * @default []
 * 
 * 
 * @command moveFilter
 * @desc set filter's parameter movement.
 * 
 * @arg filterId
 * @desc the filter id you choosed.
 * 
 * @arg filterParameters
 * @desc the filter parameters.
 * @type string[]
 * @default []
 * 
 * @arg duration
 * @desc movement duration.
 * @type string
 * @default 1
 * 
 * 
 * @command moveFilterQ
 * @text moveFilterQueue
 * @desc Set a sequence of parameter-movement. Q = Queue
 * 
 * @arg filterId
 * @desc the filter id you choosed.
 * 
 * @arg filterParameters
 * @desc the filter parameters.
 * @type string[]
 * @default []
 * 
 * @arg duration
 * @desc movement duration.
 * @type string
 * @default 1
 * 
 * @command clearMoveFilterQ
 * @desc clear the movement queue.
 * 
 * @arg filterId
 * @desc the filter id you choosed.
 * 
 * 
 * @command eraseFilterAfterMove
 * @desc when set, will auto erase filter after all movement is done.
 * 
 * @arg filterId
 * @desc the filter id you choosed.
 * 
 * 
 * @command setFilterSpeed
 * @desc set the animation speed.(only works for filter with animations)
 * 
 * @arg filterId
 * @desc the filter id you choosed.
 * 
 * @arg filterSpeed
 * @desc animation speed
 * 
 * @command eraseAllFilter
 * @desc erase all filter.
 * 
 * @command ----------------
 * @desc -----
 * 
 * @command globalEnableFilter
 * @desc set the global enableness of filters. Note this won't overwrite each filter's own enableness.
 * 
 * @arg activeness
 * @type boolean
 * @on enabled
 * @off disabled
 * @default false
 */

//=============================================================================
// Filter_Controller
//
// The Controller class for a filter.
//=============================================================================
function Filter_Controller() {
	this.initialize.apply(this, arguments);
};
 
(function() {
	"use strict";
	
	//=======================
	//  Plugin parameter reading
	//=======================
	
	const pluginName = 'FilterControllerMZ';
	const getParamString = function(paramNames) {
		if (!Array.isArray(paramNames)) paramNames = [paramNames];
		for (let i = 0; i < paramNames.length; i++) {
			const name = PluginManager.parameters(pluginName)[paramNames[i]];
			if (name) return name;
		}
		return null;
	};
	const getParamBoolean = function(paramNames) {
		const value = getParamString(paramNames);
		return (value || '').toUpperCase() === 'TRUE';
	};
	
	if (getParamBoolean("decimalVariable")) {
		
		const _Game_Variables_setValue = Game_Variables.prototype.setValue;
		Game_Variables.prototype.setValue = function(variableId, value) {
			if (variableId > 0 && variableId < $dataSystem.variables.length) {
				if (typeof value === 'number') {
					value = Math.round(value * 1000 + 0.0000001) / 1000;
					this._data[variableId] = value;
					this.onChange();
				}
				else _Game_Variables_setValue.apply(this, arguments);
			}
		};
	}
	
	let TKMDisplacementMap = getParamString('displacementImage') || '';
	
	//=======================
	// PluginManager
	//  プラグインコマンドを追加定義します。
	//=======================
	
	PluginManager.registerCommand(pluginName, "createFilter", function(args) {
		const filterId = String(args.filterId);
		const filterType = String(args.filterType);
		const filterTarget = args.filterTarget;
		const filterTargetIds = parseTargetIdArray(args.targetIds, this);
		const posRefTargetId = parseFilterPosRefId(args.positionReferenceTargetId, this);
		$gameMap.createFilter(filterId, filterType, filterTarget, filterTargetIds, posRefTargetId);
	});

	const parseTargetIdArray = function(idTextArrayText, interpreter) {
		if (idTextArrayText == "" || idTextArrayText == null) return null;

		const idTextArray = JSON.parse(idTextArrayText), targetIdArray = [];
		for (let i = 0; i < idTextArray.length; i++) {
			const num = parseNumberOrDefault(idTextArray[i], true);
			const id = parseTargetId(num, interpreter);
			if (id != null) {
				targetIdArray.push(id);
			}
		}
		return targetIdArray;
	 }
	 
	const parseTargetId = function(idText, interpreter) {
		if (idText === "" || idText == null) return null;
		let id = Number(idText);
		if (isNaN(id)) return null;

		if (id != 0) return id;
		// id=0: map_this-event / battle_subject
		if (!$gameParty.inBattle()) return (interpreter._eventId || 0);
		let sub = BattleManager._subject, index = 0;
		if (sub) {
			index = $gameTroop.members().indexOf(sub);
			if (index >= 0) {
				index = -(index+1);
			} else {
				index = $gameParty.members().indexOf(sub);
				if (index < 0) index = 0;
				else index++;
			}
			/*
			if (subject.isActor()) {
				id = subject.actorId();
			} else {
				id = (subject.index());
			}
			*/
		}
		return index;
	};

	const parseFilterPosRefId = function(text, interpreter) {
		if (text === "") return null;
		if (text === "screen") return 0; // 0 = filter-on-screen
		const num = parseNumberOrDefault(text, true);
		return parseTargetId(num, interpreter);
	}

	PluginManager.registerCommand(pluginName, "setFilter", args => {
		const filterId = String(args.filterId);
		const filterParams = parseFilterParams(JSON.parse(args.filterParameters));
		$gameMap.setFilter(filterId, filterParams);
	});

	PluginManager.registerCommand(pluginName, "enableFilter", args => {
		const filterId = String(args.filterId);
		const activeness = parseBoolean(args.activeness);
		$gameMap.enableFilter(filterId, activeness);
	});

	PluginManager.registerCommand(pluginName, "moveFilter", args => {
		const filterId = String(args.filterId);
		const filterParams = parseFilterParams(JSON.parse(args.filterParameters));
		const duration = parseNumberOrDefault(args.duration, true) || 1;
		$gameMap.moveFilter(filterId, filterParams, duration);
	});

	PluginManager.registerCommand(pluginName, "moveFilterQ", args => {
		const filterId = String(args.filterId);
		const filterParams = parseFilterParams(JSON.parse(args.filterParameters));
		const duration = parseNumberOrDefault(args.duration, true) || 1;
		$gameMap.moveFilterQueue(filterId, filterParams, duration);
	});

	PluginManager.registerCommand(pluginName, "clearMoveFilterQ", args => {
		const filterId = String(args.filterId);
		$gameMap.clearMoveFilterQueue(filterId);
	});

	PluginManager.registerCommand(pluginName, "eraseFilter", args => {
		const filterId = String(args.filterId);
		$gameMap.eraseFilter(filterId);
	});

	PluginManager.registerCommand(pluginName, "eraseFilterAfterMove", args => {
		const filterId = String(args.filterId);
		$gameMap.eraseFilterAfterMove(filterId);
	});

	PluginManager.registerCommand(pluginName, "setFilterSpeed", args => {
		const filterId = String(args.filterId);
		const filterSpeed = parseNumberOrDefault(args.filterSpeed) || 0;
		$gameMap.setFilterAddiTime(filterId, filterSpeed);
	});

	PluginManager.registerCommand(pluginName, "eraseAllFilter", args => {
		$gameMap.eraseAllFilter();
	});

	PluginManager.registerCommand(pluginName, "globalEnableFilter", args => {
		const activeness = parseBoolean(args.activeness);
		Filter_Controller.enabledAll = activeness;
		// ConfigManager will save Filter_Controller.enabledAll 
		ConfigManager.save();
	});
	
	// string -> number / undefined
	function parseNumberOrDefault(string, isInteger) {
		if (string == null || string === '' || string === 'x') return null;

		isInteger = !!isInteger;
		string = string.replace(' ', '');

		if (string[0] === 'v') {
			const varId = Number(string.slice(1)) || 0;
			const num = $gameVariables.value(varId);
			if (isNaN(num) || num == null) return null;
			if (isInteger) return Math.round(num);
			else return num;
		}
		if (string[0] === 'r') {
			let numPair = string.slice(1).split('~');
			// typo saving
			if (numPair.length < 2) numPair = string.slice(1).split('-'); 
			let min = parseNumberOrDefault(numPair[0]) || 0, 
				max = parseNumberOrDefault(numPair[1]) || 0;
			if (min > max) {
				let temp = min; min = max; max = temp;
			}
			if (isInteger) return Math.floor((Math.random() * (max + 1 - min) + min));
			else return (Math.random() * (max - min) + min);
		}
		const num = Number(string);
		if (isNaN(num) || num == null) return null;
		if (isInteger) return Math.round(num);
		return num;
	};
	
	function parseBoolean(string) {
		return (string || '').toUpperCase() === 'TRUE';
	};
	
	// resultArray:parameters
	// undefined parts are unused parts
	function parseFilterParams(array) {
		let resultArray = [];
		for (let i = 0; i < array.length; i++) {
			resultArray.push(parseNumberOrDefault(array[i]));
		}
		return resultArray;
	};
	
	//=======================
	// Filter_Controller
	// The Controller class for a filter.
	//=======================
	
	// Filter_Controller static parameters defenition
	// ------------

	Filter_Controller.targetType = {};
	Filter_Controller.targetType["None"] = "None";
	Filter_Controller.targetType["FullScreen"] = "FullScreen";
	Filter_Controller.targetType["FullScreenWithWindow"] = "FullScreenWithWindow";
	Filter_Controller.targetType["TileAndChars"] = "TileAndChars";
	Filter_Controller.targetType["TileAndCharsAndParallax"] = "TileAndCharsAndParallax";
	Filter_Controller.targetType["Tile"] = "Tile";
	Filter_Controller.targetType["TileAndParallax"] = "TileAndParallax";
	Filter_Controller.targetType["Parallax"] = "Parallax";
	Filter_Controller.targetType["Chars"] = "Chars";
	Filter_Controller.targetType["SepcificChar"] = "SepcificChar";
	Filter_Controller.targetType["ExcludeSepcificChar"] = "ExcludeSepcificChar";
	Filter_Controller.targetType["Pictures"] = "Pictures";
	Filter_Controller.targetType["SpecificPicture"] = "SpecificPicture";
	Filter_Controller.targetType["ExcludeSpecificPicture"] = "ExcludeSpecificPicture";

	Filter_Controller.filterSpecialInit = {};
	const _FSInit = Filter_Controller.filterSpecialInit;
	_FSInit["oldfilm"]    = function(filter) {
		filter.vignetting = 0;
		filter.vignettingAlpha = 0;
		filter.vignettingBlur = 0;
		filter.scratch = 0.7;
	};
	_FSInit["godray-np"] = function(filter) {
		filter.parallel = false;
	};
	_FSInit["crt"]    = function(filter) {
		filter.vignetting = 0;
		filter.vignettingAlpha = 0;
		filter.vignettingBlur = 0;
	};
	_FSInit["reflection-m"] = function(filter) {
		filter.mirror = true;
	};
	_FSInit["reflection-w"] = function(filter) {
		filter.mirror = false;
	};
	_FSInit["motionblur"] = function(filter) {
		filter.kernelSize = 7;
	};
	
	Filter_Controller.defaultFilterParam = {};
	const _defaultParam = Filter_Controller.defaultFilterParam;
	_defaultParam["bulgepinch"]     = [0,0,0,1];
	_defaultParam["radialblur"]     = [0,0,0,0,9];
	_defaultParam["godray"]         = [30,0.5,2.5,1.0];
	_defaultParam["ascii"]          = [8];
	_defaultParam["crosshatch"]     = [];
	_defaultParam["dot"]            = [5,1];
	_defaultParam["emboss"]         = [5];
	_defaultParam["shockwave"]      = [0,0,-1,30,160,1];
	_defaultParam["twist"]          = [0,0,0,4];
	_defaultParam["zoomblur"]       = [0,0,0,0.1];
	_defaultParam["noise"]          = [0.5];
	_defaultParam["blur"]           = [8];
	_defaultParam["oldfilm"]        = [0.5,0.15,0.3];
	_defaultParam["rgbsplit"]       = [0,0];
	_defaultParam["bloom"]          = [8,1,0.5,1];
	_defaultParam["godray-np"]      = [0,0,0.5,2.5,1.0];
	_defaultParam["adjustment"]     = [1,1,1,1,1,1,1,1];
	_defaultParam["pixelate"]       = [1,1];
	_defaultParam["crt"]            = [1,3,0.3,0.2,1];
	_defaultParam["reflection-m"]   = [0.5, 0,20, 30,100, 1,1];
	_defaultParam["reflection-w"]   = [0.5, 0,20, 30,100, 1,1];
	_defaultParam["motionblur"]     = [0,0];
	_defaultParam["glow"]           = [0,4,255,255,255];
	_defaultParam["displacement"]   = [1,1,20];
	_defaultParam["bevel"]          = [0,3,0.7,0.7];
	_defaultParam["tiltshift"]      = [0,312,816,312,30,450];
	_defaultParam["glitch"]         = [10,100,0,0,0];

	// 後に設定する
	Filter_Controller.updateFilterHandler = {};
	Filter_Controller.filterNameMap = {};

	Filter_Controller.enabledAll = getParamBoolean("enabledAll-DefaultValue");
	
	Filter_Controller.targetGetter = {};

	// Filter_Controller instance functions definition
	// ****************************************************
	
	Filter_Controller.prototype.initialize = function(filterName, id, targetType, targetIds, posRefCharId, mapId) {
		this.initBasic(id, targetType, targetIds, posRefCharId, mapId);
		this.initFilterParam(filterName);
		this.resetTarget();
	};

	Filter_Controller.prototype.initBasic = function(id, targetType, targetIds, posRefCharId, mapId) {
		this._filterType = "";
		this._erase = false;
		this._eraseAfterMove = false;
		this._moveQueue = [];
		this._time = 0;
		this._addiTime = 0;
		this._id = id;
		this._targetType = targetType;
		if (Filter_Controller.targetType[this._targetType] == null) {
			this._targetType = Filter_Controller.targetType.None;
		}
		this._targetIds = targetIds;
		this._posRefCharId = posRefCharId;
		this._posRefCharMapId = mapId;
		this.currentParams = null;
		this.targetParams = null;
		
		this.enabled = true;
	};
	
	Filter_Controller.prototype.initFilterParam = function(filterName) {
		this._filterType = filterName.toLowerCase();
		let defaultParam = Filter_Controller.defaultFilterParam[this._filterType];
		if (!defaultParam) {
			this._filterType = "";
			this._erase = true;
			this.currentParams = [];
			return;
		}
		this.currentParams = defaultParam.slice(); // fast array copy
		switch (this._filterType) {
			case "godray":
			case "godray-np":
				this._addiTime = 0.01;
				break;

			case "shockwave":
				this._addiTime = 0.01;
				break;

			case "oldfilm":
				this._addiTime = 1;
				break;

			case "noise":
				this._addiTime = 1;
				break;

			case "crt":
				this._addiTime = 0.25;
				break;

			case "reflection-m":
			case "reflection-w":
				this._addiTime = 0.1;
				break;
		}
	};

	Filter_Controller.prototype.resetTarget = function() {
		this.targetParams = this.currentParams.slice(); // fast array copy
		this._duration = 0;
	};
	
	Filter_Controller.prototype.createFilter = function() {
		let filter = null;
		let filterClass = Filter_Controller.filterNameMap[this._filterType];
		if (typeof(filterClass) === 'function') {
			if (filterClass === PIXI.filters.DisplacementFilter)
				filter = this.createDisplacement();
			else
				filter = new filterClass();
			filter._controller = this;
		}
		// special settings for filter
		let spInit = Filter_Controller.filterSpecialInit[this._filterType];
		if (!!spInit) {
			spInit.call(this, filter);
		}
		return filter;
	};
	
	Filter_Controller.prototype.createDisplacement = function() {
		if (!SceneManager._scene._TKMDisplacementMap) {
			SceneManager._scene._TKMDisplacementMap = new Sprite(ImageManager.loadPicture(TKMDisplacementMap));
			SceneManager._scene.addChild(SceneManager._scene._TKMDisplacementMap);
		}
		const f = new PIXI.filters.DisplacementFilter(SceneManager._scene._TKMDisplacementMap);
		return f;
	};

	Filter_Controller.prototype.update = function() {
		this.updateMove();
		this.checkErase();
	};

	Filter_Controller.prototype.updateMove = function() {
		if (this._duration <= 0) {
			if (this._moveQueue.length > 0) {
				let targetData = this._moveQueue.shift();
				this.move(targetData[0], targetData[1]);
			}
			else if (this._eraseAfterMove) this.erase();
		}
		if (this._duration > 0) {
			let d = this._duration, cp = this.currentParams, tp = this.targetParams;
			for (let i = 0; i < cp.length; i++) {
				cp[i] = (cp[i] * (d - 1) + tp[i]) / d;
			}
			this._duration--;
		}
		this._time += this._addiTime;
	};

	Filter_Controller.prototype.checkErase = function() {
		if (typeof(this._posRefCharId) === "number") {
			if ( this._posRefCharMapId >= 0 && !this.isOnCurrentMap() ) {
				// don't auto-erase filters on player
				if(this._posRefCharId >= 0)
					this.erase();
			}
			else if (!this._posRefCharMapId && !$gameParty.inBattle()) {
				this.erase();
			}
		}
	};
	
	//=======================
	//  updateFilter_Handler
	//  function handler of updating actual filter object. cp=current parameter
	//=======================
	
	const _updateFilterHandler = Filter_Controller.updateFilterHandler;
	
	_updateFilterHandler["bulgepinch"] = function(filter, cp) {
		const loc = this.getCharLoc();
		filter.center = [ (loc[0] + cp[0]) / Graphics.width , (loc[1] + cp[1]) / Graphics.height];
		filter.radius   = cp[2];
		filter.strength = cp[3];
		filter.padding = Math.min(Graphics.height* 0.5, cp[2])* 0.5;
	};
	
	_updateFilterHandler["radialblur"] = function(filter, cp) {
		const loc = this.getCharLoc();
		filter.center = [ (loc[0] + cp[0]), (loc[1] + cp[1]) ];
		filter.radius = cp[2];
		filter.angle = cp[3];
		filter.kernelSize = Math.round(cp[4]);
	};
	
	_updateFilterHandler["godray"] = function(filter, cp) {
		filter.angle = cp[0];
		filter.gain = cp[1];
		filter.lacunarity = cp[2];
		filter.strength = cp[3];
		filter.time = this._time;
	};
	
	_updateFilterHandler["ascii"] = function(filter, cp) {
		filter.size = cp[0];
	};
	
	_updateFilterHandler["crosshatch"] = function(filter, cp) {
	};
	
	_updateFilterHandler["dot"] = function(filter, cp) {
		filter.angle = cp[0];
		filter.scale = cp[1];
	};
	
	_updateFilterHandler["emboss"] = function(filter, cp) {
		filter.strength = cp[0];
	};
	
	_updateFilterHandler["shockwave"] = function(filter, cp) {
		const loc = this.getCharLoc();
		filter.center = [ (loc[0] + cp[0]), (loc[1] + cp[1]) ];
		filter.radius = cp[2];
		filter.amplitude = cp[3];
		filter.wavelength = cp[4];
		filter.brightness = cp[5];
		filter.time = this._time;
		if (this._time > 10) this.erase(); // 必要ある？
	};
	
	_updateFilterHandler["twist"] = function(filter, cp) {
		const loc = this.getCharLoc();
		filter.offset = new Float32Array([ (loc[0] + cp[0]), (loc[1] + cp[1]) ]);
		filter.radius = cp[2];
		filter.angle = cp[3];
	};
	
	_updateFilterHandler["zoomblur"] = function(filter, cp) {
		const loc = this.getCharLoc();
		filter.center = [ (loc[0] + cp[0]), (loc[1] + cp[1]) ];
		filter.innerRadius = cp[2];
		filter.strength = cp[3];
	};
	
	_updateFilterHandler["noise"] = function(filter, cp) {
		filter.noise = cp[0];
		if (this._time > 1) {
			filter.seed = Math.random()*3;
			this._time = 0;
		}
	};
	
	_updateFilterHandler["blur"] = function(filter, cp) {
		filter.blur = cp[0];
	};
	
	_updateFilterHandler["oldfilm"] = function(filter, cp) {
		filter.sepia = cp[0];
		filter.noise = cp[1];
		filter.scratchDensity = cp[2];
		if (this._time > 1) {
			filter.seed = Math.random();
			this._time = 0;
		}
	};
	
	_updateFilterHandler["rgbsplit"] = function(filter, cp) {
		let r = cp[0], sita = cp[1];
		filter.red = [r*Math.sin(Math.PI/180*sita), r*Math.cos(Math.PI/180*sita)];
		sita += 120;
		filter.green = [r*Math.sin(Math.PI/180*sita), r*Math.cos(Math.PI/180*sita)];
		sita += 120;
		filter.blue = [r*Math.sin(Math.PI/180*sita), r*Math.cos(Math.PI/180*sita)];
	};

	
	_updateFilterHandler["bloom"] = function(filter, cp) {
		filter.blur = cp[0]
		filter.bloomScale = cp[1];
		filter.threshold = cp[2];
		filter.brightness = cp[3];
	};
	
	_updateFilterHandler["godray-np"] = function(filter, cp) {
		const loc = this.getCharLoc();
		filter.center = new Point(loc[0] + cp[0]), (loc[1] + cp[1]);
		filter.gain = cp[2];
		filter.lacunarity = cp[3];
		filter.strength = cp[4];
		filter.time = this._time;
	};
	
	_updateFilterHandler["adjustment"] = function(filter, cp) {
		filter.gamma = cp[0];
		filter.saturation = cp[1];
		filter.contrast = cp[2];
		filter.brightness = cp[3];
		filter.red = cp[4];
		filter.green = cp[5];
		filter.blue = cp[6];
		filter.alpha = cp[7];
	};
	
	_updateFilterHandler["pixelate"] = function(filter, cp) {
		filter.size = [cp[0], cp[1]];
	};
	
	_updateFilterHandler["crt"] = function(filter, cp) {
		filter.curvature = cp[0];
		filter.lineWidth = cp[1];
		filter.lineContrast = cp[2];
		filter.noise = cp[3];
		filter.noiseSize = cp[4];

		filter.seed = Math.random()*3;
		filter.time = this._time;
	};
	
	const ref = function(filter, cp) {
		const loc = this.getCharLoc();
		filter.boundary = cp[0] + loc[1] / Graphics.height;
		filter.amplitude = [cp[1], cp[2]];
		filter.waveLength = [cp[3], cp[4]];
		filter.alpha = [cp[5], cp[6]];

		filter.time = this._time;
	};
	_updateFilterHandler["reflection-m"] = ref;
	_updateFilterHandler["reflection-w"] = ref;
	
	_updateFilterHandler["motionblur"] = function(filter, cp) {
		filter.velocity = [cp[0], cp[1]];
	};
	
	_updateFilterHandler["glow"] = function(filter, cp) {
		filter.innerStrength = cp[0];
		filter.outerStrength = cp[1];
		// r,g,b to number(0x); ~~ is faster than floor()
		filter.color = (~~cp[2])*65536 + (~~cp[3])*256 + (~~cp[4]);
	};
	
	_updateFilterHandler["displacement"] = function(filter, cp) {
		filter.maskSprite.x += cp[0];
		filter.maskSprite.y += cp[1];
		filter.scale.x = filter.scale.y = cp[2];
		filter.maskSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
	};
	
	_updateFilterHandler["bevel"] = function(filter, cp) {
		filter.rotation = cp[0];
		filter.thickness = cp[1];
		filter.lightAlpha = cp[2];
		filter.shadowAlpha = cp[3];
	};
	
	_updateFilterHandler["tiltshift"] = function(filter, cp) {
		filter.start = new Point(cp[0], cp[1]);
		filter.end = new Point(cp[2], cp[3]);
		filter.blur = cp[4];
		filter.gradientBlur = cp[5];
	};
	
	_updateFilterHandler["glitch"] = function(filter, cp) {
		filter.slices = Math.round(cp[0]);
		filter.offset = cp[1];
		filter.direction = cp[2];
		let r = cp[3], sita = cp[4];
		filter.red = [r*Math.sin(Math.PI/180*sita), r*Math.cos(Math.PI/180*sita)];
		sita += 120;
		filter.green = [r*Math.sin(Math.PI/180*sita), r*Math.cos(Math.PI/180*sita)];
		sita += 120;
		filter.blue = [r*Math.sin(Math.PI/180*sita), r*Math.cos(Math.PI/180*sita)];
	};
	
	//=======================
	//  updateFilter_Handler
	//  END!!
	//=======================

	Filter_Controller.prototype.updateFilter = function(filter) {
		filter.enabled = Filter_Controller.enabledAll && this.enabled;
		
		const handler = Filter_Controller.updateFilterHandler[this._filterType];
		if (typeof(handler) !== "function") return;
		handler.apply(this, [filter, this.currentParams]);
	};
	
	Filter_Controller.prototype.set = function(target) {
		this.clearMoveQueue();
		let cp = this.currentParams;
		for (let i = 0; i < cp.length; i++) {
			cp[i] = typeof(target[i]) === "number" ? target[i] : cp[i];
		}
		this.resetTarget();
	};
	
	Filter_Controller.prototype.enable = function(enabled) {
		this.enabled = enabled;
	};

	Filter_Controller.prototype.move = function(target, duration) {
		this.resetTarget();
		let tp = this.targetParams;
		for (let i = 0; i < tp.length; i++) {
			tp[i] = typeof(target[i]) === "number" ? target[i] : tp[i];
		}
		this._duration = duration;
	};

	Filter_Controller.prototype.moveQueue = function(target, duration) {
		this._moveQueue.push(arguments);
	};

	Filter_Controller.prototype.clearMoveQueue = function() {
		this._moveQueue = [];
	};

	Filter_Controller.prototype.erase = function() {
		this._erase = true;
	};

	Filter_Controller.prototype.isErased = function() {
		return this._erase;
	};

	Filter_Controller.prototype.eraseAfterMove = function() {
		this._eraseAfterMove = true;
	};

	Filter_Controller.prototype.isOnCurrentMap = function() {
		return this._posRefCharMapId === $gameMap.mapId();
	};
	
	Filter_Controller.prototype.isMapEventOnly = function() {
		return ( !!this._posRefCharId && !!this._posRefCharMapId );
	};
	
	Filter_Controller.prototype.isBattleOnly = function() {
		return ( !!this._posRefCharId && !this._posRefCharMapId );
	};

	Filter_Controller.prototype.setAddiTime = function(time) {
		this._addiTime = time || 0;
	};
	
	Filter_Controller.prototype.getCharLoc = function() {
		if (!this._posRefCharId) return [0,0]; // no specified character
		if (!!this._posRefCharMapId) { // search event screen Loc
			if (this._posRefCharId < 0) return [$gamePlayer.screenX(), $gamePlayer.screenY()];
			else {
				let char = $gameMap.event(this._posRefCharId);
				if (char) return [char.screenX(), char.screenY()];
			}
		}
		else { // search Battler screen X
			if (!$gameParty.inBattle()) return [0,0];
			let char;
			if (this._posRefCharId < 0) char = BattleManager._spriteset._enemySprites[-this._posRefCharId-1];
			else char = BattleManager._spriteset._actorSprites[this._posRefCharId-1];
			if (char) return [char.x, char.y];
		}
		return [0,0];
	};

	//=======================
	// Game_Map
	// filter creating.
	//=======================

	const _Game_Map_initialize = Game_Map.prototype.initialize;
	Game_Map.prototype.initialize = function() {
		_Game_Map_initialize.apply(this, arguments);
		this._filterConArr = [];
	};

	Game_Map.prototype.createFilter = function(id, filter, targetType, targetIds, posRefTargetId) {
		const lastFilterIndex = this._filterConArr.findIndex(fc => fc._id == id);
		if (lastFilterIndex >= 0) {
			this._filterConArr[lastFilterIndex].erase();
			this._filterConArr.splice(lastFilterIndex, 1);
		}
		let mapId = typeof(posRefTargetId) === "number" && !$gameParty.inBattle() ? this.mapId() : null;
		const fc = new Filter_Controller( filter, id, targetType, targetIds, posRefTargetId, mapId);
		this._filterConArr.push(fc);
	};

	// this is called by $gameScreen!!!
	// this is called by $gameScreen!!! (second time)
	Game_Map.prototype.updateFilterConArr = function() {
		this._filterConArr = this._filterConArr.filter(FC => !FC.isErased());
		this._filterConArr.forEach(function(FC) {
			if (FC.isMapEventOnly() && $gameParty.inBattle()) return;
			FC.update();
		});
	};
	
	Game_Map.prototype.getFilterController = function(id) {
		return this._filterConArr.find(fc => fc._id == id);
	};

	Game_Map.prototype.setFilter = function(id, target) {
		const filterController = this.getFilterController(id);
		if (filterController) {
			filterController.set(target || []);
			return true;
		}
		return false;
	};

	Game_Map.prototype.enableFilter = function(id, enabled) {
		const filterController = this.getFilterController(id);
		if (filterController) {
			filterController.enable(enabled);
			return true;
		}
		return false;
	};

	Game_Map.prototype.moveFilter = function(id, target, d) {
		const filterController = this.getFilterController(id);
		if (filterController) {
			filterController.clearMoveQueue();
			filterController.move(target || [], d || 1);
			return true;
		}
		return false;
	};

	Game_Map.prototype.moveFilterQueue = function(id, target, d) {
		const filterController = this.getFilterController(id);
		if (filterController) {
			filterController.moveQueue(target || [], d || 1);
			return true;
		}
		return false;
	};

	Game_Map.prototype.clearMoveFilterQueue = function(id) {
		const filterController = this.getFilterController(id);
		if (filterController) {
			filterController.clearMoveQueue();
			return true;
		}
		return false;
	};

	Game_Map.prototype.eraseFilter = function(id) {
		const filterController = this.getFilterController(id);
		if (filterController) {
			filterController.erase();
			return true;
		}
		return false;
	};

	Game_Map.prototype.eraseFilterAfterMove = function(id) {
		const filterController = this.getFilterController(id);
		if (filterController) {
			filterController.eraseAfterMove();
			return true;
		}
		return false;
	};

	Game_Map.prototype.setFilterAddiTime = function(id, time) {
		const filterController = this.getFilterController(id);
		if (filterController) {
			filterController.setAddiTime(time);
			return true;
		}
		return false;
	};

	Game_Map.prototype.eraseAllFilter = function() {
		this._filterConArr.forEach(fc => fc.erase());
		return true;
	};

	//=======================
	// Game_Screen
	//=======================
	
	const _Game_Screen_update = Game_Screen.prototype.update;
	Game_Screen.prototype.update = function(sceneActive) {
		_Game_Screen_update.apply(this, arguments);
		$gameMap.updateFilterConArr();
	};
	
	//=======================
	// DataManager
	//  拡張するプロパティを定義します。
	//---------------------------------------------------
 	// (C)2020 Triacontane
	// This software is released under the MIT License.
 	// http://opensource.org/licenses/mit-license.php
	//=======================

	const _DataManager_extractMetadata = DataManager.extractMetadata;
	DataManager.extractMetadata = function(data) {
		_DataManager_extractMetadata.apply(this, arguments);
		this.extractMetadataArray(data);
	};

	DataManager.extractMetadataArray = function(data) {
		const re = /<([^<>:]+)(:?)([^>]*)>/g;
		data.metaArray = {};
		let match = true;
		while (match) {
			match = re.exec(data.note);
			if (match) {
				const metaName = match[1];
				data.metaArray[metaName] = data.metaArray[metaName] || [];
				data.metaArray[metaName].push(match[2] === ':' ? match[3] : true);
			}
		}
	};

	const _DataManager_correctDataErrors = DataManager.correctDataErrors;
	DataManager.correctDataErrors = function() {
		_DataManager_correctDataErrors.apply(this, arguments);
		// savedata compatibility
		if ($gameMap._filterConArr == null) {
			$gameMap._filterConArr = [];
		}
	};

	//=======================
	// Game_Map
	//  note-tag filter creating.
	//=======================
	const _Game_Map_setup = Game_Map.prototype.setup;
	Game_Map.prototype.setup = function(mapId) {
		_Game_Map_setup.apply(this, arguments);
		this.setupTKMFiltersFromNote();
	};

	Game_Map.prototype.setupTKMFiltersFromNote = function() {
		if ($dataMap.metaArray === undefined) return;

		let fArray = $dataMap.metaArray.Filter;
		if (!fArray) return;
		for (let i = 0; i < fArray.length; i++) {
			let f = fArray[i].split(',');
			let id = f[0];
			let filterType = f[1];
			let targetType = f[2].replace(' ', '');
			let targetId = parseTargetId(f[3]);
            // var targetObj = parseInt(f[2]) || 0;
			let posRefTargetId = 0;
			this.createFilter(id, filterType, targetType, [targetId], posRefTargetId);
		}
		let fSetArray = $dataMap.metaArray.SetFilter;
		if (!fSetArray) return;
		for (let i = 0; i < fSetArray.length; i++) {
			let f = fSetArray[i].split(',');
			const id = f[0];
			this.setFilter( id , parseFilterParams(f.slice(1)) );
		}
		fSetArray = $dataMap.metaArray.SetFilterSpeed; 
		if (!fSetArray) return;
		for (let i = 0; i < fSetArray.length; i++) {
			let f = fSetArray[i].split(',');
			const id = f[0], speed = Number(f[1]) || 0.01;
			const fc = this.getFilterController(id);
			if (fc) {
				this.setFilterAddiTime(id, speed);
			}
		}
	};
	
	//=======================
	// Game_Event
	//  note-tag filter creating.
	//=======================
	
	const _Game_Event_initialize = Game_Event.prototype.initialize;
	Game_Event.prototype.initialize = function(mapId, eventId) {
		_Game_Event_initialize.apply(this, arguments);
		this.setupTKMFiltersFromNote();
	};

	Game_Event.prototype.setupTKMFiltersFromNote = function() {
		if (this.event().metaArray === undefined) return;

		let fArray = this.event().metaArray.Filter;
		if (!fArray) return;
		for (let i = 0; i < fArray.length; i++) {
			let f = fArray[i].split(',');
			let id = f[0];
			let filterType = f[1];
			let targetType = f[2].replace(' ', '');
			let targetId = parseTargetId(f[3]);
			//var targetObj = parseInt(f[2]) || 0;
			//if (targetObj === 4000) targetObj += this._eventId;
			let posRefTargetId = this._eventId;
			$gameMap.createFilter(id, filterType, targetType, [targetId], posRefTargetId);
		}
		let fSetArray = this.event().metaArray.SetFilter;
		if (!fSetArray) return;
		for (let i = 0; i < fSetArray.length; i++) {
			let f = fSetArray[i].split(',');
			const id = f[0];
			$gameMap.setFilter( id , parseFilterParams(f.slice(1)) );
		}
		fSetArray = this.event().metaArray.SetFilterSpeed; 
		if (!fSetArray) return;
		for (let i = 0; i < fSetArray.length; i++) {
			let f = fSetArray[i].split(',');
			const id = f[0], speed = Number(f[1]) || 0.01;
			const fc = $gameMap.getFilterController(id);
			if (fc) {
				$gameMap.setFilterAddiTime(id , speed);
			}
		}
	};
	
	// セーブデータの読み込み
	// 生成時と同じ形でデータがcontentsに入っているので、変数に格納する
	const extractSaveContents = DataManager.extractSaveContents;
	DataManager.extractSaveContents = function(contents) {
		extractSaveContents.call(this, contents);
		// 下方支援
		if (contents._map_filterConArray) {
			let filterControllerArray = [];
			for (let i = 0; i < contents._map_filterConArray.length; i++) {
				filterControllerArray.push(contents._map_filterConArray[i][0]);
			}
			$gameMap._filterConArr = filterControllerArray;
		}
	};
	
	//=======================
	// Scene_******
	//  拡張するプロパティを定義します。 filterConを観測してfilterを作ります。
	//=======================
	
	const _Scene_Base_initialize = Scene_Base.prototype.initialize;
	Scene_Base.prototype.initialize = function() {
		_Scene_Base_initialize.apply(this, arguments);
		this._TKMFilters = [];
	};

	const _fullScreenTargetTypes = [
		Filter_Controller.targetType.FullScreen,
		Filter_Controller.targetType.FullScreenWithWindow,
		Filter_Controller.targetType.TileAndChars,
		Filter_Controller.targetType.TileAndCharsAndParallax,
		Filter_Controller.targetType.Tile,
		Filter_Controller.targetType.TileAndParallax,
		Filter_Controller.targetType.Parallax,
	];
	
	Scene_Base.prototype.applyTKMFilterToTarget = function(filter) {
		const Type = Filter_Controller.targetType;
		let targetType = filter._controller._targetType;
		let targetIds = filter._controller._targetIds;
		let targets = this.getTKMFilterObj(targetType, targetIds);
		for (let i = 0; i < targets.length; i++) {
			const target = targets[i];
			if (!target) continue;
			let arr = target.filters || [];
			arr.push(filter);
			target.filters = arr;
			
			 // tilemap use special rendering; needs manual area setting
			if (_fullScreenTargetTypes.includes(targetType)) {
				const margin = 0;
				const width = Graphics.width + margin * 2;
				const height = Graphics.height + margin * 2;
				target.filterArea = new Rectangle(-margin, -margin, width, height);
			}
		}
	};

	Scene_Base.prototype.removeTKMFilterFromTarget = function(filter) {
		let targetType = filter._controller._targetType;
		let targetIds = filter._controller._targetIds;
		let targets = this.getTKMFilterObj(targetType, targetIds);
		for (let i = 0; i < targets.length; i++) {
			let target = targets[i];
			if (!target) continue;
			let arr = target.filters || [];
			let index = arr.indexOf(filter);
			if (index >= 0) arr.splice(index, 1);
			target.filters = arr;
		}
	};

	Scene_Base.prototype.getTKMFilterObj = function(targetType, targetIds) {
		let typeTargetGetter = Filter_Controller.targetGetter[targetType];
		if (typeof(typeTargetGetter) !== "function") {
			console.warn("指定された適用対象タイプが存在していない。大・小文字 / 書き間違いにご注意ください");
			console.warn("The specified target type does not exist. Is there any upper-lower cases mismatch or typos?");
			return [];
		}

		return typeTargetGetter.call(this, targetIds);
	}

	// defenition of each TargetType's target
	{
		const Type = Filter_Controller.targetType;
		const targetGetter = Filter_Controller.targetGetter;

		targetGetter[Type.FullScreen] = function(targetIds) {
			const targets = [];
			if (this._spriteset) {
				targets.push(this._spriteset);
			}
			return targets;
		};

		targetGetter[Type.FullScreenWithWindow] = function(targetIds) {
			const targets = [];
			targets.push(this);
			return targets;
		};

		targetGetter[Type.TileAndChars] = function(targetIds) {
			const targets = [];
			if (this._spriteset && this._spriteset._tilemap) {
				targets.push(this._spriteset._tilemap);
			}
			return targets;
		};

		targetGetter[Type.TileAndCharsAndParallax] = function(targetIds) {
			const targets = [];
			if (this._spriteset && this._spriteset._baseSprite) {
				targets.push(this._spriteset._baseSprite);
			}
			return targets;
		};

		targetGetter[Type.Tile] = function(targetIds) {
			const targets = [];
			if (this._spriteset && this._spriteset._tilemap
				&& this._spriteset._tilemap._lowerLayer) {
				targets.push(this._spriteset._tilemap._lowerLayer);
				targets.push(this._spriteset._tilemap._upperLayer);
			}
			return targets;
		};

		targetGetter[Type.TileAndParallax] = function(targetIds) {
			const targets = [];
			if (this._spriteset && this._spriteset._tilemap) {
				targets.push(this._spriteset._tilemap._lowerLayer);
				targets.push(this._spriteset._tilemap._upperLayer);
				targets.push(this._spriteset._parallax);
			}
			return targets;
		};

		targetGetter[Type.Parallax] = function(targetIds) {
			const targets = [];
			if (this._spriteset) {
				targets.push(this._spriteset._parallax);
			}
			return targets;
		};

		targetGetter[Type.Chars] = function(targetIds) {
			const targets = [];
			if (this._spriteset) {
				this._spriteset._characterSprites.forEach(sprite => targets.push(sprite));
			}
			return targets;
		};

		targetGetter[Type.SepcificChar] = function(targetIds) {
			const targets = [];
			if (!this._spriteset) return targets;
			if (!this._spriteset._characterSprites) return targets;

			const charSprites = this._spriteset._characterSprites;
			const defaultArrLength = _defaultCharSpriteArrayLength();
			targetIds.forEach(targetId => {
				targets.push(_getCharSpriteById(charSprites, targetId, defaultArrLength));
			});
			return targets;
		};

		targetGetter[Type.ExcludeSepcificChar] = function(targetIds) {
			if (!this._spriteset) return [];
			if (!this._spriteset._characterSprites) return [];

			const charSprites = this._spriteset._characterSprites;
			const defaultArrLength = _defaultCharSpriteArrayLength();
			const targets = charSprites.clone();
			targetIds.forEach(targetId => {
				const charSprite = _getCharSpriteById(charSprites, targetId, defaultArrLength);
				const index = targets.indexOf(charSprite);
				if (index >= 0) {
					targets.splice(index, 1);
				}
			});
			return targets;
		};

		targetGetter[Type.Pictures] = function(targetIds) {
			const targets = [];
			if (this._spriteset) {
				targets.push(this._spriteset._pictureContainer);
			}
			return targets;
		};

		targetGetter[Type.SpecificPicture] = function(targetIds) {
			const targets = [];
			if (!this._spriteset) return targets;
			if (!this._spriteset._pictureContainer) return targets;

			const picContainer = this._spriteset._pictureContainer.children;
			targetIds.forEach(targetId => {
				let picId = $gameScreen.realPictureId(targetId);
				if (picContainer[picId-1]) targets.push(picContainer[picId-1]);
			});
			return targets;
		};

		targetGetter[Type.ExcludeSpecificPicture] = function(targetIds) {
			if (!this._spriteset) return [];
			if (!this._spriteset._pictureContainer) return [];

			const picContainer = this._spriteset._pictureContainer.children;
			const targets = picContainer.clone();
			targetIds.forEach(targetId => {
				let picId = $gameScreen.realPictureId(targetId);
				if (picContainer[picId-1]) {
					const index = targets.indexOf(picContainer[picId-1]);
					if (index >= 0) {
						targets.splice(index, 1);
					}
				}
			});
			return targets;
		};
	}
	
	const _defaultCharSpriteArrayLength = function() {
		return $gameMap.events().length + $gameMap.vehicles().length 
			+ $gamePlayer.followers()._data.length + 1; //player
	}

	const _getCharSpriteById = function(charSprites, id, length) {
		if (length == null) length = charSprites.length;

		if (id < 0) {
			if (charSprites[length+id]) return charSprites[length+id];
		}
		else if (id > 0) {
			const maybeTarget = charSprites[id-1];
			if (maybeTarget && maybeTarget._character && 
				maybeTarget._character.eventId() === id) {
				return maybeTarget;
			} else {
				let target = charSprites.find(sprite_char => 
					sprite_char._character 
					&& sprite_char._character._eventId === id);
				if (target) return target;
			}
		}
		return null;
	}
	
	const _Scene_Map_updateMain = Scene_Map.prototype.updateMain;
	Scene_Map.prototype.updateMain = function() {
		_Scene_Map_updateMain.apply(this, arguments);
		this.updateTKMfilters();
	};
	
	Scene_Map.prototype.updateTKMfilters = function() {
		// erase -> 削除
		this._TKMFilters = this._TKMFilters.filter(filter => {
			const erased = filter._controller.isErased();
			if (erased) {this.removeTKMFilterFromTarget(filter)}
			return !erased;
		}, this);
		// 存在しない -> 作成
		// TODO: dirty flag?
		$gameMap._filterConArr.forEach(fc => {
			if (fc.isErased()) return;
			if (!this._TKMFilters.some(f => f._controller == fc)) {
				let filter = fc.createFilter();
				this._TKMFilters.push(filter);
				this.applyTKMFilterToTarget(filter);
			}
		}, this);
		// update filter parameter
		this._TKMFilters.forEach(filter => {
			filter._controller.updateFilter(filter);
		});
	};
	
	const _Scene_Battle_update = Scene_Battle.prototype.update;
	Scene_Battle.prototype.update = function() {
		_Scene_Battle_update.apply(this, arguments);
		this.updateTKMfilters();
	};
	
	Scene_Battle.prototype.updateTKMfilters = function() {
		// erase
		this._TKMFilters = this._TKMFilters.filter(filter => {
			const erased = filter._controller.isErased();
			if (erased) this.removeTKMFilterFromTarget(filter);
			return !erased;
		}, this);
		// create
		$gameMap._filterConArr.forEach(fc => {
			if (!this._TKMFilters.some(f => f._controller == fc)) {
				let filter = fc.createFilter();
				this._TKMFilters.push(filter);
				this.applyTKMFilterToTarget(filter);
			}
		});
		// update
		this._TKMFilters.forEach(filter => {
			if (filter._controller.isMapEventOnly()) return;
			filter._controller.updateFilter(filter);
		});
	};
	

	// Tilemap.Layer.render の先祖帰り！
	Tilemap.Layer.prototype._render = Tilemap.Layer.prototype.render;
	Tilemap.Layer.prototype.render = PIXI.Container.prototype.render;
	
	//=======================
	// Window_Options
	//  拡張するプロパティを定義します。
	//=======================

	const _showInOptionMenu = getParamBoolean("enabledAll-ShowInOptionMenu");
	const _optionMenuText = getParamString("enabledAll-Text");

	if (_showInOptionMenu) {
		const _Window_Options_makeCommandList = Window_Options.prototype.makeCommandList;
		Window_Options.prototype.makeCommandList = function() {
			_Window_Options_makeCommandList.apply(this, arguments);
			this.addTKMFilterOptions();
		};
	
		Window_Options.prototype.addTKMFilterOptions = function() {
			this.addCommand(_optionMenuText, 'TKMFilterEnabledAll');
		};
	}
	
	Object.defineProperty(ConfigManager, 'TKMFilterEnabledAll', {
		get: function() {
			return !!Filter_Controller.enabledAll;
		},
		set: function(value) {
			Filter_Controller.enabledAll = !!value;
		},
		configurable: true
	});
	
	const _ConfigManager_makeData = ConfigManager.makeData;
	ConfigManager.makeData = function() {
		const config = _ConfigManager_makeData.apply(this, arguments);
		config.TKMFilterEnabledAll = this.TKMFilterEnabledAll;
		return config;
	};

	const _ConfigManager_applyData = ConfigManager.applyData; 
	ConfigManager.applyData = function(config) {
		_ConfigManager_applyData.apply(this, arguments);
		if (config['TKMFilterEnabledAll'] === undefined) { // 初回読み込み？
			this.TKMFilterEnabledAll = Filter_Controller.enabledAll;
		} 
		else
			this.TKMFilterEnabledAll = this.readFlag(config, 'TKMFilterEnabledAll');
	};

})();


// pixi tiltshift filter RPG Maker fixing:
// this.uniforms.texSize = new PIXI.Point(1024,1024);

/*!
 * pixi-filters - v3.1.0
 * Compiled Wed, 11 Mar 2020 20:38:18 UTC
 *
 * pixi-filters is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
var __filters=function(e,t,n,r,o,i,l,s){"use strict";var a="attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}",u="varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform float gamma;\nuniform float contrast;\nuniform float saturation;\nuniform float brightness;\nuniform float red;\nuniform float green;\nuniform float blue;\nuniform float alpha;\n\nvoid main(void)\n{\n    vec4 c = texture2D(uSampler, vTextureCoord);\n\n    if (c.a > 0.0) {\n        c.rgb /= c.a;\n\n        vec3 rgb = pow(c.rgb, vec3(1. / gamma));\n        rgb = mix(vec3(.5), mix(vec3(dot(vec3(.2125, .7154, .0721), rgb)), rgb, saturation), contrast);\n        rgb.r *= red;\n        rgb.g *= green;\n        rgb.b *= blue;\n        c.rgb = rgb * brightness;\n\n        c.rgb *= c.a;\n    }\n\n    gl_FragColor = c * alpha;\n}\n",c=function(e){function t(t){e.call(this,a,u),Object.assign(this,{gamma:1,saturation:1,contrast:1,brightness:1,red:1,green:1,blue:1,alpha:1},t)}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.apply=function(e,t,n,r){this.uniforms.gamma=Math.max(this.gamma,1e-4),this.uniforms.saturation=this.saturation,this.uniforms.contrast=this.contrast,this.uniforms.brightness=this.brightness,this.uniforms.red=this.red,this.uniforms.green=this.green,this.uniforms.blue=this.blue,this.uniforms.alpha=this.alpha,e.applyFilter(this,t,n,r)},t}(t.Filter),f=a,h="\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform vec2 uOffset;\n\nvoid main(void)\n{\n    vec4 color = vec4(0.0);\n\n    // Sample top left pixel\n    color += texture2D(uSampler, vec2(vTextureCoord.x - uOffset.x, vTextureCoord.y + uOffset.y));\n\n    // Sample top right pixel\n    color += texture2D(uSampler, vec2(vTextureCoord.x + uOffset.x, vTextureCoord.y + uOffset.y));\n\n    // Sample bottom right pixel\n    color += texture2D(uSampler, vec2(vTextureCoord.x + uOffset.x, vTextureCoord.y - uOffset.y));\n\n    // Sample bottom left pixel\n    color += texture2D(uSampler, vec2(vTextureCoord.x - uOffset.x, vTextureCoord.y - uOffset.y));\n\n    // Average\n    color *= 0.25;\n\n    gl_FragColor = color;\n}",p="\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform vec2 uOffset;\nuniform vec4 filterClamp;\n\nvoid main(void)\n{\n    vec4 color = vec4(0.0);\n\n    // Sample top left pixel\n    color += texture2D(uSampler, clamp(vec2(vTextureCoord.x - uOffset.x, vTextureCoord.y + uOffset.y), filterClamp.xy, filterClamp.zw));\n\n    // Sample top right pixel\n    color += texture2D(uSampler, clamp(vec2(vTextureCoord.x + uOffset.x, vTextureCoord.y + uOffset.y), filterClamp.xy, filterClamp.zw));\n\n    // Sample bottom right pixel\n    color += texture2D(uSampler, clamp(vec2(vTextureCoord.x + uOffset.x, vTextureCoord.y - uOffset.y), filterClamp.xy, filterClamp.zw));\n\n    // Sample bottom left pixel\n    color += texture2D(uSampler, clamp(vec2(vTextureCoord.x - uOffset.x, vTextureCoord.y - uOffset.y), filterClamp.xy, filterClamp.zw));\n\n    // Average\n    color *= 0.25;\n\n    gl_FragColor = color;\n}\n",d=function(e){function t(t,r,o){void 0===t&&(t=4),void 0===r&&(r=3),void 0===o&&(o=!1),e.call(this,f,o?p:h),this.uniforms.uOffset=new Float32Array(2),this._pixelSize=new n.Point,this.pixelSize=1,this._clamp=o,this._kernels=null,Array.isArray(t)?this.kernels=t:(this._blur=t,this.quality=r)}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var r={kernels:{configurable:!0},clamp:{configurable:!0},pixelSize:{configurable:!0},quality:{configurable:!0},blur:{configurable:!0}};return t.prototype.apply=function(e,t,n,r){var o,i=this.pixelSize.x/t._frame.width,l=this.pixelSize.y/t._frame.height;if(1===this._quality||0===this._blur)o=this._kernels[0]+.5,this.uniforms.uOffset[0]=o*i,this.uniforms.uOffset[1]=o*l,e.applyFilter(this,t,n,r);else{for(var s,a=e.getFilterTexture(),u=t,c=a,f=this._quality-1,h=0;h<f;h++)o=this._kernels[h]+.5,this.uniforms.uOffset[0]=o*i,this.uniforms.uOffset[1]=o*l,e.applyFilter(this,u,c,1),s=u,u=c,c=s;o=this._kernels[f]+.5,this.uniforms.uOffset[0]=o*i,this.uniforms.uOffset[1]=o*l,e.applyFilter(this,u,n,r),e.returnFilterTexture(a)}},t.prototype._generateKernels=function(){var e=this._blur,t=this._quality,n=[e];if(e>0)for(var r=e,o=e/t,i=1;i<t;i++)r-=o,n.push(r);this._kernels=n},r.kernels.get=function(){return this._kernels},r.kernels.set=function(e){Array.isArray(e)&&e.length>0?(this._kernels=e,this._quality=e.length,this._blur=Math.max.apply(Math,e)):(this._kernels=[0],this._quality=1)},r.clamp.get=function(){return this._clamp},r.pixelSize.set=function(e){"number"==typeof e?(this._pixelSize.x=e,this._pixelSize.y=e):Array.isArray(e)?(this._pixelSize.x=e[0],this._pixelSize.y=e[1]):e instanceof n.Point?(this._pixelSize.x=e.x,this._pixelSize.y=e.y):(this._pixelSize.x=1,this._pixelSize.y=1)},r.pixelSize.get=function(){return this._pixelSize},r.quality.get=function(){return this._quality},r.quality.set=function(e){this._quality=Math.max(1,Math.round(e)),this._generateKernels()},r.blur.get=function(){return this._blur},r.blur.set=function(e){this._blur=e,this._generateKernels()},Object.defineProperties(t.prototype,r),t}(t.Filter),m=a,g="\nuniform sampler2D uSampler;\nvarying vec2 vTextureCoord;\n\nuniform float threshold;\n\nvoid main() {\n    vec4 color = texture2D(uSampler, vTextureCoord);\n\n    // A simple & fast algorithm for getting brightness.\n    // It's inaccuracy , but good enought for this feature.\n    float _max = max(max(color.r, color.g), color.b);\n    float _min = min(min(color.r, color.g), color.b);\n    float brightness = (_max + _min) * 0.5;\n\n    if(brightness > threshold) {\n        gl_FragColor = color;\n    } else {\n        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);\n    }\n}\n",v=function(e){function t(t){void 0===t&&(t=.5),e.call(this,m,g),this.threshold=t}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var n={threshold:{configurable:!0}};return n.threshold.get=function(){return this.uniforms.threshold},n.threshold.set=function(e){this.uniforms.threshold=e},Object.defineProperties(t.prototype,n),t}(t.Filter),x="uniform sampler2D uSampler;\nvarying vec2 vTextureCoord;\n\nuniform sampler2D bloomTexture;\nuniform float bloomScale;\nuniform float brightness;\n\nvoid main() {\n    vec4 color = texture2D(uSampler, vTextureCoord);\n    color.rgb *= brightness;\n    vec4 bloomColor = vec4(texture2D(bloomTexture, vTextureCoord).rgb, 0.0);\n    bloomColor.rgb *= bloomScale;\n    gl_FragColor = color + bloomColor;\n}\n",y=function(e){function t(t){e.call(this,m,x),"number"==typeof t&&(t={threshold:t}),t=Object.assign({threshold:.5,bloomScale:1,brightness:1,kernels:null,blur:8,quality:4,pixelSize:1,resolution:r.settings.RESOLUTION},t),this.bloomScale=t.bloomScale,this.brightness=t.brightness;var n=t.kernels,o=t.blur,i=t.quality,l=t.pixelSize,s=t.resolution;this._extractFilter=new v(t.threshold),this._extractFilter.resolution=s,this._blurFilter=n?new d(n):new d(o,i),this.pixelSize=l,this.resolution=s}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var n={resolution:{configurable:!0},threshold:{configurable:!0},kernels:{configurable:!0},blur:{configurable:!0},quality:{configurable:!0},pixelSize:{configurable:!0}};return t.prototype.apply=function(e,t,n,r,o){var i=e.getFilterTexture();this._extractFilter.apply(e,t,i,1,o);var l=e.getFilterTexture();this._blurFilter.apply(e,i,l,1,o),this.uniforms.bloomScale=this.bloomScale,this.uniforms.brightness=this.brightness,this.uniforms.bloomTexture=l,e.applyFilter(this,t,n,r),e.returnFilterTexture(l),e.returnFilterTexture(i)},n.resolution.get=function(){return this._resolution},n.resolution.set=function(e){this._resolution=e,this._extractFilter&&(this._extractFilter.resolution=e),this._blurFilter&&(this._blurFilter.resolution=e)},n.threshold.get=function(){return this._extractFilter.threshold},n.threshold.set=function(e){this._extractFilter.threshold=e},n.kernels.get=function(){return this._blurFilter.kernels},n.kernels.set=function(e){this._blurFilter.kernels=e},n.blur.get=function(){return this._blurFilter.blur},n.blur.set=function(e){this._blurFilter.blur=e},n.quality.get=function(){return this._blurFilter.quality},n.quality.set=function(e){this._blurFilter.quality=e},n.pixelSize.get=function(){return this._blurFilter.pixelSize},n.pixelSize.set=function(e){this._blurFilter.pixelSize=e},Object.defineProperties(t.prototype,n),t}(t.Filter),_=a,b="varying vec2 vTextureCoord;\n\nuniform vec4 filterArea;\nuniform float pixelSize;\nuniform sampler2D uSampler;\n\nvec2 mapCoord( vec2 coord )\n{\n    coord *= filterArea.xy;\n    coord += filterArea.zw;\n\n    return coord;\n}\n\nvec2 unmapCoord( vec2 coord )\n{\n    coord -= filterArea.zw;\n    coord /= filterArea.xy;\n\n    return coord;\n}\n\nvec2 pixelate(vec2 coord, vec2 size)\n{\n    return floor( coord / size ) * size;\n}\n\nvec2 getMod(vec2 coord, vec2 size)\n{\n    return mod( coord , size) / size;\n}\n\nfloat character(float n, vec2 p)\n{\n    p = floor(p*vec2(4.0, -4.0) + 2.5);\n\n    if (clamp(p.x, 0.0, 4.0) == p.x)\n    {\n        if (clamp(p.y, 0.0, 4.0) == p.y)\n        {\n            if (int(mod(n/exp2(p.x + 5.0*p.y), 2.0)) == 1) return 1.0;\n        }\n    }\n    return 0.0;\n}\n\nvoid main()\n{\n    vec2 coord = mapCoord(vTextureCoord);\n\n    // get the rounded color..\n    vec2 pixCoord = pixelate(coord, vec2(pixelSize));\n    pixCoord = unmapCoord(pixCoord);\n\n    vec4 color = texture2D(uSampler, pixCoord);\n\n    // determine the character to use\n    float gray = (color.r + color.g + color.b) / 3.0;\n\n    float n =  65536.0;             // .\n    if (gray > 0.2) n = 65600.0;    // :\n    if (gray > 0.3) n = 332772.0;   // *\n    if (gray > 0.4) n = 15255086.0; // o\n    if (gray > 0.5) n = 23385164.0; // &\n    if (gray > 0.6) n = 15252014.0; // 8\n    if (gray > 0.7) n = 13199452.0; // @\n    if (gray > 0.8) n = 11512810.0; // #\n\n    // get the mod..\n    vec2 modd = getMod(coord, vec2(pixelSize));\n\n    gl_FragColor = color * character( n, vec2(-1.0) + modd * 2.0);\n\n}\n",C=function(e){function t(t){void 0===t&&(t=8),e.call(this,_,b),this.size=t}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var n={size:{configurable:!0}};return n.size.get=function(){return this.uniforms.pixelSize},n.size.set=function(e){this.uniforms.pixelSize=e},Object.defineProperties(t.prototype,n),t}(t.Filter),S=a,F="precision mediump float;\n\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\n\nuniform float transformX;\nuniform float transformY;\nuniform vec3 lightColor;\nuniform float lightAlpha;\nuniform vec3 shadowColor;\nuniform float shadowAlpha;\n\nvoid main(void) {\n    vec2 transform = vec2(1.0 / filterArea) * vec2(transformX, transformY);\n    vec4 color = texture2D(uSampler, vTextureCoord);\n    float light = texture2D(uSampler, vTextureCoord - transform).a;\n    float shadow = texture2D(uSampler, vTextureCoord + transform).a;\n\n    color.rgb = mix(color.rgb, lightColor, clamp((color.a - light) * lightAlpha, 0.0, 1.0));\n    color.rgb = mix(color.rgb, shadowColor, clamp((color.a - shadow) * shadowAlpha, 0.0, 1.0));\n    gl_FragColor = vec4(color.rgb * color.a, color.a);\n}\n",z=function(e){function t(t){void 0===t&&(t={}),e.call(this,S,F),this.uniforms.lightColor=new Float32Array(3),this.uniforms.shadowColor=new Float32Array(3),t=Object.assign({rotation:45,thickness:2,lightColor:16777215,lightAlpha:.7,shadowColor:0,shadowAlpha:.7},t),this.rotation=t.rotation,this.thickness=t.thickness,this.lightColor=t.lightColor,this.lightAlpha=t.lightAlpha,this.shadowColor=t.shadowColor,this.shadowAlpha=t.shadowAlpha}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var r={rotation:{configurable:!0},thickness:{configurable:!0},lightColor:{configurable:!0},lightAlpha:{configurable:!0},shadowColor:{configurable:!0},shadowAlpha:{configurable:!0}};return t.prototype._updateTransform=function(){this.uniforms.transformX=this._thickness*Math.cos(this._angle),this.uniforms.transformY=this._thickness*Math.sin(this._angle)},r.rotation.get=function(){return this._angle/n.DEG_TO_RAD},r.rotation.set=function(e){this._angle=e*n.DEG_TO_RAD,this._updateTransform()},r.thickness.get=function(){return this._thickness},r.thickness.set=function(e){this._thickness=e,this._updateTransform()},r.lightColor.get=function(){return o.rgb2hex(this.uniforms.lightColor)},r.lightColor.set=function(e){o.hex2rgb(e,this.uniforms.lightColor)},r.lightAlpha.get=function(){return this.uniforms.lightAlpha},r.lightAlpha.set=function(e){this.uniforms.lightAlpha=e},r.shadowColor.get=function(){return o.rgb2hex(this.uniforms.shadowColor)},r.shadowColor.set=function(e){o.hex2rgb(e,this.uniforms.shadowColor)},r.shadowAlpha.get=function(){return this.uniforms.shadowAlpha},r.shadowAlpha.set=function(e){this.uniforms.shadowAlpha=e},Object.defineProperties(t.prototype,r),t}(t.Filter),A=function(e){function t(t,o,a,u){var c,f;void 0===t&&(t=2),void 0===o&&(o=4),void 0===a&&(a=r.settings.RESOLUTION),void 0===u&&(u=5),e.call(this),"number"==typeof t?(c=t,f=t):t instanceof n.Point?(c=t.x,f=t.y):Array.isArray(t)&&(c=t[0],f=t[1]),this.blurXFilter=new s.BlurFilterPass(!0,c,o,a,u),this.blurYFilter=new s.BlurFilterPass(!1,f,o,a,u),this.blurYFilter.blendMode=i.BLEND_MODES.SCREEN,this.defaultFilter=new l.AlphaFilter}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var o={blur:{configurable:!0},blurX:{configurable:!0},blurY:{configurable:!0}};return t.prototype.apply=function(e,t,n){var r=e.getFilterTexture(!0);this.defaultFilter.apply(e,t,n),this.blurXFilter.apply(e,t,r),this.blurYFilter.apply(e,r,n),e.returnFilterTexture(r)},o.blur.get=function(){return this.blurXFilter.blur},o.blur.set=function(e){this.blurXFilter.blur=this.blurYFilter.blur=e},o.blurX.get=function(){return this.blurXFilter.blur},o.blurX.set=function(e){this.blurXFilter.blur=e},o.blurY.get=function(){return this.blurYFilter.blur},o.blurY.set=function(e){this.blurYFilter.blur=e},Object.defineProperties(t.prototype,o),t}(t.Filter),w=a,T="uniform float radius;\nuniform float strength;\nuniform vec2 center;\nuniform sampler2D uSampler;\nvarying vec2 vTextureCoord;\n\nuniform vec4 filterArea;\nuniform vec4 filterClamp;\nuniform vec2 dimensions;\n\nvoid main()\n{\n    vec2 coord = vTextureCoord * filterArea.xy;\n    coord -= center * dimensions.xy;\n    float distance = length(coord);\n    if (distance < radius) {\n        float percent = distance / radius;\n        if (strength > 0.0) {\n            coord *= mix(1.0, smoothstep(0.0, radius / distance, percent), strength * 0.75);\n        } else {\n            coord *= mix(1.0, pow(percent, 1.0 + strength * 0.75) * radius / distance, 1.0 - percent);\n        }\n    }\n    coord += center * dimensions.xy;\n    coord /= filterArea.xy;\n    vec2 clampedCoord = clamp(coord, filterClamp.xy, filterClamp.zw);\n    vec4 color = texture2D(uSampler, clampedCoord);\n    if (coord != clampedCoord) {\n        color *= max(0.0, 1.0 - length(coord - clampedCoord));\n    }\n\n    gl_FragColor = color;\n}\n",O=function(e){function t(t){if(e.call(this,w,T),"object"!=typeof t){var n=arguments[0],r=arguments[1],o=arguments[2];t={},void 0!==n&&(t.center=n),void 0!==r&&(t.radius=r),void 0!==o&&(t.strength=o)}this.uniforms.dimensions=new Float32Array(2),Object.assign(this,{center:[.5,.5],radius:100,strength:1},t)}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var n={radius:{configurable:!0},strength:{configurable:!0},center:{configurable:!0}};return t.prototype.apply=function(e,t,n,r){this.uniforms.dimensions[0]=t.filterFrame.width,this.uniforms.dimensions[1]=t.filterFrame.height,e.applyFilter(this,t,n,r)},n.radius.get=function(){return this.uniforms.radius},n.radius.set=function(e){this.uniforms.radius=e},n.strength.get=function(){return this.uniforms.strength},n.strength.set=function(e){this.uniforms.strength=e},n.center.get=function(){return this.uniforms.center},n.center.set=function(e){this.uniforms.center=e},Object.defineProperties(t.prototype,n),t}(t.Filter),D=a,P="varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform sampler2D colorMap;\nuniform float _mix;\nuniform float _size;\nuniform float _sliceSize;\nuniform float _slicePixelSize;\nuniform float _sliceInnerSize;\nvoid main() {\n    vec4 color = texture2D(uSampler, vTextureCoord.xy);\n\n    vec4 adjusted;\n    if (color.a > 0.0) {\n        color.rgb /= color.a;\n        float innerWidth = _size - 1.0;\n        float zSlice0 = min(floor(color.b * innerWidth), innerWidth);\n        float zSlice1 = min(zSlice0 + 1.0, innerWidth);\n        float xOffset = _slicePixelSize * 0.5 + color.r * _sliceInnerSize;\n        float s0 = xOffset + (zSlice0 * _sliceSize);\n        float s1 = xOffset + (zSlice1 * _sliceSize);\n        float yOffset = _sliceSize * 0.5 + color.g * (1.0 - _sliceSize);\n        vec4 slice0Color = texture2D(colorMap, vec2(s0,yOffset));\n        vec4 slice1Color = texture2D(colorMap, vec2(s1,yOffset));\n        float zOffset = fract(color.b * innerWidth);\n        adjusted = mix(slice0Color, slice1Color, zOffset);\n\n        color.rgb *= color.a;\n    }\n    gl_FragColor = vec4(mix(color, adjusted, _mix).rgb, color.a);\n\n}",M=function(e){function n(t,n,r){void 0===n&&(n=!1),void 0===r&&(r=1),e.call(this,D,P),this._size=0,this._sliceSize=0,this._slicePixelSize=0,this._sliceInnerSize=0,this._scaleMode=null,this._nearest=!1,this.nearest=n,this.mix=r,this.colorMap=t}e&&(n.__proto__=e),n.prototype=Object.create(e&&e.prototype),n.prototype.constructor=n;var r={colorSize:{configurable:!0},colorMap:{configurable:!0},nearest:{configurable:!0}};return n.prototype.apply=function(e,t,n,r){this.uniforms._mix=this.mix,e.applyFilter(this,t,n,r)},r.colorSize.get=function(){return this._size},r.colorMap.get=function(){return this._colorMap},r.colorMap.set=function(e){e instanceof t.Texture||(e=t.Texture.from(e)),e&&e.baseTexture&&(e.baseTexture.scaleMode=this._scaleMode,e.baseTexture.mipmap=!1,this._size=e.height,this._sliceSize=1/this._size,this._slicePixelSize=this._sliceSize/this._size,this._sliceInnerSize=this._slicePixelSize*(this._size-1),this.uniforms._size=this._size,this.uniforms._sliceSize=this._sliceSize,this.uniforms._slicePixelSize=this._slicePixelSize,this.uniforms._sliceInnerSize=this._sliceInnerSize,this.uniforms.colorMap=e),this._colorMap=e},r.nearest.get=function(){return this._nearest},r.nearest.set=function(e){this._nearest=e,this._scaleMode=e?i.SCALE_MODES.NEAREST:i.SCALE_MODES.LINEAR;var t=this._colorMap;t&&t.baseTexture&&(t.baseTexture._glTextures={},t.baseTexture.scaleMode=this._scaleMode,t.baseTexture.mipmap=!1,t._updateID++,t.baseTexture.emit("update",t.baseTexture))},n.prototype.updateColorMap=function(){var e=this._colorMap;e&&e.baseTexture&&(e._updateID++,e.baseTexture.emit("update",e.baseTexture),this.colorMap=e)},n.prototype.destroy=function(t){this._colorMap&&this._colorMap.destroy(t),e.prototype.destroy.call(this)},Object.defineProperties(n.prototype,r),n}(t.Filter),R=a,k="varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec3 color;\nvoid main(void) {\n    vec4 currentColor = texture2D(uSampler, vTextureCoord);\n    vec3 colorOverlay = color * currentColor.a;\n    gl_FragColor = vec4(colorOverlay.r, colorOverlay.g, colorOverlay.b, currentColor.a);\n}\n",j=function(e){function t(t){void 0===t&&(t=0),e.call(this,R,k),this.uniforms.color=new Float32Array(3),this.color=t}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var n={color:{configurable:!0}};return n.color.set=function(e){var t=this.uniforms.color;"number"==typeof e?(o.hex2rgb(e,t),this._color=e):(t[0]=e[0],t[1]=e[1],t[2]=e[2],this._color=o.rgb2hex(t))},n.color.get=function(){return this._color},Object.defineProperties(t.prototype,n),t}(t.Filter),E=a,L="varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec3 originalColor;\nuniform vec3 newColor;\nuniform float epsilon;\nvoid main(void) {\n    vec4 currentColor = texture2D(uSampler, vTextureCoord);\n    vec3 colorDiff = originalColor - (currentColor.rgb / max(currentColor.a, 0.0000000001));\n    float colorDistance = length(colorDiff);\n    float doReplace = step(colorDistance, epsilon);\n    gl_FragColor = vec4(mix(currentColor.rgb, (newColor + colorDiff) * currentColor.a, doReplace), currentColor.a);\n}\n",I=function(e){function t(t,n,r){void 0===t&&(t=16711680),void 0===n&&(n=0),void 0===r&&(r=.4),e.call(this,E,L),this.uniforms.originalColor=new Float32Array(3),this.uniforms.newColor=new Float32Array(3),this.originalColor=t,this.newColor=n,this.epsilon=r}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var n={originalColor:{configurable:!0},newColor:{configurable:!0},epsilon:{configurable:!0}};return n.originalColor.set=function(e){var t=this.uniforms.originalColor;"number"==typeof e?(o.hex2rgb(e,t),this._originalColor=e):(t[0]=e[0],t[1]=e[1],t[2]=e[2],this._originalColor=o.rgb2hex(t))},n.originalColor.get=function(){return this._originalColor},n.newColor.set=function(e){var t=this.uniforms.newColor;"number"==typeof e?(o.hex2rgb(e,t),this._newColor=e):(t[0]=e[0],t[1]=e[1],t[2]=e[2],this._newColor=o.rgb2hex(t))},n.newColor.get=function(){return this._newColor},n.epsilon.set=function(e){this.uniforms.epsilon=e},n.epsilon.get=function(){return this.uniforms.epsilon},Object.defineProperties(t.prototype,n),t}(t.Filter),X=a,B="precision mediump float;\n\nvarying mediump vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform vec2 texelSize;\nuniform float matrix[9];\n\nvoid main(void)\n{\n   vec4 c11 = texture2D(uSampler, vTextureCoord - texelSize); // top left\n   vec4 c12 = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y - texelSize.y)); // top center\n   vec4 c13 = texture2D(uSampler, vec2(vTextureCoord.x + texelSize.x, vTextureCoord.y - texelSize.y)); // top right\n\n   vec4 c21 = texture2D(uSampler, vec2(vTextureCoord.x - texelSize.x, vTextureCoord.y)); // mid left\n   vec4 c22 = texture2D(uSampler, vTextureCoord); // mid center\n   vec4 c23 = texture2D(uSampler, vec2(vTextureCoord.x + texelSize.x, vTextureCoord.y)); // mid right\n\n   vec4 c31 = texture2D(uSampler, vec2(vTextureCoord.x - texelSize.x, vTextureCoord.y + texelSize.y)); // bottom left\n   vec4 c32 = texture2D(uSampler, vec2(vTextureCoord.x, vTextureCoord.y + texelSize.y)); // bottom center\n   vec4 c33 = texture2D(uSampler, vTextureCoord + texelSize); // bottom right\n\n   gl_FragColor =\n       c11 * matrix[0] + c12 * matrix[1] + c13 * matrix[2] +\n       c21 * matrix[3] + c22 * matrix[4] + c23 * matrix[5] +\n       c31 * matrix[6] + c32 * matrix[7] + c33 * matrix[8];\n\n   gl_FragColor.a = c22.a;\n}\n",N=function(e){function t(t,n,r){void 0===n&&(n=200),void 0===r&&(r=200),e.call(this,X,B),this.uniforms.texelSize=new Float32Array(2),this.uniforms.matrix=new Float32Array(9),void 0!==t&&(this.matrix=t),this.width=n,this.height=r}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var n={matrix:{configurable:!0},width:{configurable:!0},height:{configurable:!0}};return n.matrix.get=function(){return this.uniforms.matrix},n.matrix.set=function(e){var t=this;e.forEach(function(e,n){return t.uniforms.matrix[n]=e})},n.width.get=function(){return 1/this.uniforms.texelSize[0]},n.width.set=function(e){this.uniforms.texelSize[0]=1/e},n.height.get=function(){return 1/this.uniforms.texelSize[1]},n.height.set=function(e){this.uniforms.texelSize[1]=1/e},Object.defineProperties(t.prototype,n),t}(t.Filter),G=a,q="precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\n\nvoid main(void)\n{\n    float lum = length(texture2D(uSampler, vTextureCoord.xy).rgb);\n\n    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);\n\n    if (lum < 1.00)\n    {\n        if (mod(gl_FragCoord.x + gl_FragCoord.y, 10.0) == 0.0)\n        {\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n        }\n    }\n\n    if (lum < 0.75)\n    {\n        if (mod(gl_FragCoord.x - gl_FragCoord.y, 10.0) == 0.0)\n        {\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n        }\n    }\n\n    if (lum < 0.50)\n    {\n        if (mod(gl_FragCoord.x + gl_FragCoord.y - 5.0, 10.0) == 0.0)\n        {\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n        }\n    }\n\n    if (lum < 0.3)\n    {\n        if (mod(gl_FragCoord.x - gl_FragCoord.y - 5.0, 10.0) == 0.0)\n        {\n            gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);\n        }\n    }\n}\n",W=function(e){function t(){e.call(this,G,q)}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t}(t.Filter),K=a,Y="varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform vec4 filterArea;\nuniform vec2 dimensions;\n\nconst float SQRT_2 = 1.414213;\n\nconst float light = 1.0;\n\nuniform float curvature;\nuniform float lineWidth;\nuniform float lineContrast;\nuniform bool verticalLine;\nuniform float noise;\nuniform float noiseSize;\n\nuniform float vignetting;\nuniform float vignettingAlpha;\nuniform float vignettingBlur;\n\nuniform float seed;\nuniform float time;\n\nfloat rand(vec2 co) {\n    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);\n}\n\nvoid main(void)\n{\n    vec2 pixelCoord = vTextureCoord.xy * filterArea.xy;\n    vec2 coord = pixelCoord / dimensions;\n\n    vec2 dir = vec2(coord - vec2(0.5, 0.5));\n\n    float _c = curvature > 0. ? curvature : 1.;\n    float k = curvature > 0. ?(length(dir * dir) * 0.25 * _c * _c + 0.935 * _c) : 1.;\n    vec2 uv = dir * k;\n\n    gl_FragColor = texture2D(uSampler, vTextureCoord);\n    vec3 rgb = gl_FragColor.rgb;\n\n\n    if (noise > 0.0 && noiseSize > 0.0)\n    {\n        pixelCoord.x = floor(pixelCoord.x / noiseSize);\n        pixelCoord.y = floor(pixelCoord.y / noiseSize);\n        float _noise = rand(pixelCoord * noiseSize * seed) - 0.5;\n        rgb += _noise * noise;\n    }\n\n    if (lineWidth > 0.0) {\n        float v = (verticalLine ? uv.x * dimensions.x : uv.y * dimensions.y) * min(1.0, 2.0 / lineWidth ) / _c;\n        float j = 1. + cos(v * 1.2 - time) * 0.5 * lineContrast;\n        rgb *= j;\n        float segment = verticalLine ? mod((dir.x + .5) * dimensions.x, 4.) : mod((dir.y + .5) * dimensions.y, 4.);\n        rgb *= 0.99 + ceil(segment) * 0.015;\n    }\n\n    if (vignetting > 0.0)\n    {\n        float outter = SQRT_2 - vignetting * SQRT_2;\n        float darker = clamp((outter - length(dir) * SQRT_2) / ( 0.00001 + vignettingBlur * SQRT_2), 0.0, 1.0);\n        rgb *= darker + (1.0 - darker) * (1.0 - vignettingAlpha);\n    }\n\n    gl_FragColor.rgb = rgb;\n}\n",Z=function(e){function t(t){e.call(this,K,Y),this.uniforms.dimensions=new Float32Array(2),this.time=0,this.seed=0,Object.assign(this,{curvature:1,lineWidth:1,lineContrast:.25,verticalLine:!1,noise:0,noiseSize:1,seed:0,vignetting:.3,vignettingAlpha:1,vignettingBlur:.3,time:0},t)}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var n={curvature:{configurable:!0},lineWidth:{configurable:!0},lineContrast:{configurable:!0},verticalLine:{configurable:!0},noise:{configurable:!0},noiseSize:{configurable:!0},vignetting:{configurable:!0},vignettingAlpha:{configurable:!0},vignettingBlur:{configurable:!0}};return t.prototype.apply=function(e,t,n,r){this.uniforms.dimensions[0]=t.filterFrame.width,this.uniforms.dimensions[1]=t.filterFrame.height,this.uniforms.seed=this.seed,this.uniforms.time=this.time,e.applyFilter(this,t,n,r)},n.curvature.set=function(e){this.uniforms.curvature=e},n.curvature.get=function(){return this.uniforms.curvature},n.lineWidth.set=function(e){this.uniforms.lineWidth=e},n.lineWidth.get=function(){return this.uniforms.lineWidth},n.lineContrast.set=function(e){this.uniforms.lineContrast=e},n.lineContrast.get=function(){return this.uniforms.lineContrast},n.verticalLine.set=function(e){this.uniforms.verticalLine=e},n.verticalLine.get=function(){return this.uniforms.verticalLine},n.noise.set=function(e){this.uniforms.noise=e},n.noise.get=function(){return this.uniforms.noise},n.noiseSize.set=function(e){this.uniforms.noiseSize=e},n.noiseSize.get=function(){return this.uniforms.noiseSize},n.vignetting.set=function(e){this.uniforms.vignetting=e},n.vignetting.get=function(){return this.uniforms.vignetting},n.vignettingAlpha.set=function(e){this.uniforms.vignettingAlpha=e},n.vignettingAlpha.get=function(){return this.uniforms.vignettingAlpha},n.vignettingBlur.set=function(e){this.uniforms.vignettingBlur=e},n.vignettingBlur.get=function(){return this.uniforms.vignettingBlur},Object.defineProperties(t.prototype,n),t}(t.Filter),Q=a,U="precision mediump float;\n\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform vec4 filterArea;\nuniform sampler2D uSampler;\n\nuniform float angle;\nuniform float scale;\n\nfloat pattern()\n{\n   float s = sin(angle), c = cos(angle);\n   vec2 tex = vTextureCoord * filterArea.xy;\n   vec2 point = vec2(\n       c * tex.x - s * tex.y,\n       s * tex.x + c * tex.y\n   ) * scale;\n   return (sin(point.x) * sin(point.y)) * 4.0;\n}\n\nvoid main()\n{\n   vec4 color = texture2D(uSampler, vTextureCoord);\n   float average = (color.r + color.g + color.b) / 3.0;\n   gl_FragColor = vec4(vec3(average * 10.0 - 5.0 + pattern()), color.a);\n}\n",V=function(e){function t(t,n){void 0===t&&(t=1),void 0===n&&(n=5),e.call(this,Q,U),this.scale=t,this.angle=n}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var n={scale:{configurable:!0},angle:{configurable:!0}};return n.scale.get=function(){return this.uniforms.scale},n.scale.set=function(e){this.uniforms.scale=e},n.angle.get=function(){return this.uniforms.angle},n.angle.set=function(e){this.uniforms.angle=e},Object.defineProperties(t.prototype,n),t}(t.Filter),H=a,$="varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform float alpha;\nuniform vec3 color;\n\nuniform vec2 shift;\nuniform vec4 inputSize;\n\nvoid main(void){\n    vec4 sample = texture2D(uSampler, vTextureCoord - shift * inputSize.zw);\n\n    // Premultiply alpha\n    sample.rgb = color.rgb * sample.a;\n\n    // alpha user alpha\n    sample *= alpha;\n\n    gl_FragColor = sample;\n}",J=function(e){function t(t){t&&t.constructor!==Object&&(console.warn("DropShadowFilter now uses options instead of (rotation, distance, blur, color, alpha)"),t={rotation:t},void 0!==arguments[1]&&(t.distance=arguments[1]),void 0!==arguments[2]&&(t.blur=arguments[2]),void 0!==arguments[3]&&(t.color=arguments[3]),void 0!==arguments[4]&&(t.alpha=arguments[4])),t=Object.assign({rotation:45,distance:5,color:0,alpha:.5,shadowOnly:!1,kernels:null,blur:2,quality:3,pixelSize:1,resolution:r.settings.RESOLUTION},t),e.call(this);var o=t.kernels,i=t.blur,l=t.quality,s=t.pixelSize,a=t.resolution;this._tintFilter=new e(H,$),this._tintFilter.uniforms.color=new Float32Array(4),this._tintFilter.uniforms.shift=new n.Point,this._tintFilter.resolution=a,this._blurFilter=o?new d(o):new d(i,l),this.pixelSize=s,this.resolution=a;var u=t.shadowOnly,c=t.rotation,f=t.distance,h=t.alpha,p=t.color;this.shadowOnly=u,this.rotation=c,this.distance=f,this.alpha=h,this.color=p,this._updatePadding()}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var i={resolution:{configurable:!0},distance:{configurable:!0},rotation:{configurable:!0},alpha:{configurable:!0},color:{configurable:!0},kernels:{configurable:!0},blur:{configurable:!0},quality:{configurable:!0},pixelSize:{configurable:!0}};return t.prototype.apply=function(e,t,n,r){var o=e.getFilterTexture();this._tintFilter.apply(e,t,o,1),this._blurFilter.apply(e,o,n,r),!0!==this.shadowOnly&&e.applyFilter(this,t,n,0),e.returnFilterTexture(o)},t.prototype._updatePadding=function(){this.padding=this.distance+2*this.blur},t.prototype._updateShift=function(){this._tintFilter.uniforms.shift.set(this.distance*Math.cos(this.angle),this.distance*Math.sin(this.angle))},i.resolution.get=function(){return this._resolution},i.resolution.set=function(e){this._resolution=e,this._tintFilter&&(this._tintFilter.resolution=e),this._blurFilter&&(this._blurFilter.resolution=e)},i.distance.get=function(){return this._distance},i.distance.set=function(e){this._distance=e,this._updatePadding(),this._updateShift()},i.rotation.get=function(){return this.angle/n.DEG_TO_RAD},i.rotation.set=function(e){this.angle=e*n.DEG_TO_RAD,this._updateShift()},i.alpha.get=function(){return this._tintFilter.uniforms.alpha},i.alpha.set=function(e){this._tintFilter.uniforms.alpha=e},i.color.get=function(){return o.rgb2hex(this._tintFilter.uniforms.color)},i.color.set=function(e){o.hex2rgb(e,this._tintFilter.uniforms.color)},i.kernels.get=function(){return this._blurFilter.kernels},i.kernels.set=function(e){this._blurFilter.kernels=e},i.blur.get=function(){return this._blurFilter.blur},i.blur.set=function(e){this._blurFilter.blur=e,this._updatePadding()},i.quality.get=function(){return this._blurFilter.quality},i.quality.set=function(e){this._blurFilter.quality=e},i.pixelSize.get=function(){return this._blurFilter.pixelSize},i.pixelSize.set=function(e){this._blurFilter.pixelSize=e},Object.defineProperties(t.prototype,i),t}(t.Filter),ee=a,te="precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float strength;\nuniform vec4 filterArea;\n\n\nvoid main(void)\n{\n\tvec2 onePixel = vec2(1.0 / filterArea);\n\n\tvec4 color;\n\n\tcolor.rgb = vec3(0.5);\n\n\tcolor -= texture2D(uSampler, vTextureCoord - onePixel) * strength;\n\tcolor += texture2D(uSampler, vTextureCoord + onePixel) * strength;\n\n\tcolor.rgb = vec3((color.r + color.g + color.b) / 3.0);\n\n\tfloat alpha = texture2D(uSampler, vTextureCoord).a;\n\n\tgl_FragColor = vec4(color.rgb * alpha, alpha);\n}\n",ne=function(e){function t(t){void 0===t&&(t=5),e.call(this,ee,te),this.strength=t}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var n={strength:{configurable:!0}};return n.strength.get=function(){return this.uniforms.strength},n.strength.set=function(e){this.uniforms.strength=e},Object.defineProperties(t.prototype,n),t}(t.Filter),re=a,oe="// precision highp float;\n\nvarying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform vec4 filterArea;\nuniform vec4 filterClamp;\nuniform vec2 dimensions;\nuniform float aspect;\n\nuniform sampler2D displacementMap;\nuniform float offset;\nuniform float sinDir;\nuniform float cosDir;\nuniform int fillMode;\n\nuniform float seed;\nuniform vec2 red;\nuniform vec2 green;\nuniform vec2 blue;\n\nconst int TRANSPARENT = 0;\nconst int ORIGINAL = 1;\nconst int LOOP = 2;\nconst int CLAMP = 3;\nconst int MIRROR = 4;\n\nvoid main(void)\n{\n    vec2 coord = (vTextureCoord * filterArea.xy) / dimensions;\n\n    if (coord.x > 1.0 || coord.y > 1.0) {\n        return;\n    }\n\n    float cx = coord.x - 0.5;\n    float cy = (coord.y - 0.5) * aspect;\n    float ny = (-sinDir * cx + cosDir * cy) / aspect + 0.5;\n\n    // displacementMap: repeat\n    // ny = ny > 1.0 ? ny - 1.0 : (ny < 0.0 ? 1.0 + ny : ny);\n\n    // displacementMap: mirror\n    ny = ny > 1.0 ? 2.0 - ny : (ny < 0.0 ? -ny : ny);\n\n    vec4 dc = texture2D(displacementMap, vec2(0.5, ny));\n\n    float displacement = (dc.r - dc.g) * (offset / filterArea.x);\n\n    coord = vTextureCoord + vec2(cosDir * displacement, sinDir * displacement * aspect);\n\n    if (fillMode == CLAMP) {\n        coord = clamp(coord, filterClamp.xy, filterClamp.zw);\n    } else {\n        if( coord.x > filterClamp.z ) {\n            if (fillMode == TRANSPARENT) {\n                discard;\n            } else if (fillMode == LOOP) {\n                coord.x -= filterClamp.z;\n            } else if (fillMode == MIRROR) {\n                coord.x = filterClamp.z * 2.0 - coord.x;\n            }\n        } else if( coord.x < filterClamp.x ) {\n            if (fillMode == TRANSPARENT) {\n                discard;\n            } else if (fillMode == LOOP) {\n                coord.x += filterClamp.z;\n            } else if (fillMode == MIRROR) {\n                coord.x *= -filterClamp.z;\n            }\n        }\n\n        if( coord.y > filterClamp.w ) {\n            if (fillMode == TRANSPARENT) {\n                discard;\n            } else if (fillMode == LOOP) {\n                coord.y -= filterClamp.w;\n            } else if (fillMode == MIRROR) {\n                coord.y = filterClamp.w * 2.0 - coord.y;\n            }\n        } else if( coord.y < filterClamp.y ) {\n            if (fillMode == TRANSPARENT) {\n                discard;\n            } else if (fillMode == LOOP) {\n                coord.y += filterClamp.w;\n            } else if (fillMode == MIRROR) {\n                coord.y *= -filterClamp.w;\n            }\n        }\n    }\n\n    gl_FragColor.r = texture2D(uSampler, coord + red * (1.0 - seed * 0.4) / filterArea.xy).r;\n    gl_FragColor.g = texture2D(uSampler, coord + green * (1.0 - seed * 0.3) / filterArea.xy).g;\n    gl_FragColor.b = texture2D(uSampler, coord + blue * (1.0 - seed * 0.2) / filterArea.xy).b;\n    gl_FragColor.a = texture2D(uSampler, coord).a;\n}\n",ie=function(e){function r(n){void 0===n&&(n={}),e.call(this,re,oe),this.uniforms.dimensions=new Float32Array(2),n=Object.assign({slices:5,offset:100,direction:0,fillMode:0,average:!1,seed:0,red:[0,0],green:[0,0],blue:[0,0],minSize:8,sampleSize:512},n),this.direction=n.direction,this.red=n.red,this.green=n.green,this.blue=n.blue,this.offset=n.offset,this.fillMode=n.fillMode,this.average=n.average,this.seed=n.seed,this.minSize=n.minSize,this.sampleSize=n.sampleSize,this._canvas=document.createElement("canvas"),this._canvas.width=4,this._canvas.height=this.sampleSize,this.texture=t.Texture.from(this._canvas,{scaleMode:i.SCALE_MODES.NEAREST}),this._slices=0,this.slices=n.slices}e&&(r.__proto__=e),r.prototype=Object.create(e&&e.prototype),r.prototype.constructor=r;var o={sizes:{configurable:!0},offsets:{configurable:!0},slices:{configurable:!0},direction:{configurable:!0},red:{configurable:!0},green:{configurable:!0},blue:{configurable:!0}};return r.prototype.apply=function(e,t,n,r){var o=t.filterFrame.width,i=t.filterFrame.height;this.uniforms.dimensions[0]=o,this.uniforms.dimensions[1]=i,this.uniforms.aspect=i/o,this.uniforms.seed=this.seed,this.uniforms.offset=this.offset,this.uniforms.fillMode=this.fillMode,e.applyFilter(this,t,n,r)},r.prototype._randomizeSizes=function(){var e=this._sizes,t=this._slices-1,n=this.sampleSize,r=Math.min(this.minSize/n,.9/this._slices);if(this.average){for(var o=this._slices,i=1,l=0;l<t;l++){var s=i/(o-l),a=Math.max(s*(1-.6*Math.random()),r);e[l]=a,i-=a}e[t]=i}else{for(var u=1,c=Math.sqrt(1/this._slices),f=0;f<t;f++){var h=Math.max(c*u*Math.random(),r);e[f]=h,u-=h}e[t]=u}this.shuffle()},r.prototype.shuffle=function(){for(var e=this._sizes,t=this._slices-1;t>0;t--){var n=Math.random()*t>>0,r=e[t];e[t]=e[n],e[n]=r}},r.prototype._randomizeOffsets=function(){for(var e=0;e<this._slices;e++)this._offsets[e]=Math.random()*(Math.random()<.5?-1:1)},r.prototype.refresh=function(){this._randomizeSizes(),this._randomizeOffsets(),this.redraw()},r.prototype.redraw=function(){var e,t=this.sampleSize,n=this.texture,r=this._canvas.getContext("2d");r.clearRect(0,0,8,t);for(var o=0,i=0;i<this._slices;i++){e=Math.floor(256*this._offsets[i]);var l=this._sizes[i]*t,s=e>0?e:0,a=e<0?-e:0;r.fillStyle="rgba("+s+", "+a+", 0, 1)",r.fillRect(0,o>>0,t,l+1>>0),o+=l}n.baseTexture.update(),this.uniforms.displacementMap=n},o.sizes.set=function(e){for(var t=Math.min(this._slices,e.length),n=0;n<t;n++)this._sizes[n]=e[n]},o.sizes.get=function(){return this._sizes},o.offsets.set=function(e){for(var t=Math.min(this._slices,e.length),n=0;n<t;n++)this._offsets[n]=e[n]},o.offsets.get=function(){return this._offsets},o.slices.get=function(){return this._slices},o.slices.set=function(e){this._slices!==e&&(this._slices=e,this.uniforms.slices=e,this._sizes=this.uniforms.slicesWidth=new Float32Array(e),this._offsets=this.uniforms.slicesOffset=new Float32Array(e),this.refresh())},o.direction.get=function(){return this._direction},o.direction.set=function(e){if(this._direction!==e){this._direction=e;var t=e*n.DEG_TO_RAD;this.uniforms.sinDir=Math.sin(t),this.uniforms.cosDir=Math.cos(t)}},o.red.get=function(){return this.uniforms.red},o.red.set=function(e){this.uniforms.red=e},o.green.get=function(){return this.uniforms.green},o.green.set=function(e){this.uniforms.green=e},o.blue.get=function(){return this.uniforms.blue},o.blue.set=function(e){this.uniforms.blue=e},r.prototype.destroy=function(){this.texture.destroy(!0),this.texture=null,this._canvas=null,this.red=null,this.green=null,this.blue=null,this._sizes=null,this._offsets=null},Object.defineProperties(r.prototype,o),r}(t.Filter);ie.TRANSPARENT=0,ie.ORIGINAL=1,ie.LOOP=2,ie.CLAMP=3,ie.MIRROR=4;var le=a,se="varying vec2 vTextureCoord;\nvarying vec4 vColor;\n\nuniform sampler2D uSampler;\n\nuniform float outerStrength;\nuniform float innerStrength;\n\nuniform vec4 glowColor;\n\nuniform vec4 filterArea;\nuniform vec4 filterClamp;\nuniform bool knockout;\n\nconst float PI = 3.14159265358979323846264;\n\nconst float DIST = __DIST__;\nconst float ANGLE_STEP_SIZE = min(__ANGLE_STEP_SIZE__, PI * 2.0);\nconst float ANGLE_STEP_NUM = ceil(PI * 2.0 / ANGLE_STEP_SIZE);\n\nconst float MAX_TOTAL_ALPHA = ANGLE_STEP_NUM * DIST * (DIST + 1.0) / 2.0;\n\nvoid main(void) {\n    vec2 px = vec2(1.0 / filterArea.x, 1.0 / filterArea.y);\n\n    float totalAlpha = 0.0;\n\n    vec2 direction;\n    vec2 displaced;\n    vec4 curColor;\n\n    for (float angle = 0.0; angle < PI * 2.0; angle += ANGLE_STEP_SIZE) {\n       direction = vec2(cos(angle), sin(angle)) * px;\n\n       for (float curDistance = 0.0; curDistance < DIST; curDistance++) {\n           displaced = clamp(vTextureCoord + direction * \n                   (curDistance + 1.0), filterClamp.xy, filterClamp.zw);\n\n           curColor = texture2D(uSampler, displaced);\n\n           totalAlpha += (DIST - curDistance) * curColor.a;\n       }\n    }\n    \n    curColor = texture2D(uSampler, vTextureCoord);\n\n    float alphaRatio = (totalAlpha / MAX_TOTAL_ALPHA);\n\n    float innerGlowAlpha = (1.0 - alphaRatio) * innerStrength * curColor.a;\n    float innerGlowStrength = min(1.0, innerGlowAlpha);\n    \n    vec4 innerColor = mix(curColor, glowColor, innerGlowStrength);\n\n    float outerGlowAlpha = alphaRatio * outerStrength * (1. - curColor.a);\n    float outerGlowStrength = min(1.0 - innerColor.a, outerGlowAlpha);\n\n    vec4 outerGlowColor = outerGlowStrength * glowColor.rgba;\n    \n    if (knockout) {\n      float resultAlpha = outerGlowAlpha + innerGlowAlpha;\n      gl_FragColor = vec4(glowColor.rgb * resultAlpha, resultAlpha);\n    }\n    else {\n      gl_FragColor = innerColor + outerGlowColor;\n    }\n}\n",ae=function(e){function t(n){var r=Object.assign({},t.defaults,n),o=r.distance,i=r.outerStrength,l=r.innerStrength,s=r.color,a=r.knockout,u=r.quality;o=Math.round(o),e.call(this,le,se.replace(/__ANGLE_STEP_SIZE__/gi,""+(1/u/o).toFixed(7)).replace(/__DIST__/gi,o.toFixed(0)+".0")),this.uniforms.glowColor=new Float32Array([0,0,0,1]),Object.assign(this,{color:s,outerStrength:i,innerStrength:l,padding:o,knockout:a})}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var n={color:{configurable:!0},outerStrength:{configurable:!0},innerStrength:{configurable:!0},knockout:{configurable:!0}};return n.color.get=function(){return o.rgb2hex(this.uniforms.glowColor)},n.color.set=function(e){o.hex2rgb(e,this.uniforms.glowColor)},n.outerStrength.get=function(){return this.uniforms.outerStrength},n.outerStrength.set=function(e){this.uniforms.outerStrength=e},n.innerStrength.get=function(){return this.uniforms.innerStrength},n.innerStrength.set=function(e){this.uniforms.innerStrength=e},n.knockout.get=function(){return this.uniforms.knockout},n.knockout.set=function(e){this.uniforms.knockout=e},Object.defineProperties(t.prototype,n),t}(t.Filter);ae.defaults={distance:10,outerStrength:4,innerStrength:0,color:16777215,quality:.1,knockout:!1};var ue=a,ce="vec3 mod289(vec3 x)\n{\n    return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\nvec4 mod289(vec4 x)\n{\n    return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\nvec4 permute(vec4 x)\n{\n    return mod289(((x * 34.0) + 1.0) * x);\n}\nvec4 taylorInvSqrt(vec4 r)\n{\n    return 1.79284291400159 - 0.85373472095314 * r;\n}\nvec3 fade(vec3 t)\n{\n    return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);\n}\n// Classic Perlin noise, periodic variant\nfloat pnoise(vec3 P, vec3 rep)\n{\n    vec3 Pi0 = mod(floor(P), rep); // Integer part, modulo period\n    vec3 Pi1 = mod(Pi0 + vec3(1.0), rep); // Integer part + 1, mod period\n    Pi0 = mod289(Pi0);\n    Pi1 = mod289(Pi1);\n    vec3 Pf0 = fract(P); // Fractional part for interpolation\n    vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0\n    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);\n    vec4 iy = vec4(Pi0.yy, Pi1.yy);\n    vec4 iz0 = Pi0.zzzz;\n    vec4 iz1 = Pi1.zzzz;\n    vec4 ixy = permute(permute(ix) + iy);\n    vec4 ixy0 = permute(ixy + iz0);\n    vec4 ixy1 = permute(ixy + iz1);\n    vec4 gx0 = ixy0 * (1.0 / 7.0);\n    vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;\n    gx0 = fract(gx0);\n    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);\n    vec4 sz0 = step(gz0, vec4(0.0));\n    gx0 -= sz0 * (step(0.0, gx0) - 0.5);\n    gy0 -= sz0 * (step(0.0, gy0) - 0.5);\n    vec4 gx1 = ixy1 * (1.0 / 7.0);\n    vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;\n    gx1 = fract(gx1);\n    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);\n    vec4 sz1 = step(gz1, vec4(0.0));\n    gx1 -= sz1 * (step(0.0, gx1) - 0.5);\n    gy1 -= sz1 * (step(0.0, gy1) - 0.5);\n    vec3 g000 = vec3(gx0.x, gy0.x, gz0.x);\n    vec3 g100 = vec3(gx0.y, gy0.y, gz0.y);\n    vec3 g010 = vec3(gx0.z, gy0.z, gz0.z);\n    vec3 g110 = vec3(gx0.w, gy0.w, gz0.w);\n    vec3 g001 = vec3(gx1.x, gy1.x, gz1.x);\n    vec3 g101 = vec3(gx1.y, gy1.y, gz1.y);\n    vec3 g011 = vec3(gx1.z, gy1.z, gz1.z);\n    vec3 g111 = vec3(gx1.w, gy1.w, gz1.w);\n    vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));\n    g000 *= norm0.x;\n    g010 *= norm0.y;\n    g100 *= norm0.z;\n    g110 *= norm0.w;\n    vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));\n    g001 *= norm1.x;\n    g011 *= norm1.y;\n    g101 *= norm1.z;\n    g111 *= norm1.w;\n    float n000 = dot(g000, Pf0);\n    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));\n    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));\n    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));\n    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));\n    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));\n    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));\n    float n111 = dot(g111, Pf1);\n    vec3 fade_xyz = fade(Pf0);\n    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);\n    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);\n    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);\n    return 2.2 * n_xyz;\n}\nfloat turb(vec3 P, vec3 rep, float lacunarity, float gain)\n{\n    float sum = 0.0;\n    float sc = 1.0;\n    float totalgain = 1.0;\n    for (float i = 0.0; i < 6.0; i++)\n    {\n        sum += totalgain * pnoise(P * sc, rep);\n        sc *= lacunarity;\n        totalgain *= gain;\n    }\n    return abs(sum);\n}\n",fe="varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\nuniform vec2 dimensions;\n\nuniform vec2 light;\nuniform bool parallel;\nuniform float aspect;\n\nuniform float gain;\nuniform float lacunarity;\nuniform float time;\n\n${perlin}\n\nvoid main(void) {\n    vec2 coord = vTextureCoord * filterArea.xy / dimensions.xy;\n\n    float d;\n\n    if (parallel) {\n        float _cos = light.x;\n        float _sin = light.y;\n        d = (_cos * coord.x) + (_sin * coord.y * aspect);\n    } else {\n        float dx = coord.x - light.x / dimensions.x;\n        float dy = (coord.y - light.y / dimensions.y) * aspect;\n        float dis = sqrt(dx * dx + dy * dy) + 0.00001;\n        d = dy / dis;\n    }\n\n    vec3 dir = vec3(d, d, 0.0);\n\n    float noise = turb(dir + vec3(time, 0.0, 62.1 + time) * 0.05, vec3(480.0, 320.0, 480.0), lacunarity, gain);\n    noise = mix(noise, 0.0, 0.3);\n    //fade vertically.\n    vec4 mist = vec4(noise, noise, noise, 1.0) * (1.0 - coord.y);\n    mist.a = 1.0;\n\n    gl_FragColor = texture2D(uSampler, vTextureCoord) + mist;\n}\n",he=function(e){function t(t){e.call(this,ue,fe.replace("${perlin}",ce)),this.uniforms.dimensions=new Float32Array(2),"number"==typeof t&&(console.warn("GodrayFilter now uses options instead of (angle, gain, lacunarity, time)"),t={angle:t},void 0!==arguments[1]&&(t.gain=arguments[1]),void 0!==arguments[2]&&(t.lacunarity=arguments[2]),void 0!==arguments[3]&&(t.time=arguments[3])),t=Object.assign({angle:30,gain:.5,lacunarity:2.5,time:0,parallel:!0,center:[0,0]},t),this._angleLight=new n.Point,this.angle=t.angle,this.gain=t.gain,this.lacunarity=t.lacunarity,this.parallel=t.parallel,this.center=t.center,this.time=t.time}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var r={angle:{configurable:!0},gain:{configurable:!0},lacunarity:{configurable:!0}};return t.prototype.apply=function(e,t,n,r){var o=t.filterFrame,i=o.width,l=o.height;this.uniforms.light=this.parallel?this._angleLight:this.center,this.uniforms.parallel=this.parallel,this.uniforms.dimensions[0]=i,this.uniforms.dimensions[1]=l,this.uniforms.aspect=l/i,this.uniforms.time=this.time,e.applyFilter(this,t,n,r)},r.angle.get=function(){return this._angle},r.angle.set=function(e){this._angle=e;var t=e*n.DEG_TO_RAD;this._angleLight.x=Math.cos(t),this._angleLight.y=Math.sin(t)},r.gain.get=function(){return this.uniforms.gain},r.gain.set=function(e){this.uniforms.gain=e},r.lacunarity.get=function(){return this.uniforms.lacunarity},r.lacunarity.set=function(e){this.uniforms.lacunarity=e},Object.defineProperties(t.prototype,r),t}(t.Filter),pe=a,de="varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\n\nuniform vec2 uVelocity;\nuniform int uKernelSize;\nuniform float uOffset;\n\nconst int MAX_KERNEL_SIZE = 2048;\n\n// Notice:\n// the perfect way:\n//    int kernelSize = min(uKernelSize, MAX_KERNELSIZE);\n// BUT in real use-case , uKernelSize < MAX_KERNELSIZE almost always.\n// So use uKernelSize directly.\n\nvoid main(void)\n{\n    vec4 color = texture2D(uSampler, vTextureCoord);\n\n    if (uKernelSize == 0)\n    {\n        gl_FragColor = color;\n        return;\n    }\n\n    vec2 velocity = uVelocity / filterArea.xy;\n    float offset = -uOffset / length(uVelocity) - 0.5;\n    int k = uKernelSize - 1;\n\n    for(int i = 0; i < MAX_KERNEL_SIZE - 1; i++) {\n        if (i == k) {\n            break;\n        }\n        vec2 bias = velocity * (float(i) / float(k) + offset);\n        color += texture2D(uSampler, vTextureCoord + bias);\n    }\n    gl_FragColor = color / float(uKernelSize);\n}\n",me=function(e){function t(t,r,o){void 0===t&&(t=[0,0]),void 0===r&&(r=5),void 0===o&&(o=0),e.call(this,pe,de),this.uniforms.uVelocity=new Float32Array(2),this._velocity=new n.ObservablePoint(this.velocityChanged,this),this.velocity=t,this.kernelSize=r,this.offset=o}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var r={velocity:{configurable:!0},offset:{configurable:!0}};return t.prototype.apply=function(e,t,n,r){var o=this.velocity,i=o.x,l=o.y;this.uniforms.uKernelSize=0!==i||0!==l?this.kernelSize:0,e.applyFilter(this,t,n,r)},r.velocity.set=function(e){Array.isArray(e)?this._velocity.set(e[0],e[1]):(e instanceof n.Point||e instanceof n.ObservablePoint)&&this._velocity.copyFrom(e)},r.velocity.get=function(){return this._velocity},t.prototype.velocityChanged=function(){this.uniforms.uVelocity[0]=this._velocity.x,this.uniforms.uVelocity[1]=this._velocity.y},r.offset.set=function(e){this.uniforms.uOffset=e},r.offset.get=function(){return this.uniforms.uOffset},Object.defineProperties(t.prototype,r),t}(t.Filter),ge=a,ve="varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform float epsilon;\n\nconst int MAX_COLORS = %maxColors%;\n\nuniform vec3 originalColors[MAX_COLORS];\nuniform vec3 targetColors[MAX_COLORS];\n\nvoid main(void)\n{\n    gl_FragColor = texture2D(uSampler, vTextureCoord);\n\n    float alpha = gl_FragColor.a;\n    if (alpha < 0.0001)\n    {\n      return;\n    }\n\n    vec3 color = gl_FragColor.rgb / alpha;\n\n    for(int i = 0; i < MAX_COLORS; i++)\n    {\n      vec3 origColor = originalColors[i];\n      if (origColor.r < 0.0)\n      {\n        break;\n      }\n      vec3 colorDiff = origColor - color;\n      if (length(colorDiff) < epsilon)\n      {\n        vec3 targetColor = targetColors[i];\n        gl_FragColor = vec4((targetColor + colorDiff) * alpha, alpha);\n        return;\n      }\n    }\n}\n",xe=function(e){function t(t,n,r){void 0===n&&(n=.05),void 0===r&&(r=null),r=r||t.length,e.call(this,ge,ve.replace(/%maxColors%/g,r)),this.epsilon=n,this._maxColors=r,this._replacements=null,this.uniforms.originalColors=new Float32Array(3*r),this.uniforms.targetColors=new Float32Array(3*r),this.replacements=t}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var n={replacements:{configurable:!0},maxColors:{configurable:!0},epsilon:{configurable:!0}};return n.replacements.set=function(e){var t=this.uniforms.originalColors,n=this.uniforms.targetColors,r=e.length;if(r>this._maxColors)throw"Length of replacements ("+r+") exceeds the maximum colors length ("+this._maxColors+")";t[3*r]=-1;for(var i=0;i<r;i++){var l=e[i],s=l[0];"number"==typeof s?s=o.hex2rgb(s):l[0]=o.rgb2hex(s),t[3*i]=s[0],t[3*i+1]=s[1],t[3*i+2]=s[2];var a=l[1];"number"==typeof a?a=o.hex2rgb(a):l[1]=o.rgb2hex(a),n[3*i]=a[0],n[3*i+1]=a[1],n[3*i+2]=a[2]}this._replacements=e},n.replacements.get=function(){return this._replacements},t.prototype.refresh=function(){this.replacements=this._replacements},n.maxColors.get=function(){return this._maxColors},n.epsilon.set=function(e){this.uniforms.epsilon=e},n.epsilon.get=function(){return this.uniforms.epsilon},Object.defineProperties(t.prototype,n),t}(t.Filter),ye=a,_e="varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\nuniform vec2 dimensions;\n\nuniform float sepia;\nuniform float noise;\nuniform float noiseSize;\nuniform float scratch;\nuniform float scratchDensity;\nuniform float scratchWidth;\nuniform float vignetting;\nuniform float vignettingAlpha;\nuniform float vignettingBlur;\nuniform float seed;\n\nconst float SQRT_2 = 1.414213;\nconst vec3 SEPIA_RGB = vec3(112.0 / 255.0, 66.0 / 255.0, 20.0 / 255.0);\n\nfloat rand(vec2 co) {\n    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);\n}\n\nvec3 Overlay(vec3 src, vec3 dst)\n{\n    // if (dst <= 0.5) then: 2 * src * dst\n    // if (dst > 0.5) then: 1 - 2 * (1 - dst) * (1 - src)\n    return vec3((dst.x <= 0.5) ? (2.0 * src.x * dst.x) : (1.0 - 2.0 * (1.0 - dst.x) * (1.0 - src.x)),\n                (dst.y <= 0.5) ? (2.0 * src.y * dst.y) : (1.0 - 2.0 * (1.0 - dst.y) * (1.0 - src.y)),\n                (dst.z <= 0.5) ? (2.0 * src.z * dst.z) : (1.0 - 2.0 * (1.0 - dst.z) * (1.0 - src.z)));\n}\n\n\nvoid main()\n{\n    gl_FragColor = texture2D(uSampler, vTextureCoord);\n    vec3 color = gl_FragColor.rgb;\n\n    if (sepia > 0.0)\n    {\n        float gray = (color.x + color.y + color.z) / 3.0;\n        vec3 grayscale = vec3(gray);\n\n        color = Overlay(SEPIA_RGB, grayscale);\n\n        color = grayscale + sepia * (color - grayscale);\n    }\n\n    vec2 coord = vTextureCoord * filterArea.xy / dimensions.xy;\n\n    if (vignetting > 0.0)\n    {\n        float outter = SQRT_2 - vignetting * SQRT_2;\n        vec2 dir = vec2(vec2(0.5, 0.5) - coord);\n        dir.y *= dimensions.y / dimensions.x;\n        float darker = clamp((outter - length(dir) * SQRT_2) / ( 0.00001 + vignettingBlur * SQRT_2), 0.0, 1.0);\n        color.rgb *= darker + (1.0 - darker) * (1.0 - vignettingAlpha);\n    }\n\n    if (scratchDensity > seed && scratch != 0.0)\n    {\n        float phase = seed * 256.0;\n        float s = mod(floor(phase), 2.0);\n        float dist = 1.0 / scratchDensity;\n        float d = distance(coord, vec2(seed * dist, abs(s - seed * dist)));\n        if (d < seed * 0.6 + 0.4)\n        {\n            highp float period = scratchDensity * 10.0;\n\n            float xx = coord.x * period + phase;\n            float aa = abs(mod(xx, 0.5) * 4.0);\n            float bb = mod(floor(xx / 0.5), 2.0);\n            float yy = (1.0 - bb) * aa + bb * (2.0 - aa);\n\n            float kk = 2.0 * period;\n            float dw = scratchWidth / dimensions.x * (0.75 + seed);\n            float dh = dw * kk;\n\n            float tine = (yy - (2.0 - dh));\n\n            if (tine > 0.0) {\n                float _sign = sign(scratch);\n\n                tine = s * tine / period + scratch + 0.1;\n                tine = clamp(tine + 1.0, 0.5 + _sign * 0.5, 1.5 + _sign * 0.5);\n\n                color.rgb *= tine;\n            }\n        }\n    }\n\n    if (noise > 0.0 && noiseSize > 0.0)\n    {\n        vec2 pixelCoord = vTextureCoord.xy * filterArea.xy;\n        pixelCoord.x = floor(pixelCoord.x / noiseSize);\n        pixelCoord.y = floor(pixelCoord.y / noiseSize);\n        // vec2 d = pixelCoord * noiseSize * vec2(1024.0 + seed * 512.0, 1024.0 - seed * 512.0);\n        // float _noise = snoise(d) * 0.5;\n        float _noise = rand(pixelCoord * noiseSize * seed) - 0.5;\n        color += _noise * noise;\n    }\n\n    gl_FragColor.rgb = color;\n}\n",be=function(e){function t(t,n){void 0===n&&(n=0),e.call(this,ye,_e),this.uniforms.dimensions=new Float32Array(2),"number"==typeof t?(this.seed=t,t=null):this.seed=n,Object.assign(this,{sepia:.3,noise:.3,noiseSize:1,scratch:.5,scratchDensity:.3,scratchWidth:1,vignetting:.3,vignettingAlpha:1,vignettingBlur:.3},t)}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var n={sepia:{configurable:!0},noise:{configurable:!0},noiseSize:{configurable:!0},scratch:{configurable:!0},scratchDensity:{configurable:!0},scratchWidth:{configurable:!0},vignetting:{configurable:!0},vignettingAlpha:{configurable:!0},vignettingBlur:{configurable:!0}};return t.prototype.apply=function(e,t,n,r){this.uniforms.dimensions[0]=t.filterFrame.width,this.uniforms.dimensions[1]=t.filterFrame.height,this.uniforms.seed=this.seed,e.applyFilter(this,t,n,r)},n.sepia.set=function(e){this.uniforms.sepia=e},n.sepia.get=function(){return this.uniforms.sepia},n.noise.set=function(e){this.uniforms.noise=e},n.noise.get=function(){return this.uniforms.noise},n.noiseSize.set=function(e){this.uniforms.noiseSize=e},n.noiseSize.get=function(){return this.uniforms.noiseSize},n.scratch.set=function(e){this.uniforms.scratch=e},n.scratch.get=function(){return this.uniforms.scratch},n.scratchDensity.set=function(e){this.uniforms.scratchDensity=e},n.scratchDensity.get=function(){return this.uniforms.scratchDensity},n.scratchWidth.set=function(e){this.uniforms.scratchWidth=e},n.scratchWidth.get=function(){return this.uniforms.scratchWidth},n.vignetting.set=function(e){this.uniforms.vignetting=e},n.vignetting.get=function(){return this.uniforms.vignetting},n.vignettingAlpha.set=function(e){this.uniforms.vignettingAlpha=e},n.vignettingAlpha.get=function(){return this.uniforms.vignettingAlpha},n.vignettingBlur.set=function(e){this.uniforms.vignettingBlur=e},n.vignettingBlur.get=function(){return this.uniforms.vignettingBlur},Object.defineProperties(t.prototype,n),t}(t.Filter),Ce=a,Se="varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform vec2 thickness;\nuniform vec4 outlineColor;\nuniform vec4 filterClamp;\n\nconst float DOUBLE_PI = 3.14159265358979323846264 * 2.;\n\nvoid main(void) {\n    vec4 ownColor = texture2D(uSampler, vTextureCoord);\n    vec4 curColor;\n    float maxAlpha = 0.;\n    vec2 displaced;\n    for (float angle = 0.; angle <= DOUBLE_PI; angle += ${angleStep}) {\n        displaced.x = vTextureCoord.x + thickness.x * cos(angle);\n        displaced.y = vTextureCoord.y + thickness.y * sin(angle);\n        curColor = texture2D(uSampler, clamp(displaced, filterClamp.xy, filterClamp.zw));\n        maxAlpha = max(maxAlpha, curColor.a);\n    }\n    float resultAlpha = max(maxAlpha, ownColor.a);\n    gl_FragColor = vec4((ownColor.rgb + outlineColor.rgb * (1. - ownColor.a)) * resultAlpha, resultAlpha);\n}\n",Fe=function(e){function t(n,r,o){void 0===n&&(n=1),void 0===r&&(r=0),void 0===o&&(o=.1);var i=Math.max(o*t.MAX_SAMPLES,t.MIN_SAMPLES),l=(2*Math.PI/i).toFixed(7);e.call(this,Ce,Se.replace(/\$\{angleStep\}/,l)),this.uniforms.thickness=new Float32Array([0,0]),this.thickness=n,this.uniforms.outlineColor=new Float32Array([0,0,0,1]),this.color=r,this.quality=o}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var n={color:{configurable:!0}};return t.prototype.apply=function(e,t,n,r){this.uniforms.thickness[0]=this.thickness/t._frame.width,this.uniforms.thickness[1]=this.thickness/t._frame.height,e.applyFilter(this,t,n,r)},n.color.get=function(){return o.rgb2hex(this.uniforms.outlineColor)},n.color.set=function(e){o.hex2rgb(e,this.uniforms.outlineColor)},Object.defineProperties(t.prototype,n),t}(t.Filter);Fe.MIN_SAMPLES=1,Fe.MAX_SAMPLES=100;var ze=a,Ae="precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform vec2 size;\nuniform sampler2D uSampler;\n\nuniform vec4 filterArea;\n\nvec2 mapCoord( vec2 coord )\n{\n    coord *= filterArea.xy;\n    coord += filterArea.zw;\n\n    return coord;\n}\n\nvec2 unmapCoord( vec2 coord )\n{\n    coord -= filterArea.zw;\n    coord /= filterArea.xy;\n\n    return coord;\n}\n\nvec2 pixelate(vec2 coord, vec2 size)\n{\n\treturn floor( coord / size ) * size;\n}\n\nvoid main(void)\n{\n    vec2 coord = mapCoord(vTextureCoord);\n\n    coord = pixelate(coord, size);\n\n    coord = unmapCoord(coord);\n\n    gl_FragColor = texture2D(uSampler, coord);\n}\n",we=function(e){function t(t){void 0===t&&(t=10),e.call(this,ze,Ae),this.size=t}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var n={size:{configurable:!0}};return n.size.get=function(){return this.uniforms.size},n.size.set=function(e){"number"==typeof e&&(e=[e,e]),this.uniforms.size=e},Object.defineProperties(t.prototype,n),t}(t.Filter),Te=a,Oe="varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\n\nuniform float uRadian;\nuniform vec2 uCenter;\nuniform float uRadius;\nuniform int uKernelSize;\n\nconst int MAX_KERNEL_SIZE = 2048;\n\nvoid main(void)\n{\n    vec4 color = texture2D(uSampler, vTextureCoord);\n\n    if (uKernelSize == 0)\n    {\n        gl_FragColor = color;\n        return;\n    }\n\n    float aspect = filterArea.y / filterArea.x;\n    vec2 center = uCenter.xy / filterArea.xy;\n    float gradient = uRadius / filterArea.x * 0.3;\n    float radius = uRadius / filterArea.x - gradient * 0.5;\n    int k = uKernelSize - 1;\n\n    vec2 coord = vTextureCoord;\n    vec2 dir = vec2(center - coord);\n    float dist = length(vec2(dir.x, dir.y * aspect));\n\n    float radianStep = uRadian;\n    if (radius >= 0.0 && dist > radius) {\n        float delta = dist - radius;\n        float gap = gradient;\n        float scale = 1.0 - abs(delta / gap);\n        if (scale <= 0.0) {\n            gl_FragColor = color;\n            return;\n        }\n        radianStep *= scale;\n    }\n    radianStep /= float(k);\n\n    float s = sin(radianStep);\n    float c = cos(radianStep);\n    mat2 rotationMatrix = mat2(vec2(c, -s), vec2(s, c));\n\n    for(int i = 0; i < MAX_KERNEL_SIZE - 1; i++) {\n        if (i == k) {\n            break;\n        }\n\n        coord -= center;\n        coord.y *= aspect;\n        coord = rotationMatrix * coord;\n        coord.y /= aspect;\n        coord += center;\n\n        vec4 sample = texture2D(uSampler, coord);\n\n        // switch to pre-multiplied alpha to correctly blur transparent images\n        // sample.rgb *= sample.a;\n\n        color += sample;\n    }\n\n    gl_FragColor = color / float(uKernelSize);\n}\n",De=function(e){function t(t,n,r,o){void 0===t&&(t=0),void 0===n&&(n=[0,0]),void 0===r&&(r=5),void 0===o&&(o=-1),e.call(this,Te,Oe),this._angle=0,this.angle=t,this.center=n,this.kernelSize=r,this.radius=o}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var n={angle:{configurable:!0},center:{configurable:!0},radius:{configurable:!0}};return t.prototype.apply=function(e,t,n,r){this.uniforms.uKernelSize=0!==this._angle?this.kernelSize:0,e.applyFilter(this,t,n,r)},n.angle.set=function(e){this._angle=e,this.uniforms.uRadian=e*Math.PI/180},n.angle.get=function(){return this._angle},n.center.get=function(){return this.uniforms.uCenter},n.center.set=function(e){this.uniforms.uCenter=e},n.radius.get=function(){return this.uniforms.uRadius},n.radius.set=function(e){(e<0||e===1/0)&&(e=-1),this.uniforms.uRadius=e},Object.defineProperties(t.prototype,n),t}(t.Filter),Pe=a,Me="varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\n\nuniform vec4 filterArea;\nuniform vec4 filterClamp;\nuniform vec2 dimensions;\n\nuniform bool mirror;\nuniform float boundary;\nuniform vec2 amplitude;\nuniform vec2 waveLength;\nuniform vec2 alpha;\nuniform float time;\n\nfloat rand(vec2 co) {\n    return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);\n}\n\nvoid main(void)\n{\n    vec2 pixelCoord = vTextureCoord.xy * filterArea.xy;\n    vec2 coord = pixelCoord / dimensions;\n\n    if (coord.y < boundary) {\n        gl_FragColor = texture2D(uSampler, vTextureCoord);\n        return;\n    }\n\n    float k = (coord.y - boundary) / (1. - boundary + 0.0001);\n    float areaY = boundary * dimensions.y / filterArea.y;\n    float v = areaY + areaY - vTextureCoord.y;\n    float y = mirror ? v : vTextureCoord.y;\n\n    float _amplitude = ((amplitude.y - amplitude.x) * k + amplitude.x ) / filterArea.x;\n    float _waveLength = ((waveLength.y - waveLength.x) * k + waveLength.x) / filterArea.y;\n    float _alpha = (alpha.y - alpha.x) * k + alpha.x;\n\n    float x = vTextureCoord.x + cos(v * 6.28 / _waveLength - time) * _amplitude;\n    x = clamp(x, filterClamp.x, filterClamp.z);\n\n    vec4 color = texture2D(uSampler, vec2(x, y));\n\n    gl_FragColor = color * _alpha;\n}\n",Re=function(e){function t(t){e.call(this,Pe,Me),this.uniforms.amplitude=new Float32Array(2),this.uniforms.waveLength=new Float32Array(2),this.uniforms.alpha=new Float32Array(2),this.uniforms.dimensions=new Float32Array(2),Object.assign(this,{mirror:!0,boundary:.5,amplitude:[0,20],waveLength:[30,100],alpha:[1,1],time:0},t)}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var n={mirror:{configurable:!0},boundary:{configurable:!0},amplitude:{configurable:!0},waveLength:{configurable:!0},alpha:{configurable:!0}};return t.prototype.apply=function(e,t,n,r){this.uniforms.dimensions[0]=t.filterFrame.width,this.uniforms.dimensions[1]=t.filterFrame.height,this.uniforms.time=this.time,e.applyFilter(this,t,n,r)},n.mirror.set=function(e){this.uniforms.mirror=e},n.mirror.get=function(){return this.uniforms.mirror},n.boundary.set=function(e){this.uniforms.boundary=e},n.boundary.get=function(){return this.uniforms.boundary},n.amplitude.set=function(e){this.uniforms.amplitude[0]=e[0],this.uniforms.amplitude[1]=e[1]},n.amplitude.get=function(){return this.uniforms.amplitude},n.waveLength.set=function(e){this.uniforms.waveLength[0]=e[0],this.uniforms.waveLength[1]=e[1]},n.waveLength.get=function(){return this.uniforms.waveLength},n.alpha.set=function(e){this.uniforms.alpha[0]=e[0],this.uniforms.alpha[1]=e[1]},n.alpha.get=function(){return this.uniforms.alpha},Object.defineProperties(t.prototype,n),t}(t.Filter),ke=a,je="precision mediump float;\n\nvarying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\nuniform vec2 red;\nuniform vec2 green;\nuniform vec2 blue;\n\nvoid main(void)\n{\n   gl_FragColor.r = texture2D(uSampler, vTextureCoord + red/filterArea.xy).r;\n   gl_FragColor.g = texture2D(uSampler, vTextureCoord + green/filterArea.xy).g;\n   gl_FragColor.b = texture2D(uSampler, vTextureCoord + blue/filterArea.xy).b;\n   gl_FragColor.a = texture2D(uSampler, vTextureCoord).a;\n}\n",Ee=function(e){function t(t,n,r){void 0===t&&(t=[-10,0]),void 0===n&&(n=[0,10]),void 0===r&&(r=[0,0]),e.call(this,ke,je),this.red=t,this.green=n,this.blue=r}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var n={red:{configurable:!0},green:{configurable:!0},blue:{configurable:!0}};return n.red.get=function(){return this.uniforms.red},n.red.set=function(e){this.uniforms.red=e},n.green.get=function(){return this.uniforms.green},n.green.set=function(e){this.uniforms.green=e},n.blue.get=function(){return this.uniforms.blue},n.blue.set=function(e){this.uniforms.blue=e},Object.defineProperties(t.prototype,n),t}(t.Filter),Le=a,Ie="varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\nuniform vec4 filterClamp;\n\nuniform vec2 center;\n\nuniform float amplitude;\nuniform float wavelength;\n// uniform float power;\nuniform float brightness;\nuniform float speed;\nuniform float radius;\n\nuniform float time;\n\nconst float PI = 3.14159;\n\nvoid main()\n{\n    float halfWavelength = wavelength * 0.5 / filterArea.x;\n    float maxRadius = radius / filterArea.x;\n    float currentRadius = time * speed / filterArea.x;\n\n    float fade = 1.0;\n\n    if (maxRadius > 0.0) {\n        if (currentRadius > maxRadius) {\n            gl_FragColor = texture2D(uSampler, vTextureCoord);\n            return;\n        }\n        fade = 1.0 - pow(currentRadius / maxRadius, 2.0);\n    }\n\n    vec2 dir = vec2(vTextureCoord - center / filterArea.xy);\n    dir.y *= filterArea.y / filterArea.x;\n    float dist = length(dir);\n\n    if (dist <= 0.0 || dist < currentRadius - halfWavelength || dist > currentRadius + halfWavelength) {\n        gl_FragColor = texture2D(uSampler, vTextureCoord);\n        return;\n    }\n\n    vec2 diffUV = normalize(dir);\n\n    float diff = (dist - currentRadius) / halfWavelength;\n\n    float p = 1.0 - pow(abs(diff), 2.0);\n\n    // float powDiff = diff * pow(p, 2.0) * ( amplitude * fade );\n    float powDiff = 1.25 * sin(diff * PI) * p * ( amplitude * fade );\n\n    vec2 offset = diffUV * powDiff / filterArea.xy;\n\n    // Do clamp :\n    vec2 coord = vTextureCoord + offset;\n    vec2 clampedCoord = clamp(coord, filterClamp.xy, filterClamp.zw);\n    vec4 color = texture2D(uSampler, clampedCoord);\n    if (coord != clampedCoord) {\n        color *= max(0.0, 1.0 - length(coord - clampedCoord));\n    }\n\n    // No clamp :\n    // gl_FragColor = texture2D(uSampler, vTextureCoord + offset);\n\n    color.rgb *= 1.0 + (brightness - 1.0) * p * fade;\n\n    gl_FragColor = color;\n}\n",Xe=function(e){function t(t,n,r){void 0===t&&(t=[0,0]),void 0===n&&(n={}),void 0===r&&(r=0),e.call(this,Le,Ie),this.center=t,Array.isArray(n)&&(console.warn("Deprecated Warning: ShockwaveFilter params Array has been changed to options Object."),n={}),n=Object.assign({amplitude:30,wavelength:160,brightness:1,speed:500,radius:-1},n),this.amplitude=n.amplitude,this.wavelength=n.wavelength,this.brightness=n.brightness,this.speed=n.speed,this.radius=n.radius,this.time=r}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var n={center:{configurable:!0},amplitude:{configurable:!0},wavelength:{configurable:!0},brightness:{configurable:!0},speed:{configurable:!0},radius:{configurable:!0}};return t.prototype.apply=function(e,t,n,r){this.uniforms.time=this.time,e.applyFilter(this,t,n,r)},n.center.get=function(){return this.uniforms.center},n.center.set=function(e){this.uniforms.center=e},n.amplitude.get=function(){return this.uniforms.amplitude},n.amplitude.set=function(e){this.uniforms.amplitude=e},n.wavelength.get=function(){return this.uniforms.wavelength},n.wavelength.set=function(e){this.uniforms.wavelength=e},n.brightness.get=function(){return this.uniforms.brightness},n.brightness.set=function(e){this.uniforms.brightness=e},n.speed.get=function(){return this.uniforms.speed},n.speed.set=function(e){this.uniforms.speed=e},n.radius.get=function(){return this.uniforms.radius},n.radius.set=function(e){this.uniforms.radius=e},Object.defineProperties(t.prototype,n),t}(t.Filter),Be=a,Ne="varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform sampler2D uLightmap;\nuniform vec4 filterArea;\nuniform vec2 dimensions;\nuniform vec4 ambientColor;\nvoid main() {\n    vec4 diffuseColor = texture2D(uSampler, vTextureCoord);\n    vec2 lightCoord = (vTextureCoord * filterArea.xy) / dimensions;\n    vec4 light = texture2D(uLightmap, lightCoord);\n    vec3 ambient = ambientColor.rgb * ambientColor.a;\n    vec3 intensity = ambient + light.rgb;\n    vec3 finalColor = diffuseColor.rgb * intensity;\n    gl_FragColor = vec4(finalColor, diffuseColor.a);\n}\n",Ge=function(e){function t(t,n,r){void 0===n&&(n=0),void 0===r&&(r=1),e.call(this,Be,Ne),this.uniforms.dimensions=new Float32Array(2),this.uniforms.ambientColor=new Float32Array([0,0,0,r]),this.texture=t,this.color=n}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var n={texture:{configurable:!0},color:{configurable:!0},alpha:{configurable:!0}};return t.prototype.apply=function(e,t,n,r){this.uniforms.dimensions[0]=t.filterFrame.width,this.uniforms.dimensions[1]=t.filterFrame.height,e.applyFilter(this,t,n,r)},n.texture.get=function(){return this.uniforms.uLightmap},n.texture.set=function(e){this.uniforms.uLightmap=e},n.color.set=function(e){var t=this.uniforms.ambientColor;"number"==typeof e?(o.hex2rgb(e,t),this._color=e):(t[0]=e[0],t[1]=e[1],t[2]=e[2],t[3]=e[3],this._color=o.rgb2hex(t))},n.color.get=function(){return this._color},n.alpha.get=function(){return this.uniforms.ambientColor[3]},n.alpha.set=function(e){this.uniforms.ambientColor[3]=e},Object.defineProperties(t.prototype,n),t}(t.Filter),qe=a,We="varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float blur;\nuniform float gradientBlur;\nuniform vec2 start;\nuniform vec2 end;\nuniform vec2 delta;\nuniform vec2 texSize;\n\nfloat random(vec3 scale, float seed)\n{\n    return fract(sin(dot(gl_FragCoord.xyz + seed, scale)) * 43758.5453 + seed);\n}\n\nvoid main(void)\n{\n    vec4 color = vec4(0.0);\n    float total = 0.0;\n\n    float offset = random(vec3(12.9898, 78.233, 151.7182), 0.0);\n    vec2 normal = normalize(vec2(start.y - end.y, end.x - start.x));\n    float radius = smoothstep(0.0, 1.0, abs(dot(vTextureCoord * texSize - start, normal)) / gradientBlur) * blur;\n\n    for (float t = -30.0; t <= 30.0; t++)\n    {\n        float percent = (t + offset - 0.5) / 30.0;\n        float weight = 1.0 - abs(percent);\n        vec4 sample = texture2D(uSampler, vTextureCoord + delta / texSize * percent * radius);\n        sample.rgb *= sample.a;\n        color += sample * weight;\n        total += weight;\n    }\n\n    color /= total;\n    color.rgb /= color.a + 0.00001;\n\n    gl_FragColor = color;\n}\n",Ke=function(e){function t(t,r,o,i){void 0===t&&(t=100),void 0===r&&(r=600),void 0===o&&(o=null),void 0===i&&(i=null),e.call(this,qe,We),this.uniforms.blur=t,this.uniforms.gradientBlur=r,this.uniforms.start=o||new n.Point(0,window.innerHeight/2),this.uniforms.end=i||new n.Point(600,window.innerHeight/2),this.uniforms.delta=new n.Point(30,30),this.uniforms.texSize=new n.Point(1024,1024),this.updateDelta()}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var r={blur:{configurable:!0},gradientBlur:{configurable:!0},start:{configurable:!0},end:{configurable:!0}};return t.prototype.updateDelta=function(){this.uniforms.delta.x=0,this.uniforms.delta.y=0},r.blur.get=function(){return this.uniforms.blur},r.blur.set=function(e){this.uniforms.blur=e},r.gradientBlur.get=function(){return this.uniforms.gradientBlur},r.gradientBlur.set=function(e){this.uniforms.gradientBlur=e},r.start.get=function(){return this.uniforms.start},r.start.set=function(e){this.uniforms.start=e,this.updateDelta()},r.end.get=function(){return this.uniforms.end},r.end.set=function(e){this.uniforms.end=e,this.updateDelta()},Object.defineProperties(t.prototype,r),t}(t.Filter),Ye=function(e){function t(){e.apply(this,arguments)}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.updateDelta=function(){var e=this.uniforms.end.x-this.uniforms.start.x,t=this.uniforms.end.y-this.uniforms.start.y,n=Math.sqrt(e*e+t*t);this.uniforms.delta.x=e/n,this.uniforms.delta.y=t/n},t}(Ke),Ze=function(e){function t(){e.apply(this,arguments)}return e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t,t.prototype.updateDelta=function(){var e=this.uniforms.end.x-this.uniforms.start.x,t=this.uniforms.end.y-this.uniforms.start.y,n=Math.sqrt(e*e+t*t);this.uniforms.delta.x=-t/n,this.uniforms.delta.y=e/n},t}(Ke),Qe=function(e){function t(t,n,r,o){void 0===t&&(t=100),void 0===n&&(n=600),void 0===r&&(r=null),void 0===o&&(o=null),e.call(this),this.tiltShiftXFilter=new Ye(t,n,r,o),this.tiltShiftYFilter=new Ze(t,n,r,o)}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var n={blur:{configurable:!0},gradientBlur:{configurable:!0},start:{configurable:!0},end:{configurable:!0}};return t.prototype.apply=function(e,t,n){var r=e.getFilterTexture();this.tiltShiftXFilter.apply(e,t,r),this.tiltShiftYFilter.apply(e,r,n),e.returnFilterTexture(r)},n.blur.get=function(){return this.tiltShiftXFilter.blur},n.blur.set=function(e){this.tiltShiftXFilter.blur=this.tiltShiftYFilter.blur=e},n.gradientBlur.get=function(){return this.tiltShiftXFilter.gradientBlur},n.gradientBlur.set=function(e){this.tiltShiftXFilter.gradientBlur=this.tiltShiftYFilter.gradientBlur=e},n.start.get=function(){return this.tiltShiftXFilter.start},n.start.set=function(e){this.tiltShiftXFilter.start=this.tiltShiftYFilter.start=e},n.end.get=function(){return this.tiltShiftXFilter.end},n.end.set=function(e){this.tiltShiftXFilter.end=this.tiltShiftYFilter.end=e},Object.defineProperties(t.prototype,n),t}(t.Filter),Ue=a,Ve="varying vec2 vTextureCoord;\n\nuniform sampler2D uSampler;\nuniform float radius;\nuniform float angle;\nuniform vec2 offset;\nuniform vec4 filterArea;\n\nvec2 mapCoord( vec2 coord )\n{\n    coord *= filterArea.xy;\n    coord += filterArea.zw;\n\n    return coord;\n}\n\nvec2 unmapCoord( vec2 coord )\n{\n    coord -= filterArea.zw;\n    coord /= filterArea.xy;\n\n    return coord;\n}\n\nvec2 twist(vec2 coord)\n{\n    coord -= offset;\n\n    float dist = length(coord);\n\n    if (dist < radius)\n    {\n        float ratioDist = (radius - dist) / radius;\n        float angleMod = ratioDist * ratioDist * angle;\n        float s = sin(angleMod);\n        float c = cos(angleMod);\n        coord = vec2(coord.x * c - coord.y * s, coord.x * s + coord.y * c);\n    }\n\n    coord += offset;\n\n    return coord;\n}\n\nvoid main(void)\n{\n\n    vec2 coord = mapCoord(vTextureCoord);\n\n    coord = twist(coord);\n\n    coord = unmapCoord(coord);\n\n    gl_FragColor = texture2D(uSampler, coord );\n\n}\n",He=function(e){function t(t,n,r){void 0===t&&(t=200),void 0===n&&(n=4),void 0===r&&(r=20),e.call(this,Ue,Ve),this.radius=t,this.angle=n,this.padding=r}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var n={offset:{configurable:!0},radius:{configurable:!0},angle:{configurable:!0}};return n.offset.get=function(){return this.uniforms.offset},n.offset.set=function(e){this.uniforms.offset=e},n.radius.get=function(){return this.uniforms.radius},n.radius.set=function(e){this.uniforms.radius=e},n.angle.get=function(){return this.uniforms.angle},n.angle.set=function(e){this.uniforms.angle=e},Object.defineProperties(t.prototype,n),t}(t.Filter),$e=a,Je="varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\n\nuniform vec2 uCenter;\nuniform float uStrength;\nuniform float uInnerRadius;\nuniform float uRadius;\n\nconst float MAX_KERNEL_SIZE = 32.0;\n\n// author: http://byteblacksmith.com/improvements-to-the-canonical-one-liner-glsl-rand-for-opengl-es-2-0/\nhighp float rand(vec2 co, float seed) {\n    const highp float a = 12.9898, b = 78.233, c = 43758.5453;\n    highp float dt = dot(co + seed, vec2(a, b)), sn = mod(dt, 3.14159);\n    return fract(sin(sn) * c + seed);\n}\n\nvoid main() {\n\n    float minGradient = uInnerRadius * 0.3;\n    float innerRadius = (uInnerRadius + minGradient * 0.5) / filterArea.x;\n\n    float gradient = uRadius * 0.3;\n    float radius = (uRadius - gradient * 0.5) / filterArea.x;\n\n    float countLimit = MAX_KERNEL_SIZE;\n\n    vec2 dir = vec2(uCenter.xy / filterArea.xy - vTextureCoord);\n    float dist = length(vec2(dir.x, dir.y * filterArea.y / filterArea.x));\n\n    float strength = uStrength;\n\n    float delta = 0.0;\n    float gap;\n    if (dist < innerRadius) {\n        delta = innerRadius - dist;\n        gap = minGradient;\n    } else if (radius >= 0.0 && dist > radius) { // radius < 0 means it's infinity\n        delta = dist - radius;\n        gap = gradient;\n    }\n\n    if (delta > 0.0) {\n        float normalCount = gap / filterArea.x;\n        delta = (normalCount - delta) / normalCount;\n        countLimit *= delta;\n        strength *= delta;\n        if (countLimit < 1.0)\n        {\n            gl_FragColor = texture2D(uSampler, vTextureCoord);\n            return;\n        }\n    }\n\n    // randomize the lookup values to hide the fixed number of samples\n    float offset = rand(vTextureCoord, 0.0);\n\n    float total = 0.0;\n    vec4 color = vec4(0.0);\n\n    dir *= strength;\n\n    for (float t = 0.0; t < MAX_KERNEL_SIZE; t++) {\n        float percent = (t + offset) / MAX_KERNEL_SIZE;\n        float weight = 4.0 * (percent - percent * percent);\n        vec2 p = vTextureCoord + dir * percent;\n        vec4 sample = texture2D(uSampler, p);\n\n        // switch to pre-multiplied alpha to correctly blur transparent images\n        // sample.rgb *= sample.a;\n\n        color += sample * weight;\n        total += weight;\n\n        if (t > countLimit){\n            break;\n        }\n    }\n\n    color /= total;\n    // switch back from pre-multiplied alpha\n    // color.rgb /= color.a + 0.00001;\n\n    gl_FragColor = color;\n}\n",et=function(e){function t(t){if(e.call(this,$e,Je),"object"!=typeof t){var n=arguments[0],r=arguments[1],o=arguments[2],i=arguments[3];t={},void 0!==n&&(t.strength=n),void 0!==r&&(t.center=r),void 0!==o&&(t.innerRadius=o),void 0!==i&&(t.radius=i)}Object.assign(this,{strength:.1,center:[0,0],innerRadius:0,radius:-1},t)}e&&(t.__proto__=e),t.prototype=Object.create(e&&e.prototype),t.prototype.constructor=t;var n={center:{configurable:!0},strength:{configurable:!0},innerRadius:{configurable:!0},radius:{configurable:!0}};return n.center.get=function(){return this.uniforms.uCenter},n.center.set=function(e){this.uniforms.uCenter=e},n.strength.get=function(){return this.uniforms.uStrength},n.strength.set=function(e){this.uniforms.uStrength=e},n.innerRadius.get=function(){return this.uniforms.uInnerRadius},n.innerRadius.set=function(e){this.uniforms.uInnerRadius=e},n.radius.get=function(){return this.uniforms.uRadius},n.radius.set=function(e){(e<0||e===1/0)&&(e=-1),this.uniforms.uRadius=e},Object.defineProperties(t.prototype,n),t}(t.Filter);return e.AdjustmentFilter=c,e.AdvancedBloomFilter=y,e.AsciiFilter=C,e.BevelFilter=z,e.BloomFilter=A,e.BulgePinchFilter=O,e.CRTFilter=Z,e.ColorMapFilter=M,e.ColorOverlayFilter=j,e.ColorReplaceFilter=I,e.ConvolutionFilter=N,e.CrossHatchFilter=W,e.DotFilter=V,e.DropShadowFilter=J,e.EmbossFilter=ne,e.GlitchFilter=ie,e.GlowFilter=ae,e.GodrayFilter=he,e.KawaseBlurFilter=d,e.MotionBlurFilter=me,e.MultiColorReplaceFilter=xe,e.OldFilmFilter=be,e.OutlineFilter=Fe,e.PixelateFilter=we,e.RGBSplitFilter=Ee,e.RadialBlurFilter=De,e.ReflectionFilter=Re,e.ShockwaveFilter=Xe,e.SimpleLightmapFilter=Ge,e.TiltShiftAxisFilter=Ke,e.TiltShiftFilter=Qe,e.TiltShiftXFilter=Ye,e.TiltShiftYFilter=Ze,e.TwistFilter=He,e.ZoomBlurFilter=et,e}({},PIXI,PIXI,PIXI,PIXI.utils,PIXI,PIXI.filters,PIXI.filters);Object.assign(PIXI.filters,__filters);
/*# sourceMappingURL=pixi-filters.js.map*/



// Tsukimi-customized pixi-Godray Filter
/*!
 * @pixi/filter-godray - v3.1.0
 * Compiled Wed, 11 Mar 2020 20:38:18 UTC
 *
 * @pixi/filter-godray is licensed under the MIT License.
 * http://www.opensource.org/licenses/mit-license
 */
var __filters=function(n,e,t){"use strict";var i="attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\n\nuniform mat3 projectionMatrix;\n\nvarying vec2 vTextureCoord;\n\nvoid main(void)\n{\n    gl_Position = vec4((projectionMatrix * vec3(aVertexPosition, 1.0)).xy, 0.0, 1.0);\n    vTextureCoord = aTextureCoord;\n}",o="vec3 mod289(vec3 x)\n{\n    return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\nvec4 mod289(vec4 x)\n{\n    return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\nvec4 permute(vec4 x)\n{\n    return mod289(((x * 34.0) + 1.0) * x);\n}\nvec4 taylorInvSqrt(vec4 r)\n{\n    return 1.79284291400159 - 0.85373472095314 * r;\n}\nvec3 fade(vec3 t)\n{\n    return t * t * t * (t * (t * 6.0 - 15.0) + 10.0);\n}\n// Classic Perlin noise, periodic variant\nfloat pnoise(vec3 P, vec3 rep)\n{\n    vec3 Pi0 = mod(floor(P), rep); // Integer part, modulo period\n    vec3 Pi1 = mod(Pi0 + vec3(1.0), rep); // Integer part + 1, mod period\n    Pi0 = mod289(Pi0);\n    Pi1 = mod289(Pi1);\n    vec3 Pf0 = fract(P); // Fractional part for interpolation\n    vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0\n    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);\n    vec4 iy = vec4(Pi0.yy, Pi1.yy);\n    vec4 iz0 = Pi0.zzzz;\n    vec4 iz1 = Pi1.zzzz;\n    vec4 ixy = permute(permute(ix) + iy);\n    vec4 ixy0 = permute(ixy + iz0);\n    vec4 ixy1 = permute(ixy + iz1);\n    vec4 gx0 = ixy0 * (1.0 / 7.0);\n    vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;\n    gx0 = fract(gx0);\n    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);\n    vec4 sz0 = step(gz0, vec4(0.0));\n    gx0 -= sz0 * (step(0.0, gx0) - 0.5);\n    gy0 -= sz0 * (step(0.0, gy0) - 0.5);\n    vec4 gx1 = ixy1 * (1.0 / 7.0);\n    vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;\n    gx1 = fract(gx1);\n    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);\n    vec4 sz1 = step(gz1, vec4(0.0));\n    gx1 -= sz1 * (step(0.0, gx1) - 0.5);\n    gy1 -= sz1 * (step(0.0, gy1) - 0.5);\n    vec3 g000 = vec3(gx0.x, gy0.x, gz0.x);\n    vec3 g100 = vec3(gx0.y, gy0.y, gz0.y);\n    vec3 g010 = vec3(gx0.z, gy0.z, gz0.z);\n    vec3 g110 = vec3(gx0.w, gy0.w, gz0.w);\n    vec3 g001 = vec3(gx1.x, gy1.x, gz1.x);\n    vec3 g101 = vec3(gx1.y, gy1.y, gz1.y);\n    vec3 g011 = vec3(gx1.z, gy1.z, gz1.z);\n    vec3 g111 = vec3(gx1.w, gy1.w, gz1.w);\n    vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));\n    g000 *= norm0.x;\n    g010 *= norm0.y;\n    g100 *= norm0.z;\n    g110 *= norm0.w;\n    vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));\n    g001 *= norm1.x;\n    g011 *= norm1.y;\n    g101 *= norm1.z;\n    g111 *= norm1.w;\n    float n000 = dot(g000, Pf0);\n    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));\n    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));\n    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));\n    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));\n    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));\n    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));\n    float n111 = dot(g111, Pf1);\n    vec3 fade_xyz = fade(Pf0);\n    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);\n    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);\n    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);\n    return 2.2 * n_xyz;\n}\nfloat turb(vec3 P, vec3 rep, float lacunarity, float gain)\n{\n    float sum = 0.0;\n    float sc = 1.0;\n    float totalgain = 1.0;\n    for (float i = 0.0; i < 6.0; i++)\n    {\n        sum += totalgain * pnoise(P * sc, rep);\n        sc *= lacunarity;\n        totalgain *= gain;\n    }\n    return abs(sum);\n}\n",r="varying vec2 vTextureCoord;\nuniform sampler2D uSampler;\nuniform vec4 filterArea;\nuniform vec2 dimensions;\n\nuniform vec2 light;\nuniform bool parallel;\nuniform float aspect;\n\nuniform float gain;\nuniform float lacunarity;\nuniform float time;\nuniform float strength;\n\n${perlin}\n\nvoid main(void) {\n    vec2 coord = vTextureCoord * filterArea.xy / dimensions.xy;\n\n    float d;\n\n    if (parallel) {\n        float _cos = light.x;\n        float _sin = light.y;\n        d = (_cos * coord.x) + (_sin * coord.y * aspect);\n    } else {\n        float dx = coord.x - light.x / dimensions.x;\n        float dy = (coord.y - light.y / dimensions.y) * aspect;\n        float dis = sqrt(dx * dx + dy * dy) + 0.00001;\n        d = dy / dis;\n    }\n\n    vec3 dir = vec3(d, d, 0.0);\n\n    float noise = turb(dir + vec3(time, 0.0, 62.1 + time) * 0.05, vec3(480.0, 320.0, 480.0), lacunarity, gain);\n    noise = mix(noise, 0.0, 0.3);\n    //fade vertically.\n    vec4 mist = vec4(noise, noise, noise, 0.0) * (1.0 - coord.y);\n    vec4 fragColor = texture2D(uSampler, vTextureCoord);\n    mist *= strength * fragColor.a;\n\n    gl_FragColor = fragColor + mist;}\n",a=function(n){function e(e){n.call(this,i,r.replace("${perlin}",o)),this.uniforms.dimensions=new Float32Array(2),"number"==typeof e&&(console.warn("GodrayFilter now uses options instead of (angle, gain, lacunarity, time, strength)"),e={angle:e},void 0!==arguments[1]&&(e.gain=arguments[1]),void 0!==arguments[2]&&(e.lacunarity=arguments[2]),void 0!==arguments[3]&&(e.time=arguments[3]),void 0!==arguments[4]&&(e.strength=arguments[4])),e=Object.assign({angle:30,gain:.5,lacunarity:2.5,time:0,parallel:!0,center:[0,0],strength:1},e),this._angleLight=new t.Point,this.angle=e.angle,this.gain=e.gain,this.lacunarity=e.lacunarity,this.parallel=e.parallel,this.center=e.center,this.time=e.time,this.strength=e.strength}n&&(e.__proto__=n),e.prototype=Object.create(n&&n.prototype),e.prototype.constructor=e;var a={angle:{configurable:!0},gain:{configurable:!0},lacunarity:{configurable:!0},strength:{configurable:!0}};return e.prototype.apply=function(n,e,t,i){var o=e.filterFrame,r=o.width,a=o.height;this.uniforms.light=this.parallel?this._angleLight:this.center,this.uniforms.parallel=this.parallel,this.uniforms.dimensions[0]=r,this.uniforms.dimensions[1]=a,this.uniforms.aspect=a/r,this.uniforms.time=this.time,n.applyFilter(this,e,t,i)},a.angle.get=function(){return this._angle},a.angle.set=function(n){this._angle=n;var e=n*t.DEG_TO_RAD;this._angleLight.x=Math.cos(e),this._angleLight.y=Math.sin(e)},a.gain.get=function(){return this.uniforms.gain},a.gain.set=function(n){this.uniforms.gain=n},a.lacunarity.get=function(){return this.uniforms.lacunarity},a.lacunarity.set=function(n){this.uniforms.lacunarity=n},a.strength.get=function(){return this.uniforms.strength},a.strength.set=function(n){this.uniforms.strength=n},Object.defineProperties(e.prototype,a),e}(e.Filter);return n.GodrayFilter=a,n}({},PIXI,PIXI);Object.assign(PIXI.filters,__filters);
/*# sourceMappingURL=filter-godray.js.map*/


const _FNMap = Filter_Controller.filterNameMap;
_FNMap["bulgepinch"]     = PIXI.filters.BulgePinchFilter;
_FNMap["radialblur"]     = PIXI.filters.RadialBlurFilter;
_FNMap["godray"]         = PIXI.filters.GodrayFilter;
_FNMap["ascii"]          = PIXI.filters.AsciiFilter;
_FNMap["crosshatch"]     = PIXI.filters.CrossHatchFilter;
_FNMap["dot"]            = PIXI.filters.DotFilter;
_FNMap["emboss"]         = PIXI.filters.EmbossFilter;
_FNMap["shockwave"]      = PIXI.filters.ShockwaveFilter;
_FNMap["twist"]          = PIXI.filters.TwistFilter;
_FNMap["zoomblur"]       = PIXI.filters.ZoomBlurFilter;
_FNMap["noise"]          = PIXI.filters.NoiseFilter;
_FNMap["blur"]           = PIXI.filters.KawaseBlurFilter; // -> KawaseBlur: fast!
_FNMap["oldfilm"]        = PIXI.filters.OldFilmFilter;
_FNMap["rgbsplit"]       = PIXI.filters.RGBSplitFilter;
_FNMap["bloom"]          = PIXI.filters.AdvancedBloomFilter;
_FNMap["godray-np"]      = PIXI.filters.GodrayFilter;
_FNMap["adjustment"]     = PIXI.filters.AdjustmentFilter;
_FNMap["pixelate"]       = PIXI.filters.PixelateFilter;
_FNMap["crt"]            = PIXI.filters.CRTFilter;
_FNMap["reflection-m"]   = PIXI.filters.ReflectionFilter;
_FNMap["reflection-w"]   = PIXI.filters.ReflectionFilter;
_FNMap["motionblur"]     = PIXI.filters.MotionBlurFilter;
_FNMap["glow"]           = PIXI.filters.GlowFilter;
_FNMap["displacement"]   = PIXI.filters.DisplacementFilter;
// added 2020/08/23
_FNMap["bevel"]          = PIXI.filters.BevelFilter;
_FNMap["tiltshift"]      = PIXI.filters.TiltShiftFilter;
_FNMap["glitch"]         = PIXI.filters.GlitchFilter;
// some bugs exists in current version
// Outline Filter
// Simple Lightmap Filter
