window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
        o = b;
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  BaseComponent: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "bfe05dKAEFI9phoRlvezhXR", "BaseComponent");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.BaseComponent = void 0;
    var ccclass = cc._decorator.ccclass;
    var BaseComponent = function(_super) {
      __extends(BaseComponent, _super);
      function BaseComponent() {
        var _this = _super.call(this) || this;
        _this.vs = cc.view.getVisibleSize();
        return _this;
      }
      BaseComponent.prototype.setFontSize = function(size) {
        var vs = cc.view.getVisibleSize();
        var newSize = size;
        vs.width < 800 && (newSize = .8 * size);
        vs.width < 500 && (newSize = .5 * size);
        return newSize;
      };
      BaseComponent.prototype.setWidth = function(size) {
        return this.vs.width * (size / 1080);
      };
      BaseComponent.prototype.setHeight = function(size) {
        return this.vs.height * (size / 1920);
      };
      BaseComponent = __decorate([ ccclass ], BaseComponent);
      return BaseComponent;
    }(cc.Component);
    exports.BaseComponent = BaseComponent;
    cc._RF.pop();
  }, {} ],
  BlastBoardComponent: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "45399p4gzNOCIo/o4oK1BTo", "BlastBoardComponent");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.BlastBoardComponent = void 0;
    var BlastBoardView_1 = require("./BoardView/BlastBoardView");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var BlastBoardComponent = function(_super) {
      __extends(BlastBoardComponent, _super);
      function BlastBoardComponent() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.manualLayout = false;
        _this.gap = 0;
        _this.padding = 20;
        _this.drawFallbackBackground = true;
        _this.tilesRoot = null;
        _this.tileSpriteFrame = null;
        _this.boardBackgroundSprite = null;
        _this.tileSprites = [];
        _this.board = null;
        _this.view = null;
        _this.palette = [];
        _this.onTileClick = null;
        return _this;
      }
      BlastBoardComponent.prototype.onLoad = function() {
        if (0 === this.node.width || 0 === this.node.height) {
          var vs = cc.view.getVisibleSize();
          this.node.width = .75 * vs.width;
          this.node.height = .75 * vs.height;
        }
        this._ensureNodes();
        this.layout();
      };
      BlastBoardComponent.prototype.onEnable = function() {
        cc.view.on("resize", this.layout, this);
      };
      BlastBoardComponent.prototype.onDisable = function() {
        cc.view.off("resize", this.layout, this);
      };
      BlastBoardComponent.prototype.layout = function() {
        this._ensureNodes();
        if (!this.manualLayout && this.tilesRoot) {
          this.tilesRoot.width = this.node.width - 2 * this.padding;
          this.tilesRoot.height = this.node.height - 2 * this.padding;
          this.tilesRoot.setPosition(0, 0);
        }
      };
      BlastBoardComponent.prototype.init = function(opts) {
        var _this = this;
        this.board = opts.board;
        this.palette = opts.palette;
        this.gap = opts.gap;
        this.tileSpriteFrame = opts.tileSpriteFrame || null;
        this.onTileClick = opts.onTileClick;
        this._ensureNodes();
        this.layout();
        this._loadTileSprites(function() {
          _this.view = new BlastBoardView_1.BlastBoardView({
            parent: _this.tilesRoot,
            board: _this.board,
            gap: _this.gap,
            palette: _this.palette,
            tileSpriteFrame: _this.tileSpriteFrame,
            tileSprites: _this.tileSprites,
            backgroundSpriteFrame: _this.boardBackgroundSprite,
            drawFallbackBackground: _this.drawFallbackBackground,
            onTileClick: function(tile) {
              _this.onTileClick && _this.onTileClick(tile);
            }
          });
          _this.view.rebuild();
        });
      };
      BlastBoardComponent.prototype.rebuild = function() {
        if (!this.view) return;
        this.view.rebuild();
      };
      BlastBoardComponent.prototype.getWorldPositionForCell = function(row, col) {
        if (!this.view) return null;
        return this.view.getWorldPositionForCell(row, col);
      };
      BlastBoardComponent.prototype.playStep = function(step, done) {
        if (!this.view) {
          done();
          return;
        }
        this.view.playStep(step, done);
      };
      BlastBoardComponent.prototype._ensureNodes = function() {
        this.tilesRoot || (this.tilesRoot = this.node.getChildByName("Tiles"));
        if (!this.tilesRoot) {
          this.tilesRoot = new cc.Node("Tiles");
          this.node.addChild(this.tilesRoot);
        }
      };
      BlastBoardComponent.prototype._loadTileSprites = function(done) {
        var _this = this;
        var names = [ "block_red", "block_green", "block_blue", "block_yellow", "block_purpure" ];
        var paths = names.map(function(n) {
          return "imgs/" + n;
        });
        var loaded = new Array(paths.length);
        var remaining = paths.length;
        if (0 === remaining) {
          this.tileSprites = [];
          done();
          return;
        }
        paths.forEach(function(path, index) {
          cc.loader.loadRes(path, cc.SpriteFrame, function(err, spriteFrame) {
            err ? cc.error("[BlastBoardComponent] Failed to load tile sprite", path, err) : loaded[index] = spriteFrame;
            remaining--;
            if (0 === remaining) {
              _this.tileSprites = loaded.filter(function(sf) {
                return !!sf;
              });
              done();
            }
          });
        });
      };
      __decorate([ property ], BlastBoardComponent.prototype, "manualLayout", void 0);
      __decorate([ property ], BlastBoardComponent.prototype, "gap", void 0);
      __decorate([ property ], BlastBoardComponent.prototype, "padding", void 0);
      __decorate([ property ], BlastBoardComponent.prototype, "drawFallbackBackground", void 0);
      __decorate([ property(cc.Node) ], BlastBoardComponent.prototype, "tilesRoot", void 0);
      __decorate([ property(cc.SpriteFrame) ], BlastBoardComponent.prototype, "tileSpriteFrame", void 0);
      __decorate([ property(cc.SpriteFrame) ], BlastBoardComponent.prototype, "boardBackgroundSprite", void 0);
      BlastBoardComponent = __decorate([ ccclass ], BlastBoardComponent);
      return BlastBoardComponent;
    }(cc.Component);
    exports.BlastBoardComponent = BlastBoardComponent;
    cc._RF.pop();
  }, {
    "./BoardView/BlastBoardView": "BlastBoardView"
  } ],
  BlastBoardView: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "7b318dpQHpF8pPV/Y5V2fB+", "BlastBoardView");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.BlastBoardView = void 0;
    var BlastBoardView = function() {
      function BlastBoardView(opts) {
        this.backgroundNode = null;
        this.tileWidth = 48;
        this.tileHeight = 48;
        this.verticalOverlap = 0;
        this.nodesById = {};
        this.parent = opts.parent;
        this.board = opts.board;
        this.gap = opts.gap;
        this.palette = opts.palette;
        this.tileSpriteFrame = opts.tileSpriteFrame || null;
        this.tileSprites = opts.tileSprites || null;
        this.backgroundSpriteFrame = opts.backgroundSpriteFrame || null;
        this.drawFallbackBackground = void 0 === opts.drawFallbackBackground || opts.drawFallbackBackground;
        this.onTileClick = opts.onTileClick;
      }
      BlastBoardView.prototype.rebuild = function() {
        var children = this.parent.children.slice();
        for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
          var child = children_1[_i];
          if (this.backgroundNode && child === this.backgroundNode) continue;
          child.destroy();
        }
        this.nodesById = {};
        this._recomputeTileSize();
        this._ensureBackground();
        for (var r = 0; r < this.board.rows; r++) for (var c = 0; c < this.board.cols; c++) {
          var tile = this.board.getTile(r, c);
          if (!tile) continue;
          var node = this._createTileNode(tile);
          node.setPosition(this._cellToPos(r, c));
          this.parent.addChild(node);
          this.nodesById[tile.id] = node;
        }
      };
      BlastBoardView.prototype.playStep = function(step, done) {
        var _this = this;
        var removeDur = .12;
        var fallDur = .18;
        var _loop_1 = function(i) {
          var id = step.removed[i];
          var node = this_1.nodesById[id];
          if (!node) return "continue";
          node.off(cc.Node.EventType.TOUCH_END);
          cc.tween(node).parallel(cc.tween().to(removeDur, {
            scale: .2
          }), cc.tween().to(removeDur, {
            opacity: 0
          })).call(function() {
            node && node.isValid && node.destroy();
            delete _this.nodesById[id];
          }).start();
        };
        var this_1 = this;
        for (var i = 0; i < step.removed.length; i++) _loop_1(i);
        this.parent.runAction(cc.sequence(cc.delayTime(removeDur), cc.callFunc(function() {
          var pending = 0;
          var finishOne = function() {
            pending--;
            pending <= 0 && done();
          };
          for (var i = 0; i < step.moved.length; i++) {
            var m = step.moved[i];
            var node = _this.nodesById[m.id];
            if (!node) continue;
            pending++;
            var toPos = _this._cellToPos(m.move.to.r, m.move.to.c);
            cc.tween(node).to(fallDur, {
              x: toPos.x,
              y: toPos.y
            }, {
              easing: "quadIn"
            }).call(finishOne).start();
          }
          for (var i = 0; i < step.spawned.length; i++) {
            var s = step.spawned[i];
            var tile = _this._findTileById(s.id);
            if (!tile) continue;
            var node = _this._createTileNode(tile);
            var startPos = _this._spawnPosAbove(s.to);
            var endPos = _this._cellToPos(s.to.r, s.to.c);
            node.setPosition(startPos);
            node.opacity = 0;
            _this.parent.addChild(node);
            _this.nodesById[s.id] = node;
            pending++;
            cc.tween(node).parallel(cc.tween().to(fallDur, {
              x: endPos.x,
              y: endPos.y
            }, {
              easing: "quadIn"
            }), cc.tween().to(.08, {
              opacity: 255
            })).call(finishOne).start();
          }
          0 === pending && done();
        })));
      };
      BlastBoardView.prototype.getWorldPositionForCell = function(r, c) {
        if (r < 0 || r >= this.board.rows || c < 0 || c >= this.board.cols) return null;
        var localPos = this._cellToPos(r, c);
        return this.parent.convertToWorldSpaceAR(localPos);
      };
      BlastBoardView.prototype._findTileById = function(id) {
        for (var r = 0; r < this.board.rows; r++) for (var c = 0; c < this.board.cols; c++) {
          var t = this.board.getTile(r, c);
          if (t && t.id === id) return t;
        }
        return null;
      };
      BlastBoardView.prototype._createTileNode = function(tile) {
        var _this = this;
        var node = new cc.Node("tile_" + tile.id);
        node.width = this.tileWidth;
        node.height = this.tileHeight;
        node.opacity = 255;
        var spriteFrame = null;
        if (this.tileSpriteFrame) spriteFrame = this.tileSpriteFrame; else if (this.tileSprites && this.tileSprites.length > 0) {
          var idx = tile.color % this.tileSprites.length;
          spriteFrame = this.tileSprites[idx] || null;
        }
        if (spriteFrame) {
          var sp = node.addComponent(cc.Sprite);
          sp.spriteFrame = spriteFrame;
          var originalSize = spriteFrame.getOriginalSize();
          if (originalSize && originalSize.width > 0 && originalSize.height > 0) {
            var sx = this.tileWidth / originalSize.width;
            var sy = this.tileHeight / originalSize.height;
            var s = Math.min(sx, sy);
            node.width = originalSize.width * s;
            node.height = originalSize.height * s;
          }
          sp.sizeMode = cc.Sprite.SizeMode.CUSTOM;
          node.color = cc.Color.WHITE;
        } else {
          var g = node.addComponent(cc.Graphics);
          var paletteIndex = this.palette.length > 0 ? tile.color % this.palette.length : 0;
          var fillColor = this.palette[paletteIndex] || cc.Color.WHITE;
          g.clear();
          g.fillColor = fillColor;
          var w = this.tileWidth;
          var h = this.tileHeight;
          var radius = .12 * Math.min(w, h);
          g.roundRect(-w / 2, -h / 2, w, h, radius);
          g.fill();
        }
        node.on(cc.Node.EventType.TOUCH_END, function() {
          _this.onTileClick && _this.onTileClick(tile);
        });
        return node;
      };
      BlastBoardView.prototype._recomputeTileSize = function() {
        var w = this.parent.width;
        var h = this.parent.height;
        var cols = this.board.cols;
        var rows = this.board.rows;
        var baseTileWidth = 100;
        var baseTileHeight = 112;
        var baseOverlap = 12;
        var sW = (w - this.gap * (cols - 1)) / (cols * baseTileWidth);
        var numeratorH = h - this.gap * (rows - 1);
        var denomH = baseTileHeight + (rows - 1) * (baseTileHeight - baseOverlap);
        var sH = numeratorH / denomH;
        var scale = Math.min(1, sW, sH);
        (!isFinite(scale) || scale <= 0) && (scale = .1);
        this.tileWidth = baseTileWidth * scale;
        this.tileHeight = baseTileHeight * scale;
        this.verticalOverlap = baseOverlap * scale;
      };
      BlastBoardView.prototype._cellToPos = function(r, c) {
        var stepX = this.tileWidth + this.gap;
        var stepY = this.tileHeight - this.verticalOverlap + this.gap;
        var originX = -(this.board.cols - 1) * stepX / 2;
        var originY = (this.board.rows - 1) * stepY / 2;
        var x = originX + c * stepX;
        var y = originY - r * stepY;
        return cc.v2(x, y);
      };
      BlastBoardView.prototype._spawnPosAbove = function(to) {
        var p = this._cellToPos(to.r, to.c);
        var stepY = this.tileHeight - this.verticalOverlap + this.gap;
        return cc.v2(p.x, p.y + stepY * (.6 * this.board.rows));
      };
      BlastBoardView.prototype._ensureBackground = function() {
        if (this.backgroundNode && this.backgroundNode.isValid) {
          this.backgroundNode.width = 9 * this.tileWidth;
          this.backgroundNode.height = 9 * this.tileHeight;
          this.backgroundNode.setPosition(0, 0);
          return;
        }
        if (this.backgroundSpriteFrame) {
          var bgNode = new cc.Node("BoardBackground");
          var sp = bgNode.addComponent(cc.Sprite);
          sp.spriteFrame = this.backgroundSpriteFrame;
          sp.sizeMode = cc.Sprite.SizeMode.CUSTOM;
          sp.type = cc.Sprite.Type.SLICED;
          bgNode.width = 10 * this.tileWidth;
          bgNode.height = 9 * this.tileHeight + 80;
          bgNode.setPosition(0, 0);
          this.parent.addChild(bgNode, -1);
          this.backgroundNode = bgNode;
          return;
        }
        if (this.drawFallbackBackground) {
          var g = this.parent.getComponent(cc.Graphics);
          g || (g = this.parent.addComponent(cc.Graphics));
          g.clear();
          g.fillColor = new cc.Color(20, 24, 30);
          g.roundRect(-this.parent.width / 2, -this.parent.height / 2, this.parent.width, this.parent.height, 16);
          g.fill();
        }
      };
      return BlastBoardView;
    }();
    exports.BlastBoardView = BlastBoardView;
    cc._RF.pop();
  }, {} ],
  BlastBoostersView: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "bda6aJS1FlHnKRNuLu6dlj/", "BlastBoostersView");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.BlastBoostersView = void 0;
    var BlastTypes_1 = require("../types/BlastTypes");
    var BaseComponent_1 = require("../BaseComponent");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var BlastBoostersView = function(_super) {
      __extends(BlastBoostersView, _super);
      function BlastBoostersView() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.manualLayout = false;
        _this.spacing = 220;
        _this.bombCharges = 5;
        _this.teleportCharges = 5;
        _this.boosterBgSpriteFrame = null;
        _this.slotBgSpriteFrame = null;
        _this.bombIconSpriteFrame = null;
        _this.teleportIconSpriteFrame = null;
        _this.selected = BlastTypes_1.BoosterType.None;
        _this.bombCounterLabel = null;
        _this.teleportCounterLabel = null;
        _this.btnRow = null;
        _this.btnCol = null;
        _this.onSelected = null;
        return _this;
      }
      BlastBoostersView.prototype.onLoad = function() {
        var _this = this;
        this._loadSprites(function() {
          _this._ensureUI();
          _this.layout();
          _this._updateVisual();
        });
      };
      BlastBoostersView.prototype.onEnable = function() {
        cc.view.on("resize", this.layout, this);
      };
      BlastBoostersView.prototype.onDisable = function() {
        cc.view.off("resize", this.layout, this);
      };
      BlastBoostersView.prototype.layout = function() {};
      BlastBoostersView.prototype.setOnSelected = function(fn) {
        this.onSelected = fn;
      };
      BlastBoostersView.prototype.setCharges = function(bomb, teleport) {
        this.bombCharges = bomb;
        this.teleportCharges = teleport;
        this._updateCounters();
      };
      BlastBoostersView.prototype.setSelected = function(b) {
        this.selected = b;
        this._updateVisual();
      };
      BlastBoostersView.prototype._ensureUI = function() {
        var _this = this;
        this.btnRow || (this.btnRow = this.node.getChildByName("Btn_Bomb") || this.node.getChildByName("Btn_Row"));
        this.btnCol || (this.btnCol = this.node.getChildByName("Btn_Teleport") || this.node.getChildByName("Btn_Col"));
        this.btnRow || (this.btnRow = this._makeBtn("Bomb", cc.v2(-this.node.width / 6, 0)));
        this.btnCol || (this.btnCol = this._makeBtn("Teleport", cc.v2(this.node.width / 6, 0)));
        this._applyButtonBackgrounds();
        this._applyButtonIcons();
        this._updateCounters();
        this.btnRow.off(cc.Node.EventType.TOUCH_END);
        this.btnCol.off(cc.Node.EventType.TOUCH_END);
        this.btnRow.on(cc.Node.EventType.TOUCH_END, function() {
          return _this._select(BlastTypes_1.BoosterType.Bomb);
        });
        this.btnCol.on(cc.Node.EventType.TOUCH_END, function() {
          return _this._select(BlastTypes_1.BoosterType.Teleport);
        });
      };
      BlastBoostersView.prototype._select = function(b) {
        this.selected = b;
        this._updateVisual();
        this.onSelected && this.onSelected(b);
      };
      BlastBoostersView.prototype._updateVisual = function() {
        this._setBtnActive(this.btnRow, this.selected === BlastTypes_1.BoosterType.Bomb);
        this._setBtnActive(this.btnCol, this.selected === BlastTypes_1.BoosterType.Teleport);
      };
      BlastBoostersView.prototype._loadSprites = function(done) {
        var _this = this;
        if (this.boosterBgSpriteFrame && this.slotBgSpriteFrame && this.bombIconSpriteFrame && this.teleportIconSpriteFrame) {
          done && done();
          return;
        }
        var totalToLoad = 4;
        var loadedCount = 0;
        var finishOne = function() {
          loadedCount++;
          loadedCount >= totalToLoad && done && done();
        };
        cc.loader.loadRes("imgs/bg_booster", cc.SpriteFrame, function(err, spriteFrame) {
          err ? cc.error("[BlastBoostersView] failed to load imgs/bg_booster", err) : _this.boosterBgSpriteFrame = spriteFrame;
          finishOne();
        });
        cc.loader.loadRes("imgs/slot_booster", cc.SpriteFrame, function(err, spriteFrame) {
          err ? cc.error("[BlastBoostersView] failed to load imgs/slot_booster", err) : _this.slotBgSpriteFrame = spriteFrame;
          finishOne();
        });
        cc.loader.loadRes("imgs/icon_booster_bomb", cc.SpriteFrame, function(err, spriteFrame) {
          err ? cc.error("[BlastBoostersView] failed to load imgs/icon_booster_bomb", err) : _this.bombIconSpriteFrame = spriteFrame;
          finishOne();
        });
        cc.loader.loadRes("imgs/icon_booster_teleport", cc.SpriteFrame, function(err, spriteFrame) {
          err ? cc.error("[BlastBoostersView] failed to load imgs/icon_booster_teleport", err) : _this.teleportIconSpriteFrame = spriteFrame;
          finishOne();
        });
      };
      BlastBoostersView.prototype._updateCounters = function() {
        this.bombCounterLabel = this._ensureCounterForButton(this.btnRow, "BombCounter", this.bombCounterLabel);
        this.bombCounterLabel && (this.bombCounterLabel.string = String(this.bombCharges));
        this.teleportCounterLabel = this._ensureCounterForButton(this.btnCol, "TeleportCounter", this.teleportCounterLabel);
        this.teleportCounterLabel && (this.teleportCounterLabel.string = String(this.teleportCharges));
      };
      BlastBoostersView.prototype._ensureCounterForButton = function(btn, baseName, cachedLabel) {
        if (!btn) return null;
        var container = btn.getChildByName(baseName);
        if (!container) {
          container = new cc.Node(baseName);
          btn.addChild(container, 1);
        }
        if (this.slotBgSpriteFrame) {
          var bgNode = container.getChildByName("Bg");
          if (!bgNode) {
            bgNode = new cc.Node("Bg");
            container.addChild(bgNode, 0);
          }
          var sp = bgNode.getComponent(cc.Sprite) || bgNode.addComponent(cc.Sprite);
          sp.spriteFrame = this.slotBgSpriteFrame;
          sp.sizeMode = cc.Sprite.SizeMode.CUSTOM;
          sp.type = cc.Sprite.Type.SLICED;
          bgNode.width = Math.max(80, .35 * btn.width);
          bgNode.height = Math.max(80, .25 * btn.height);
          bgNode.setPosition(0, 0);
          container.setPosition(0, -btn.height / 2 + (80 === bgNode.height ? 60 : bgNode.height));
        }
        var label = cachedLabel;
        if (!label || !label.isValid) {
          var labelNode = container.getChildByName("Label");
          if (!labelNode) {
            labelNode = new cc.Node("Label");
            container.addChild(labelNode, 1);
          }
          labelNode.setPosition(0, 0);
          label = labelNode.getComponent(cc.Label) || labelNode.addComponent(cc.Label);
          label.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
          label.verticalAlign = cc.Label.VerticalAlign.CENTER;
          label.fontSize = 48;
          label.lineHeight = 48;
          label.node.color = cc.Color.WHITE;
        }
        return label;
      };
      BlastBoostersView.prototype._applyButtonBackgrounds = function() {
        this._applyButtonBackground(this.btnRow);
        this._applyButtonBackground(this.btnCol);
      };
      BlastBoostersView.prototype._applyButtonIcons = function() {
        this._ensureIconForButton(this.btnRow, this.bombIconSpriteFrame, "BombIcon");
        this._ensureIconForButton(this.btnCol, this.teleportIconSpriteFrame, "TeleportIcon");
      };
      BlastBoostersView.prototype._ensureIconForButton = function(btn, frame, name) {
        if (!btn || !frame) return;
        var iconNode = btn.getChildByName(name);
        if (!iconNode) {
          iconNode = new cc.Node(name);
          btn.addChild(iconNode, 0);
        }
        iconNode.setPosition(0, .15 * btn.height);
        var sp = iconNode.getComponent(cc.Sprite) || iconNode.addComponent(cc.Sprite);
        sp.spriteFrame = frame;
        iconNode.width = btn.width / 2;
        iconNode.height = btn.height / 2;
        sp.sizeMode = cc.Sprite.SizeMode.CUSTOM;
        sp.type = cc.Sprite.Type.SIMPLE;
      };
      BlastBoostersView.prototype._applyButtonBackground = function(btn) {
        if (!btn || !this.boosterBgSpriteFrame) return;
        var g = btn.getComponent(cc.Graphics);
        g && (g.enabled = false);
        var bgNode = btn.getChildByName("Bg");
        if (!bgNode) {
          bgNode = new cc.Node("Bg");
          btn.addChild(bgNode, -1);
        }
        var sp = bgNode.getComponent(cc.Sprite) || bgNode.addComponent(cc.Sprite);
        sp.spriteFrame = this.boosterBgSpriteFrame;
        sp.sizeMode = cc.Sprite.SizeMode.CUSTOM;
        sp.type = cc.Sprite.Type.SLICED;
        var w = btn.width;
        var h = btn.height;
        bgNode.width = w;
        bgNode.height = h;
        bgNode.setPosition(0, 0);
      };
      BlastBoostersView.prototype._setBtnActive = function(btn, active) {
        if (!btn) return;
        var selectedNode = btn.getChildByName("Selected");
        if (selectedNode) {
          selectedNode.active = active;
          btn.opacity = 255;
          return;
        }
        var g = btn.getComponent(cc.Graphics);
        if (g && g.enabled) {
          g.clear();
          g.fillColor = active ? new cc.Color(255, 255, 255, 240) : new cc.Color(255, 255, 255, 140);
          g.roundRect(-90, -26, 180, 52, 10);
          g.fill();
        } else btn.opacity = active ? 255 : 180;
        var lbl = btn.getComponentInChildren(cc.Label);
      };
      BlastBoostersView.prototype._makeBtn = function(text, pos) {
        var btn = new cc.Node("Btn_" + text);
        btn.name = "Btn_" + text;
        btn.setPosition(pos);
        this.node.addChild(btn);
        var g = btn.addComponent(cc.Graphics);
        g.fillColor = new cc.Color(255, 255, 255, 140);
        g.roundRect(-90, -26, 180, 52, 10);
        g.fill();
        btn.width = Math.max(120, this.setWidth(320));
        btn.height = Math.max(160, this.setHeight(352));
        var lblNode = new cc.Node("Label");
        lblNode.setPosition(0, 0);
        btn.addChild(lblNode);
        return btn;
      };
      __decorate([ property ], BlastBoostersView.prototype, "manualLayout", void 0);
      __decorate([ property ], BlastBoostersView.prototype, "spacing", void 0);
      __decorate([ property ], BlastBoostersView.prototype, "bombCharges", void 0);
      __decorate([ property ], BlastBoostersView.prototype, "teleportCharges", void 0);
      __decorate([ property ], BlastBoostersView.prototype, "selected", void 0);
      __decorate([ property(cc.Node) ], BlastBoostersView.prototype, "btnRow", void 0);
      __decorate([ property(cc.Node) ], BlastBoostersView.prototype, "btnCol", void 0);
      BlastBoostersView = __decorate([ ccclass ], BlastBoostersView);
      return BlastBoostersView;
    }(BaseComponent_1.BaseComponent);
    exports.BlastBoostersView = BlastBoostersView;
    cc._RF.pop();
  }, {
    "../BaseComponent": "BaseComponent",
    "../types/BlastTypes": "BlastTypes"
  } ],
  BlastGameController: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b52edzJXb1FSLDIsojjcn93", "BlastGameController");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.BlastGameController = void 0;
    var BlastBoardComponent_1 = require("./BlastBoardComponent");
    var BlastBoostersView_1 = require("./BoostersView/BlastBoostersView");
    var BlastGameLogic_1 = require("./BlastGameLogic");
    var BlastHudView_1 = require("./HudView/BlastHudView");
    var BlastTypes_1 = require("./types/BlastTypes");
    var helpers_1 = require("./helpers");
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var BlastGameController = function(_super) {
      __extends(BlastGameController, _super);
      function BlastGameController() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.rows = 9;
        _this.cols = 9;
        _this.colorsCount = 5;
        _this.minGroupSize = 2;
        _this.moves = 30;
        _this.targetScore = 2e4;
        _this.maxReshuffles = 3;
        _this.gap = 0;
        _this.tileSpriteFrame = null;
        _this.rootNode = null;
        _this.hudNode = null;
        _this.boardNode = null;
        _this.boostersNode = null;
        _this.logic = null;
        _this.hudView = null;
        _this.boardView = null;
        _this.boostersView = null;
        _this.inputLocked = false;
        _this.gameEnded = false;
        _this.selectedBooster = BlastTypes_1.BoosterType.None;
        _this.teleportFirstTile = null;
        _this.palette = [ new cc.Color(235, 87, 87), new cc.Color(39, 174, 96), new cc.Color(45, 156, 219), new cc.Color(242, 201, 76), new cc.Color(155, 81, 224) ];
        return _this;
      }
      BlastGameController.prototype.onLoad = function() {
        if (!this._bindSceneRefs()) return;
        this._layoutRoots();
        this._newGame();
      };
      BlastGameController.prototype.onEnable = function() {
        cc.view.on("resize", this._layoutRoots, this);
      };
      BlastGameController.prototype.onDisable = function() {
        cc.view.off("resize", this._layoutRoots, this);
      };
      BlastGameController.prototype._bindSceneRefs = function() {
        var _this = this;
        var root = this.rootNode || this.node.getChildByName("BlastRoot");
        if (!root) {
          cc.error("[BlastGameController] BlastRoot not found. Create it under Canvas and assign rootNode.");
          return false;
        }
        var hudNode = this.hudNode || root.getChildByName("HudRoot");
        var boardNode = this.boardNode || root.getChildByName("BoardRoot");
        var boostersNode = this.boostersNode || root.getChildByName("BoostersRoot");
        if (!hudNode) {
          cc.error("[BlastGameController] HudRoot not found. Create it under BlastRoot and assign hudNode.");
          return false;
        }
        if (!boardNode) {
          cc.error("[BlastGameController] BoardRoot not found. Create it under BlastRoot and assign boardNode.");
          return false;
        }
        if (!boostersNode) {
          cc.error("[BlastGameController] BoostersRoot not found. Create it under BlastRoot and assign boostersNode.");
          return false;
        }
        this.hudView = hudNode.getComponent(BlastHudView_1.BlastHudView);
        this.boardView = boardNode.getComponent(BlastBoardComponent_1.BlastBoardComponent);
        this.boostersView = boostersNode.getComponent(BlastBoostersView_1.BlastBoostersView);
        if (!this.hudView) {
          cc.error("[BlastGameController] BlastHudView component is missing on HudRoot.");
          return false;
        }
        if (!this.boardView) {
          cc.error("[BlastGameController] BlastBoardComponent component is missing on BoardRoot.");
          return false;
        }
        if (!this.boostersView) {
          cc.error("[BlastGameController] BlastBoostersView component is missing on BoostersRoot.");
          return false;
        }
        this.hudView.setRestartHandler(function() {
          return _this._newGame();
        });
        this.boostersView.setOnSelected(function(b) {
          _this.selectedBooster = b;
        });
        return true;
      };
      BlastGameController.prototype._newGame = function() {
        var _this = this;
        this.inputLocked = false;
        this.gameEnded = false;
        this.selectedBooster = BlastTypes_1.BoosterType.None;
        this.teleportFirstTile = null;
        this.boostersView && this.boostersView.setSelected(BlastTypes_1.BoosterType.None);
        var cfg = {
          rows: this.rows,
          cols: this.cols,
          colorsCount: this.colorsCount,
          minGroupSize: this.minGroupSize,
          moves: this.moves,
          targetScore: this.targetScore,
          maxReshuffles: this.maxReshuffles
        };
        this.logic = new BlastGameLogic_1.BlastGameLogic(cfg);
        this.boostersView && this.boostersView.setCharges(this.logic.getBombCharges(), this.logic.getTeleportCharges());
        this.boardView.init({
          board: this.logic.board,
          palette: this.palette,
          gap: this.gap,
          tileSpriteFrame: this.tileSpriteFrame,
          onTileClick: function(tile) {
            return _this._onTileClick(tile);
          }
        });
        this.hudView.hideOverlay();
        this._updateHud();
        this.logic.hasAnyMove() || this._endGame(false, "No moves");
      };
      BlastGameController.prototype._onTileClick = function(tile) {
        var _this = this;
        if (this.inputLocked || this.gameEnded) return;
        var booster = this.selectedBooster;
        if (booster === BlastTypes_1.BoosterType.Teleport) {
          if (!this.teleportFirstTile) {
            this.teleportFirstTile = tile;
            return;
          }
          if (this.teleportFirstTile.row === tile.row && this.teleportFirstTile.col === tile.col) {
            this.teleportFirstTile = null;
            return;
          }
          var first = this.teleportFirstTile;
          this.teleportFirstTile = null;
          var outcome_1 = this.logic.teleport(first.row, first.col, tile.row, tile.col);
          if (!outcome_1.ok || !outcome_1.step) return;
          this.boostersView && this.boostersView.setCharges(this.logic.getBombCharges(), this.logic.getTeleportCharges());
          this.selectedBooster = BlastTypes_1.BoosterType.None;
          this.boostersView && this.boostersView.setSelected(BlastTypes_1.BoosterType.None);
          this.inputLocked = true;
          this.boardView.playStep(outcome_1.step, function() {
            _this.inputLocked = false;
            outcome_1.reshuffled && _this.boardView.rebuild();
            _this._updateHud();
            outcome_1.ended && _this._endGame(!!outcome_1.win, outcome_1.reason || "");
          });
          return;
        }
        var outcome = this.logic.playAt(tile.row, tile.col, booster);
        if (!outcome.ok || !outcome.step) return;
        this.boostersView && this.boostersView.setCharges(this.logic.getBombCharges(), this.logic.getTeleportCharges());
        this._playBoardComboEffects(outcome);
        this._spawnTileBurstParticles(outcome.removedTiles, outcome.removedCount || 0);
        if (booster !== BlastTypes_1.BoosterType.None) {
          this.selectedBooster = BlastTypes_1.BoosterType.None;
          this.boostersView && this.boostersView.setSelected(BlastTypes_1.BoosterType.None);
        }
        this.inputLocked = true;
        this.boardView.playStep(outcome.step, function() {
          _this.inputLocked = false;
          outcome.reshuffled && _this.boardView.rebuild();
          if (outcome.removedByColor) {
            var verbose = {};
            for (var key in outcome.removedByColor) {
              if (!Object.prototype.hasOwnProperty.call(outcome.removedByColor, key)) continue;
              var colorIndex = parseInt(key, 10);
              var count = outcome.removedByColor[colorIndex];
              verbose[colorIndex] = {
                count: count,
                name: _this._getColorName(colorIndex)
              };
            }
          }
          _this._playHudComboEffects(outcome);
          _this._updateHud();
          outcome.ended && _this._endGame(!!outcome.win, outcome.reason || "");
        });
      };
      BlastGameController.prototype._endGame = function(win, reason) {
        this.gameEnded = true;
        this.inputLocked = true;
        var msg = (win ? "YOU WIN" : "YOU LOSE") + "\n" + reason + "\nScore: " + this.logic.score + " / " + this.logic.cfg.targetScore;
        this.hudView.showOverlay(msg);
      };
      BlastGameController.prototype._layoutVerticalBlocks = function(root, blocks) {
        if (!root || !blocks || 0 === blocks.length) return;
        var vs = cc.view.getVisibleSize();
        var totalWidth = Math.min(vs.height / 1.7, vs.width);
        var totalHeight = vs.height;
        console.log("vs.width", vs.width);
        console.log("vs.height", vs.height);
        console.log("totalHeight", totalHeight);
        console.log("totalWidth", totalWidth);
        var currentTop = totalHeight / 2;
        for (var i = 0; i < blocks.length; i++) {
          var entry = blocks[i];
          if (!entry || !entry.node) continue;
          var h = totalHeight * entry.heightRatio;
          var node = entry.node;
          node.width = totalWidth;
          node.height = h;
          cc.log("node:", node.name, "height:", node.height);
          node.y = currentTop - h / 2;
          currentTop -= h;
        }
      };
      BlastGameController.prototype._layoutRoots = function() {
        if (!this.rootNode || !this.hudNode || !this.boardNode || !this.boostersNode) return;
        var hudRatio = .165;
        var boostersRatio = .235;
        var boardRatio = 1 - hudRatio - boostersRatio;
        this._layoutVerticalBlocks(this.rootNode, [ {
          node: this.hudNode,
          heightRatio: hudRatio
        }, {
          node: this.boardNode,
          heightRatio: boardRatio
        }, {
          node: this.boostersNode,
          heightRatio: boostersRatio
        } ]);
        this.hudView && this.hudView.layout && this.hudView.layout();
        this.boardView && this.boardView.layout && this.boardView.layout();
        this.boostersView && this.boostersView.layout && this.boostersView.layout();
      };
      BlastGameController.prototype._updateHud = function() {
        if (!this.logic) return;
        this.hudView.setTarget(this.logic.cfg.targetScore);
        this.hudView.setScore(this.logic.score);
        this.hudView.setMoves(this.logic.movesLeft);
      };
      BlastGameController.prototype._spawnTileBurstParticles = function(removedTiles, removedCount) {
        if (!removedTiles || 0 === removedTiles.length) return;
        if (!this.boardView || !this.boardNode) return;
        var intensity = helpers_1.exponentialGrowth(removedCount, 6);
        var particlesPerTile = intensity;
        var parent = this.boardNode;
        for (var t = 0; t < removedTiles.length; t++) {
          var info = removedTiles[t];
          var worldPos = this.boardView.getWorldPositionForCell(info.row, info.col);
          if (!worldPos) continue;
          var localPos = parent.convertToNodeSpaceAR(worldPos);
          var _loop_1 = function(i) {
            var particle = new cc.Node("TileParticle");
            var g = particle.addComponent(cc.Graphics);
            var paletteColor = this_1.palette && this_1.palette.length > 0 ? this_1.palette[info.color % this_1.palette.length] : new cc.Color(255, 255, 255);
            var baseRadius = 4;
            var radius = 2 + .55 * intensity;
            g.clear();
            g.fillColor = paletteColor;
            g.circle(0, 0, radius);
            g.fill();
            particle.opacity = 255;
            particle.setPosition(localPos);
            parent.addChild(particle, 1800);
            var angle = Math.random() * Math.PI * 2;
            var dist = 20 + 40 * intensity * Math.random();
            var dx = Math.cos(angle) * dist;
            var dy = Math.sin(angle) * dist;
            var duration = .18 + .08 * Math.random();
            cc.tween(particle).to(duration, {
              x: localPos.x + dx,
              y: localPos.y + dy,
              opacity: 0
            }, {
              easing: "quadOut"
            }).call(function() {
              particle.isValid && particle.destroy();
            }).start();
          };
          var this_1 = this;
          for (var i = 0; i < particlesPerTile; i++) _loop_1(i);
        }
      };
      BlastGameController.prototype._playBoardComboEffects = function(outcome) {
        if (!this.boardNode) return;
        var removed = outcome.removedCount || 0;
        if (removed <= 0) return;
        var intensity = Math.min(1, removed / 12);
        var shakeAmp = 3 + 7 * intensity;
        var shakeTime = .18 + .06 * intensity;
        var target = this.boardNode;
        var originalPos = target.getPosition();
        cc.Tween.stopAllByTarget(target);
        var seq = cc.tween().to(shakeTime / 4, {
          x: originalPos.x + shakeAmp
        }).to(shakeTime / 4, {
          x: originalPos.x - shakeAmp
        }).to(shakeTime / 4, {
          x: originalPos.x,
          y: originalPos.y + shakeAmp
        }).to(shakeTime / 4, {
          x: originalPos.x,
          y: originalPos.y
        });
        cc.tween(target).then(seq).call(function() {
          target.setPosition(originalPos);
        }).start();
      };
      BlastGameController.prototype._playHudComboEffects = function(outcome) {
        if (!this.hudView) return;
        var removed = outcome.removedCount || 0;
        if (removed <= 0) return;
        var intensity = Math.min(1, removed / 12);
        var dominantColorIndex = null;
        outcome.removedByColor && (dominantColorIndex = this._getDominantColorIndex(outcome.removedByColor));
        var pulseColor = null;
        if (null != dominantColorIndex && this.palette && this.palette.length > 0) {
          var idx = dominantColorIndex % this.palette.length;
          pulseColor = this.palette[idx];
        }
        this.hudView.playScorePulse(pulseColor, intensity);
        outcome.removedTiles && outcome.removedTiles.length > 0 && this._spawnScoreOrbs(outcome.removedTiles, pulseColor, intensity);
      };
      BlastGameController.prototype._spawnScoreOrbs = function(removedTiles, color, intensity) {
        if (!this.boardView || !this.hudView) return;
        var scoreWorldPos = this.hudView.getScoreWorldPosition();
        if (!scoreWorldPos) return;
        var parent = this.node;
        var targetLocal = parent.convertToNodeSpaceAR(scoreWorldPos);
        var maxOrbs = 5;
        var count = Math.min(maxOrbs, removedTiles.length);
        if (count <= 0) return;
        var step = removedTiles.length / count;
        var _loop_2 = function(i) {
          var srcIndex = Math.min(removedTiles.length - 1, Math.floor(i * step));
          var info = removedTiles[srcIndex];
          var fromWorld = this_2.boardView.getWorldPositionForCell(info.row, info.col);
          if (!fromWorld) return "continue";
          var fromLocal = parent.convertToNodeSpaceAR(fromWorld);
          var orb = new cc.Node("ScoreOrb");
          var g = orb.addComponent(cc.Graphics);
          var baseRadius = 10;
          var radius = baseRadius * (.8 + .4 * intensity);
          var paletteColor = this_2.palette && this_2.palette.length > 0 ? this_2.palette[info.color % this_2.palette.length] : new cc.Color(255, 255, 255);
          var orbColor = color || paletteColor;
          g.clear();
          g.fillColor = orbColor;
          g.circle(0, 0, radius);
          g.fill();
          orb.opacity = 0;
          orb.setPosition(fromLocal);
          parent.addChild(orb, 2e3);
          var travelTime = .35 + .12 * intensity;
          var delay = .02 * i;
          cc.tween(orb).delay(delay).to(.06, {
            opacity: 255
          }).to(travelTime, {
            x: targetLocal.x,
            y: targetLocal.y,
            opacity: 0
          }, {
            easing: "quadInOut"
          }).call(function() {
            orb.isValid && orb.destroy();
          }).start();
        };
        var this_2 = this;
        for (var i = 0; i < count; i++) _loop_2(i);
      };
      BlastGameController.prototype._getDominantColorIndex = function(map) {
        var bestColor = null;
        var bestCount = 0;
        for (var key in map) {
          if (!Object.prototype.hasOwnProperty.call(map, key)) continue;
          var colorIndex = parseInt(key, 10);
          var count = map[key];
          if (count > bestCount) {
            bestCount = count;
            bestColor = colorIndex;
          }
        }
        return bestColor;
      };
      BlastGameController.prototype._getColorName = function(colorIndex) {
        var names = [ "red", "green", "blue", "yellow", "purple" ];
        if (0 === names.length) return null;
        var idx = (colorIndex % names.length + names.length) % names.length;
        return names[colorIndex];
      };
      __decorate([ property ], BlastGameController.prototype, "rows", void 0);
      __decorate([ property ], BlastGameController.prototype, "cols", void 0);
      __decorate([ property ], BlastGameController.prototype, "colorsCount", void 0);
      __decorate([ property ], BlastGameController.prototype, "minGroupSize", void 0);
      __decorate([ property ], BlastGameController.prototype, "moves", void 0);
      __decorate([ property ], BlastGameController.prototype, "targetScore", void 0);
      __decorate([ property ], BlastGameController.prototype, "maxReshuffles", void 0);
      __decorate([ property ], BlastGameController.prototype, "gap", void 0);
      __decorate([ property(cc.SpriteFrame) ], BlastGameController.prototype, "tileSpriteFrame", void 0);
      __decorate([ property(cc.Node) ], BlastGameController.prototype, "rootNode", void 0);
      __decorate([ property(cc.Node) ], BlastGameController.prototype, "hudNode", void 0);
      __decorate([ property(cc.Node) ], BlastGameController.prototype, "boardNode", void 0);
      __decorate([ property(cc.Node) ], BlastGameController.prototype, "boostersNode", void 0);
      BlastGameController = __decorate([ ccclass ], BlastGameController);
      return BlastGameController;
    }(cc.Component);
    exports.BlastGameController = BlastGameController;
    cc._RF.pop();
  }, {
    "./BlastBoardComponent": "BlastBoardComponent",
    "./BlastGameLogic": "BlastGameLogic",
    "./BoostersView/BlastBoostersView": "BlastBoostersView",
    "./HudView/BlastHudView": "BlastHudView",
    "./helpers": "helpers",
    "./types/BlastTypes": "BlastTypes"
  } ],
  "BlastGameLogicReshuffle.test": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "b6439kychBPQK184uKAWxKp", "BlastGameLogicReshuffle.test");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.testReshuffleLimit = void 0;
    var BlastGameLogic_1 = require("../BlastGameLogic");
    function assert(cond, msg) {
      if (!cond) throw new Error("Assertion failed: " + msg);
    }
    function testReshuffleLimit() {
      var cfg = {
        rows: 3,
        cols: 3,
        colorsCount: 3,
        minGroupSize: 2,
        moves: 10,
        targetScore: 9999,
        maxReshuffles: 3
      };
      var logic = new BlastGameLogic_1.default(cfg);
      logic.hasAnyMove = function() {
        return false;
      };
      logic.board.shuffleColors = function() {};
      var end = logic._checkEndAndMaybeReshuffle();
      assert(true === end.ended, "\u0418\u0433\u0440\u0430 \u0434\u043e\u043b\u0436\u043d\u0430 \u0437\u0430\u043a\u043e\u043d\u0447\u0438\u0442\u044c\u0441\u044f \u043f\u0440\u0438 \u043e\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0438\u0438 \u0445\u043e\u0434\u043e\u0432 \u0438 \u043f\u043e\u0441\u043b\u0435 \u0438\u0441\u0447\u0435\u0440\u043f\u0430\u043d\u0438\u044f \u043f\u0435\u0440\u0435\u043c\u0435\u0448\u0438\u0432\u0430\u043d\u0438\u0439");
      assert(false === end.win, "\u041f\u0440\u0438 \u043e\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0438\u0438 \u0445\u043e\u0434\u043e\u0432 \u043f\u043e\u0441\u043b\u0435 \u0432\u0441\u0435\u0445 \u043f\u0435\u0440\u0435\u043c\u0435\u0448\u0438\u0432\u0430\u043d\u0438\u0439 \u0434\u043e\u043b\u0436\u043d\u043e \u0431\u044b\u0442\u044c \u043f\u043e\u0440\u0430\u0436\u0435\u043d\u0438\u0435");
      assert("No moves" === end.reason, '\u041f\u0440\u0438\u0447\u0438\u043d\u0430 \u043e\u043a\u043e\u043d\u0447\u0430\u043d\u0438\u044f \u0438\u0433\u0440\u044b \u0434\u043e\u043b\u0436\u043d\u0430 \u0431\u044b\u0442\u044c "No moves"');
    }
    exports.testReshuffleLimit = testReshuffleLimit;
    cc._RF.pop();
  }, {
    "../BlastGameLogic": "BlastGameLogic"
  } ],
  BlastGameLogic: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "bba81oejC1Ioo/YC1mkeePk", "BlastGameLogic");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.BlastGameLogic = void 0;
    var BoardModel_1 = require("./types/BoardModel");
    var BlastTypes_1 = require("./types/BlastTypes");
    var BlastGameLogic = function() {
      function BlastGameLogic(cfg) {
        this.cfg = cfg;
        this.board = new BoardModel_1.BoardModel({
          rows: cfg.rows,
          cols: cfg.cols,
          colorsCount: cfg.colorsCount
        });
        this.movesLeft = 30;
        this.score = 0;
        this.bombBoosterCharges = null != cfg.bombBoosterCharges ? cfg.bombBoosterCharges : 5;
        this.teleportBoosterCharges = null != cfg.teleportBoosterCharges ? cfg.teleportBoosterCharges : 5;
        this.bombRadius = null != cfg.bombRadius ? cfg.bombRadius : 1;
        this.reshufflesLeft = null != cfg.maxReshuffles ? cfg.maxReshuffles : 3;
      }
      BlastGameLogic.prototype.getBombCharges = function() {
        return this.bombBoosterCharges;
      };
      BlastGameLogic.prototype.getTeleportCharges = function() {
        return this.teleportBoosterCharges;
      };
      BlastGameLogic.prototype.reset = function() {
        this.board.reset();
        this.movesLeft = this.cfg.moves;
        this.score = 0;
        this.reshufflesLeft = null != this.cfg.maxReshuffles ? this.cfg.maxReshuffles : 3;
      };
      BlastGameLogic.prototype.hasAnyMove = function() {
        return this.board.hasAnyMove(this.cfg.minGroupSize);
      };
      BlastGameLogic.prototype.playAt = function(r, c, booster) {
        if (this.movesLeft <= 0) return {
          ok: false,
          ended: true,
          win: false,
          reason: "No moves left"
        };
        if (booster === BlastTypes_1.BoosterType.Bomb) return this._boosterBomb(r, c);
        var res = this.board.blastAt(r, c, this.cfg.minGroupSize);
        if (!res) return {
          ok: false
        };
        var removedInfo = this._buildRemovedInfo(res.group);
        return this._applyStep(res.group.length, res.step, removedInfo);
      };
      BlastGameLogic.prototype._boosterBomb = function(r, c) {
        if (this.bombBoosterCharges <= 0) return {
          ok: false
        };
        var positions = [];
        var radius = this.bombRadius;
        for (var rr = r - radius; rr <= r + radius; rr++) for (var cc = c - radius; cc <= c + radius; cc++) positions.push({
          r: rr,
          c: cc
        });
        var res = this.board.blastPositions(positions);
        if (!res) return {
          ok: false
        };
        var removedInfo = this._buildRemovedInfo(res.tiles);
        this.bombBoosterCharges -= 1;
        return this._applyStep(res.tiles.length, res.step, removedInfo);
      };
      BlastGameLogic.prototype.teleport = function(aRow, aCol, bRow, bCol) {
        if (this.movesLeft <= 0) return {
          ok: false,
          ended: true,
          win: false,
          reason: "No moves left"
        };
        if (this.teleportBoosterCharges <= 0) return {
          ok: false
        };
        var step = this.board.swapTiles({
          r: aRow,
          c: aCol
        }, {
          r: bRow,
          c: bCol
        });
        if (!step) return {
          ok: false
        };
        this.teleportBoosterCharges -= 1;
        return this._applyStep(0, step);
      };
      BlastGameLogic.prototype._applyStep = function(removedCount, step, removedInfo) {
        this.movesLeft -= 1;
        var scoreDelta = this._calcScore(removedCount);
        this.score += scoreDelta;
        var end = this._checkEndAndMaybeReshuffle();
        return {
          ok: true,
          step: step,
          removedCount: removedCount,
          scoreDelta: scoreDelta,
          movesLeft: this.movesLeft,
          score: this.score,
          ended: end.ended,
          win: end.win,
          reason: end.reason,
          reshuffled: end.reshuffled,
          reshufflesLeft: this.reshufflesLeft,
          removedTiles: removedInfo ? removedInfo.list : void 0,
          removedByColor: removedInfo ? removedInfo.byColor : void 0
        };
      };
      BlastGameLogic.prototype._calcScore = function(removedCount) {
        return 10 * removedCount * removedCount;
      };
      BlastGameLogic.prototype._checkEndAndMaybeReshuffle = function() {
        if (this.score >= this.cfg.targetScore) return {
          ended: true,
          win: true,
          reason: "Target reached",
          reshuffled: false
        };
        if (this.movesLeft <= 0) return {
          ended: true,
          win: false,
          reason: "No moves left",
          reshuffled: false
        };
        if (!this.hasAnyMove()) {
          var reshuffled = this._tryReshuffleUntilHasMove();
          if (!reshuffled) return {
            ended: true,
            win: false,
            reason: "No moves",
            reshuffled: false
          };
          return {
            ended: false,
            win: false,
            reason: "",
            reshuffled: true
          };
        }
        return {
          ended: false,
          win: false,
          reason: "",
          reshuffled: false
        };
      };
      BlastGameLogic.prototype._tryReshuffleUntilHasMove = function() {
        while (this.reshufflesLeft > 0) {
          this.reshufflesLeft--;
          this.board.shuffleColors();
          if (this.hasAnyMove()) return true;
        }
        return this.hasAnyMove();
      };
      BlastGameLogic.prototype._buildRemovedInfo = function(tiles) {
        var list = [];
        var byColor = {};
        for (var i = 0; i < tiles.length; i++) {
          var t = tiles[i];
          list.push({
            id: t.id,
            row: t.row,
            col: t.col,
            color: t.color
          });
          var prev = byColor[t.color] || 0;
          byColor[t.color] = prev + 1;
        }
        return {
          list: list,
          byColor: byColor
        };
      };
      return BlastGameLogic;
    }();
    exports.BlastGameLogic = BlastGameLogic;
    cc._RF.pop();
  }, {
    "./types/BlastTypes": "BlastTypes",
    "./types/BoardModel": "BoardModel"
  } ],
  BlastHudView: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2821aL0A2dKRrtwk4lEgr8Z", "BlastHudView");
    "use strict";
    var __extends = this && this.__extends || function() {
      var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf || {
          __proto__: []
        } instanceof Array && function(d, b) {
          d.__proto__ = b;
        } || function(d, b) {
          for (var p in b) Object.prototype.hasOwnProperty.call(b, p) && (d[p] = b[p]);
        };
        return extendStatics(d, b);
      };
      return function(d, b) {
        extendStatics(d, b);
        function __() {
          this.constructor = d;
        }
        d.prototype = null === b ? Object.create(b) : (__.prototype = b.prototype, new __());
      };
    }();
    var __decorate = this && this.__decorate || function(decorators, target, key, desc) {
      var c = arguments.length, r = c < 3 ? target : null === desc ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
      if ("object" === typeof Reflect && "function" === typeof Reflect.decorate) r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) (d = decorators[i]) && (r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r);
      return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.BlastHudView = void 0;
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var BaseComponent_1 = require("../BaseComponent");
    var BlastHudView = function(_super) {
      __extends(BlastHudView, _super);
      function BlastHudView() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.panel = null;
        _this.panelSpriteFrame = null;
        _this.movesPanel = null;
        _this.movesPanelSpriteFrame = null;
        _this.lblMovesValue = null;
        _this.lblScoreTitle = null;
        _this.lblScoreValue = null;
        _this.overlay = null;
        _this.overlayLabel = null;
        _this.scoresPanel = null;
        _this.scoresSpriteFrame = null;
        _this.onRestart = null;
        _this.currentScore = 0;
        _this.targetScore = 0;
        _this.movesLeft = 0;
        _this._isEnsuringUI = false;
        return _this;
      }
      BlastHudView.prototype.onLoad = function() {
        this.hideOverlay();
        this.layout();
      };
      BlastHudView.prototype.onEnable = function() {
        cc.view.on("resize", this.layout, this);
      };
      BlastHudView.prototype.onDisable = function() {
        cc.view.off("resize", this.layout, this);
      };
      BlastHudView.prototype.setRestartHandler = function(fn) {
        this.onRestart = fn;
      };
      BlastHudView.prototype.setTarget = function(target) {
        this.targetScore = target;
        this._applyScoreText();
      };
      BlastHudView.prototype.setScore = function(score) {
        this.currentScore = score;
        this._applyScoreText();
      };
      BlastHudView.prototype.setMoves = function(movesLeft) {
        this.movesLeft = movesLeft;
        this._applyMovesText();
      };
      BlastHudView.prototype.playScorePulse = function(color, intensity) {
        if (!this.lblScoreValue) return;
        var node = this.lblScoreValue.node;
        var baseScale = node.scale;
        var maxExtra = .18;
        var extra = maxExtra * Math.min(1, Math.max(.2, intensity));
        var targetScale = baseScale * (1 + extra);
        var originalColor = node.color.clone();
        var pulseColor = color || originalColor;
        cc.Tween.stopAllByTarget(node);
        node.color = pulseColor;
        node.scale = baseScale;
        cc.tween(node).to(.08, {
          scale: targetScale
        }).to(.12, {
          scale: baseScale
        }).call(function() {
          node.color = originalColor;
        }).start();
      };
      BlastHudView.prototype.showOverlay = function(message) {
        this.overlay && (this.overlay.active = true);
        this.overlayLabel && (this.overlayLabel.string = message);
      };
      BlastHudView.prototype.hideOverlay = function() {
        this.overlay && (this.overlay.active = false);
      };
      BlastHudView.prototype.layout = function() {
        this._renderHudBlock();
        this._renderMovesBlockLayout();
        this._renderScoreBlockLayout();
        this._layoutOverlay();
      };
      BlastHudView.prototype._renderHudBlock = function() {
        if (!this.panel || !this.movesPanel) return;
        var p = this.panel;
        if (this.panelSpriteFrame) {
          var sp = p.getComponent(cc.Sprite) || p.addComponent(cc.Sprite);
          sp.sizeMode = cc.Sprite.SizeMode.RAW;
          sp.type = cc.Sprite.Type.SLICED;
          sp.spriteFrame = this.panelSpriteFrame;
        }
        p.height = Math.max(50, this.node.height);
        p.width = Math.max(50, this.node.width);
        p.setPosition(0, 0);
      };
      BlastHudView.prototype._renderMovesBlockLayout = function() {
        if (!this.movesPanel) return;
        var movesH = .75 * this.panel.height;
        var movesW = movesH;
        this.movesPanel.width = movesW;
        this.movesPanel.height = movesH;
        this.movesPanel.anchorX = .5;
        this.movesPanel.anchorY = .5;
        this.movesPanel.setPosition(-this.panel.width / 2 + movesW / 2 + 30, 5);
        this._applyMovesPanelBackground(this.movesPanel, this.movesPanelSpriteFrame, movesW, movesH);
        if (!this.lblMovesValue) {
          var n = this.movesPanel.getChildByName("LblMovesValue");
          this.lblMovesValue = n ? n.getComponent(cc.Label) : null;
        }
        if (!this.lblMovesValue) {
          this.lblMovesValue = this._makeLabel(this.movesPanel, "0", cc.v2(0, 0), 40);
          this.lblMovesValue.node.name = "LblMovesValue";
        }
        this.lblMovesValue.node.getComponent(cc.Label).fontSize = this.setFontSize(80);
        this.lblMovesValue.node.getComponent(cc.Label).lineHeight = this.setFontSize(82);
        this.lblMovesValue.node.setPosition(0, 0);
        this._applyMovesText();
      };
      BlastHudView.prototype._renderScoreBlockLayout = function() {
        if (!this.panel) return;
        var spNode = this.scoresPanel;
        if (!spNode) {
          spNode = this.panel.getChildByName("ScoresPanel");
          if (!spNode) {
            spNode = new cc.Node("ScoresPanel");
            this.panel.addChild(spNode);
          }
          this.scoresPanel = spNode;
        }
        spNode.width = .6 * this.panel.width;
        spNode.height = Math.max(10, .7 * this.panel.height);
        spNode.anchorX = .5;
        spNode.anchorY = .5;
        spNode.setPosition(spNode.width / 4, 5);
        if (this.scoresSpriteFrame) {
          var sp = spNode.getComponent(cc.Sprite) || spNode.addComponent(cc.Sprite);
          sp.sizeMode = cc.Sprite.SizeMode.CUSTOM;
          sp.type = cc.Sprite.Type.SIMPLE;
          sp.spriteFrame = this.scoresSpriteFrame;
        }
        if (!this.lblScoreTitle) {
          var n = spNode.getChildByName("LblScoreTitle");
          n || (n = this.panel.getChildByName("LblScoreTitle"));
          this.lblScoreTitle = n ? n.getComponent(cc.Label) : null;
        }
        if (!this.lblScoreTitle) {
          this.lblScoreTitle = this._makeLabel(spNode, "\u041e\u0447\u043a\u0438:", cc.v2(0, spNode.height / 2), this.setFontSize(28));
          this.lblScoreTitle.node.name = "LblScoreTitle";
        }
        if (!this.lblScoreValue) {
          var n = spNode.getChildByName("LblScoreValue");
          n || (n = this.panel.getChildByName("LblScoreValue"));
          this.lblScoreValue = n ? n.getComponent(cc.Label) : null;
        }
        if (!this.lblScoreValue) {
          this.lblScoreValue = this._makeLabel(spNode, "0/0", cc.v2(0, 0), this.setFontSize(24));
          this.lblScoreValue.node.name = "LblScoreValue";
        }
        this.lblScoreTitle.node.parent = spNode;
        this.lblScoreTitle.node.setPosition(0, spNode.height / 4);
        this.lblScoreTitle.node.getComponent(cc.Label).fontSize = this.setFontSize(50);
        this.lblScoreTitle.node.getComponent(cc.Label).lineHeight = this.setFontSize(52);
        this.lblScoreValue.node.parent = spNode;
        this.lblScoreValue.node.getComponent(cc.Label).fontSize = this.setFontSize(70);
        this.lblScoreValue.node.getComponent(cc.Label).lineHeight = this.setFontSize(72);
        this.lblScoreValue.node.setPosition(0, spNode.height / 4 - this.setFontSize(70));
        this._applyScoreText();
      };
      BlastHudView.prototype._layoutOverlay = function() {
        if (!this.overlay) return;
        var vs = cc.view.getVisibleSize();
        this.overlay.setPosition(0, 0);
        this.overlay.width = vs.width;
        this.overlay.height = vs.height;
        this.overlay.zIndex = 20;
        var background = this.overlay.getChildByName("overlay_background");
        if (!background) {
          background = new cc.Node("overlay_background");
          background = new cc.Node("overlay_background");
          var graphics = background.addComponent(cc.Graphics);
          graphics.fillColor = cc.color(0, 0, 0, 177);
          graphics.rect(-1e4, -1e4, 2e4, 2e4);
          graphics.fill();
          this.overlay.addChild(background);
        }
        background.width = vs.width;
        background.height = vs.height;
        background.setPosition(0, 0);
        var labelNode = this.overlay.getChildByName("overlayLabel");
        if (!labelNode) {
          labelNode = new cc.Node("overlayLabel");
          var label_1 = labelNode.addComponent(cc.Label);
          this.overlayLabel = label_1;
          label_1.fontSize = this.setFontSize(48);
          label_1.lineHeight = this.setFontSize(48);
          label_1.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
          label_1.verticalAlign = cc.Label.VerticalAlign.CENTER;
          label_1.overflow = cc.Label.Overflow.SHRINK;
          labelNode.color = cc.Color.WHITE;
          this.overlay.addChild(labelNode);
        }
        labelNode.width = this.panel.width;
        labelNode.height = 500;
        labelNode.setPosition(0, 0);
        var label = labelNode.getComponent(cc.Label);
        labelNode.zIndex = 999999;
        if (label) {
          label.fontSize = this.setFontSize(48);
          label.lineHeight = label.fontSize + 8;
        }
        var buttonNode = this.overlay.getChildByName("restartButton");
        if (!buttonNode) {
          buttonNode = new cc.Node("restartButton");
          buttonNode.setContentSize(160, 80);
          var graphics_1 = buttonNode.addComponent(cc.Graphics);
          var redrawGraphics_1 = function() {
            graphics_1.clear();
            var width = buttonNode.width;
            var height = buttonNode.height;
            graphics_1.roundRect(-width / 2, -height / 2, width, height, 12);
            graphics_1.fillColor = cc.color(80, 80, 80);
            graphics_1.fill();
            graphics_1.strokeColor = cc.Color.WHITE;
            graphics_1.lineWidth = 2;
            graphics_1.stroke();
          };
          var button_1 = buttonNode.addComponent(cc.Button);
          var btnLabel = buttonNode.addComponent(cc.Label);
          btnLabel.string = "\u041f\u0415\u0420\u0415\u0417\u0410\u041f\u0423\u0421\u0422\u0418\u0422\u042c";
          btnLabel.fontSize = this.setFontSize(78);
          btnLabel.lineHeight = this.setFontSize(84);
          btnLabel.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
          btnLabel.verticalAlign = cc.Label.VerticalAlign.CENTER;
          btnLabel.node.color = cc.Color.WHITE;
          buttonNode.on("click", this.onRestart, this);
          this.overlay.addChild(buttonNode);
          this.scheduleOnce(function() {
            graphics_1 && graphics_1.isValid && redrawGraphics_1();
          }, 0);
          this.scheduleOnce(function() {
            graphics_1 && graphics_1.isValid && redrawGraphics_1();
          }, .1);
        }
        buttonNode.setPosition(0, -150);
        buttonNode.zIndex = 100;
        this.overlay.active || (this.overlay.active = true);
        0 === this.overlay.opacity && (this.overlay.opacity = 255);
        var button = buttonNode.getComponent(cc.Button);
        button.transition = cc.Button.Transition.COLOR;
        button.normalColor = cc.color(255, 255, 255, 255);
        button.pressedColor = cc.color(200, 200, 200, 255);
        button.hoverColor = cc.color(240, 240, 240, 255);
      };
      BlastHudView.prototype.getScoreWorldPosition = function() {
        if (!this.lblScoreValue) return null;
        return this.lblScoreValue.node.convertToWorldSpaceAR(cc.v2(0, 0));
      };
      BlastHudView.prototype._applyMovesText = function() {
        this.lblMovesValue && (this.lblMovesValue.string = "" + this.movesLeft);
      };
      BlastHudView.prototype._applyScoreText = function() {
        var remaining = Math.max(this.targetScore - this.currentScore, 0);
        this.lblScoreTitle && (this.lblScoreTitle.string = "\u041e\u0447\u043a\u0438:");
        this.lblScoreValue && (this.lblScoreValue.string = this.currentScore + "/" + remaining);
      };
      BlastHudView.prototype._applyMovesPanelBackground = function(panel, spriteFrame, width, height) {
        if (!panel || !spriteFrame) return;
        width > 0 && (panel.width = width);
        height > 0 && (panel.height = height);
        var sp = panel.getComponent(cc.Sprite) || panel.addComponent(cc.Sprite);
        sp.sizeMode = cc.Sprite.SizeMode.CUSTOM;
        sp.type = cc.Sprite.Type.SIMPLE;
        sp.spriteFrame = spriteFrame;
      };
      BlastHudView.prototype._makeLabel = function(parent, text, pos, fontSize) {
        var n = new cc.Node("Label");
        n.setPosition(pos);
        parent.addChild(n);
        var l = n.addComponent(cc.Label);
        l.string = text;
        l.fontSize = this.setFontSize(fontSize);
        l.lineHeight = this.setFontSize(fontSize) + 4;
        l.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
        l.verticalAlign = cc.Label.VerticalAlign.CENTER;
        return l;
      };
      __decorate([ property(cc.Node) ], BlastHudView.prototype, "panel", void 0);
      __decorate([ property(cc.SpriteFrame) ], BlastHudView.prototype, "panelSpriteFrame", void 0);
      __decorate([ property(cc.Node) ], BlastHudView.prototype, "movesPanel", void 0);
      __decorate([ property({
        type: cc.SpriteFrame,
        displayName: "Moves Background"
      }) ], BlastHudView.prototype, "movesPanelSpriteFrame", void 0);
      __decorate([ property(cc.Label) ], BlastHudView.prototype, "lblMovesValue", void 0);
      __decorate([ property(cc.Label) ], BlastHudView.prototype, "lblScoreTitle", void 0);
      __decorate([ property(cc.Label) ], BlastHudView.prototype, "lblScoreValue", void 0);
      __decorate([ property(cc.Node) ], BlastHudView.prototype, "overlay", void 0);
      __decorate([ property(cc.Label) ], BlastHudView.prototype, "overlayLabel", void 0);
      __decorate([ property(cc.Node) ], BlastHudView.prototype, "scoresPanel", void 0);
      __decorate([ property(cc.SpriteFrame) ], BlastHudView.prototype, "scoresSpriteFrame", void 0);
      BlastHudView = __decorate([ ccclass ], BlastHudView);
      return BlastHudView;
    }(BaseComponent_1.BaseComponent);
    exports.BlastHudView = BlastHudView;
    cc._RF.pop();
  }, {
    "../BaseComponent": "BaseComponent"
  } ],
  BlastTypes: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "08e70dZj0hFB7oK0xGL2nPG", "BlastTypes");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.BoosterType = void 0;
    var BoosterType;
    (function(BoosterType) {
      BoosterType[BoosterType["None"] = 0] = "None";
      BoosterType[BoosterType["Bomb"] = 1] = "Bomb";
      BoosterType[BoosterType["Teleport"] = 2] = "Teleport";
    })(BoosterType = exports.BoosterType || (exports.BoosterType = {}));
    cc._RF.pop();
  }, {} ],
  BoardModel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "129b1mu6eFNpawLVSE4bmvY", "BoardModel");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.BoardModel = void 0;
    var TileModel_1 = require("./TileModel");
    var BoardModel = function() {
      function BoardModel(cfg) {
        this._nextId = 1;
        this._grid = [];
        this.rows = cfg.rows;
        this.cols = cfg.cols;
        this.colorsCount = cfg.colorsCount;
        this.reset();
      }
      BoardModel.prototype.reset = function() {
        this._grid = [];
        for (var r = 0; r < this.rows; r++) {
          var row = [];
          for (var c = 0; c < this.cols; c++) row.push(this._createTile(r, c));
          this._grid.push(row);
        }
      };
      BoardModel.prototype.getTile = function(r, c) {
        if (!this._inBounds(r, c)) return null;
        return this._grid[r][c];
      };
      BoardModel.prototype.blastAt = function(r, c, minGroupSize) {
        var group = this.findGroup(r, c);
        if (group.length < minGroupSize) return null;
        var step = this._blastGroup(group);
        return {
          group: group,
          step: step
        };
      };
      BoardModel.prototype.swapTiles = function(a, b) {
        if (!this._inBounds(a.r, a.c) || !this._inBounds(b.r, b.c)) return null;
        var t1 = this._grid[a.r][a.c];
        var t2 = this._grid[b.r][b.c];
        if (!t1 || !t2) return null;
        var fromA = {
          r: t1.row,
          c: t1.col
        };
        var fromB = {
          r: t2.row,
          c: t2.col
        };
        this._grid[a.r][a.c] = t2;
        this._grid[b.r][b.c] = t1;
        t1.row = b.r;
        t1.col = b.c;
        t2.row = a.r;
        t2.col = a.c;
        var moved = [ {
          id: t1.id,
          move: {
            from: fromA,
            to: {
              r: t1.row,
              c: t1.col
            }
          }
        }, {
          id: t2.id,
          move: {
            from: fromB,
            to: {
              r: t2.row,
              c: t2.col
            }
          }
        } ];
        return {
          removed: [],
          moved: moved,
          spawned: []
        };
      };
      BoardModel.prototype.blastPositions = function(positions) {
        var tiles = [];
        var seen = {};
        for (var i = 0; i < positions.length; i++) {
          var p = positions[i];
          var key = p.r + "," + p.c;
          if (seen[key]) continue;
          seen[key] = true;
          var t = this.getTile(p.r, p.c);
          t && tiles.push(t);
        }
        if (0 === tiles.length) return null;
        var step = this._blastGroup(tiles);
        return {
          tiles: tiles,
          step: step
        };
      };
      BoardModel.prototype.findGroup = function(r, c) {
        var start = this.getTile(r, c);
        if (!start) return [];
        var visited = [];
        for (var i = 0; i < this.rows; i++) {
          visited[i] = [];
          for (var j = 0; j < this.cols; j++) visited[i][j] = false;
        }
        var color = start.color;
        var stack = [ {
          r: r,
          c: c
        } ];
        visited[r][c] = true;
        var out = [];
        while (stack.length) {
          var p = stack.pop();
          var t = this.getTile(p.r, p.c);
          if (!t) continue;
          if (t.color !== color) continue;
          out.push(t);
          var neigh = [ {
            r: p.r - 1,
            c: p.c
          }, {
            r: p.r + 1,
            c: p.c
          }, {
            r: p.r,
            c: p.c - 1
          }, {
            r: p.r,
            c: p.c + 1
          } ];
          for (var k = 0; k < neigh.length; k++) {
            var n = neigh[k];
            if (!this._inBounds(n.r, n.c)) continue;
            if (visited[n.r][n.c]) continue;
            var nt = this._grid[n.r][n.c];
            if (!nt) continue;
            if (nt.color !== color) continue;
            visited[n.r][n.c] = true;
            stack.push(n);
          }
        }
        return out;
      };
      BoardModel.prototype.hasAnyMove = function(minGroupSize) {
        if (minGroupSize <= 1) return true;
        if (2 === minGroupSize) {
          for (var r = 0; r < this.rows; r++) for (var c = 0; c < this.cols; c++) {
            var t = this._grid[r][c];
            if (!t) continue;
            var right = c + 1 < this.cols ? this._grid[r][c + 1] : null;
            var down = r + 1 < this.rows ? this._grid[r + 1][c] : null;
            if (right && right.color === t.color) return true;
            if (down && down.color === t.color) return true;
          }
          return false;
        }
        var visited = [];
        for (var i = 0; i < this.rows; i++) {
          visited[i] = [];
          for (var j = 0; j < this.cols; j++) visited[i][j] = false;
        }
        for (var r = 0; r < this.rows; r++) for (var c = 0; c < this.cols; c++) {
          if (visited[r][c]) continue;
          var t = this._grid[r][c];
          if (!t) continue;
          var group = this.findGroup(r, c);
          for (var i = 0; i < group.length; i++) visited[group[i].row][group[i].col] = true;
          if (group.length >= minGroupSize) return true;
        }
        return false;
      };
      BoardModel.prototype.shuffleColors = function() {
        var colors = [];
        for (var r = 0; r < this.rows; r++) for (var c = 0; c < this.cols; c++) {
          var tile = this._grid[r][c];
          if (!tile) continue;
          colors.push(tile.color);
        }
        if (0 === colors.length) return;
        for (var i = colors.length - 1; i > 0; i--) {
          var j = Math.floor(Math.random() * (i + 1));
          var tmp = colors[i];
          colors[i] = colors[j];
          colors[j] = tmp;
        }
        var idx = 0;
        for (var r = 0; r < this.rows; r++) for (var c = 0; c < this.cols; c++) {
          var tile = this._grid[r][c];
          if (!tile) continue;
          tile.color = colors[idx++];
        }
      };
      BoardModel.prototype._blastGroup = function(group) {
        var removedIds = [];
        for (var i = 0; i < group.length; i++) {
          var t = group[i];
          removedIds.push(t.id);
          this._grid[t.row][t.col] = null;
        }
        var moved = [];
        var spawned = [];
        for (var c = 0; c < this.cols; c++) {
          var writeRow = this.rows - 1;
          for (var readRow = this.rows - 1; readRow >= 0; readRow--) {
            var tile = this._grid[readRow][c];
            if (!tile) continue;
            if (readRow !== writeRow) {
              var from = {
                r: readRow,
                c: c
              };
              var to = {
                r: writeRow,
                c: c
              };
              moved.push({
                id: tile.id,
                move: {
                  from: from,
                  to: to
                }
              });
              this._grid[writeRow][c] = tile;
              this._grid[readRow][c] = null;
              tile.row = writeRow;
              tile.col = c;
            }
            writeRow--;
          }
          for (var r = writeRow; r >= 0; r--) {
            var tile = this._createTile(r, c);
            this._grid[r][c] = tile;
            spawned.push({
              id: tile.id,
              to: {
                r: r,
                c: c
              }
            });
          }
        }
        return {
          removed: removedIds,
          moved: moved,
          spawned: spawned
        };
      };
      BoardModel.prototype._createTile = function(r, c) {
        var color = Math.floor(Math.random() * this.colorsCount);
        return new TileModel_1.TileModel(this._nextId++, color, r, c);
      };
      BoardModel.prototype._inBounds = function(r, c) {
        return r >= 0 && r < this.rows && c >= 0 && c < this.cols;
      };
      return BoardModel;
    }();
    exports.BoardModel = BoardModel;
    cc._RF.pop();
  }, {
    "./TileModel": "TileModel"
  } ],
  TileModel: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c1c82tVNTNO8rqwuZPUZbfg", "TileModel");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.TileModel = void 0;
    var TileModel = function() {
      function TileModel(id, color, row, col) {
        this.id = id;
        this.color = color;
        this.row = row;
        this.col = col;
      }
      return TileModel;
    }();
    exports.TileModel = TileModel;
    cc._RF.pop();
  }, {} ],
  helpers: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "5f729kfhipNq4cWHwZcYby0", "helpers");
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.exponentialGrowth = void 0;
    function exponentialGrowth(input, boostFactor) {
      void 0 === boostFactor && (boostFactor = 1);
      var x = Math.max(2, Math.min(30, input));
      var boost = 12 * boostFactor * (Math.exp(.18 * (x - 2)) - 1) / (Math.exp(.18 * 18) - 1);
      return Math.round(x + boost);
    }
    exports.exponentialGrowth = exponentialGrowth;
    cc._RF.pop();
  }, {} ]
}, {}, [ "BaseComponent", "BlastBoardComponent", "BlastGameController", "BlastGameLogic", "BlastBoardView", "BlastBoostersView", "BlastHudView", "helpers", "BlastGameLogicReshuffle.test", "BlastTypes", "BoardModel", "TileModel" ]);
//# sourceMappingURL=index.js.map
